import { fileURLToPath, URL } from 'node:url'
const __dirname = fileURLToPath(new URL('.', import.meta.url))

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'

import fs from 'fs'
import path from 'path'

import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('pwa-install')
        }
      }
    }),
    Components({
      resolvers: [PrimeVueResolver()]
    }),
    legacy(),
    tailwindcss(),
    svgLoader()
  ],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, './localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, './localhost.pem'))
    },
    port: 5182, // Puerto para el servidor de desarrollo
    open: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  esbuild: {
    charset: 'ascii',
    drop: ['console', 'debugger']
  }
})
