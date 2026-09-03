import Designer from './Designer.vue'
import '@print-designer/designer/style.css'

Designer.install = function (Vue) { Vue.component(Designer.name, Designer); Vue.component('Designer', Designer) }
export { Designer }
export default Designer
