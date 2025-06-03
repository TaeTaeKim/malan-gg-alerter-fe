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


const store = useMainStore()
store.fetchAllItems()
const auth = useAuthStore()
auth.initialize()
app.mount('#app')
