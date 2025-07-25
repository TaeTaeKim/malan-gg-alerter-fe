<template>
  <div class="item-card">
    <!--    아이템 이미지, 이름, 설정가격, 알림여부를 결정하는 화면-->
    <div class="item-card-info">
      <img :src="item.imageUrl" alt="" class="item-img" />
      <div class="item-card-name-price">
        <div class="item-card-name">
          <a :href="`https://mapleland.gg/item/${item.itemId}`" class="malan-gg-link" target="_blank"
            rel="noopener noreferrer">
            <span>{{ item.koreanName }}</span>
            <img src="https://mapleland.gg/logo.png" alt="메랜지지로고" class="malan-gg-logo">
          </a>
        </div>
        <div class="item-card-price">
          <div class="item-card-price-range">
            <img src="/static/meso.png" alt="meso" width="12" height="15" class="inline-block mr-03 mt-03">
            {{ item.option.lowPrice?.toLocaleString() || 0 }} 메소
            <div class="ml-03" style="font-size: 19px">~</div>
          </div>
          <div class="item-card-price-range">
            <img src="/static/meso.png" alt="meso" width="12" height="15" class="inline-block mr-03 mt-03">
            <template v-if="item.option.highPrice != null">
              {{ item.option.highPrice.toLocaleString() }} 메소
            </template>
            <template v-else>
              상한 없음
            </template>
          </div>
        </div>
      </div>
      <button class="item-btn delete-btn" @click="confirmDelete">×</button>
    </div>
    <div class="options-container">
      <!-- Other options grid -->
      <div class="options-grid">
        <div v-for="opt in otherOptions" :key="opt.key" class="option-cell">
          <div class="option-label">
            {{ opt.label }}
          </div>
          <div class="option-value">
            <template v-if="item.option[`high${opt.key.toUpperCase()}`] != null">
              {{ item.option[opt.key] || 0 }}~{{ item.option[`high${opt.key.toUpperCase()}`] }}
            </template>
            <template v-else>
              {{ item.option[opt.key] }}
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="edit-alarm-btn">
      <button class="item-btn edit-btn" @click="showEditModal = true">편집하기</button>
      <button class="item-btn alarm-btn" :class="{ active: item.alarmOn }" @click="$emit('toggleAlarm')">
        <img :src="item.alarmOn ? onIcon : offIcon" alt="alarm toggle" class="alarm-img" />
      </button>
    </div>
    <div class="item-bid">
      <h5 class="bid-title" style="margin: 7px;">코멘트목록</h5>
      <!--  alert Id에 맞는 코멘트 리스트 출력-->
      <ul v-if="bids && bids.length > 0" class="bid-list">
        <li v-for="(bid, index) in bids" :key="bid.id" class="bid-item-container"
          style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center;">
            <img src="/static/meso.png" alt="meso" width="12" height="15" style="margin-right: 1px;"
              class="inline-block mt-03">
            <div class="bid-item">
              {{ formatPrice(bid.price) }} | {{ bid.comment.length > 15 ? bid.comment.slice(0, 15) + '...' : bid.comment
              }}
            </div>
          </div>
          <button class="bid-delete-btn" @click="turnOffBid(item.id, bid.id)">×</button>
        </li>
      </ul>
      <p v-else>코멘트가 없습니다.</p>


    </div>
  </div>

  <!-- Edit modal -->
  <EditModal v-if="showEditModal" :initial-values="item.option" @save="handleSave" @cancel="showEditModal = false" />

  <!-- Add confirmation modal -->
  <div v-if="showConfirmModal" class="confirm-modal">
    <div class="confirm-modal-content">
      <p>정말 삭제하시겠습니까?</p>
      <div class="confirm-buttons">
        <button @click="handleDelete" class="confirm-yes">확인</button>
        <button @click="showConfirmModal = false" class="confirm-no">취소</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { itemOptions } from '@/constants/itemOptions'
import { computed, ref } from "vue";
import onIcon from '@/assets/alarm-on.png'
import offIcon from '@/assets/alarm-off.png'
import { useMainStore } from '@/store/index.js'
import EditModal from './EditModal.vue'


const props = defineProps({
  item: Object
})
const emit = defineEmits(["update", "delete", "toggleAlarm"]);
const showEditModal = ref(false);

const otherOptions = itemOptions
  .filter(opt => opt.key !== 'highPrice' && opt.key !== 'lowPrice')
  .map(opt => ({
    ...opt,
    label: opt.label.length > 2 ? opt.label.substring(0, 2) : opt.label
  }))

function handleSave(updatedOptions) {
  showEditModal.value = false;
  emit('update', updatedOptions)
}

const showConfirmModal = ref(false);

function confirmDelete() {
  showConfirmModal.value = true
}

function handleDelete() {
  showConfirmModal.value = false
  emit('delete')
}

// bid list
const store = useMainStore();
const bids = computed(() => {
  const itemId = props.item.id;
  const bidsFromStore = store.itemBids.get(itemId);
  return bidsFromStore || [];
});

function formatPrice(price) {
  if (price >= 100000000) {
    // 1억 이상: 억 단위, 소수점 2자리
    return (price / 100000000).toFixed(2).replace(/\.00$/, '') + ' 억 메소';
  } else if (price >= 100000) {
    // 10만 이상: 만 단위, 소수점 2자리
    return (price / 10000).toFixed(2).replace(/\.00$/, '') + ' 만 메소';
  } else {
    // 그 외: 그냥 숫자
    return price.toLocaleString() + ' 메소';
  }
}

function turnOffBid(alertId, bidId) {
  store.turnOffBid(alertId, bidId)
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
  height: 370px;
  width: 100%;
  min-width: 200px;
  box-sizing: border-box;
  line-height: 0.5;
}

.item-card-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding-bottom: 10px;
  border-bottom: 1px solid #484B56;
}

.item-img {
  height: 42px;
  width: 42px;
  margin-right: 1vw;
}

.malan-gg-logo {
  height: 16px;
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


.item-card-price-range {
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 14px;
}

.item-btn {
  background: none;
}

.delete-btn {
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
  height: 60%;
  gap: 3px;
}

.option-cell {
  display: flex;
  align-items: center;
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

.edit-alarm-btn {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.alarm-btn,
.edit-btn {
  height: 42px;
  border: 1px solid #515972;
}

/* comment css */
.item-bid {
  height: auto;
}

.bid-title {
  margin: 10px 0 10px 0;
}

.bid-list {
  margin: 0;
  padding: 0;
}

.bid-item {
  font-size: small;
}

.bid-delete-btn {
  background: #343741;
  border: none;
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

.alarm-img {
  height: 20px;

}

.edit-btn {
  width: 78%;
  background: #343741;
  color: white;
}

.edit-btn:hover {
  background: #515972;
}


.confirm-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.confirm-modal-content {
  background: #343741;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.confirm-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 15px;
}

.confirm-yes,
.confirm-no {
  padding: 8px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.confirm-yes {
  background: #FF6239;
  color: white;
}

.confirm-no {
  background: #515972;
  color: white;
}

@media(max-width:760px) {
  .item-card {
    height: auto;
  }

  .alarm-btn,
  .edit-btn {
    margin-top: 10px;
    font-size: .8rem;
    height: 5vh;
    border: 1px solid #515972;
  }

  .option-cell {
    height: 3vh;
  }
}
</style>