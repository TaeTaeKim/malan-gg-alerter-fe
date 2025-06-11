<script setup>
import MultiRangeSlider from "@/components/MultiRangeSlider.vue";
import VueToggles from "vue-toggles"
import {useUserStore} from "@/store/user.js";
import {onMounted} from "vue";

const userStore = useUserStore();
defineProps({
  isOpen: Boolean,
})
onMounted(() =>{
  userStore.getCurrentUserInfo();
})

function toggleUserAlarm(){
  userStore.toggleCurrentUserAlarm()
}

function updateTime(min, max) {
  userStore.updateUserAlarmTime(min, max)
}
</script>

<template>
  <div v-if="isOpen" class="modal-overlay">

    <!--      전체 알람 설정-->
    <div >
      <div class="global-alarm-container">
        <div class="global-alarm-title">
          <img src="@/assets/alarm-on.png" alt="global-alarm" class="global-alarm-icon">
          <span>전체 알람 설정</span>
        </div>
        <div>
          <!--        https://www.npmjs.com/package/vue-toggles-->
          <VueToggles
              :width="50"
              :height="22"
              checkedBg="#FF6239"
              @click="toggleUserAlarm"
              :value="userStore.currentUser.isAlarm"
          />
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
      <MultiRangeSlider
          :user="userStore.currentUser"
          @update="updateTime"
      />
    </div>

    <!-- Add your alarm settings here -->
  </div>
</template>

<style scoped>
.modal-overlay {
  top: 58px;
  border-radius: 10px;
  left: -100px;
  padding: 10px;
  border: 1px solid #484B56;
  box-shadow: black 0 0 10px;
  width: 330px;
  height: 300px;
  background: #2C3039;
  display: grid;
  position: absolute;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.global-alarm-container {
  display: flex;
  width: 300px;
  justify-content: space-between;
  align-items: center;
}
.global-alarm-clock-container{
  width: 300px;
  padding-top: 20px;
  border-top: 1px solid #484B56;
}
.global-desc{
  font-size: 14px;
  color: darkgray;
}

.global-alarm-title, .global-alarm-clock {
  display: flex;
  align-items: center;
}

.global-alarm-title > span, .global-alarm-clock > span {
  font-weight: bolder;
  font-size: 18px;
}


.global-alarm-icon, .global-alarm-clock-icon {
  height: 25px;
  margin-right: 5px;
}

h2 {
  margin-bottom: 20px;
  color: white;
}
</style>