import * as Pinia from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = Pinia.createPinia()
pinia.use(persist)

export default pinia
