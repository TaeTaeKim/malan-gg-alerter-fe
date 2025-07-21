import {defineStore} from "pinia";
import api from "@/plugins/axios";


export const useUserStore = defineStore('userStore', {
    state:() => ({
        currentUser: null
    }),
    actions: {
        async getCurrentUserInfo(){
            const res = await api.get(`/api/user`)
            this.currentUser = {
                isAlarm: res.data.isAlarm,
                minAlarmTime: res.data.minTime,
                maxAlarmTime: res.data.maxTime,
                isAlarmTime: res.data.isAlarmTime
            }
        },

        async toggleCurrentUserAlarm(){
            await api.patch(`/api/user/alarm`)
            if(this.currentUser){
                this.currentUser.isAlarm = !this.currentUser.isAlarm
            }
        },
        async updateUserAlarmTime(minTime, maxTime){
            await api.patch(`/api/user/alarmTime`, {
                minTime: minTime,
                maxTime: maxTime
            })
            // Fetch updated user info after patch
            await this.getCurrentUserInfo()
            if (this.currentUser) {
                this.currentUser.minAlarmTime = minTime
                this.currentUser.maxAlarmTime = maxTime
            }

        }

    }
})
