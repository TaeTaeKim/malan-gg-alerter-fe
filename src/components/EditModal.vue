<template>
  <div class="edit-modal">
    <div class="edit-modal-content">
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
        <div v-if="isEquipItem" class="option-grid option-grid-4">
          <div v-for="option in firstRowOptions" :key="option.key" class="option-item">
            <div class="option-header">
              <label :for="option.key" class="option-label">{{ option.label }}</label>
              <button type="button" class="range-toggle-btn" @click="toggleRange(option.key)">
                {{ rangeStates[option.key] ? '단일값' : '범위설정' }}
              </button>
            </div>
            <div v-if="!rangeStates[option.key]" class="single-input">
              <input :id="option.key" type="number" v-model.number="optionValues[option.key]" class="option-input" />
            </div>
            <div v-else class="range-inputs">
              <input :id="option.key" type="number" v-model.number="optionValues[option.key]"
                class="option-input range-input" placeholder="최소값" />
              <input :id="getRangeInputKey(option.key, 'max')" type="number"
                v-model.number="optionValues[getRangeInputKey(option.key, 'max')]" class="option-input range-input"
                placeholder="최대값" />
            </div>
          </div>
        </div>
        <div v-if="isEquipItem" class="option-grid option-grid-5">
          <div v-for="option in secondRowOptions" :key="option.key" class="option-item">
            <div class="option-header">
              <label :for="option.key" class="option-label">{{ option.label }}</label>
              <button type="button" class="range-toggle-btn" @click="toggleRange(option.key)">
                {{ rangeStates[option.key] ? '단일값' : '범위설정' }}
              </button>
            </div>
            <div v-if="!rangeStates[option.key]" class="single-input">
              <input :id="option.key" type="number" v-model.number="optionValues[option.key]" class="option-input" />
            </div>
            <div v-else class="range-inputs">
              <input :id="option.key" type="number" v-model.number="optionValues[option.key]"
                class="option-input range-input" placeholder="최소값" />
              <input :id="getRangeInputKey(option.key, 'max')" type="number"
                v-model.number="optionValues[getRangeInputKey(option.key, 'max')]" class="option-input range-input"
                placeholder="최대값" />
            </div>
          </div>
        </div>
        <div class="button-group">
          <button type="submit" class="submit-btn">저장하기</button>
          <button type="button" class="back-btn" @click="$emit('cancel')">취소</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { itemOptions } from '../constants/itemOptions'
import { getItemOverallCategory } from '@/data/itemsData.js'

const props = defineProps({
  initialValues: {
    type: Object,
    required: true
  },
  itemId: {
    type: [String, Number],
    required: true
  }
})

const emit = defineEmits(['save', 'cancel'])

const firstRowOptions = itemOptions.slice(2, 7) // 힘, 민첩, 인트, 럭
const secondRowOptions = itemOptions.slice(7) // 공격력, 마력, 합마, 명중률, 이동속도

// Check if item is equipment type
const isEquipItem = computed(() => {
  const category = getItemOverallCategory(props.itemId)
  return category === 'Equip'
})

const rangeStates = reactive({})
const optionValues = reactive({})
const formattedLowPrice = ref('')
const formattedHighPrice = ref('')

function getRangeInputKey(optionKey, type) {
  return type === 'min' ? optionKey : `high${optionKey.toUpperCase()}`
}

// Initialize values from props
function initializeValues() {
  // Set price values
  optionValues.lowPrice = props.initialValues.lowPrice || null
  optionValues.highPrice = props.initialValues.highPrice || null

  // Update formatted price displays
  formattedLowPrice.value = props.initialValues.lowPrice ? props.initialValues.lowPrice.toLocaleString() : ''
  formattedHighPrice.value = props.initialValues.highPrice ? props.initialValues.highPrice.toLocaleString() : ''

  // Set option values and determine range states
  firstRowOptions.concat(secondRowOptions).forEach(opt => {
    const minKey = opt.key
    const maxKey = getRangeInputKey(opt.key, 'max')

    optionValues[minKey] = props.initialValues[minKey] || null
    optionValues[maxKey] = props.initialValues[maxKey] || null

    // Set range state based on whether high value exists
    rangeStates[opt.key] = props.initialValues[maxKey] != null
  })
}

function toggleRange(optionKey) {
  const isCurrentlyRange = rangeStates[optionKey]

  if (isCurrentlyRange) {
    // Switching from range to single - keep the min value (original key)
    const maxKey = getRangeInputKey(optionKey, 'max')
    optionValues[maxKey] = null
  } else {
    // Switching from single to range - copy the value to max if it exists
    const currentVal = optionValues[optionKey]
    if (currentVal !== null) {
      optionValues[getRangeInputKey(optionKey, 'max')] = currentVal
    }
  }

  rangeStates[optionKey] = !isCurrentlyRange
}

function handlePriceInput(type, e) {
  // Remove non-numeric characters from input
  let numericValue = e.target.value.replace(/[^0-9]/g, '')
  const MAX_INT_VALUE = 9999999999;

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

function onSubmit() {
  // Validate range inputs
  if (optionValues.lowPrice && optionValues.highPrice && optionValues.lowPrice > optionValues.highPrice) {
    alert('최소 가격이 최대 가격보다 클 수 없습니다.')
    return
  }

  const allOptions = firstRowOptions.concat(secondRowOptions)
  for (const option of allOptions) {
    if (rangeStates[option.key]) {
      const minVal = optionValues[option.key]
      const maxVal = optionValues[getRangeInputKey(option.key, 'max')]

      if (minVal !== null && maxVal !== null && minVal > maxVal) {
        alert(`${option.label}의 최소값이 최대값보다 클 수 없습니다.`)
        return
      }
    }
  }

  emit('save', { ...optionValues })
}

// Initialize on component mount
initializeValues()
</script>

<style scoped>
.edit-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.edit-modal-content {
  background: #343741;
  border-radius: 12px;
  padding: 20px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

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

.option-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.option-header label {
  font-weight: bold;
  flex: 1;
}

.range-toggle-btn {
  background: #374151;
  color: #d1d5db;
  border: 1px solid #6b7280;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 0.75rem;
  cursor: pointer;
  white-space: nowrap;
  min-width: 60px;
}

.range-toggle-btn:hover {
  background: #4b5563;
}

.range-inputs {
  display: flex;
  gap: 4px;
}

.range-input {
  flex: 1;
}

.single-input {
  width: 100%;
}

.option-input {
  height: 42px;
  width: 100%;
  background-color: #2B2F39;
  border: none;
  border-radius: 10px;
  color: white;
  padding: 0 10px;
}

.option-input::placeholder {
  color: #d1d5db;
}

.option-grid {
  gap: 10px
}

.option-grid-4 {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(5, 1fr);
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
  .edit-modal-content {
    margin: 10px;
    padding: 15px;
  }

  .option-grid-4 {
    grid-template-columns: repeat(2, 1fr);
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

  .option-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    margin-bottom: 6px;
  }

  .range-toggle-btn {
    font-size: 0.65rem;
    padding: 1px 4px;
    min-width: 50px;
  }

  .range-inputs {
    gap: 2px;
  }

  .option-input {
    width: 80%;
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