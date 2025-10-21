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
    <div v-if="currentItem?.typeInfo?.overallCategory === 'Equip'" class="option-grid option-grid-main">
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
    <div v-if="currentItem?.typeInfo?.overallCategory === 'Equip'" class="option-grid option-grid-substat">
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
    <!-- Collapsible Sections Container -->
    <div v-if="currentItem?.typeInfo?.overallCategory === 'Equip'" class="collapsible-sections-row">
      <!-- Combined Stats Section (합스탯) -->
      <div class="collapsible-section">
        <button type="button" class="collapsible-header" @click="isCombinedStatsExpanded = !isCombinedStatsExpanded">
          <span class="collapsible-title">합스탯</span>
          <span class="collapsible-arrow" :class="{ 'expanded': isCombinedStatsExpanded }">▼</span>
        </button>

        <div v-show="isCombinedStatsExpanded" class="collapsible-content">
          <!-- Stat Selection Buttons -->
          <div class="stat-selection">
            <button
              v-for="stat in combinedStatOptions"
              :key="stat.key"
              type="button"
              class="stat-select-btn"
              :class="{ 'selected': selectedCombinedStats.includes(stat.key) }"
              @click="toggleCombinedStat(stat.key)"
            >
              {{ stat.label }}
            </button>
          </div>

          <!-- Range/Single Input for Combined Stats -->
          <div class="combined-stat-input">
            <div class="option-header">
              <label class="option-label">합계 값</label>
              <button type="button" class="range-toggle-btn" @click="toggleRange('combinedStat')">
                {{ rangeStates['combinedStat'] ? '단일값' : '범위설정' }}
              </button>
            </div>
            <div v-if="!rangeStates['combinedStat']" class="single-input">
              <input type="number" v-model.number="optionValues['combinedStat']" class="option-input" />
            </div>
            <div v-else class="range-inputs">
              <input type="number" v-model.number="optionValues['combinedStat']"
                class="option-input range-input" placeholder="최소값" />
              <input type="number"
                v-model.number="optionValues['highCOMBINEDSTAT']" class="option-input range-input"
                placeholder="최대값" />
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Options Section (추가 옵션) -->
      <div class="collapsible-section">
        <button type="button" class="collapsible-header" @click="isThirdRowExpanded = !isThirdRowExpanded">
          <span class="collapsible-title">추가 옵션</span>
          <span class="collapsible-arrow" :class="{ 'expanded': isThirdRowExpanded }">▼</span>
        </button>

        <div v-show="isThirdRowExpanded" class="collapsible-content">
          <div class="option-grid option-grid-additional">
            <div v-for="option in thridRowOptions" :key="option.key" class="option-item">
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
        </div>
      </div>
    </div>
    <div class="button-group">
      <button type="submit" class="submit-btn">아이템 등록하기</button>
      <button type="button" class="back-btn" @click="$emit('back')">초기화</button>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { itemOptions, combinedStatOptions, createCombinedStatToggle } from '../constants/itemOptions'

const props = defineProps({
  currentItem: {
    type: Object,
    default: null
  }
})

const firstRowOptions = itemOptions.slice(2, 7) // 힘, 민첩, 인트, 럭, 업횟
const secondRowOptions = itemOptions.slice(7,13) // 공격력, 마력, 합마, 명중률, 이동속도
const thridRowOptions = itemOptions.slice(13)

// State for collapsible sections (collapsed by default)
const isThirdRowExpanded = ref(false)
const isCombinedStatsExpanded = ref(false)

// State for selected combined stats
const selectedCombinedStats = ref([])

// Use the centralized toggle function from itemOptions
const toggleCombinedStat = createCombinedStatToggle(selectedCombinedStats)

// 특정 Option key가 단일값인지, 범위값인지 체크하는 함수
const rangeStates = reactive({})
const optionValues = reactive({
  lowPrice: null,
  highPrice: null
})

// input tag id 값 만드는 함수
function getRangeInputKey(optionKey, type) {
  return type === 'min' ? optionKey : `high${optionKey.toUpperCase()}`
}


// OptionValues 초기화 -> Server ItemCondition 과 맞아야함.
firstRowOptions.concat(secondRowOptions).forEach(opt => {
  optionValues[opt.key] = null
  optionValues[getRangeInputKey(opt.key, 'max')] = null
  rangeStates[opt.key] = false
})

// Initialize combined stat option
optionValues['combinedStat'] = null
optionValues['highCOMBINEDSTAT'] = null
rangeStates['combinedStat'] = false

// 단일값 <-> 범위값 토글 함수
// 토글 시에 들어있던 value 를 같이 넣어준다.
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

// Item Meta Info 로 초기 옵션을 채우는 함수.
function populateDefaultValues() {
  // First, reset all option values to null (clear previous values)
  firstRowOptions.concat(secondRowOptions).forEach(opt => {
    optionValues[opt.key] = null
    optionValues[getRangeInputKey(opt.key, 'max')] = null
  })

  if (props.currentItem?.metaInfo && props.currentItem?.typeInfo?.overallCategory === 'Equip') {
    const metaInfo = props.currentItem.metaInfo

    // 아이템의 정옵 필드 : component 키 매핑
    const keyMapping = {
      'incSTR': 'str',
      'incDEX': 'dex',
      'incINT': 'int',
      'incLUK': 'luk',
      'incPAD': 'pad',
      'incMAD': 'mad',
      'incSpeed': 'speed',
      'incACC': 'accuracy',
      'incJump': 'jump'
    }

    // Set default values from metaInfo
    Object.entries(keyMapping).forEach(([metaKey, formKey]) => {
      if (metaInfo[metaKey] !== undefined && metaInfo[metaKey] > 0) {
        if (rangeStates[formKey]) {
          // If in range mode, set both min (original key) and max to the same value
          optionValues[formKey] = metaInfo[metaKey]
          optionValues[getRangeInputKey(formKey, 'max')] = metaInfo[metaKey]
        } else {
          // If in single mode, set the single value
          optionValues[formKey] = metaInfo[metaKey]
        }
      }
    })
  }
}

// Watch for currentItem changes and populate defaults
watch(() => props.currentItem, populateDefaultValues, { immediate: true })

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

  // Validate range inputs - min should not be greater than max
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

  // Validate combined stat input
  if (rangeStates['combinedStat']) {
    const minVal = optionValues['combinedStat']
    const maxVal = optionValues['highCOMBINEDSTAT']

    if (minVal !== null && maxVal !== null && minVal > maxVal) {
      alert('합스탯의 최소값이 최대값보다 클 수 없습니다.')
      return
    }
  }

  // Prepare submission data with combined stats
  const submissionData = {
    ...optionValues,
    hapStats: selectedCombinedStats.value
  }

  emit('submit', submissionData)
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
  min-width: 0;
}

/* Remove right margin for items in grid layouts */
.option-grid-main .option-item,
.option-grid-substat .option-item,
.option-grid-additional .option-item {
  margin-right: 0;
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
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.95rem;
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

.option-grid-main {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin-bottom: 3px;
}

.option-grid-substat {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
}

.option-grid-additional {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
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

/* Collapsible Sections Row Container */
.collapsible-sections-row {
  display: flex;
  gap: 10px;
  margin-top: 8px;
  margin-bottom: 8px;
}

/* Collapsible Section Styles */
.collapsible-section {
  min-width: 0;
}

/* Combined Stats Section - narrower width */
.collapsible-section:first-child {
  flex: 0 0 35%;
}

/* Additional Options Section - wider width */
.collapsible-section:last-child {
  flex: 1;
}

.collapsible-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #2B2F39;
  border: 1px solid #4b5563;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.collapsible-header:hover {
  background-color: #374151;
}

.collapsible-title {
  font-weight: bold;
  font-size: 1rem;
  color: #d1d5db;
}

.collapsible-arrow {
  transition: transform 0.3s ease;
  color: #9ca3af;
  font-size: 0.8rem;
}

.collapsible-arrow.expanded {
  transform: rotate(-180deg);
}

.collapsible-content {
  margin-top: 8px;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Combined Stats Styles */
.stat-selection {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 12px;
}

.stat-select-btn {
  padding: 5px 8px;
  background-color: #374151;
  color: #d1d5db;
  border: 1px solid #6b7280;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.85rem;
  flex: 1 1 auto;
  min-width: 0;
  text-align: center;
}

.stat-select-btn:hover {
  background-color: #4b5563;
}

.stat-select-btn.selected {
  background-color: #3b82f6;
  border-color: #2563eb;
  color: white;
}

.combined-stat-input {
  margin-top: 8px;
}

@media (max-width: 760px) {
  /* Stack collapsible sections vertically on mobile */
  .collapsible-sections-row {
    flex-direction: column;
    gap: 8px;
  }

  /* Reset widths on mobile */
  .collapsible-section:first-child,
  .collapsible-section:last-child {
    flex: 1 1 auto;
  }

  .stat-selection {
    gap: 4px;
  }

  .stat-select-btn {
    font-size: 0.8rem;
    padding: 5px 8px;
  }

  .option-grid-main {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .option-grid-substat {
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }

  .option-grid-additional {
    grid-template-columns: repeat(2, 1fr);
    gap: 6px;
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