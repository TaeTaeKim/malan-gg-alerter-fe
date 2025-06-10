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
          @input="updateMin"
      />

      <input
          type="range"
          :min="0"
          :max="1440"
          :step="step"
          v-model="maxMinutes"
          class="slider-input slider-max"
          @input="updateMax"
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
    step: {
      type: Number,
      default: 15 // 15 minutes step by default
    },
    minDefault: {
      type: String,
      default: '08:00'
    },
    maxDefault: {
      type: String,
      default: '18:00'
    }
  },
  data() {
    return {
      minMinutes: this.timeToMinutes(this.minDefault),
      maxMinutes: this.timeToMinutes(this.maxDefault)
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
    timeToMinutes(timeString) {
      const [hours, minutes] = timeString.split(':').map(Number)
      return hours * 60 + minutes
    },
    formatTime(minutes) {
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
    },
    updateMin() {
      if (parseInt(this.minMinutes) > parseInt(this.maxMinutes)) {
        this.minMinutes = this.maxMinutes
      }
      this.$emit('update', {
        min: this.formatTime(this.minMinutes),
        max: this.formatTime(this.maxMinutes)
      })
    },
    updateMax() {
      if (parseInt(this.maxMinutes) < parseInt(this.minMinutes)) {
        this.maxMinutes = this.minMinutes
      }
      this.$emit('update', {
        min: this.formatTime(this.minMinutes),
        max: this.formatTime(this.maxMinutes)
      })
    }
  },
  watch: {
    minDefault(newVal) {
      this.minMinutes = this.timeToMinutes(newVal)
    },
    maxDefault(newVal) {
      this.maxMinutes = this.timeToMinutes(newVal)
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
  width: 100%;
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