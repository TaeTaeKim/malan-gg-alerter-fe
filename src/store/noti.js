import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notification: {
      show: false,
      message: '',
      type: 'error',
      timeout: null
    }
  }),
  actions: {
    showNotification(message, type = 'error', duration = 3000) {
      if (this.notification.timeout) {
        clearTimeout(this.notification.timeout)
      }
      
      this.notification.show = true
      this.notification.message = message
      this.notification.type = type
      
      this.notification.timeout = setTimeout(() => {
        this.notification.show = false
      }, duration)
    }
  }
})