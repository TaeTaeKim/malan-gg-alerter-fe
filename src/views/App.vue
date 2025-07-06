<template>
  <div id="app">
    <GlobalNotification />
    <router-view></router-view>
  </div>
</template>

<script setup>
import GlobalNotification from '@/components/GlobalNotification.vue'
import {onBeforeUnmount, watch} from 'vue'
import { useMainStore } from '@/store'
import {useAuthStore} from "@/store/auth.js";

const store = useMainStore()
const auth = useAuthStore()
watch(
    () => auth.isAuthenticated,
    (isAuthenticated) => {
      if (isAuthenticated) {
        store.fetchRegisteredItems()
        store.startBidPolling()
      }
    },
    { immediate: true }
)

onBeforeUnmount(() => {
  store.stopBidPolling()
})
</script>

<style>
/* 글로벌 스타일 정의 */
html, body {
  overflow-x: hidden;
}
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #1f2937;
  color: #f3f4f6;
}
</style>