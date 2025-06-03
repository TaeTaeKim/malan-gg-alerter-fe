<template>
  <Transition name="notification">
    <div v-if="notification.show" class="notification" :class="notification.type">
      {{ notification.message }}
    </div>
  </Transition>
</template>

<script setup>
import { useNotificationStore } from '@/store/noti'
import { storeToRefs } from 'pinia'

const store = useNotificationStore()
const { notification } = storeToRefs(store)
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  border-radius: 4px;
  z-index: 9999;
  background: #f44336;
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}
</style>