<template>
  <div class="multi-range-slider">
    <div class="slider-container">
      <div class="slider-track"></div>
      <div
          class="slider-range"
          :style="{
          left: minPercent + '%',
          width: (maxPercent - minPercent) + '%'
        }"
      ></div>

      <input
          type="range"
          :min="0"
          :max="1440"
          :step="step"
          v-model="minMinutes"
          class="slider-input slider-min"
          @input="handleMinInput"
          @change="emitUpdate"
      />

      <input
          type="range"
          :min="0"
          :max="1440"
          :step="step"
          v-model="maxMinutes"
          class="slider-input slider-max"
          @input="handleMaxInput"
          @change="emitUpdate"
      />
    </div>

    <div class="slider-values">
      <span>{{ formatTime(minMinutes) }}</span>
      <span>{{ formatTime(maxMinutes) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeRangeSlider',
  props: {
    user:{
      type: Object,
      required: true
    },
    step: {
      type: Number,
      default: 15 // 15 minutes step by default
    },
    minDefault: {
      type: Number,
      default: 0
    },
    maxDefault: {
      type: Number,
      default: 1440
    }
  },
  data() {
    return {
      minMinutes: this.minDefault,
      maxMinutes: this.maxDefault
    }
  },
  computed: {
    minPercent() {
      return (this.minMinutes / 1440) * 100
    },
    maxPercent() {
      return (this.maxMinutes / 1440) * 100
    }
  },
  methods: {

    // 숫자를 HH:mm 형태로 변환하는 메소드
    formatTime(minutes) {
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
    },
    initializeTimeValues(){
      if (this.user?.minAlarmTime !== undefined && this.user?.maxAlarmTime !== undefined) {
        this.minMinutes = Number(this.user.minAlarmTime)
        this.maxMinutes = Number(this.user.maxAlarmTime)
      }else {
        this.minMinutes= this.minDefault
        this.maxMinutes= this.maxDefault
      }
    },
    handleMinInput() {
      if (parseInt(this.minMinutes) > parseInt(this.maxMinutes)) {
        this.minMinutes = this.maxMinutes
      }
    },

    handleMaxInput() {
      if (parseInt(this.maxMinutes) < parseInt(this.minMinutes)) {
        this.maxMinutes = this.minMinutes
      }
    },

    emitUpdate() {
      this.$emit('update', {
        minTime: this.minMinutes,
        maxTime: this.maxMinutes
      })
    }
  },
  watch: {
    user: {
      immediate: true,
      handler(){
        this.initializeTimeValues()
      }
    }
  }
}
</script>

<style scoped>
.multi-range-slider {
  width: 100%;
  margin: 20px 0;
}

.slider-container {
  position: relative;
  height: 6px;
  margin: 13px 0;
}

.slider-track {
  position: absolute;

  height: 6px;
  background: #ddd;
  border-radius: 3px;
}

.slider-range {
  position: absolute;
  height: 6px;
  background: #FF6239;
  border-radius: 3px;
}

.slider-input {
  position: absolute;
  width: 100%;
  height: 6px;
  background: none;
  pointer-events: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
}
.slider-min{
  left: -3px;
}

.slider-input::-webkit-slider-thumb {
  pointer-events: all;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #FF6239;
  background: #fff;
  cursor: pointer;
  -webkit-appearance: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.slider-input::-moz-range-thumb {
  pointer-events: all;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #FF6239;
  background: #fff;
  cursor: pointer;
  -moz-appearance: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.slider-values {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color:white;
}

.slider-values span {
  background: #FF6239;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: monospace;
  font-weight: bold;
}
</style>