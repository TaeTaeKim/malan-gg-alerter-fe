<template>
  <transition name="fade">
    <div v-if="showAlarmNotice" class="alarm-notice-window" style="background-color:#b91c1c; color:white;">
      알람 비활성화 :  {{ alarmNoticeMessage }}
      <button class="alarm-noti-disable" @click="alarmNoticeClosed=true">×</button>
    </div>
  </transition>
  <div class="container">
    <header class="app-header">
      <div class="logo-title">
        <img src="@/assets/logo.png" alt="Logo" class="logo-image">
        <h1>메랜지지 알리미</h1>
      </div>
      <div class="header-actions">
        <div class="support-container">
          <button class="support-btn" @click="toggleSupport">💸 후원하기</button>
          <SupportModal :is-open="isSupportOpen"/>
        </div>
        <div class="global-alarm-setting">
          <button @click="toggleAlarmSetting" class="global-alarm-btn">
            <img src="@/assets/alarm-on.png" alt="alarm-on">
            <span>알람 시간 설정</span>
          </button>
          <GlobalAlarmSettingsModal :is-open="isAlarmSettingsOpen"/>
        </div>
        <button @click="handleLogout" class="logout-btn">로그아웃</button>
      </div>
    </header>

    <div class="main-content">
      <div class="search-section">
        <SearchBar/>
        <PreviewPanel/>
      </div>
      <div class="items-section">
        <h2>등록된 아이템</h2>
        <RegisteredItemList/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/store/auth'
import PreviewPanel from '@/components/PreviewPanel.vue'
import RegisteredItemList from '@/components/RegisteredItemList.vue'
import SearchBar from "@/components/SearchBar.vue";
import GlobalAlarmSettingsModal from "@/components/GlobalAlarmSettingsModal.vue";
import SupportModal from "@/components/SupportModal.vue";
import { useUserStore } from '@/store/user'

const router = useRouter()
const userStore = useUserStore()
const auth = useAuthStore()

onMounted(async () => {
  if (!auth.isAuthenticated) {
    router.push('/login')
  }else{
    userStore.getCurrentUserInfo();
  }
})
const handleLogout = async () => {
  await auth.logout()
  router.push('/login')
}

const isAlarmSettingsOpen = ref(false)
const isSupportOpen = ref(false)

const toggleAlarmSetting = () => {
  isAlarmSettingsOpen.value = !isAlarmSettingsOpen.value;
}

const toggleSupport= () =>{
  isSupportOpen.value = !isSupportOpen.value;
}
// 알람 꺼짐 경고 모달
const isUserLoaded = computed(() => !!userStore.currentUser)
const isAlarmEnabled = computed(() => userStore.currentUser?.isAlarm?? false )
const isAlarmTime = computed(() => userStore.currentUser?.isAlarmTime?? false)
const alarmNoticeClosed = ref(false)

const showAlarmNotice = computed(() => {
  if (alarmNoticeClosed.value) return false
  if (!isUserLoaded.value) return false
  if (!isAlarmEnabled.value) return true
  if (!isAlarmTime.value) return true
  return false
})

const alarmNoticeMessage = computed(() => {
  if (!isAlarmEnabled.value) return "알람이 꺼져있습니다"
  if (!isAlarmTime.value) return "알람시간이 아닙니다"
  return ""
})

</script>

<style scoped>
.container {
  width: min(90%, 980px); /* More responsive width */
  margin: 0 auto;
  padding: 20px;
}

.main-content {
  display: grid;
  align-content: start;
  gap: 40px;
  max-width: 100%; /* Ensure content doesn't overflow */
  min-height: calc(100vh - 60px - 40px);
  overflow-x: hidden; /* Prevent horizontal scroll */
  overflow-y: visible;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  color: white;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-title{
  display: flex;
  align-items: center;
  height: 100%;
  gap: 6px;
}

.logo-image{
  height: 56px;
  width: auto;
}
.support-container{
  position: relative;
  border-radius: 8px;
}
.support-btn{
  padding: 3px 12px 3px 12px;
  color: white;
  background: #1D1E23;
  font-weight: bolder;
  font-size: 18px;
  height: 48px;
  border: 1px solid #b9bcbd;
}
.global-alarm-setting{
  position: relative;
}
.global-alarm-btn,
.logout-btn{
  height: 48px;
  border-radius: 8px;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 18px;
}
.logout-btn{
  padding: 1px 10px 1px 10px;
  background: #1D1E23;
}
.global-alarm-btn > img{
  height: 24px;
}
.global-alarm-btn {
  display: flex;
  padding: 8px 16px 8px 12px;
  justify-content: space-between;
  gap: 5px;
  align-items: center;
  background-color: #f57234;
}

.global-alarm-btn:hover {
  background-color: #e0662d;
}


.logout-btn:hover {
  background-color: #b91c1c;
}

.items-section h2 {
  margin-bottom: 20px;
}

/* Add responsive adjustments for smaller screens */

@media (max-width: 768px) {
  .container {
    width: 95%;
    padding: 10px;
  }

  header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
}

.search-section{
  height: 400px;
}

/* 알람 꺼짐 경고 모달 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.7s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}

.alarm-notice-window {
  position: fixed;
  top: 26px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 18px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 2000;
  font-size: 1.2em;
}
.alarm-noti-disable{
  font-size: 25px;
  border: none;
  background: none;
}

</style>