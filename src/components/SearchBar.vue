<template>
  <div class="search-container">
    <div class="search-bar">
      <div class="search-input-wrapper">
        <img src="@/assets/search-icon.png" alt="search icon" class="search-icon">
        <input
            type="text"
            :value=query
            @input="onInput"
            @compositionStart="onCompositionStart"
            @compositionEnd="onCompositionEnd"
            @keyup.enter="onSearch"
            @keydown="onKeyDown"
            placeholder="알람 등록하고 싶은 아이템을 검색하세요"
            class="search-input"
        />
        <button @click="onSearch" class="search-btn">검색</button>
      </div>
    </div>
    <div class="dropdown" v-show="candidates.length">
      <div
          v-for="(item, index) in candidates"
          :key="item.id"
          @click="onClick(item)"
          class="dropdown-item"
          :class="{'selected' : index === selectedIndex }"
      >
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
const selectedIndex = ref(-1)

// dropdown keyboard navigation
function onKeyDown(e){
  if(!candidates.value.length)return

  switch (e.key){
    case 'ArrowDown':
      e.preventDefault()
      selectedIndex.value = (selectedIndex.value + 1) % candidates.value.length
      break
    case 'ArrowUp':
      e.preventDefault()
      selectedIndex.value = selectedIndex.value <= 0
          ? candidates.value.length - 1
          : selectedIndex.value - 1
      break
    case 'Enter':
      if (selectedIndex.value >= 0) {
        onClick(candidates.value[selectedIndex.value])
        selectedIndex.value = -1
      }
      break
  }
}

// 유저 한글 입력시에 글자 조합 이슈 해결을 위한 메소드들
function onCompositionStart(){
  isComposing.value = true
}

function onCompositionEnd(e) {
  isComposing.value = false
  query.value = e.target.value
  candidates.value = store.searchItemCandidates(query.value)
}

function onInput(e){
  query.value = e.target.value
  if(!isComposing.value){
    candidates.value = store.searchItemCandidates(query.value)
  }
}

// 검색 클릭시에 동작하는 메소드
function onSearch() {
  store.fetchItem(query.value)
  candidates.value = []
}

// 검색 후보 중 클릭시 검색어를 해당 후보의 이름으로 변경
function onClick(item) {
  store.fetchItem(item.nameKorean)
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

  background: #343741;
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

.search-btn{
  border: none;
  background: #343741;
  color: white;
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
.search-input::placeholder{
  color: #888fa1;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 50%;
  margin-top: 6px;
  transform: translateX(-50%);
  background: #343741;
  border: 1px solid #515972;
  box-shadow: black 0 0 10px;
  border-radius: 8px;
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
.dropdown-item.selected {
  background: #055fec;
}

.candidate-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}
</style>