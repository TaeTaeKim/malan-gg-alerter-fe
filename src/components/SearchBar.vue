<template>
  <div class="search-container">
    <div class="search-bar">
      <input
          type="text"
          :value=query
          @input="onInput"
          @compositionStart="onCompositionStart"
          @compositionEnd="onCompositionEnd"
          @keyup.enter="onSearch"
      />
      <button @click="onSearch">검색</button>
    </div>
    <div class="dropdown" v-if="candidates.length">
      <div v-for="item in candidates" :key="item.id" @click="onClick(item)" class="dropdown-item">
        <img :src="getItemIcon(item.id)" alt="item icon" class="candidate-icon">
        {{item.nameKorean}}
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref} from 'vue'
import {useMainStore} from '@/store'

const query = ref('')
const isComposing = ref(false)
const store = useMainStore()
const candidates = ref([])
function onCompositionStart(){
  isComposing.value = true
}

function onCompositionEnd(e) {
  isComposing.value = false
  query.value = e.target.value
  candidates.value = store.searchItemCandidates(query.value)
}

function onInput(e){
  const val = e.target.value
  query.value = val
  if(!isComposing.value){
    candidates.value = store.searchItemCandidates(query.value)
  }
}

function onSearch() {
  store.fetchItem(query.value)
}

// 검색 후보 중 클릭시 검색어를 해당 후보의 이름으로 변경
function onClick(item) {
  query.value = item.nameKorean
  candidates.value = []
}

function getItemIcon(itemId) {
  return store.getItemIconUrl(itemId)
}
</script>


<style scoped>
.search-container {
  position: relative;
  width: 100%;
}

.search-bar {
  display: flex;
  gap: 8px;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #2d2d3d;
  border: 1px solid #374151;
  border-radius: 0 0 8px 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
}

.dropdown-item {
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dropdown-item:hover {
  background: #374151;
}

.candidate-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}
</style>