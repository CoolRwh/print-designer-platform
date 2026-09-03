import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: { port: 5178 },
  resolve: {
    dedupe: ['jquery'],
    alias: {
      '@hiprint-engine': new URL('../vue-plugin-hiprint/index.js', import.meta.url).pathname,
      'nzh/dist/nzh.min.js': new URL('../vue-plugin-hiprint/node_modules/nzh/dist/nzh.min.js', import.meta.url).pathname,
    },
  },
  optimizeDeps: {
    include: ['jquery'],
  },
})
