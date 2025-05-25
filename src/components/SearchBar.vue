<template>
  <div class="search-bar">
    <input v-model="query" @input="onInput" @compositionend="onInput" @keyup.enter="onSearch" placeholder="검색" />
    <button @click="onSearch">검색</button>
    <ul v-if="candidates.length">
      <li v-for="item in candidates" :key="item.id" @click="onClick(item)">
        {{ item.nameKorean }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useMainStore } from '@/store'

const query = ref('')
const store = useMainStore()
const candidates = ref([])

function onInput() {
  candidates.value =  store.searchItemCandidates(query.value)
}
function onSearch() {
  store.fetchItem(query.value)
}

// 검색 후보 중 클릭시 검색어를 해당 후보의 이름으로 변경
function onClick(item) {
  query.value = item.nameKorean
}
</script>