<template>
  <div class="container">
    <header>
      <h1>메랜지지 가격 알림</h1>
      <button @click="handleLogout" class="logout-btn">로그아웃</button>
    </header>
    
    <div class="main-content">
      <div class="search-section">
        <SearchBar/>
        <PreviewPanel />
      </div>
      
      <div class="items-section">
        <h2>등록된 아이템</h2>
        <RegisteredItemList />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMainStore } from '@/store/index'
import { useAuthStore } from '@/store/auth'
import SearchBar from '@/components/SearchBar.vue'
import PreviewPanel from '@/components/PreviewPanel.vue'
import RegisteredItemList from '@/components/RegisteredItemList.vue'

const router = useRouter()
const store = useMainStore()
const auth = useAuthStore()

onMounted(async () => {
  if (!auth.isAuthenticated) {
    router.push('/login')
    return
  }
  await store.fetchRegisteredItems()
})
const handleLogout = async () => {
    await auth.logout()
    router.push('/login')
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.logout-btn {
  padding: 8px 16px;
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #b91c1c;
}

.main-content {
  display: grid;
  gap: 30px;
}

.search-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.items-section h2 {
  margin-bottom: 20px;
}
</style>