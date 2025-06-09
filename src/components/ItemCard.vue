<template>
  <div class="item-card">
    <!--    아이템 이미지, 이름, 설정가격, 알림여부를 결정하는 화면-->
    <div class="item-card-info">
      <img :src="item.imageUrl" alt="" class="item-img"/>
      <div class="item-card-name-price">
        <div class="item-card-name">
          <a :href="`https://mapleland.gg/item/${ item.itemId }`" class="malan-gg-link" target="_blank"
             rel="noopener noreferrer">
            <span>{{ item.koreanName }}</span>
            <img src="https://mapleland.gg/logo.png" alt="메랜지지로고" class="malan-gg-logo">
          </a>
        </div>
        <div class="item-card-price">
          <img src="/static/meso.png" alt="meso" width="12" height="15" class="inline-block mr-03"></img>
          {{ item.option.price?.toLocaleString() || 0 }} 메소
        </div>
      </div>
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
    </div>
    <div class="options-container">
      <!-- Other options grid -->
      <div class="options-grid">
        <div v-for="opt in otherOptions" :key="opt.key" class="option-cell">
          <div class="option-label">
            {{ opt.label }}
          </div>
          <div class="option-value">
            {{ item.option[opt.key] }}
          </div>
        </div>
      </div>
    </div>
    <div class="edit-delete-btn">
      <button class="item-btn edit-btn" @click="$emit('edit')">편집하기</button>
      <button class="item-btn delete-btn" @click="$emit('delete')">지우기</button>
    </div>
  </div>
</template>
<script setup>
import {itemOptions} from '@/constants/itemOptions'

const props = defineProps({
  item: Object
})
const otherOptions = itemOptions
    .filter(opt => opt.key !== 'price')
    .map(opt => ({
      ...opt,
      label: opt.label.length > 2 ? opt.label.substring(0, 2) : opt.label
    }))
</script>

<style scoped>
.item-card {
  border: 1px solid #484B56;
  border-radius: 12px;
  padding: 10px;
  background: #343741;
  --tw-bg-opacity: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  transition: box-shadow 0.2s;
  height: 245px;
  width: 100%;
  min-width: 200px;
  box-sizing: border-box;
  line-height: 0.5;
}

.item-card-info {
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding-bottom: 20px;
  border-bottom: 1px solid #484B56;
}

.item-img {
  height: 42px;
  width: 42px;
  margin-right: 1vw;
}

.malan-gg-logo {
  height: 20px;
  padding-left: 4px;
}

.malan-gg-link {
  color: white;
}

.item-card-name-price {
  display: grid;
  align-items: center;
  width: 70%;
  height: 100%;
}

.item-card-name {
  font-weight: bolder;
  font-size: 20px;
  padding-bottom: 10px;
  height: 20px;
}

.item-card-price {
  display: flex;
  justify-content: start;
  align-items: center;
}

.options-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

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
  display: flex;
  align-items: center;
  justify-content: center;
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

.toggle-container.active {
  background: #FF6239;
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

.toggle-container:not(.active) .icon-sound-off {
  opacity: 1;
}

.options-container {
  height: 50%;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 3px;
}

.option-cell {
  display: flex;
  font-size: 0.9em;
  height: 2vh;
}

.option-label {
  color: #8C8FA3;
  width: 28px;
  margin-right: 10px;
}

.option-value {
  color: white;
  font-weight: bold;
}
.edit-delete-btn{
  display: flex;
  justify-content: center;
  gap: 10px;
}

.item-btn {
  width: 50%;
  border: 1px solid #484B56;
  padding: 0.1em 0.4em;
  background: none;
  height: 30px;
}
</style>