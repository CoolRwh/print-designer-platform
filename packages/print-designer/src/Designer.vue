<script setup lang="ts">
import { ref } from 'vue'
import App from './components/DesignerApp.vue'
import type { PrintData } from './core/types'

defineProps<{
  template?: Record<string, unknown>
  data?: import('./core/types').PrintData
  title?: string
  plugins?: import('./core/types').BusinessPlugin[]
  modules?: import('./core/types').DesignerModules
  testCases?: import('./core/types').DesignerTestCase[]
  initialTestCaseId?: string
}>()

const app = ref<InstanceType<typeof App>>()

function getHtml(data?: PrintData) {
  return app.value?.getHtml(data) ?? ''
}

defineExpose({ getHtml })
</script>

<template>
  <App ref="app" v-bind="$props" />
</template>
