import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'

export default defineConfig({
  plugins: [vue(), {
    name: 'ascii-css',
    enforce: 'post',
    // Library mode emits UTF-8 CSS even when esbuild.charset is set to ASCII.
    generateBundle(_, bundle) {
      this.emitFile({
        type: 'asset',
        fileName: 'print-lock.css',
        source: readFileSync(new URL('../vue-plugin-hiprint/src/hiprint/css/print-lock.css', import.meta.url), 'utf8'),
      })
      for (const asset of Object.values(bundle)) {
        if (asset.type === 'asset' && asset.fileName.endsWith('.css') && typeof asset.source === 'string') {
          asset.source = asset.source.replace(/[^\x00-\x7f]/gu, char => `\\${char.codePointAt(0)!.toString(16)} `)
        }
      }
    },
  }],
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
      output: { globals: { vue: 'Vue' }, exports: 'named' },
    },
  },
})
