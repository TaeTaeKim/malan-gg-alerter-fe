<template>
  <div class="preview-panel" v-if="store.currentItem">
    <div class="preview-item-name">
      <span>{{ store.currentItem.name }}</span>
      <a :href="`https://mapleland.gg/item/${store.currentItem.id}`" target="_blank" rel="noopener noreferrer"
        class="preview-item-link">
        <span>메랜지지 바로가기</span>
      </a>
      <img src="/link.png" alt="link icon" class="preview-link-icon" />
    </div>
    <div class="preview-item-info">
      <div class="preview-left">
        <div class="image-container">
          <img :src="imageUrl" alt="preview" class="preview-img" />
        </div>
      </div>
      <div class="preview-right">
        <OptionSelector @submit="addItem" @back="clearCurrentItem" />
      </div>
    </div>
  </div>
  <div class="preview-panel-msg" v-else>
    <img src="/static/preview-img.png" alt="">
    <div class="preview-msg-text">
      거래하고 싶은 아이템 옵션과 가격을 등록하고<br>디스코드 알림으로 빠르게 거래해보세요!
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useMainStore } from '@/store'
import OptionSelector from './OptionSelector.vue'

const store = useMainStore()
const imageUrl = computed(() => store.currentItem?.iconUrl)


async function addItem(optionData) {
  await store.registerItem(store.currentItem.id, optionData)
  clearCurrentItem()
}

function clearCurrentItem() {
  store.currentItem = null
}
</script>

<style scoped>
.preview-panel {
  margin-top: 20px;
  padding: 20px 20px 26px 30px;
  border: 1px solid #484B56;
  border-radius: 8px;
  background-color: #404552;
  height: 310px;
  /* Fixed height instead of max-height */
  overflow-y: auto;
}

.preview-panel-msg {
  margin-top: 20px;
  padding: 20px 20px 26px 30px;
  border-radius: 8px;
  background: #1D1E23;
  height: 310px;
  /* Fixed height instead of max-height */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.preview-panel-msg>img {
  height: 70px;
}

.preview-msg-text {
  color: #888fa1;
  font-size: 20px;
}

/* 등록 뷰 상단 이름과 메랜지지 링크*/
.preview-item-name {
  display: flex;
  justify-content: start;
  align-items: center;
}

.preview-item-name>span {
  font-weight: bolder;
  font-size: 20px;
}

.preview-item-link {
  margin: 0 10px 0 10px;
  font-size: 16px;
  color: #B0B5C3;
}

.preview-link-icon {
  width: 16px;
  height: 16px;
}

.preview-item-info {
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

@media(max-width:760px) {
  .preview-panel {
    height: auto !important;
    overflow-y: visible !important;
  }

  .preview-panel-msg {
    height: auto !important;
    overflow-y: visible !important;
  }

  .preview-panel-msg>img {
    height: 5vh;
  }

  .preview-msg-text {
    font-size: .75rem;
  }

  .preview-item-info {
    height: auto !important;
  }
}

@media (max-width: 760px) {
  .preview-item-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .preview-left,
  .preview-right {
    width: 100%;
    max-width: 100%;
    padding: 0;
  }

  .image-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  .preview-img {
    width: 15vw;
    max-width: 320px;
    height: auto;
  }

  .preview-item-name {
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
  }

  .preview-item-name>span {
    font-size: 1rem;
  }

  .preview-item-name>a {
    font-size: 0.8rem;
  }

  .preview-right {
    margin-top: 0;
  }
}
</style>