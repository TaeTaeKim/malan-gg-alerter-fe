<script setup>
const props = defineProps({
  isOpen: Boolean
})
const emit = defineEmits(['close'])

function onOverlayClick(e) {
  // Only close if the overlay itself is clicked, not the modal
  if (e.target.classList.contains('support-modal-overlay')) {
    emit('close')
  }
}
</script>

<template>
  <div v-if="isOpen" class="support-modal-overlay" @click="onOverlayClick">
    <div class="support-modal">
      <img src="/support-qr.jpg" alt="support-qr" class="support-qr-img">
      <div class="support-msg">
        <h2>소중한 후원 감사합니다</h2>
        <p>이 사이트는 후원으로 유지됩니다.<br>후원 내역은 디스코드 <b>[후원 채널]</b>에 올라갑니다 <br>메랜 후원도 감사합니다 >><b>등촌유랑단</b></p>
        <h4>토스뱅크 1000-2831-3830 [ㄱㅌㅇ]</h4>
      </div>
    </div>
  </div>
</template>

<style scoped>
.support-modal-overlay {
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

.support-modal {
  width: 300px;
  padding: 20px;
  display: flex;
  background: #404552;
  box-shadow: black 0 0 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 13px;
  z-index: 100;
}

@media (max-width: 760px) {
  .support-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 340px;
    min-width: 0;
    padding: 12px 6px;
  }
}

.support-msg {
  text-align: center;
}

.support-msg>p {
  color: lightgray;
}

.support-msg>h4 {
  color: #f57234;
  margin-bottom: 0px;
}

.support-qr-img {
  height: 130px;
}
</style>