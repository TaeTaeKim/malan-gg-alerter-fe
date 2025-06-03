import { createApp } from 'vue'
import './style.css'
import App from '@/views/App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import { useMainStore } from '@/store/index'
import { useAuthStore } from '@/store/auth'
import '@/plugins/axios'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)


// 앱 마운트 후 초기화 수행
app.mount('#app')

const store = useMainStore()
const auth = useAuthStore()

// 비동기 초기화
Promise.all([
  store.fetchAllItems(),
  auth.initialize()
]).catch(console.error)