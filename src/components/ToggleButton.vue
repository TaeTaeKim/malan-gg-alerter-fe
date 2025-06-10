<template>
  <div class="item-card-alarm">
    <div>
      <img src="@/assets/question-mark.png" class="item-card-alarm-info" alt="">
    </div>
    <div class="item-card-alarm-btn">
      <div
          class="toggle-container"
          :class="{ active: item.alarmOn }"
          @click="$emit('toggleAlarm')"
      >
        <!-- Sound On Icon (left side) -->
        <img
            class="icon-sound-on"
            src="@/assets/soundon.png"
            alt="Sound On"
        />

        <!-- Sound Off Icon (right side) -->
        <img
            class="icon-sound-off"
            src="@/assets/soundoff.png"
            alt="Sound Off"
        />

        <!-- Moving button -->
        <div class="toggle-button"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ToggleButton'
}
</script>
<style scoped>

.item-card-alarm {
  display: flex;
  align-items: start;
}

.item-card-alarm-info {
  padding-top: 5px;
  padding-right: 2px;
  height: 20px;
}

/* Toggle Switch */
.item-card-alarm-btn {
  background: #343A4B;
  transition: background-color 0.3s ease;
}

.toggle-container {
  position: relative;
  width: 60px;
  height: 30px;
  background: #ccc;
  border-radius: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding: 0;
}

.toggle-button {
  position: absolute;
  top: 5px;
  left: 4px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.toggle-container.active .toggle-button {
  transform: translateX(32px);
}

.icon-sound-off, .icon-sound-on {
  position: absolute;
  top: 48%;
  transform: translateY(-50%);
  width: 17px;
  height: 17px;
  opacity: 0.6;
  z-index: 1;
}

.icon-sound-on {
  left: 6px;
}

.icon-sound-off {
  right: 6px;
}

.toggle-container.active .icon-sound-on {
  opacity: 1;
}

</style>