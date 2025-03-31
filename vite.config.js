import {
  defineConfig
} from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

import resolve from '@rollup/plugin-node-resolve'
import inject from '@rollup/plugin-inject'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),

    resolve(),

    inject({
      $utils: path.resolve(__dirname, './packages/utils')
    })
  ],

  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: `@use "@/packages/styles/mixin.scss" as *;`,
      }
    }
  },

  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
})
