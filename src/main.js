import { createApp } from 'vue'
import './style.css'
import App from '@/views/App.vue'
import { createPinia } from 'pinia'
import { useMainStore } from '@/store'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)


const store = useMainStore()
store.fetchAllItems()
store.fetchRegisteredItems()

app.mount('#app')
