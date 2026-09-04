import { createApp } from 'vue'
import App from './components/DesignerApp.vue'
import { designerTestCases } from './test-cases'
import './styles/index.css'

const caseId = new URLSearchParams(window.location.search).get('case')
const testCase = designerTestCases.find((item) => item.id === caseId)

createApp(App, testCase ? {
  title: testCase.name,
  template: testCase.template,
  data: testCase.data,
  testCases: designerTestCases,
  initialTestCaseId: testCase.id,
} : {
  testCases: designerTestCases,
}).mount('#app')
