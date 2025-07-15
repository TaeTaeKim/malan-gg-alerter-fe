<script setup>
import VueToggles from "vue-toggles"
import { useUserStore } from "@/store/user.js";
import { onMounted, computed } from "vue";
import AlarmTimePicker from "@/components/AlarmTimePicker.vue";

const userStore = useUserStore();
const props = defineProps({
  isOpen: Boolean,
})
const emit = defineEmits(['close'])

const isAlarmEnabled = computed(() => {
  return userStore.currentUser?.isAlarm ?? false
})

function toggleUserAlarm() {
  userStore.toggleCurrentUserAlarm()
}

function updateTime(updateTime) {
  userStore.updateUserAlarmTime(updateTime.minTime, updateTime.maxTime)
}

function onOverlayClick(e) {
  if (e.target.classList.contains('modal-overlay')) {
    emit('close')
  }
}
</script>

<template>
  <div v-if="isOpen" class="modal-overlay" @click="onOverlayClick">
    <div class="modal-content">
      <!--      전체 알람 설정-->
      <div>
        <div class="global-alarm-container">
          <div class="global-alarm-title">
            <img src="@/assets/alarm-on.png" alt="global-alarm" class="global-alarm-icon">
            <span>전체 알람 설정</span>
          </div>
          <div>
            <!--        https://www.npmjs.com/package/vue-toggles-->
            <VueToggles :width="50" :height="22" checkedBg="#FF6239" @click="toggleUserAlarm" :value="isAlarmEnabled" />
          </div>
        </div>
        <div>
          <span class="global-desc">전체 아이템 알람 끄기/ 켜기를 진행할 수 있어요</span>
        </div>
      </div>
      <!--      알람 시간 설정-->
      <div class="global-alarm-clock-container width100">
        <div class="global-alarm-clock">
          <img src="@/assets/clock.png" alt="clock" class="global-alarm-clock-icon">
          <span>알람시간 설정</span>
        </div>
        <div class="global-desc">
          알람 받고 싶은 시간을 설정할 수 있어요.
        </div>
        <AlarmTimePicker :user="userStore.currentUser" @update="updateTime" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  width: 330px;
  height: 300px;
  background: #404552;
  border-radius: 13px;
  box-shadow: black 0 0 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  z-index: 100;
}

.global-alarm-container {
  display: flex;
  width: 300px;
  justify-content: space-between;
  align-items: center;
}

.global-alarm-clock-container {
  width: 300px;
  padding-top: 20px;
  border-top: 1px solid #484B56;
}

.global-desc {
  font-size: 14px;
  color: darkgray;
}

.global-alarm-title,
.global-alarm-clock {
  display: flex;
  align-items: center;
}

.global-alarm-title>span,
.global-alarm-clock>span {
  font-weight: bolder;
  font-size: 18px;
}

.global-alarm-icon,
.global-alarm-clock-icon {
  height: 25px;
  margin-right: 5px;
}

h2 {
  margin-bottom: 20px;
  color: white;
}

@media (max-width: 760px) {
  .modal-content {
    width: 90vw;
    max-width: 340px;
    min-width: 0;
    height: auto;
    padding: 12px 6px;
  }

  .global-alarm-container,
  .global-alarm-clock-container {
    width: 300px;
    min-width: 0;
    max-width: 100%;
  }
}
</style>