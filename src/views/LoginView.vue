<template>
  <div class="login-view">
    <div class="header">
      <img src="/static/logo.png" alt="Logo" class="logo" />
      <h1>매렌지지 Alarmy</h1>
    </div>
    <div class="button-group">
      <button class="login-btn" @click="redirectToDiscordLogin">
        <img alt="Discord" class="discord-icon" src="https://cdn.discordapp.com/embed/avatars/0.png" />
        디스코드 로그인
      </button>
    </div>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const errorMessage = ref('');

 const redirectToDiscordLogin = () => {
   window.location.href = import.meta.env.VITE_DISCORD_LOGIN_URL
 }
</script>

<style scoped>
.login-view {
  max-width: min(400px, 90vw);  /* Responsive width */
  min-width: 280px;
  margin: 0;
  padding: 30px;
  border: 1px solid #374151;
  border-radius: 8px;
  background-color: #1F2937;
  color: #F3F4F6;
  /* Center positioning */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.login-btn {
  flex: 1;
  padding: 12px 16px;  /* Increased padding */
  border: none;
  border-radius: 4px;
  background-color: #3B82F6;
  color: white;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
  font-size: clamp(14px, 1.5vw, 16px);  /* Responsive font size */
}

.login-btn:hover {
  background-color: #2563EB;
}

.error {
  margin-top: 20px;
  color: #EF4444;
  text-align: center;
}

h1 {
  color: #F3F4F6;
  text-align: center;
  margin-bottom: 30px;
  font-size: clamp(1.5rem, 2.5vw, 1.8rem);  /* Responsive font size */
}

.header {
  text-align: center;
}

.logo {
  width: clamp(80px, 15vw, 100px);  /* Responsive logo size */
  height: auto;
  margin-bottom: 10px;
}

.discord-icon {
  width: clamp(24px, 3vw, 28px);  /* Increased discord icon size */
  height: clamp(24px, 3vw, 28px);
  margin-right: 8px;
  border-radius: 30%;
  vertical-align: middle;
}
</style>