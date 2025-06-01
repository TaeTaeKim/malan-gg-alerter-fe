import {createRouter, createWebHistory} from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue';
import HomeView from '@/views/HomeView.vue';
import { useAuthStore } from '@/store/auth'


const router = createRouter({
    history: createWebHistory(),
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
            path: '/signup',
            component: SignUpView
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