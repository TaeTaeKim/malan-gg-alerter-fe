
<template>
  <div class="login-view">
    <h1>로그인</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="id">아이디:</label>
        <input type="text" v-model="id" required />
      </div>
      <div>
        <label for="password">비밀번호:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">로그인</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const router = useRouter();
const authStore = useAuthStore();
const id = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
  try {
    const success = await authStore.login(id.value, password.value);
    if(success){
        router.push('/'); // 로그인 성공 시 홈으로 이동
    }
  } catch (error) {
    errorMessage.value = '로그인 실패. 아이디와 비밀번호를 확인하세요.';
  }
};
</script>

<style scoped>
.login-view {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.error {
  color: red;
}
</style>