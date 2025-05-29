<template>
  <form @submit.prevent="onSubmit">
    <div v-for="option in options" :key="option.key">
      <label>
        {{ option.label }}
        <input
          type="number"
          v-model.number="optionValues[option.key]"
          :placeholder="option.label"
        />
      </label>
    </div>
    <button type="submit">등록</button>
  </form>
</template>

<script setup>
import { reactive } from 'vue'
import { itemOptions } from '@/constants/itemOptions'

const options = itemOptions
const optionValues = reactive({})
options.forEach(opt => optionValues[opt.key] = null)

const emit = defineEmits(['submit'])

function onSubmit() {
  emit('submit', { ...optionValues })
}
</script>