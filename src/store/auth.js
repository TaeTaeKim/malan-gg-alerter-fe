import {defineStore} from "pinia";
import axios, {HttpStatusCode} from "axios";
import {useMainStore} from "@/store";
import api from "@/plugins/axios";
import router from "@/router/index.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    isRefreshing: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },
  actions: {
    setTokens(accessToken, refreshToken) {
      (this.accessToken = accessToken), (this.refreshToken = refreshToken);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    },

    async logout() {
      await api.post(`/api/alerter/auth/logout`);
      this.accessToken = null;
      this.refreshToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // clear main store's registeredItems state.
      const mainStore = useMainStore();
      mainStore.clearRegisteredItems();
      await router.replace("/login");
    },
    async renewToken() {
      if (this.isRefreshing) {
        while (this.isRefreshing) {
          await new Promise((resolve) => setTimeout(resolve, 10));
        }
        return; // First refresh is done, use its result
      }
      this.isRefreshing = true;
      try {
        const payload = JSON.parse(atob(this.accessToken.split(".")[1]));
        // refresh 요청은 interceptor의 영향을 받지 않는다.
        const tempAxios = axios.create({
          baseURL: import.meta.env.VITE_BASE_URL,
        });
        const refreshResponse = await tempAxios.post(
          `/api/alerter/auth/refresh`,
          {
            userId: payload.sub,
            refreshToken: this.refreshToken,
          }
        );
        if (refreshResponse.status === HttpStatusCode.Ok) {
          const { accessToken, refreshToken } = refreshResponse.data;
          this.setTokens(accessToken, refreshToken);
        } else {
          console.warn(`API Server Return Status : ${refreshResponse.status}`);
          await this.logout();
        }
      } catch (error) {
        console.error("Error occur in refreshing token");
        await this.logout();
      } finally {
        this.isRefreshing = false;
      }
    },
  },
});
