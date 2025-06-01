Sure, here's the proposed content for the /alerter-fe/alerter-fe/src/views/RegisterView.vue file:

<template>
  <div class="register-view">
    <h1>회원가입</h1>
    <form @submit.prevent="register">
      <div>
        <label for="id">아이디:</label>
        <input type="text" v-model="id" required />
      </div>
      <div>
        <label for="password">비밀번호:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">가입하기</button>
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

const register = async () => {
  try {
    await authStore.signup(id.value, password.value);
    router.push('/login');
  } catch (error) {
    errorMessage.value = error.response?.data?.message || '회원가입에 실패했습니다.';
  }
};
</script>

<style scoped>
.register-view {
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