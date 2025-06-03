Sure, here's the proposed content for the /alerter-fe/alerter-fe/src/views/RegisterView.vue file:

<template>
  <div class="register-view">
    <h1>회원가입</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="id">아이디:</label>
        <input type="text" id="id" v-model="id" required />
      </div>
      <div class="form-group">
        <label for="password">비밀번호:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="button-group">
        <button type="button" class="cancel-btn" @click="router.push('/login')">
          취소
        </button>
        <button type="submit" class="signup-btn">
          가입하기
        </button>
      </div>
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

.signup-btn, .cancel-btn {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.signup-btn {
  background-color: #3B82F6;
  color: white;
}

.signup-btn:hover {
  background-color: #2563EB;
}

.cancel-btn {
  background-color: #4B5563;
  color: white;
}

.cancel-btn:hover {
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