import axios from 'axios'
import { useAuthStore } from '@/store/auth'
import { useNotificationStore } from '@/store/noti'
import router from '@/router'

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // refresh token 으로 access token 갱신
    if (isAccessTokenExpired(error) && !originalRequest._retry) {
      originalRequest._retry = true

      const auth = useAuthStore()
      try {
        await auth.renewToken() // refresh 와 브라우저 localStorage 갱신
        originalRequest.headers['Authorization'] = `Bearer ${auth.accessToken}`
        return axios(originalRequest)
      } catch (e) {
        auth.logout()
        return Promise.reject(e)
      }
    }

    // refresh 만료 혹은 찾지 못했을 떄
    if(isInvalidRefreshToken(error)){
        const auth = useAuthStore()
        await auth.logout()
        router.push('/login')
        return Promise.reject(error)
    }

    // 500 에러 처리
    if (error.response?.status === 500) {
      const notificationStore = useNotificationStore()
      notificationStore.showNotification('서버 에러가 발생했습니다.')
    }

    return Promise.reject(error)
  }

)

function isAccessTokenExpired(error){
    return (
        error.response &&
        error.response.status === 401 &&
        error.response.data.code === "AUTH_002" || error.response.data.code === "AUTH_005" // 액세스 토큰 만료나 로그아웃된 토큰일때
    )
}

function isInvalidRefreshToken(error){
    console.log(error.response)
    return (
        error.response &&
        error.response.status === 401 &&
        (error.response.data.code === "AUTH_003" || error.response.data.code === "AUTH_004") // when refresh token expired OR not found(revoked)
    )
}