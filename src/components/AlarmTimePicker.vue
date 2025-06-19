<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['update'])
const props = defineProps(
  {
    user: {
      type: Object,
      required: true
    }
  }
)

const startTime = ref('00:00')
const endTime = ref('23:59')

function minutesToTime(minutes) {
  const h = String(Math.floor(minutes / 60)).padStart(2, '0')
  const m = String(minutes % 60).padStart(2, '0')
  return `${h}:${m}`
}

watch(
    () => props.user,
    (user) => {
      if (user?.minAlarmTime != null) {
        startTime.value = minutesToTime(Number(user.minAlarmTime))
      }
      if (user?.maxAlarmTime != null) {
        endTime.value = minutesToTime(Number(user.maxAlarmTime))
      }
    },
    { immediate: true }
)


function timeToMinutes(time) {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

function emitUpdate() {
  emit('update', {
    minTime: timeToMinutes(startTime.value),
    maxTime: timeToMinutes(endTime.value)
  })
}

watch([startTime, endTime], emitUpdate)
</script>

<template>
  <div class="time-picker mt-03">
    <label>
      알람 시작
      <input type="time" v-model="startTime" step="900" />
    </label>
    <label>
      알람 종료
      <input type="time" v-model="endTime" step="900" />
    </label>
  </div>
</template>

<style scoped>
.time-picker {
  display: flex;
  justify-content: space-between;
  gap: 5px;
  color: white;
}
.time-picker label {
  width: 45%;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-weight: bold;
  color: #FF6239;
  font-size: 16px;
}

.time-picker input[type="time"] {
  padding: 4px;
  height: 30px;
  border-radius: 6px;
  font-size: 16px;
  border: 1px solid #484B56;
  background: #343741;
}
</style>