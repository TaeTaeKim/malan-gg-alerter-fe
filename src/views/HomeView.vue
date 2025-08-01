<template>
  <transition name="fade">
    <div v-if="showAlarmNotice" class="alarm-notice-window" style="background-color:#b91c1c; color:white;">
      알람 비활성화 : {{ alarmNoticeMessage }}
      <button class="alarm-noti-disable" @click="alarmNoticeClosed = true">×</button>
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
          <SupportModal :is-open="isSupportOpen" @close="isSupportOpen = false" />
        </div>
        <div class="global-alarm-setting">
          <button @click="toggleAlarmSetting" class="global-alarm-btn">
            <img src="@/assets/alarm-on.png" alt="alarm-on">
            <span>알람 시간 설정</span>
          </button>
          <GlobalAlarmSettingsModal :is-open="isAlarmSettingsOpen" @close="isAlarmSettingsOpen = false" />
        </div>
        <button @click="goToTimer" class="timer-btn">메랜 사냥 타이머</button>
        <button @click="handleLogout" class="logout-btn">로그아웃</button>
      </div>
    </header>

    <div class="main-content">
      <div class="search-section">
        <SearchBar />
        <PreviewPanel />
      </div>
      <div class="items-section">
        <div class="list-header">
          <div class="trade-type-selector">
            <button @click="tradeType = 'buy'" :class="{ active: tradeType === 'buy' }">
              사고싶은 아이템 <span class="item-count">{{ buyItemsCount }}</span>
            </button>
            <button @click="tradeType = 'sell'" :class="{ active: tradeType === 'sell' }">
              팔고싶은 아이템 <span class="item-count">{{ sellItemsCount }}</span>
            </button>
          </div>
        </div>
        <RegisteredItemList :trade-type="tradeType" />
      </div>
    </div>
  </div>
  <footer class="app-footer">
    <div>
      <a href="https://open.kakao.com/o/s4fVKDFh" target="_blank" rel="noopener noreferrer" class="openchat-link">
        💬 카카오톡 문의
      </a>
    </div>
    <div class="copyright">
      &copy; 2025 메랜지지 알리미. All rights reserved.
    </div>
  </footer>
</template>

<script setup>
import {computed, onMounted, onUnmounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/store/auth'
import PreviewPanel from '@/components/PreviewPanel.vue'
import RegisteredItemList from '@/components/RegisteredItemList.vue'
import SearchBar from "@/components/SearchBar.vue";
import GlobalAlarmSettingsModal from "@/components/GlobalAlarmSettingsModal.vue";
import SupportModal from "@/components/SupportModal.vue";
import {useUserStore} from '@/store/user'
import {useMainStore} from '@/store'

const router = useRouter()
const userStore = useUserStore()
const auth = useAuthStore()
const mainStore = useMainStore()

const buyItemsCount = computed(() => mainStore.registeredItems.filter(item => item.tradeType === 'SELL').length);
const sellItemsCount = computed(() => mainStore.registeredItems.filter(item => item.tradeType === 'BUY').length);

const tradeType = ref('buy');

onMounted(async () => {
  if (!auth.isAuthenticated) {
    router.push('/login')
  } else {
    await mainStore.fetchRegisteredItems()
    await userStore.getCurrentUserInfo();
    mainStore.startBidPolling();
  }
})

onUnmounted(() => {
    mainStore.stopBidPolling();
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

const toggleSupport = () => {
  isSupportOpen.value = !isSupportOpen.value;
}
// 알람 꺼짐 경고 모달
const isUserLoaded = computed(() => !!userStore.currentUser)
const isAlarmEnabled = computed(() => userStore.currentUser?.isAlarm ?? false)
const isAlarmTime = computed(() => userStore.currentUser?.isAlarmTime ?? false)
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
function goToTimer() {
  window.open('https://malanutil.com/malan-timer', '_blank');
}
</script>

<style scoped>
.container {
  width: min(90%, 980px);
  /* More responsive width */
  margin: 0 auto;
  padding: 20px;
}

.main-content {
  max-width: 100%;
  /* Ensure content doesn't overflow */
  min-height: calc(100vh - 60px - 40px);
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

.logo-title {
  display: flex;
  align-items: center;
  height: 100%;
  gap: 6px;
}

.logo-image {
  height: 56px;
  width: auto;
}

.support-container {
  position: relative;
  border-radius: 8px;
}

.timer-btn {
  padding: 3px 12px 3px 12px;
  color: white;
  background: #1D1E23;
  font-weight: bolder;
  font-size: 18px;
  height: 48px;
  border: 1px solid #b9bcbd;
}

.support-btn {
  padding: 3px 12px 3px 12px;
  color: white;
  background: #1D1E23;
  font-weight: bolder;
  font-size: 18px;
  height: 48px;
  border: 1px solid #b9bcbd;
}

.global-alarm-setting {
  position: relative;
}

.global-alarm-btn,
.logout-btn {
  height: 48px;
  border-radius: 8px;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 18px;
}

.logout-btn {
  padding: 1px 10px 1px 10px;
  background: #1D1E23;
}

.global-alarm-btn>img {
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

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.trade-type-selector {
  display: flex;
  gap: 10px;
}

.trade-type-selector button {
  padding: 8px 16px;
  border-radius: 0;
  border: none;
  cursor: pointer;
  background: #1D1E23;
  font-weight: bold;
  font-size: 18px;
  color: white;
  transition: background-color 0.3s, border-color 0.3s;
}

.trade-type-selector button.active {
  border-bottom: 3px solid #c83131;
}

.trade-type-selector button:last-child.active {
  border-bottom: 3px solid #3172c8;
}

.item-count {
  margin-left: 4px;
  padding: 2px 6px;
  border-radius: 4px;
  color: white;
  font-size: 18px;
}
.search-section {
  height: auto;
  margin-bottom: 40px;
}

/* 알람 꺼짐 경고 모달 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.alarm-notice-window {
  position: fixed;
  top: 26px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 18px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 2000;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.alarm-noti-disable {
  font-size: 25px;
  border: none;
  background: none;
  margin-left: auto;
}

/* footer */
.app-footer {
  margin-top: 40px;
  padding: 20px 0 10px 0;
  text-align: center;
  color: #888;
  font-size: 15px;
  background: none;
}

.openchat-link {
  color: #888;
  text-decoration: none;
  font-size: 13px;
  font-weight: bolder;
  margin-bottom: 8px;
  display: inline-block;
}

.openchat-link:hover {
  text-decoration: underline;
}

.copyright {
  margin-top: 6px;
  font-size: 13px;
}

@media (max-width: 760px) {
  .container {
    width: 92%;
    padding: 0 4% 0 4%;
    margin: 0;
  }

  .app-header {
    flex-direction: column;
    align-items: flex-start;
    height: auto;
    padding: 8px 0;
    gap: 5px;
    margin-bottom: 5px;
  }

  .logo-title {
    gap: 3px;
  }

  .logo-image {
    height: 36px;
    max-width: 90px;
  }

  .logo-title h1 {
    font-size: 1.1em;
  }

  .header-actions {
    width: 100%;
    justify-content: space-between;
    gap: 4px;
  }

  .support-btn,
  .timer-btn,
  .global-alarm-btn,
  .logout-btn {
    height: 30px;
    font-size: 0.7rem;
    padding: 2px 8px;
  }
  .trade-type-selector button{
    font-size: 1.2rem;
    padding: 4px 8px;
  }

  .global-alarm-btn>img {
    height: 18px;
  }

  .search-section {
    margin-top: 16px;
    height: auto;
  }

  .items-section>h2 {
    font-size: 1.2rem;
  }

  .alarm-notice-window {
    width: 80vw;
    min-width: unset;
    max-width: 95vw;
    font-size: 1em;
    padding: 10px 8px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .alarm-noti-disable {
    font-size: 22px;
    margin-left: auto;
  }
}
</style>