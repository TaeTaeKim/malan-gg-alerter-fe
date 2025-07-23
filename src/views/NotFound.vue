<template>
  <div class="not-found-container">
    <img :src="alarmyIcon" alt="Question Mark" class="icon" />
    <h1>존재하지 않는 페이지 입니다. </h1>
    <p>The page you are looking for doesn't exist or has been moved.</p>
    <div class="links-container">
      <router-link class="nav-link" to="/">알리미로 돌아가기</router-link>
    </div>
  </div>
</template>

<script setup>
import alarmyIcon from '/static/logo.png?url'
</script>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  color: #f3f4f6;
  padding: 1rem;
}

.icon {
  width: 80px;
  height: 80px;
  margin-bottom: 2rem;
}

h1 {
  font-size: 2.5rem;
  margin: 0;
  font-weight: 600;
}

p {
  font-size: 1.2rem;
  margin: 1rem 0 2rem 0;
  color: #d1d5db;
  /* Lighter gray for sub-text */
}

.links-container {
  display: flex;
  gap: 1rem;
}

.nav-link {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  background-color: #4f46e5;
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: #4338ca;
}
</style>