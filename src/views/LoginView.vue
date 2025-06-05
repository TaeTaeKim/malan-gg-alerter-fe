<template>
  <div class="login-view">
    <h1>GG Alarmy</h1>
    <div class="button-group">
      <button class="login-btn" @click="redirectToDiscordLogin">Login with Discord</button>
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
  max-width: 400px;
  margin: 100px auto;
  padding: 30px;
  border: 1px solid #374151;
  border-radius: 8px;
  background-color: #1F2937;
  color: #F3F4F6;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 0.9rem;
  color: #D1D5DB;
}

.form-group input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #374151;
  border-radius: 4px;
  background-color: #374151;
  color: #F3F4F6;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #60A5FA;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.login-btn, .signup-btn {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.login-btn {
  background-color: #3B82F6;
  color: white;
}

.login-btn:hover {
  background-color: #2563EB;
}

.signup-btn {
  background-color: #4B5563;
  color: white;
}

.signup-btn:hover {
  background-color: #374151;
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
  font-size: 1.8rem;
}
</style>