import {createApp} from 'vue'
import './style.css'
import App from '@/views/App.vue'
import router from '@/router'
import {createPinia} from 'pinia'
import {useAuthStore} from '@/store/auth'
import '@/plugins/axios'
import {useMainStore} from "@/store/index.js";

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

const auth = useAuthStore()
const store = useMainStore();

// 비동기 초기화
Promise.all([
  auth.initialize(),
]).then(() => {
  app.mount('#app')
  store.fetchAllItems()
}).catch(console.error)