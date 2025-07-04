<template>
  <div>로그인 처리 중입니다...</div>
</template>

<script setup>
import {onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/store/auth'

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const accessToken = params.get('accessToken')
  const refreshToken = params.get('refreshToken')

  if (accessToken) {
    authStore.setTokens(accessToken, refreshToken)
    router.replace('/')
  } else {
    router.replace('/login') // fallback
  }
})
</script>