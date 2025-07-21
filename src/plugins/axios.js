import axios from "axios";
import {useAuthStore} from "@/store/auth";
import {useNotificationStore} from "@/store/noti";
import router from "@/router";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const auth = useAuthStore();
    const originalRequest = error.config;
    if (isTokenError(error)) {
      auth.accessToken = null;
      auth.refreshToken = null;
      localStorage.removeItem("accessToken")
      router.push("/login");
    }

    // refresh token 으로 access token 갱신
    if (isAccessTokenExpired(error) && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await auth.renewToken(); // refresh 와 브라우저 localStorage 갱신
        if (auth.accessToken) {
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${auth.accessToken}`;
          return instance(originalRequest);
        }
        return Promise.reject(error);
      } catch (e) {
        await auth.logout();
        return Promise.reject(e);
      }
    }

    // refresh 만료 혹은 찾지 못했을 떄
    if (isInvalidRefreshToken(error)) {
      const auth = useAuthStore();
      await auth.logout();
      return Promise.reject(error);
    }

    // 500 에러 처리
    if (error.response?.status === 500) {
      const notificationStore = useNotificationStore();
      notificationStore.showNotification("서버 에러가 발생했습니다.");
    }

    return Promise.reject(error);
  }
);

function isAccessTokenExpired(error) {
  return (
    error.response &&
    error.response.status === 401 &&
    error.response.data.code === "AUTH_002" // 액세스 토큰 만료시
  );
}

function isInvalidRefreshToken(error) {
  console.log(error.response);
  return (
    error.response &&
    error.response.status === 401 &&
    error.response.data.code === "AUTH_003" // when refresh token expired OR not found(revoked)
  );
}
function isTokenError(error) {
  return (
    error.response &&
    error.response.status === 401 &&
    error.response.data.code === "AUTH_001"
  );
}

export default instance;
