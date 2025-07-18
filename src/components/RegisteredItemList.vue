<template>
  <div class="item-list">
    <ItemCard v-for="registeredItem in filteredItems" :key="registeredItem.id" :item="registeredItem"
      @toggleAlarm="store.toggleAlarm(registeredItem.id)" @delete="store.deleteItem(registeredItem.id)"
      @update="store.updateItem(registeredItem.id, $event)" />
  </div>
</template>
<script setup>
import { computed, defineProps } from 'vue'
import { useMainStore } from '@/store'
import ItemCard from './ItemCard.vue'

const props = defineProps({
  tradeType: {
    type: String,
    required: true
  }
})

const store = useMainStore()

const filteredItems = computed(() => {
  // When user wants to see their 'buy' list, we show items that are looking for 'SELL' type items from the server.
  // When user wants to see their 'sell' list, we show items that are looking for 'BUY' type items from the server.
  const serverTradeType = props.tradeType === 'buy' ? 'SELL' : 'BUY';
  return store.registeredItems.filter(item => item.tradeType === serverTradeType);
})
</script>

<style scoped>
.item-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 한 행에 4개 고정 */
  gap: 20px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

@media(max-width:760px) {
  .item-list {
    grid-template-columns: repeat(1, 1fr);
    /* 한 행에 4개 고정 */
  }
}
</style>