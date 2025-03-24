import {
  createSSRApp
} from 'vue'
import pinia from './stores/store'
import App from './App'

export function createApp() {
  const app = createSSRApp(App)

  app.use(pinia)

  return {
    app,
    pinia
  }
}
