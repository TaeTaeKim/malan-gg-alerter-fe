<template>
  <div class="item-list">
    <ItemCard
      v-for="item in items"
      :key="item.id"
      :item="item"
      @toggleAlarm="store.toggleAlarm(item.id)"
      @delete = "store.deleteItem(item.id)"
    />
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useMainStore } from '@/store'
import ItemCard from './ItemCard.vue'
const store = useMainStore()
const items = computed(() => store.registeredItems)
</script>

<style scoped>
.item-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 한 행에 4개 고정 */
  gap: 20px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  justify-items: center; /* 카드 가운데 정렬 */
}
</style>