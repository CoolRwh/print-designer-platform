<template>
  <div class="print-designer-vue2">
    <div v-if="moduleOptions.toolbar" class="designer-toolbar">
      <strong>{{ title }}</strong>
      <button type="button" @click="save">保存</button>
      <button type="button" @click="preview">预览</button>
      <button type="button" @click="print">打印</button>
    </div>
    <div class="designer-body">
      <aside v-if="moduleOptions.palette" class="designer-palette">
        <slot name="palette">
          <div class="palette-title">{{ labelOptions.palette }}</div>
          <div ref="palette" class="hiprintEpContainer"></div>
        </slot>
      </aside>
      <main ref="canvas" class="designer-canvas"></main>
      <aside v-if="moduleOptions.properties" class="designer-properties">
        <slot name="properties">
          <div class="properties-title">{{ labelOptions.properties }}</div>
          <div ref="settings"></div>
        </slot>
      </aside>
    </div>
    <footer v-if="moduleOptions.footer"><slot name="footer">{{ status }}</slot></footer>
    <div ref="pagination" class="designer-pagination"></div>
  </div>
</template>

<script>
import { HiprintAdapter } from '@print-designer/designer'

export default {
  name: 'PrintDesignerVue2',
  props: {
    title: { type: String, default: '打印设计器' },
    template: { type: Object, default: null },
    data: { type: Object, default: function () { return {} } },
    plugins: { type: Array, default: function () { return [] } },
    modules: { type: Object, default: function () { return {} } },
    labels: { type: Object, default: function () { return { palette: '业务组件', properties: '属性设置' } } }
  },
  data: function () { return { adapter: null, status: '就绪' } },
  computed: {
    moduleOptions: function () { return Object.assign({ toolbar: true, palette: true, properties: true, footer: true }, this.modules) },
    labelOptions: function () { return Object.assign({ palette: '业务组件', properties: '属性设置' }, this.labels) }
  },
  mounted: function () {
    this.adapter = new HiprintAdapter((type, json) => { this.status = '模板已修改'; this.$emit('template-change', type, json) }, { template: this.template })
    this.adapter.mount(this.$refs.canvas, this.$refs.settings || '#hiprint-settings', this.$refs.pagination)
    this.$emit('template-ready', this.adapter.getTemplate(), this.adapter)
  },
  beforeDestroy: function () { if (this.adapter) this.adapter.destroy() },
  watch: {
    template: { deep: true, handler: function (value) { if (this.adapter && value) this.adapter.updateTemplate(value) } },
    plugins: { deep: true, handler: function () { if (this.adapter) this.adapter.refreshPlugins() } }
  },
  methods: {
    save: function () { this.$emit('save', this.adapter.getTemplate()) },
    getHtml: function (data) { return this.adapter ? this.adapter.getHtml(data || this.data) : '' },
    getFullHtml: function (data, options) { return this.adapter ? this.adapter.getFullHtml(data || this.data, Object.assign({ title: this.title }, options)) : '' },
    preview: function () { this.$emit('preview', this.data) },
    print: function () { this.$emit('print', this.data); this.adapter.print(this.data) }
  }
}
</script>

<style scoped>
.print-designer-vue2 { display:flex; flex-direction:column; height:100%; min-height:600px; background:#101722; color:#dce7f5; }
.designer-toolbar { padding:10px 16px; display:flex; gap:10px; align-items:center; border-bottom:1px solid #29384b; }
.designer-toolbar strong { margin-right:auto; }
.designer-toolbar button { background:#2463eb; border:0; color:#fff; padding:6px 14px; border-radius:4px; cursor:pointer; }
.designer-body { display:flex; flex:1; min-height:0; }
.designer-palette,.designer-properties { width:240px; padding:12px; overflow:auto; border-right:1px solid #29384b; }
.designer-properties { border-left:1px solid #29384b; border-right:0; }
.designer-canvas { flex:1; overflow:auto; background:#e8edf3; padding:24px; }
.designer-pagination { min-height:20px; }
.palette-title,.properties-title { font-weight:600; margin-bottom:12px; }
</style>
