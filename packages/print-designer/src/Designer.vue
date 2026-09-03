<script setup lang="ts">
import App from './components/DesignerApp.vue'

defineProps<{
  template?: Record<string, unknown>
  data?: Record<string, unknown>
  title?: string
  plugins?: import('./core/types').BusinessPlugin[]
  modules?: import('./core/types').DesignerModules
}>()
</script>

<template>
  <App v-bind="$props" />
</template>
