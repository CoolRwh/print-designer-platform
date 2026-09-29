<template>
  <div ref="root" class="print-designer-vue2">
    <div v-if="moduleOptions.toolbar" class="designer-toolbar">
      <strong>{{ title }}</strong>
      <button type="button" @click="save">保存</button>
      <button type="button" @click="preview">预览</button>
      <button type="button" @click="print">打印</button>
    </div>
    <div class="designer-body">
      <aside v-show="moduleOptions.palette" class="designer-palette">
        <slot name="palette">
          <div class="palette-title">{{ labelOptions.palette }}</div>
          <div ref="palette" class="hiprintEpContainer"></div>
        </slot>
      </aside>
      <main ref="canvas" class="designer-canvas"></main>
      <aside v-show="moduleOptions.properties" class="designer-properties">
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
import { HiprintAdapter, createPluginRegistry, plugins as builtinPlugins } from '@print-designer/designer/adapter'

export default {
  name: 'PrintDesignerVue2',
  props: {
    title: { type: String, default: '打印设计器' },
    template: { type: Object, default: null },
    data: { type: [Object, Array], default: function () { return {} } },
    plugins: { type: Array, default: function () { return [] } },
    modules: { type: Object, default: function () { return {} } },
    labels: { type: Object, default: function () { return { palette: '业务组件', properties: '属性设置' } } }
  },
  data: function () { return { adapter: null, registry: null, status: '就绪' } },
  computed: {
    moduleOptions: function () { return Object.assign({ toolbar: true, palette: true, properties: true, footer: true }, this.modules) },
    labelOptions: function () { return Object.assign({ palette: '业务组件', properties: '属性设置' }, this.labels) }
  },
  mounted: function () {
    this.registry = createPluginRegistry(builtinPlugins)
    this.syncPlugins(this.plugins)
    this.adapter = new HiprintAdapter((type, json) => { this.status = '模板已修改'; this.$emit('template-change', type, json) }, {
      template: this.template,
      registry: this.registry,
      onUpdateError: (error) => this.$emit('template-error', error)
    })
    const root = this.$refs.root
    const canvas = this.$refs.canvas
    const mountNode = (selector, element) => {
      const existing = element || root.querySelector(selector)
      if (existing) return existing
      const hidden = document.createElement('div')
      hidden.hidden = true
      root.appendChild(hidden)
      return hidden
    }
    const settings = mountNode('.hiprint-settings, #hiprint-settings', this.$refs.settings)
    const pagination = this.$refs.pagination
    const palette = mountNode('.hiprintEpContainer', this.$refs.palette)
    if (!canvas || !settings || !pagination || !palette) {
      this.$emit('template-error', new Error('设计器挂载节点不完整'))
      return
    }
    this.adapter.mount(canvas, settings, pagination, palette)
    this.$emit('template-ready', this.adapter.getTemplate(), this.adapter)
  },
  beforeDestroy: function () { if (this.adapter) this.adapter.destroy() },
  watch: {
    template: { deep: true, handler: function (value) { if (this.adapter && value) this.adapter.updateTemplate(value) } },
    plugins: { deep: true, handler: function (value) { this.syncPlugins(value); if (this.adapter) this.adapter.refreshPlugins() } }
  },
  methods: {
    syncPlugins: function (plugins) {
      if (!this.registry) return
      try { this.registry.syncExternal(plugins || []) }
      catch (error) { this.$emit('template-error', error) }
    },
    save: function () { this.$emit('save', this.adapter.getTemplate()) },
    getHtml: function (data) { return this.adapter ? this.adapter.getHtml(data || this.data) : '' },
    getFullHtml: function (data, options) { return this.adapter ? this.adapter.getFullHtml(data || this.data, Object.assign({ title: this.title }, options)) : '' },
    preview: function () { this.$emit('preview', this.data) },
    print: function () { this.$emit('print', this.data); this.adapter.print(this.data) }
  }
}
</script>
