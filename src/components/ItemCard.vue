<template>
  <div class="item-card">
    <!--    아이템 이미지, 이름, 설정가격, 알림여부를 결정하는 화면-->
    <div class="item-card-info">
      <img :src="item.imageUrl" alt="" class="item-img"/>
      <div class="item-card-name-price">
        <div class="item-card-name">
          <a :href="`https://mapleland.gg/item/${ item.itemId }`" class="malan-gg-link" target="_blank"
             rel="noopener noreferrer">
            <span>{{ item.koreanName }}</span>
            <img src="https://mapleland.gg/logo.png" alt="메랜지지로고" class="malan-gg-logo">
          </a>
        </div>
        <div class="item-card-price">
          <img src="/static/meso.png" alt="meso" width="12" height="15" class="inline-block mr-03">
          <template v-if="isEditing">
            <input
                type="number"
                v-model.number="editedOptions.price"
                style="width: 80px;"
            /> 메소
          </template>
          <template v-else>
            {{ item.option.price?.toLocaleString() || 0 }} 메소
          </template>
        </div>
      </div>
      <button class="item-btn delete-btn" @click="$emit('delete')">×</button>
    </div>
    <div class="options-container">
      <!-- Other options grid -->
      <div class="options-grid">
        <div v-for="opt in otherOptions" :key="opt.key" class="option-cell">
          <div class="option-label">
            {{ opt.label }}
          </div>
          <div class="option-value">
            <template v-if="isEditing">
              <input
                  type="number"
                  v-model.number="editedOptions[opt.key]"
                  style="width: 50px;"
              />
            </template>
            <template v-else>
              {{ item.option[opt.key] }}
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="edit-alarm-btn">
      <template v-if="!isEditing">
        <button class="item-btn edit-btn" @click="startEdit">편집하기</button>
        <button class="item-btn alarm-btn" :class="{ active: item.alarmOn }" @click="$emit('toggleAlarm')">
          <img :src="item.alarmOn ? onIcon : offIcon" alt="alarm toggle" class="alarm-img" />
        </button>
      </template>
      <template v-else>
        <button
            v-if="isEditing"
            class="item-btn complete-edit-btn"
            @click="completeEdit"
        >저장 후 닫기</button>
        <button @click="cancelEdit" class="item-btn cancel-edit-btn">취소</button>
      </template>
    </div>
  </div>
</template>
<script setup>
import {itemOptions} from '@/constants/itemOptions'
import {reactive, ref} from "vue";
import onIcon from '@/assets/alarm-on.png'
import offIcon from '@/assets/alarm-off.png'

const props = defineProps({
  item: Object
})
const emit = defineEmits(["update"]);
const isEditing = ref(false);
const editedOptions = reactive({})
const otherOptions = itemOptions
    .filter(opt => opt.key !== 'price')
    .map(opt => ({
      ...opt,
      label: opt.label.length > 2 ? opt.label.substring(0, 2) : opt.label
    }))

function startEdit(){
  isEditing.value = true;
  otherOptions.forEach(opt => {
    editedOptions[opt.key] = props.item.option[opt.key]
  });

  editedOptions.price = props.item.option.price;

}
function completeEdit(){
  isEditing.value = false;
  emit('update', {...editedOptions})
}
function cancelEdit(){
  isEditing.value = false;
}
</script>

<style scoped>
.item-card {
  border: 1px solid #484B56;
  border-radius: 12px;
  padding: 10px;
  background: #343741;
  --tw-bg-opacity: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  transition: box-shadow 0.2s;
  height: 270px;
  width: 100%;
  min-width: 200px;
  box-sizing: border-box;
  line-height: 0.5;
}

.item-card-info {
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding-bottom: 20px;
  border-bottom: 1px solid #484B56;
}

.item-img {
  height: 42px;
  width: 42px;
  margin-right: 1vw;
}

.malan-gg-logo {
  height: 20px;
  padding-left: 4px;
}

.malan-gg-link {
  color: white;
}

.item-card-name-price {
  display: grid;
  align-items: center;
  width: 70%;
  height: 100%;
}

.item-card-name {
  font-weight: bolder;
  font-size: 16px;
  padding-bottom: 10px;
  height: 20px;
}

.item-card-price {
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 14px;
}
.item-btn{
  background: none;
}
.delete-btn{
  font-size: 23px;
  border: none;
  color: #8C8FA3;
}

.options-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 3px;
}

.option-cell {
  display: flex;
  font-size: 0.9em;
  height: 2vh;
}

.option-label {
  color: #8C8FA3;
  width: 32px;
  margin-right: 10px;
}

.option-value {
  color: white;
  font-weight: bold;
}

.edit-alarm-btn{
  display: flex;
  justify-content: center;
  gap: 10px;
}
.alarm-btn,.edit-btn, .complete-edit-btn, .cancel-edit-btn{
  height: 42px;
  border: 1px solid #515972;
}
/* Toggle Switch */
.alarm-btn {
  background: #343A4B;
  width: 22%;
  transition: background-color 0.3s ease;
}

.alarm-btn.active {
  background: #FF6239;
}
.alarm-img{
  height: 20px;

}
.options-container {
  height: 50%;
}

.edit-btn{
  width: 78%;
}
.edit-btn:hover{
  background: #515972;
}
.complete-edit-btn{
  width: 78%;
}
.complete-edit-btn:hover{
  background: #515972;
}
.cancel-edit-btn{
  width: 22%;
}
.cancel-edit-btn:hover{
  background: #b91c1c;
}
</style>