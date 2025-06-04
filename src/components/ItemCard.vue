<template>
  <div class="item-card">
    <div class="thumb">
      <img :src="item.imageUrl" alt="" />
      <button class="alarm-btn" @click="$emit('toggleAlarm')">
        <span v-if="item.alarmOn">🔔</span>
        <span v-else>🔕</span>
      </button>
      <button class="delete-btn" @click="$emit('delete')">
        🗑️
      </button>
    </div>
    <div class="item-name">
      <div>
        <a :href="`https://mapleland.gg/item/${ item.itemId }`" target="_blank" rel="noopener noreferrer">
          {{ item.koreanName }}
        </a>
      </div>
      <!-- 수정버튼 : 클릭시 option value를 변경할 수 있도록 함 -->
      <button class="edit-btn" @click="$emit('edit')">✏️</button>
    </div>
    <div class="options-grid">
      <div v-for="opt in itemOptions" :key="opt.key" class="option-cell">
        <p>{{ opt.label }}: {{ item.option[opt.key] }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { itemOptions } from '@/constants/itemOptions'
const props = defineProps({
  item: Object
})
</script>

<style scoped>
.item-card {
  border: 1.5px solid #d1d5db;
  border-radius: 12px;
  padding: 10px;
  background: #374151;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  transition: box-shadow 0.2s;
  width: 100%;
  max-width: 220px; /* 카드 최대 너비 제한 */
  min-width: 200px;
  box-sizing: border-box;
  line-height: 0.5;
}
.item-name{
  margin: 5px;
  min-height: 40px;
  /* middle of height */
  display: flex;
  align-items: center;

}
.item-card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  --option-color: #2563eb; /* 예시: hover 시 파란색 */
}
.options-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 12px;
}
.edit-btn{
  padding: 0.1em 0.4em;
  margin-left: 0.2em;
  background: none;

}
</style>