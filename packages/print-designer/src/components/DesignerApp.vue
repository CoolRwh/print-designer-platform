<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { HiprintAdapter } from '../engine/hiprintAdapter'
import { createPluginRegistry } from '../core/pluginRegistry'
import type { BusinessPlugin, DesignerChangeType, DesignerModules } from '../core/types'
import { plugins as builtinPlugins } from '../plugins'

const props = withDefaults(defineProps<{
  template?: Record<string, unknown>
  data?: Record<string, unknown>
  title?: string
  plugins?: BusinessPlugin[]
  modules?: DesignerModules
}>(), { title: '订单发货单', modules: () => ({}) })

const modules = computed(() => ({
  toolbar: true, palette: true, canvasToolbar: true, properties: true, footer: true,
  ...props.modules,
}))

const registry = createPluginRegistry(builtinPlugins)

const emit = defineEmits<{
  (event: 'template-change', type: DesignerChangeType, template: Record<string, unknown>): void
  (event: 'template-ready', template: Record<string, unknown>, adapter: HiprintAdapter): void
  (event: 'template-error', error: unknown): void
  (event: 'preview', data: Record<string, unknown>): void
  (event: 'print', data: Record<string, unknown>): void
  (event: 'save', template: Record<string, unknown>): void
}>()

function registerExternalPlugins(value?: BusinessPlugin[]) {
  registry.syncExternal(value ?? [])
}
registerExternalPlugins(props.plugins)

const adapter = new HiprintAdapter((type, template) => {
  dirty.value = true
  emit('template-change', type, template)
}, { template: props.template, registry, onUpdateError: (error) => emit('template-error', error) })
const zoom = ref(1)
const paper = ref('A4')
const page = ref(1)
const dirty = ref(false)
const previewOpen = ref(false)
const previewBody = ref<HTMLElement>()
const fileInput = ref<HTMLInputElement>()
const toast = ref('就绪')
const activePlugin = ref('all')

const plugins = computed(() => registry.all())
const sampleData = computed(() => props.data ?? registry.sampleData())
const paperTypes: Record<string, [number, number]> = { A4: [210, 296.6], A5: [148, 210], A3: [297, 420], '80mm': [80, 160] }
const zoomLabel = computed(() => `${Math.round(zoom.value * 100)}%`)

let mounted = false
onMounted(() => nextTick(() => {
  adapter.mount('#hiprint-canvas', '#hiprint-settings', '#hiprint-pagination')
  window.setTimeout(fitCanvas, 80)
  mounted = true
  emit('template-ready', adapter.getTemplate(), adapter)
}))
onBeforeUnmount(() => adapter.destroy())

watch(() => props.plugins, (value) => {
  registerExternalPlugins(value)
  if (mounted) adapter.refreshPlugins()
}, { deep: true })

watch(() => props.template, (value) => {
  if (mounted && value) adapter.updateTemplate(value)
}, { deep: true })

function notify(message: string) { toast.value = message; window.setTimeout(() => { if (toast.value === message) toast.value = '就绪' }, 2400) }
function changeZoom(delta: number) { zoom.value = Math.min(2, Math.max(.35, +(zoom.value + delta).toFixed(2))); adapter.zoom(zoom.value) }
function fitCanvas() {
  const viewport = document.querySelector<HTMLElement>('.canvas-scroll')
  const paperElement = document.querySelector<HTMLElement>('#hiprint-canvas .hiprint-printPaper')
  if (!viewport || !paperElement) return
  const availableWidth = Math.max(260, viewport.clientWidth - 56)
  zoom.value = +Math.max(.35, Math.min(1, availableWidth / paperElement.offsetWidth)).toFixed(2)
  adapter.zoom(zoom.value)
}
function changePaper() { const [w, h] = paperTypes[paper.value]; adapter.setPaper(w, h); dirty.value = true }
function save() { const template = adapter.getTemplate(); localStorage.setItem('print-studio-template', JSON.stringify(template)); dirty.value = false; emit('save', template); notify('模板已保存到本地') }
function restore() { const raw = localStorage.getItem('print-studio-template'); if (!raw) return notify('没有找到本地模板'); adapter.updateTemplate(JSON.parse(raw)); dirty.value = false; notify('模板已恢复') }
function exportJson() {
  const blob = new Blob([JSON.stringify(adapter.getTemplate(), null, 2)], { type: 'application/json' })
  const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = `print-template-${Date.now()}.json`; link.click(); URL.revokeObjectURL(link.href)
  notify('模板 JSON 已导出')
}
function importJson(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]; if (!file) return
  const reader = new FileReader(); reader.onload = () => { try { adapter.updateTemplate(JSON.parse(String(reader.result))); notify('模板导入成功') } catch { notify('模板 JSON 无效') } }; reader.readAsText(file)
}
async function openPreview() { previewOpen.value = true; emit('preview', sampleData.value); await nextTick(); if (previewBody.value) adapter.preview(previewBody.value, sampleData.value) }
async function silentPrint() { try { emit('print', sampleData.value); await adapter.silentPrint(sampleData.value); notify('打印任务已发送') } catch (error) { notify(error instanceof Error ? error.message : '打印失败') } }
function clearTemplate() { if (window.confirm('确定清空当前页面的全部元素吗？')) { adapter.clear(); dirty.value = true } }
function filterPlugin(id: string) {
  activePlugin.value = id
  document.querySelectorAll<HTMLElement>('.hiprintEpContainer .ep-draggable-item[tid]').forEach((el) => {
    const tid = el.getAttribute('tid') ?? ''
    const row = el.closest<HTMLElement>('li') ?? el
    row.style.display = id === 'all' || tid.includes(`.${id}.`) ? '' : 'none'
  })
}
</script>

<template>
  <div class="studio-shell">
    <header v-if="modules.toolbar" class="topbar">
      <slot name="toolbar">
      <div class="brand"><span class="brand-mark">P</span><div><strong>Print Studio</strong><small>HIPRINT DESIGNER</small></div></div>
      <div class="doc-name"><span class="status-dot"></span>{{ props.title }} <span v-if="dirty" class="dirty">未保存</span></div>
      <div class="toolbar-actions">
        <button title="撤销" @click="adapter.undo()">↶</button><button title="重做" @click="adapter.redo()">↷</button><i></i>
        <button @click="restore">打开</button><button @click="save">保存</button><button @click="exportJson">导出 JSON</button>
        <button @click="fileInput?.click()">导入</button><input ref="fileInput" hidden type="file" accept="application/json" @change="importJson" />
        <button class="primary" @click="openPreview">预览</button><button class="accent" @click="silentPrint">打印</button>
      </div>
      </slot>
    </header>

    <main class="workspace">
      <aside v-if="modules.palette" class="palette panel">
        <slot name="palette">
        <div class="panel-heading"><span>{{ modules.labels?.palette ?? '业务组件' }}</span><button title="插件管理">＋</button></div>
        <div class="plugin-tabs">
          <button :class="{ active: activePlugin === 'all' }" @click="filterPlugin('all')">全部</button>
          <button v-for="plugin in plugins" :key="plugin.id" :class="{ active: activePlugin === plugin.id }" :style="{ '--plugin': plugin.color }" @click="filterPlugin(plugin.id)">{{ plugin.icon }} {{ plugin.name }}</button>
        </div>
        <div class="palette-hint">拖动字段到画布</div>
        <div class="hiprintEpContainer"></div>
        <div class="plugin-footer"><span>●</span> {{ plugins.length }} 个插件已启用</div>
        </slot>
      </aside>

      <section class="stage">
        <div v-if="modules.canvasToolbar" class="canvas-toolbar">
          <slot name="canvas-toolbar">
          <label>纸张 <select v-model="paper" @change="changePaper"><option v-for="(_, key) in paperTypes" :key="key">{{ key }}</option></select></label>
          <button @click="adapter.rotate()">↻ 旋转</button><button @click="fitCanvas">适应画布</button><button @click="clearTemplate">清空</button>
          <span class="canvas-tip">拖拽组件 · 单击选中 · Delete 删除</span>
          </slot>
        </div>
        <div class="canvas-scroll"><div id="hiprint-canvas"></div></div>
      </section>

      <aside v-if="modules.properties" class="properties panel">
        <slot name="properties">
        <div class="panel-heading"><span>{{ modules.labels?.properties ?? '属性设置' }}</span><span class="selection-tag">选中元素</span></div>
        <div id="hiprint-settings"></div>
        </slot>
      </aside>
    </main>

    <footer v-if="modules.footer" class="statusbar">
      <slot name="footer">
      <div><span class="ready-dot"></span>{{ toast }}</div>
      <div id="hiprint-pagination"></div>
      <div class="zoom"><button @click="changeZoom(-.1)">−</button><input v-model.number="zoom" type="range" min=".35" max="2" step=".05" @input="adapter.zoom(zoom)" /><button @click="changeZoom(.1)">＋</button><span>{{ zoomLabel }}</span></div>
      </slot>
    </footer>

    <div v-if="previewOpen" class="modal-backdrop" @click.self="previewOpen = false">
      <div class="preview-modal"><div class="preview-head"><div><strong>打印预览</strong><small>使用示例业务数据渲染</small></div><div><button @click="adapter.print(sampleData)">浏览器打印</button><button class="close" @click="previewOpen = false">×</button></div></div><div class="preview-scroll"><div ref="previewBody" class="preview-body"></div></div></div>
    </div>
  </div>
</template>
