<template>
  <div class="preview-panel" v-if="store.currentItem">
    <div class="preview-item-name">
      <span>{{store.currentItem.name}}</span>
      <a :href="`https://mapleland.gg/item/${store.currentItem.id}`" target="_blank" rel="noopener noreferrer" class="preview-item-link">
        <span>메랜지지 바로가기</span>
      </a>
      <img src="@/assets/link.png" alt="link icon" class="preview-link-icon"/>
    </div>
    <div class="preview-item-info">
      <div class="preview-left">
        <div class="image-container">
          <img :src="imageUrl" alt="preview" class="preview-img"/>
        </div>
      </div>
      <div class="preview-right">
        <OptionSelector @submit="addItem" @back="clearCurrentItem"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue'
import {useMainStore} from '@/store'
import OptionSelector from './OptionSelector.vue'

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
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #484B56;
  border-radius: 8px;
  background-color: #343741;
  height: 300px; /* Fixed height instead of max-height */
  overflow-y: auto;
}
/* 등록 뷰 상단 이름과 메랜지지 링크*/
.preview-item-name{
  display: flex;
  justify-content: start;
  align-items: center;
}
.preview-item-name > span{
  font-weight: bolder;
  font-size: 20px;
}
.preview-item-link{
  margin: 0 10px 0 10px;
  font-size: 16px;
  color: #B0B5C3;
}

.preview-link-icon{
  width: 16px;
  height: 16px;
}
.preview-item-info{
  display: flex;
  justify-content: start;
  height: 270px;
  gap: 20px;
}
/* 등록 뷰 이미지*/
.preview-left {
  display: flex;
  align-items: center;
  padding-right: 20px;
}

.preview-img {
  width: 80px;
  height: 80px;
}

.preview-right {
  flex: 1;
}

/* Adjust SearchBar width inside placeholder */
.preview-search-placeholder :deep(.search-bar) {
  width: 80%;
  max-width: 400px;
}
</style>