<template>
  <div class="container">
    <header class="app-header">
      <div class="logo-title">
        <img src="@/assets/logo.png" alt="Logo" class="logo-image">
        <h1>매랜지지 알리미</h1>
      </div>
      <div class="header-actions">
        <div class="global-alarm-setting">
          <button @click="toggleAlarmSetting" class="global-alarm-btn">
            <img src="@/assets/alarm.png">
            <span>알람 시간 설정</span>
          </button>
          <GlobalAlarmSettingsModal
              :is-open="isAlarmSettingsOpen"
          />

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
import {onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import {useMainStore} from '@/store/index'
import {useAuthStore} from '@/store/auth'
import PreviewPanel from '@/components/PreviewPanel.vue'
import RegisteredItemList from '@/components/RegisteredItemList.vue'
import SearchBar from "@/components/SearchBar.vue";
import GlobalAlarmSettingsModal from "@/components/GlobalAlarmSettingsModal.vue";

const router = useRouter()
const store = useMainStore()
const auth = useAuthStore()

onMounted(async () => {
  if (!auth.isAuthenticated) {
    router.push('/login')
    return
  }
  await store.fetchRegisteredItems()
})
const handleLogout = async () => {
  await auth.logout()
  router.push('/login')
}

const isAlarmSettingsOpen = ref(false)

const toggleAlarmSetting = () => {
  if(isAlarmSettingsOpen.value) {
    isAlarmSettingsOpen.value=false
  }else {
    isAlarmSettingsOpen.value=true
  }
}
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
  gap: 15px;
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
  gap: 16px;
}

.logo-title{
  display: flex;
  align-items: center;
  height: 100%;
  gap: 12px;
}

.logo-image{
  height: 60px;
  width: auto;
}
.global-alarm-setting{
  position: relative;
}
.global-alarm-btn,
.logout-btn{
  height: 48px;
  border-radius: 4px;
  border: none;
  padding: 8px 16px;
  color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 20px;
}
.global-alarm-btn {
  display: flex;
  justify-content: space-between;
  gap: 5px;
  align-items: center;
  background-color: #f57234;
}

.global-alarm-btn:hover {
  background-color: #e0662d;
}

.logout-btn {
  background-color: #dc2626;
}

.logout-btn:hover {
  background-color: #b91c1c;
}

.main-content {
  display: grid;

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

</style>