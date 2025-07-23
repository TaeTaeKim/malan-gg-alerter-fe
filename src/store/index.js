import { defineStore } from "pinia";
import { itemOptions } from "@/constants/itemOptions";
import { reactive } from "vue";
import api from "@/plugins/axios";
import { itemsData } from "@/data/itemsData.js";

export const useMainStore = defineStore("main", {
  state: () => ({
    // 현재 선택된 아이템 정보
    currentItem: null,
    // 화면에 등록한 아이템 리스트 (로컬 상태)
    registeredItems: [], // { id, image, option, alarmOn }
    // 전체 아이템 목록 (검색용)
    allItems: [], // [{ id: string, nameKorean: string }]
    imageCache: new Map(),
    itemBids: reactive(new Map()),
    bidIntervalId: null,
  }),

  actions: {
    /** 1) 전체 아이템 목록 조회하여 allItems에 저장 */
    async fetchAllItems() {
      const res = await api.get(`/malangg/api/items`);
      // 가정: API가 [{ id: '1001', name: '초승달검' }, …] 형태로 준다고 하면:
      this.allItems = res.data.map((item) => ({
        id: item.itemCode,
        nameKorean: item.itemName,
      }));
    },

    /** 2) 검색어에 매칭되는 후보 추출 (optional helper) */
    searchItemCandidates(query) {
      if (!query) return [];
      const q = query.toLowerCase().replace(/\s+/g, "");

      return this.allItems
        .filter((item) => {
          // Remove spaces from item name and create a normalized version
          const normalizedName = item.nameKorean
            .replace(/\s+/g, "")
            .toLowerCase();
          // Also create English-only version for matching English prefixes
          const englishPrefix =
            item.nameKorean.match(/^[a-zA-Z]+/)?.[0]?.toLowerCase() || "";

          return (
            normalizedName.includes(q) || // Match normalized name
            (englishPrefix && q.startsWith(englishPrefix))
          ); // Match English prefix
        })
        .slice(0, 10);
    },

    /** 3) 아이콘 URL 반환 헬퍼 */
    getItemIconUrl(itemId) {
      if (this.imageCache.has(itemId)) {
        return this.imageCache.get(itemId);
      }
      const url = `https://maplestory.io/api/gms/200/item/${itemId}/icon?resize=2`;
      // Preload image
      const img = new window.Image();
      img.src = url;
      this.imageCache.set(itemId, url);
      return url;
    },

    // 검색된 아이템 정보를 currentItem에 저장 (JavaScript 모듈에서 직접 조회)
    fetchItem(query) {
      const item = this.allItems.find((i) => i.nameKorean === query);
      if (item) {
        const itemData = itemsData[item.id];
        
        if (itemData) {
          this.currentItem = {
            id: item.id,
            name: item.nameKorean,
            iconUrl: this.getItemIconUrl(item.id),
            metaInfo: itemData.metaInfo,
            typeInfo: itemData.typeInfo,
          };
        } else {
          // Fallback if item not found in data
          this.currentItem = {
            id: item.id,
            name: item.nameKorean,
            iconUrl: this.getItemIconUrl(item.id),
            metaInfo: {},
            typeInfo: {},
          };
        }
      } else {
        this.currentItem = null;
      }
    },
    /** 4) 등록된 아이템 목록을 가져온다. */
    async fetchRegisteredItems() {
      await api.get(`/api/alerter`).then((res) => {
        this.registeredItems = res.data.map((resItem) => ({
          id: resItem.id,
          itemId: resItem.itemId,
          koreanName: resItem.itemName,
          imageUrl: this.getItemIconUrl(resItem.itemId),
          option: Object.fromEntries(
            itemOptions.map((opt) => [opt.key, resItem.itemOptions?.[opt.key]])
          ),
          tradeType: resItem.tradeType,
          alarmOn: resItem.isAlarm,
        }));
      });
    },

    clearRegisteredItems() {
      this.registeredItems = [];
    },

    /** 4) 등록 (Spring Boot 서버 post) */
    async registerItem(itemId, option, tradeType) {
      // 서버 스펙: POST /alerter?itemId=<id>  body: ItemCondition JSON
      try {
        await api.post(
          `/api/alerter?itemId=${itemId}&tradeType=${tradeType}`,
          option
        );
        // After successful registration, fetch the updated list
        await this.fetchRegisteredItems();
      } catch (error) {
        console.error("Error registering item:", error);
      }
    },

    /** 5) 수정 (PATCH) */
    async updateItem(alertId, newOption) {
      await api.patch(`/api/alerter`, newOption, {
        params: { alertId },
      });
      await this.getAllItemBids();
      const it = this.registeredItems.find((i) => i.id === alertId);
      if (it) it.option = newOption;
    },

    /** 6) 삭제 (DELETE) */
    async deleteItem(alertId) {
      await api.delete(`/api/alerter`, {
        params: { alertId: alertId },
      });
      this.registeredItems = this.registeredItems.filter(
        (i) => i.id !== alertId
      );
    },

    /** (기존) 알람 토글 */
    async toggleAlarm(alertId) {
      const it = this.registeredItems.find((i) => i.id === alertId);
      await api.patch(`/api/alerter/toggle/${alertId}`);
      if (it) it.alarmOn = !it.alarmOn;
    },
    startBidPolling() {
      this.getAllItemBids();

      //set Interval
      this.bidIntervalId = setInterval(() => {
        this.getAllItemBids();
      }, 60000); // 1minute
    },
    stopBidPolling() {
      if (this.bidIntervalId) {
        clearInterval(this.bidIntervalId);
        this.bidIntervalId = null;
      }
    },

    async getAllItemBids() {
      await api.get(`/api/alerter/bid`).then((res) => {
        Object.entries(res.data).forEach(([alertId, bids]) => {
          const alertIdNum = parseInt(alertId, 10);
          this.itemBids.set(alertIdNum, bids);
        });
      });
    },
    async turnOffBid(itemId, bidId) {
      await api.delete(`/api/alerter/bid/${bidId}`);
      await this.getAllItemBids();
    },
  },
});
