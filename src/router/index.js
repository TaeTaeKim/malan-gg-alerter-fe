import {createRouter, createWebHistory} from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import AuthCallBack from "@/views/AuthCallBack.vue";
import { useAuthStore } from '@/store/auth'

const base = import.meta.env.PROD ? '/malan-alerter/' : '/'
const router = createRouter({
    history: createWebHistory(base),
    routes: [
        {
            path: '/',
            component: HomeView,
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            component: LoginView
        },
        {
            path: '/auth/callback',
            component: AuthCallBack
        }
    ]

})
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router;