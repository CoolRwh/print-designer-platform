<script setup lang="ts">
import App from './components/DesignerApp.vue'

defineProps<{
  template?: Record<string, unknown>
  data?: import('./core/types').PrintData
  title?: string
  plugins?: import('./core/types').BusinessPlugin[]
  modules?: import('./core/types').DesignerModules
  testCases?: import('./core/types').DesignerTestCase[]
  initialTestCaseId?: string
}>()
</script>

<template>
  <App v-bind="$props" />
</template>
