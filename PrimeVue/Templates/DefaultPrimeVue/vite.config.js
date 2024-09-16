import { fileURLToPath, URL } from 'node:url'
const __dirname = fileURLToPath(new URL('.', import.meta.url));

import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'

import fs from 'fs';
import path from 'path';

import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        PrimeVueResolver()
      ]
    }),
    legacy()
  ],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, './localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, './localhost.pem')),
    },
    port: 5175, // Puerto para el servidor de desarrollo
    open: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  esbuild: {
    charset: 'ascii',
    drop: ['console', 'debugger'],
  }
})
