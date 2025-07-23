<template>
  <form @submit.prevent="onSubmit">

    <div class="option-item preview-price-row">
      <label for="lowPrice">가격 범위 설정 : 미설정 시 체크하지 않습니다</label>
      <div class="price-range">
        <input id="lowPrice" type="text" v-model="formattedLowPrice" placeholder="입력 시 최소가격 체크"
          @input="(e) => handlePriceInput('low', e)" class="option-input preview-price-input" />
        <span>~</span>
        <input id="highPrice" type="text" v-model="formattedHighPrice" placeholder="입력 시 최대가격 체크 최대 99억메소"
          @input="(e) => handlePriceInput('high', e)" class="option-input preview-price-input" />
      </div>
    </div>
    <div class="option-grid option-grid-4">
      <div v-for="option in firstRowOptions" :key="option.key" class="option-item">
        <label :for="option.key">{{ option.label }}</label>
        <input :id="option.key" type="number" v-model.number="optionValues[option.key]" class="option-input" />
      </div>
    </div>
    <div class="option-grid option-grid-5">
      <div v-for="option in secondRowOptions" :key="option.key" class="option-item">
        <label :for="option.key">{{ option.label }}</label>
        <input :id="option.key" type="number" v-model.number="optionValues[option.key]" class="option-input" />
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
import { useMainStore } from '../store'

const props = defineProps({
  currentItem: {
    type: Object,
    default: null
  }
})

const firstRowOptions = itemOptions.slice(2, 6) // 힘, 민첩, 인트, 럭
const secondRowOptions = itemOptions.slice(6) // 공격력, 마력, 합마, 명중률, 이동속도
const optionValues = reactive({
  lowPrice: null,
  highPrice: null
})
firstRowOptions.concat(secondRowOptions).forEach(opt => optionValues[opt.key] = null)

const formattedLowPrice = ref('')
const formattedHighPrice = ref('')

function handlePriceInput(type, e) {
  // Remove non-numeric characters from input
  let numericValue = e.target.value.replace(/[^0-9]/g, '')
  const MAX_INT_VALUE = 9999999999;

  // In Kotlin, the server-side uses Int for price, which has a max value of 2,147,483,647.
  // To prevent overflow errors, we cap the input value at the max Int value on the client-side.
  if (numericValue) {
    const num = parseInt(numericValue, 10);
    if (num > MAX_INT_VALUE) {
      numericValue = MAX_INT_VALUE.toString();
    }
  }

  optionValues[`${type}Price`] = parseInt(numericValue) || null

  // Update corresponding formatted ref to show comma-separated value
  const formattedRef = type === 'low' ? formattedLowPrice : formattedHighPrice
  formattedRef.value = numericValue ? Number(numericValue).toLocaleString() : ''
}

const emit = defineEmits(['submit'])

function onSubmit() {
  if (optionValues.lowPrice && optionValues.highPrice && optionValues.lowPrice > optionValues.highPrice) {
    alert('최소 가격이 최대 가격보다 클 수 없습니다.')
    return
  }
  emit('submit', { ...optionValues })
}
</script>

<style scoped>
.price-range {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

}

.price-range>span {
  font-size: 25px;
}

.preview-price-row {
  margin-bottom: 3px;
  width: 98%;
}

.preview-price-input {
  font-size: 15px;
}

.preview-price-input::placeholder {
  padding-left: 15px;
  font-size: 15px
}

.option-item {
  margin-right: 20px;
}

.option-item label {
  display: block;
  font-weight: bold;
  margin-bottom: 2px;
}

.option-input {
  height: 42px;
  width: 100%;
  background-color: #2B2F39;
  border: none;
  border-radius: 10px;
}

.option-input::placeholder {
  color: #d1d5db;
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
  grid-template-columns: repeat(6, 1fr);
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.button-group>button {
  height: 42px;
  border-radius: 8px;
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

@media (max-width: 760px) {


  .option-grid-4 {
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }

  .option-grid-5 {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }


  .option-item {
    margin-right: 0;
    width: 100%;
  }

  .option-input {
    width: 100%;
    font-size: 1rem;
  }

  .option-input::placeholder {
    font-size: 12px;
  }

  .price-range {
    flex-direction: flex;
    gap: 8px;
    align-items: stretch;
  }

  .preview-price-row {
    width: 100%;
  }

  .button-group {
    flex-direction: column;
    gap: 8px;
  }

  .button-group>button {
    width: 100%;
    font-size: 1rem;
  }
}
</style>