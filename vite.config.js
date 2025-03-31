import {
  defineConfig
} from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// import inject from '@rollup/plugin-inject'
// import utils from '@/packages/utils'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    // inject({
    //   Utils: utils
    // })
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
