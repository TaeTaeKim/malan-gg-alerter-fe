import {createRouter, createWebHistory} from "vue-router";
import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import AuthCallBack from "@/views/AuthCallBack.vue";
import NotFound from "@/views/NotFound.vue"; // Import the NotFound component
import {useAuthStore} from "@/store/auth";
import PrivacyPolicy from "@/views/PrivacyPolicy.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.PROD ? "/malan-alerter/" : "/"),
  routes: [
    {
      path: "/",
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      component: LoginView,
    },
    {
      path: "/auth/callback",
      component: AuthCallBack,
    },
    // Catch-all route for 404 Not Found pages
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
    {
      path: '/privacy-policy',
      component: PrivacyPolicy
    }
  ],
});
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
