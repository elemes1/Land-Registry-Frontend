import { createApp } from 'vue'
import { createPinia } from 'pinia'
import utils from './utils'
import App from './App.vue'
import router from './routers'
import './assets/css/app.css'
import 'preline'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const pinia = createPinia()
const app = createApp(App).use(router).use(pinia)

app.use(ElementPlus)
utils(app)

app.mount('#app')
