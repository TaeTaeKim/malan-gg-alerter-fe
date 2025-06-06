<template>
  <div class="preview-panel" v-if="store.currentItem">
    <div class="preview-left">
      <div class="image-container">
        <img :src="imageUrl" alt="preview" class="preview-img"/>
        <a :href="`https://mapleland.gg/item/${store.currentItem.id}`" target="_blank" rel="noopener noreferrer"
           class="gg-link">
          <img src="/static/gg.png" alt="GG link" class="gg-icon"/>
        </a>
      </div>
    </div>
    <div class="preview-right">
      <OptionSelector @submit="addItem" @back="clearCurrentItem"/>
    </div>
  </div>
<!--  current Item 이 없을 때-->
  <div class="preview-panel preview-search-placeholder" v-else>
    <div class="placeholder-content">
      <p>아이템 검색</p>
      <SearchBar/>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue'
import {useMainStore} from '@/store'
import OptionSelector from './OptionSelector.vue'
import SearchBar from "@/components/SearchBar.vue";

const store = useMainStore()
const imageUrl = computed(() => store.currentItem?.iconUrl)


function addItem(optionData) {
  store.registerItem(store.currentItem.id, optionData)
  clearCurrentItem()
  window.location.reload()
}

function clearCurrentItem() {
  store.currentItem = null
}
</script>

<style scoped>
.preview-panel {
  display: flex;
  gap: 20px;
  padding: 20px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: rgb(71 71 111 / var(--tw-bg-opacity, 1));
  height: 25vh; /* Fixed height instead of max-height */
  overflow-y: auto;
}

.preview-search-placeholder {
  color: #9ca3af;
  text-align: center;
  justify-content: center;
  display: flex;
  font-size: 1.1em;
  height: 25vh; /* Same height as non-placeholder */
}

.placeholder-content{
  width: 60%;

}
.placeholder-content > p{
  font-size: 1.3em;

}

.preview-left {
  flex: 0 0 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #d1d5db;
  padding-right: 20px;
}

.preview-img {
  max-width: 100%;
  height: auto;
}

.preview-right {
  flex: 1;
}

.preview-search-placeholder {
  color: #9ca3af;
  text-align: center;
  justify-content: center;
  min-height: 100px;
}

.image-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
}

.gg-icon {
  width: 30px;
  height: 30px;
  object-fit: contain;
  transition: transform 0.2s;
  opacity: 0.8;
}

.gg-link:hover .gg-icon {
  transform: scale(1.1);
  opacity: 1;
}

.placeholder-content p {
  margin: 0;
}

/* Adjust SearchBar width inside placeholder */
.preview-search-placeholder :deep(.search-bar) {
  width: 80%;
  max-width: 400px;
}
</style>