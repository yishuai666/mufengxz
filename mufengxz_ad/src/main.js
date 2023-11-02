import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from '@/router'
import '@/assets/scss/reset.scss'
import '@/assets/scss/base.css'


const app = createApp(App)

app.use(router)
//挂载全局api
// app.config.globalProperties.$api = api
app.use(ElementPlus, {locale: zhCn})
//element图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
//pinia
const pinia = createPinia()
//pinia持久化
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.mount('#app')
