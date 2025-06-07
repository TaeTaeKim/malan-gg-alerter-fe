<template>
  <form @submit.prevent="onSubmit">
    <div class="option-item preview-price-row">
      <label for="price">가격</label>
      <input
          id="price"
          type="text"
          v-model="formattedPrice"
          placeholder="원하는 가격을 설정해주세요"
          @input="handlePriceInput"
          class="option-input preview-price-input"
      />
    </div>
    <div class="option-grid option-grid-4">
      <div v-for="option in firstRowOptions" :key="option.key" class="option-item">
        <label :for="option.key">{{ option.label }}</label>
        <input
            :id="option.key"
            type="number"
            v-model.number="optionValues[option.key]"
            class="option-input"
        />
      </div>
    </div>
    <div class="option-grid option-grid-5">
      <div v-for="option in secondRowOptions" :key="option.key" class="option-item">
        <label :for="option.key">{{ option.label }}</label>
        <input
            :id="option.key"
            type="number"
            v-model.number="optionValues[option.key]"
            class="option-input"
        />
      </div>
    </div>
    <div class="button-group">
      <button type="submit" class="submit-btn">아이템 등록하기</button>
      <button type="button" class="back-btn" @click="$emit('back')">초기화</button>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { itemOptions } from '@/constants/itemOptions'

const firstRowOptions = itemOptions.slice(1, 5) // 힘, 민첩, 인트, 럭
const secondRowOptions = itemOptions.slice(5) // 공격력, 마력, 합마, 명중률, 이동속도
const optionValues = reactive({
  price: null
})
firstRowOptions.concat(secondRowOptions).forEach(opt => optionValues[opt.key] = null)

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
.preview-price-row{
  margin-bottom: 3px;
}
.preview-price-input{
  font-size: 15px;
}

.preview-price-input::placeholder{
  padding-left: 15px;
  font-size: 15px
}
.option-item{
  margin-right: 30px;
}
.option-item label {
  display: block;
  font-weight: bold;
  margin-bottom: 2px;
}
.option-input{
  height: 43px;
  width: 100%;
  background-color: #2B2F39;
  border: none;
  border-radius: 10px;
}
.option-grid-4 {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 3px;
}

.option-grid-5 {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(5, 1fr);
}

.button-group {
  display: flex;
  gap: 20px;
  margin-top: 15px;
}

.button-group >button{
  height: 45px;
  padding: 0 15px 0 15px;
}

.submit-btn {
  background-color: #fff;
  color: #23262b;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
}

.submit-btn:hover {
  background-color: #e5e7eb;
}

.back-btn {
  background-color: transparent;
  border: 1px solid #d1d5db;
  color: #d1d5db;
  font-size: 1.1rem;
}

.back-btn:hover {
  background-color: rgba(209, 213, 219, 0.1);
}
</style>