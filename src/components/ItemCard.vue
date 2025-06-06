<template>
  <div class="item-card">
    <div class="thumb">
      <img :src="item.imageUrl" alt="" class="item-img"/>
      <button class="item-btn alarm-btn" @click="$emit('toggleAlarm')">
        <span v-if="item.alarmOn">🔔</span>
        <span v-else>🔕</span>
      </button>
      <button class="item-btn delete-btn" @click="$emit('delete')">
        🗑️
      </button>
      <!-- 수정버튼 : 클릭시 option value를 변경할 수 있도록 함 -->
      <button class="item-btn edit-btn" @click="$emit('edit')">✏️</button>
    </div>
    <div class="item-name">
      <div>
        <a :href="`https://mapleland.gg/item/${ item.itemId }`" target="_blank" rel="noopener noreferrer">
          {{ item.koreanName }}
        </a>
      </div>
    </div>
    <div class="options-container">
      <!-- Price row -->
      <div class="price-row">
        <img src="/static/meso.png" alt="meso" width="12" height="15" class="inline-block mt-03 mr-03"></img>
        {{ item.option.price?.toLocaleString() || 0 }} 메소
      </div>
      <!-- Other options grid -->
      <div class="options-grid">
        <div v-for="opt in otherOptions" :key="opt.key" class="option-cell">
          <p>{{ opt.label }}: {{ item.option[opt.key] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { itemOptions } from '@/constants/itemOptions'
const props = defineProps({
  item: Object
})
const otherOptions = itemOptions.filter(opt => opt.key !== 'price')

</script>

<style scoped>
.item-card {
  border: 1.5px solid #d1d5db;
  border-radius: 12px;
  padding: 10px;
  background: rgb(71 71 111 / var(--tw-bg-opacity, 1));
  --tw-bg-opacity: 1;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  transition: box-shadow 0.2s;
  width: 100%;
  min-width: 200px;
  box-sizing: border-box;
  line-height: 0.5;
}
.item-name{
  margin-top: 5px;
  min-height: 40px;
  /* middle of height */
  display: flex;
  font-size: 1.2em;
  align-items: center;

}
.options-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

.price-row {
  display: flex;
  align-items: center;
  padding: 5px 0;
  border-bottom: 1px solid #374151;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
}

.option-cell {
  font-size: 0.9em;
  height: 2vh;
}
.item-img{
  margin-right: 1vw;
}
.item-btn{
  padding: 0.1em 0.4em;
  background: none;
  font-size: 1.3em;
}
</style>