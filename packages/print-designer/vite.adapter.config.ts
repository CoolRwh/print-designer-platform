import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  resolve: {
    dedupe: ['jquery'],
    alias: {
      '@hiprint-engine': new URL('../vue-plugin-hiprint/index.js', import.meta.url).pathname,
      'nzh/dist/nzh.min.js': new URL('../vue-plugin-hiprint/node_modules/nzh/dist/nzh.min.js', import.meta.url).pathname,
    },
  },
  build: {
    outDir: 'dist-lib',
    emptyOutDir: false,
    cssCodeSplit: false,
    lib: {
      entry: fileURLToPath(new URL('./src/adapter.ts', import.meta.url)),
      formats: ['es'],
      fileName: () => 'adapter.es.js',
      cssFileName: 'adapter',
    },
  },
})
