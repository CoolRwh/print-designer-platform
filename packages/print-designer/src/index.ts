import type { App as VueApp } from 'vue'
import Designer from './Designer.vue'
import './styles/index.css'

export { Designer }
export * from './core/types'
export { PluginRegistry, pluginRegistry, createPluginRegistry, registerPlugin } from './core/pluginRegistry'
export { plugins } from './plugins'
export { HiprintAdapter } from './engine/hiprintAdapter'
export { designerTestCases, twoColumnLabelsCase, tableCodeColumnsCase, deliveryOrderCase } from './test-cases'

export const PrintDesigner = {
  install(app: VueApp) {
    app.component('Designer', Designer)
  },
}

export default PrintDesigner
