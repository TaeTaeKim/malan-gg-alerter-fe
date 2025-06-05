<template>
  <form @submit.prevent="onSubmit">
    <div class="price-row">
      <label>
        가격
        <input
            type="text"
            v-model="formattedPrice"
            placeholder="가격"
            @input="handlePriceInput"
        />
      </label>
    </div>
    <div class="option-grid">
      <div v-for="option in otherOptions" :key="option.key" class="option-item">
        <label>
          {{ option.label }}
          <input
              type="number"
              v-model.number="optionValues[option.key]"
          />
        </label>
      </div>
    </div>
    <div class="button-group">
      <button type="button" class="back-btn" @click="$emit('back')">← 검색 돌아가기</button>
      <button type="submit" class="submit-btn">등록</button>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { itemOptions } from '@/constants/itemOptions'

const otherOptions = itemOptions.filter(opt => opt.key !== 'price')
const optionValues = reactive({
  price: null
})
otherOptions.forEach(opt => optionValues[opt.key] = null)

const formattedPrice = ref('')

function handlePriceInput(e) {
  // Remove non-digits
  const numericValue = e.target.value.replace(/[^0-9]/g, '')
  // Convert to number
  optionValues.price = parseInt(numericValue) || null
  // Format with commas
  formattedPrice.value = numericValue ? Number(numericValue).toLocaleString() : ''
}

const emit = defineEmits(['submit'])

function onSubmit() {
  emit('submit', { ...optionValues })
}
</script>

<style scoped>
.price-row {
  margin-bottom: 20px;
}

.price-row label {
  display: block;
  width: 100%;
}

.price-row input {
  width: 20%;
  padding: 8px;
  margin-left: 1.8rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  margin-top: 4px;
}

.option-grid {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.option-item {
  display: flex;
  flex-direction: column;
  padding-right: 4rem;
}

.option-item label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.option-item input {
  width: 50%;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  margin-top: 4px;
}

.submit-btn {
  width: 100%;
  padding: 10px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #2563eb;
}
/* Add to existing styles */
.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.back-btn {
  flex: 1;
  padding: 10px;
  background-color: transparent;
  border: 1px solid #d1d5db;
  color: #d1d5db;
}

.submit-btn {
  flex: 1;
}

.back-btn:hover {
  background-color: rgba(209, 213, 219, 0.1);
}
</style>