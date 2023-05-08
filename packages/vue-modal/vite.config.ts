import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import svg from 'vite-svg-loader'

const resolve = (...filepath: string[]) => path.join(fileURLToPath(new URL('./src', import.meta.url)), ...filepath)

export default defineConfig({
  build: {
    lib: {
      entry: resolve('index.ts'),
      name: 'bundle',
      fileName: (format, name) => `${name}.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      treeshake: true,
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [vue(), svg(), dts({ entryRoot: resolve() })],
})
