<template>
  <div class="search-container">
    <div class="search-bar">
      <div class="search-input-wrapper">
        <img src="@/assets/search-icon.png" alt="search icon" class="search-icon">
        <span class="search-label">거래 품목</span>
        <span class="search-seperator"> | </span>
        <input
            type="text"
            :value=query
            @input="onInput"
            @compositionStart="onCompositionStart"
            @compositionEnd="onCompositionEnd"
            @keyup.enter="onSearch"
            placeholder="알람 등록하고 싶은 아이템을 검색하세요"
            class="search-input"
        />
        <button @click="onSearch">검색</button>
      </div>
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
  display: flex;
  justify-content: center;
  width: 100%;
}

.search-bar,
.dropdown{
  width: 630px;
}
.search-bar {
  display: flex;
  height: 64px;
  gap: 8px;
}

.search-input-wrapper {
  display: flex;
  align-items: center;

  background: #2d2d3d;
  border-radius: 10px;
  padding: 4px 12px;
  flex: 1;
}
.search-input-wrapper button {
  margin-left: auto;
  background: none;
  font-size: 18px;
}
.search-icon{
  width: 30px;
  height: 30px;
  margin: 0 20px 0 20px;
  flex-shrink: 0;
}
.search-label{
  font-size: 20px;
  font-weight: bold;
  color: #A6ACBF;

}
.search-seperator{
  margin: 0 10px 0 10px;
  font-weight: bolder;
  color: #A6ACBF;
}
.search-input{
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  flex: 1;
  min-width: 0;
  font-size: 20px;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 50%;
  margin-top: 6px;
  transform: translateX(-50%);
  background: #2d2d3d;
  border: 1px solid #374151;
  border-radius: 0 0 8px 8px;
  max-height: 350px;
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