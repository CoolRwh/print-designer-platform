<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { HiprintAdapter } from '../engine/hiprintAdapter'
import { createPluginRegistry } from '../core/pluginRegistry'
import type { BusinessPlugin, DesignerChangeType, DesignerModules, DesignerTestCase, FullHtmlOptions, PrintData } from '../core/types'
import { plugins as builtinPlugins } from '../plugins'
import PluginManager from './PluginManager.vue'

const props = withDefaults(defineProps<{
  template?: Record<string, unknown>
  data?: PrintData
  title?: string
  plugins?: BusinessPlugin[]
  modules?: DesignerModules
  testCases?: DesignerTestCase[]
  initialTestCaseId?: string
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
  (event: 'preview', data: PrintData): void
  (event: 'print', data: PrintData): void
  (event: 'html', html: string): void
  (event: 'save', template: Record<string, unknown>): void
  (event: 'plugin-add', plugin: BusinessPlugin): void
  (event: 'plugin-remove', id: string): void
  (event: 'update:plugins', plugins: BusinessPlugin[]): void
  (event: 'test-case-change', testCase: DesignerTestCase): void
}>()

const pluginRevision = ref(0)
const pluginManagerOpen = ref(false)
function registerExternalPlugins(value?: BusinessPlugin[]) {
  registry.syncExternal(value ?? [])
  pluginRevision.value++
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
const activeTestCaseId = ref(props.initialTestCaseId ?? '')

const plugins = computed(() => { pluginRevision.value; return registry.all() })
const activeTestCase = computed(() => props.testCases?.find((item) => item.id === activeTestCaseId.value))
const sampleData = computed(() => activeTestCase.value?.data ?? props.data ?? registry.sampleData())
const documentTitle = computed(() => activeTestCase.value?.name ?? props.title)
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

function addPlugin(plugin: BusinessPlugin) {
  try {
    if (registry.get(plugin.id)) throw new Error(`插件 ${plugin.id} 已存在`)
    emit('update:plugins', [...(props.plugins ?? []), plugin])
    emit('plugin-add', plugin)
    notify(`插件 ${plugin.name} 已提交`)
  }
  catch (error) { emit('template-error', error); notify(error instanceof Error ? error.message : '插件添加失败') }
}
function removePlugin(id: string) {
  emit('update:plugins', (props.plugins ?? []).filter((plugin) => plugin.id !== id))
  emit('plugin-remove', id)
}

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
function loadTestCase() {
  const testCase = activeTestCase.value
  if (!testCase) return
  adapter.updateTemplate(testCase.template)
  dirty.value = false
  emit('test-case-change', testCase)
  notify(`已加载：${testCase.name}`)
  window.setTimeout(fitCanvas, 80)
}
function save() { const template = adapter.getTemplate(); dirty.value = false; emit('save', template); notify('已提交保存事件') }
function exportJson() {
  const blob = new Blob([JSON.stringify(adapter.getTemplate(), null, 2)], { type: 'application/json' })
  const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = `print-template-${Date.now()}.json`; link.click(); URL.revokeObjectURL(link.href)
  notify('模板 JSON 已导出')
}
function importJson(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]; if (!file) return
  const reader = new FileReader(); reader.onload = () => { try { adapter.updateTemplate(JSON.parse(String(reader.result))); notify('模板导入成功') } catch { notify('模板 JSON 无效') } }; reader.readAsText(file)
}
function getHtml(data: PrintData = sampleData.value) { return adapter.getHtml(data) }
function getFullHtml(data: PrintData = sampleData.value, options: FullHtmlOptions = {}) { return adapter.getFullHtml(data, { title: documentTitle.value, ...options }) }
async function writeClipboard(text: string) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text)
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0'
  document.body.appendChild(textarea)
  textarea.select()
  const copied = document.execCommand('copy')
  textarea.remove()
  if (!copied) throw new Error('浏览器不允许访问剪贴板')
}
async function copyHtml() {
  try {
    const html = getFullHtml()
    emit('html', html)
    await writeClipboard(html)
    notify('HTML 已复制到剪贴板')
  }
  catch (error) {
    emit('template-error', error)
    notify(error instanceof Error ? `获取 HTML 失败：${error.message}` : '获取 HTML 失败')
  }
}
async function openPreview() { previewOpen.value = true; emit('preview', sampleData.value); await nextTick(); if (previewBody.value) adapter.preview(previewBody.value, sampleData.value) }
async function silentPrint() { try { emit('print', sampleData.value); await adapter.silentPrint(sampleData.value); notify('打印任务已发送') } catch (error) { emit('template-error', error); notify(error instanceof Error ? error.message : '打印失败') } }
function clearTemplate() { if (window.confirm('确定清空当前页面的全部元素吗？')) { adapter.clear(); dirty.value = true } }
function filterPlugin(id: string) {
  activePlugin.value = id
  document.querySelectorAll<HTMLElement>('.hiprintEpContainer .ep-draggable-item[tid]').forEach((el) => {
    const tid = el.getAttribute('tid') ?? ''
    const row = el.closest<HTMLElement>('li') ?? el
    row.style.display = id === 'all' || tid.includes(`.${id}.`) ? '' : 'none'
  })
}

defineExpose({ getHtml, getFullHtml })
</script>

<template>
  <div class="studio-shell">
    <header v-if="modules.toolbar" class="topbar">
      <slot name="toolbar">
      <div class="brand"><span class="brand-mark">P</span><div><strong>Print Studio</strong><small>HIPRINT DESIGNER</small></div></div>
      <div class="doc-name"><span class="status-dot"></span>{{ documentTitle }} <span v-if="dirty" class="dirty">未保存</span></div>
      <div class="toolbar-actions">
        <label v-if="props.testCases?.length" class="test-case-picker">
          <span>模板中心</span>
          <select v-model="activeTestCaseId" title="从模板中心加载模板" @change="loadTestCase">
            <option value="" disabled>请选择</option>
            <option v-for="testCase in props.testCases" :key="testCase.id" :value="testCase.id">{{ testCase.name }}</option>
          </select>
        </label>
        <button title="撤销" @click="adapter.undo()">↶</button><button title="重做" @click="adapter.redo()">↷</button><i></i>
        <button @click="save">保存</button><button @click="exportJson">导出 JSON</button>
        <button @click="fileInput?.click()">导入</button><input ref="fileInput" hidden type="file" accept="application/json" @change="importJson" /><button @click="copyHtml">获取 HTML</button>
        <button class="primary" @click="openPreview">预览</button><button class="accent" @click="silentPrint">打印</button>
      </div>
      </slot>
    </header>

    <main class="workspace">
      <aside v-if="modules.palette" class="palette panel">
        <slot name="palette">
        <div class="panel-heading"><span>{{ modules.labels?.palette ?? '业务组件' }}</span><button title="插件管理" @click="pluginManagerOpen = true">＋</button></div>
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
    <PluginManager v-if="pluginManagerOpen" :plugins="props.plugins ?? []" @close="pluginManagerOpen = false" @add="addPlugin" @remove="removePlugin" />
  </div>
</template>
