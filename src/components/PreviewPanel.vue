<template>
  <div v-if="imageUrl" class="preview-panel">
    <img :src="imageUrl" alt="preview" class="preview-img"/>
    <OptionSelector @submit="addItem" />
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useMainStore } from '@/store'
import OptionSelector from './OptionSelector.vue'

const store = useMainStore()
const imageUrl = computed(() => store.currentItem?.iconUrl)

function addItem(optionData) {
  store.registerItem(store.currentItem.id, optionData)
}
</script>