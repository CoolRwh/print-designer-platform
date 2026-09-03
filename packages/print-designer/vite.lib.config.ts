import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    dedupe: ['jquery'],
    alias: {
      '@hiprint-engine': new URL('../vue-plugin-hiprint/index.js', import.meta.url).pathname,
      'nzh/dist/nzh.min.js': new URL('../vue-plugin-hiprint/node_modules/nzh/dist/nzh.min.js', import.meta.url).pathname,
    },
  },
  build: {
    outDir: 'dist-lib',
    emptyOutDir: true,
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'PrintDesigner',
      formats: ['es', 'umd'],
      fileName: (format) => `print-designer.${format === 'umd' ? 'umd.cjs' : 'es.js'}`,
    },
    rollupOptions: {
      external: ['vue'],
      output: { globals: { vue: 'Vue' } },
    },
  },
})
