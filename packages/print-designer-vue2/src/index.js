import Designer from './Designer.vue'
import '@print-designer/designer/style.css'
import './vue2.css'

Designer.install = function (Vue) { Vue.component(Designer.name, Designer); Vue.component('Designer', Designer) }
export { Designer }
export { registerPlugin } from '@print-designer/designer/adapter'
export default Designer
