import { defineStore } from "pinia";
import { itemOptions } from "../constants/itemOptions";
import { reactive } from "vue";
import api from "@/plugins/axios";
import { searchWithKoreanShortcut } from "../utils/koreanShortcut.js";

export const useMainStore = defineStore("main", {
  state: () => ({
    // 현재 선택된 아이템 정보
    currentItem: null,
    // 화면에 등록한 아이템 리스트 (로컬 상태)
    registeredItems: [], // { id, image, option, alarmOn }
    // 전체 아이템 목록 (검색용)
    allItems: [], // [{ id: string, nameKorean: string }]
    imageCache: new Map(),
    // Cache for item type info fetched from maplestory.io API
    itemTypeCache: reactive(new Map()),
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

    /** 2) 검색어에 매칭되는 후보 추출 (Korean shortcut support added) */
    searchItemCandidates(query) {
      if (!query) return [];

      return searchWithKoreanShortcut(this.allItems, query).slice(0, 10);
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

    /**
     * Fetch item type info from maplestory.io API
     * Returns cached value if available, otherwise fetches from API
     * @param {string|number} itemId - The item ID to fetch
     * @returns {Promise<object|null>} - The item's typeInfo or null if not found
     */
    async fetchItemTypeInfo(itemId) {
      // Return cached value if exists
      if (this.itemTypeCache.has(itemId)) {
        return this.itemTypeCache.get(itemId);
      }

      try {
        const response = await fetch(
          `https://maplestory.io/api/gms/255/item/${itemId}`
        );
        if (!response.ok) {
          // Cache null to avoid repeated failed requests
          this.itemTypeCache.set(itemId, null);
          return null;
        }
        const data = await response.json();
        // Cache the typeInfo
        this.itemTypeCache.set(itemId, data.typeInfo || null);
        return data.typeInfo || null;
      } catch (error) {
        console.error(`Failed to fetch item type info for ${itemId}:`, error);
        // Cache null on error to avoid repeated requests
        this.itemTypeCache.set(itemId, null);
        return null;
      }
    },

    /**
     * Get cached item type info (synchronous)
     * Returns null if not cached - use fetchItemTypeInfo to load first
     * @param {string|number} itemId - The item ID
     * @returns {object|null} - Cached typeInfo or null
     */
    getCachedItemTypeInfo(itemId) {
      return this.itemTypeCache.get(itemId) || null;
    },

    /**
     * Check if item is Equip type (synchronous, requires prior fetch)
     * @param {string|number} itemId - The item ID
     * @returns {boolean} - True if item is Equip type
     */
    isEquipItem(itemId) {
      const typeInfo = this.itemTypeCache.get(itemId);
      return typeInfo?.overallCategory === 'Equip';
    },

    // 검색된 아이템 정보를 currentItem에 저장 (API에서 조회)
    async fetchItem(query) {
      const item = this.allItems.find((i) => i.nameKorean === query);
      if (item) {
        // Fetch item data from maplestory.io API
        try {
          const response = await fetch(
            `https://maplestory.io/api/gms/255/item/${item.id}`
          );

          if (response.ok) {
            const apiData = await response.json();
            // Cache the typeInfo for later use
            this.itemTypeCache.set(item.id, apiData.typeInfo || null);

            this.currentItem = {
              id: item.id,
              name: item.nameKorean,
              iconUrl: this.getItemIconUrl(item.id),
              metaInfo: apiData.metaInfo || {},
              typeInfo: apiData.typeInfo || {},
            };
          } else {
            // Fallback if API request fails
            this.currentItem = {
              id: item.id,
              name: item.nameKorean,
              iconUrl: this.getItemIconUrl(item.id),
              metaInfo: {},
              typeInfo: {},
            };
          }
        } catch (error) {
          console.error(`Failed to fetch item data for ${item.id}:`, error);
          // Fallback on error
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
          option: {
            ...Object.fromEntries(
              itemOptions.map((opt) => [
                opt.key,
                resItem.itemOptions?.[opt.key],
              ])
            ),
            // Include high{KEY} values for range inputs
            ...Object.fromEntries(
              itemOptions
                .filter(
                  (opt) => opt.key !== "lowPrice" && opt.key !== "highPrice"
                )
                .map((opt) => [
                  `high${opt.key.toUpperCase()}`,
                  resItem.itemOptions?.[`high${opt.key.toUpperCase()}`],
                ])
            ),
            // Include combined stats fields (합스탯)
            hapStats: resItem.itemOptions?.hapStats,
            combinedStat: resItem.itemOptions?.combinedStat,
            highCOMBINEDSTAT: resItem.itemOptions?.highCOMBINEDSTAT,
          },
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
