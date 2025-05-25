<template>
  <div class="home-layout">
    <div class="left-panel">
      <SearchBar />
      <PreviewPanel />
    </div>
    <div class="right-panel">
      <h2>등록 아이템</h2>
      <RegisteredItemList />
    </div>
  </div>
</template>
<script setup>
import SearchBar from '@/components/SearchBar.vue'
import PreviewPanel from '@/components/PreviewPanel.vue'
import RegisteredItemList from '@/components/RegisteredItemList.vue'
</script>

<style scoped>
.home-layout {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 32px;
  align-items: flex-start;
}
.left-panel {
  flex: 1 1 300px;
  max-width: 400px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.right-panel {
  flex: 2 1 0;
  min-width: 300px;
}
</style>