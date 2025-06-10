// src/store/index.js
import { defineStore } from 'pinia'
import { itemOptions } from '@/constants/itemOptions'
import axios from 'axios'

export const useMainStore = defineStore('main', {
  state: () => ({
    // 현재 선택된 이미지
    currentItem: null,
    // 화면에 등록한 아이템 리스트 (로컬 상태)
    registeredItems: [],       // { id, image, option, alarmOn }
    // 전체 아이템 목록 (검색용)
    allItems: [],    // [{ id: string, nameKorean: string }]
    imageCache: new Map(),
  }),

  actions: {
    /** 1) 전체 아이템 목록 조회하여 allItems에 저장 */
    async fetchAllItems() {
      const res = await axios.get(`${__API_PREFIX__}/malangg/api/items`)
      // 가정: API가 [{ id: '1001', name: '초승달검' }, …] 형태로 준다고 하면:
      this.allItems = res.data.map(item => ({
        id: item.itemCode,
        nameKorean: item.itemName
      }))
    },

    /** 2) 검색어에 매칭되는 후보 추출 (optional helper) */
    searchItemCandidates(query) {
      if (!query) return []
      const q = query.toLowerCase()
      return this.allItems.filter(i =>i.nameKorean.includes(q)).slice(0, 10)
    },

    /** 3) 아이콘 URL 반환 헬퍼 */
    getItemIconUrl(itemId) {
      if (this.imageCache.has(itemId)) {
        return this.imageCache.get(itemId)
      }
      const url = `https://maplestory.io/api/gms/200/item/${itemId}/icon?resize=2`
      // Preload image
      const img = new window.Image()
      img.src = url
      this.imageCache.set(itemId, url)
      return url
    },

    // 검색된 아이템 정보를 currentItem에 저장
    fetchItem(query){
      const item = this.allItems.find(i => i.nameKorean === query)
      if(item){
        this.currentItem = {
          id: item.id,
          name: item.nameKorean,
          iconUrl: this.getItemIconUrl(item.id)
        }
      }else{
        this.currentItem = null
      }
    },
    /** 4) 등록된 아이템 목록을 가져온다. */
    async fetchRegisteredItems() {
      await axios.get(`${__API_PREFIX__}/api/alerter`)
      .then(res => {
        res.data.forEach(resItem => {
          this.registeredItems.push({
            id: resItem.id,
            itemId: resItem.itemId,
            koreanName: resItem.itemName,
            imageUrl: this.getItemIconUrl(resItem.itemId),
            option: Object.fromEntries(
              itemOptions.map(opt => [opt.key, resItem.itemOptions?.[opt.key]])
            ),
            alarmOn: resItem.isAlarm
          })

        })
      })
    },

    clearRegisteredItems(){
      this.registeredItems = []
    },

    /** 4) 등록 (Spring Boot 서버 post) */
    async registerItem(itemId, option) {
      // 서버 스펙: POST /alerter?itemId=<id>  body: ItemCondition JSON
      await axios.post(
        `${__API_PREFIX__}/api/alerter?itemId=${itemId}`,
        option
      )
      // 등록후 registeredItems 갱신
      fetchRegisteredItems() // 서버에서 다시 가져오기
    },

    /** 5) 수정 (PATCH) */
    async updateItem(alertId, newOption) {
      await axios.patch(
        `${__API_PREFIX__}/api/alerter`,
        newOption,
        { params: { alertId } }
      )
      const it = this.registeredItems.find(i => i.id === alertId)
      if (it) it.option = newOption
    },

    /** 6) 삭제 (DELETE) */
    async deleteItem(alertId) {
      await axios.delete(`${__API_PREFIX__}/api/alerter`, { params: { alertId: alertId } })
      this.registeredItems = this.registeredItems.filter(i => i.id !== alertId)
    },

    /** (기존) 알람 토글 */
    async toggleAlarm(alertId) {
      const it = this.registeredItems.find(i => i.id === alertId)
      await axios.patch(`${__API_PREFIX__}/api/alerter/toggle/${alertId}`)
      if (it) it.alarmOn = !it.alarmOn
    }
  }
})