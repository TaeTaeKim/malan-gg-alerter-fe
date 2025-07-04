import {defineStore} from "pinia";
import axios from "axios";


export const useUserStore = defineStore('userStore', {
    state:() => ({
        currentUser: null
    }),
    actions: {
        async getCurrentUserInfo(){
            const res = await axios.get(`${__API_PREFIX__}/api/user`)
            this.currentUser = {
                isAlarm: res.data.isAlarm,
                minAlarmTime: res.data.minTime,
                maxAlarmTime: res.data.maxTime,
                isAlarmTime: res.data.isAlarmTime
            }
        },

        async toggleCurrentUserAlarm(){
            await axios.patch(`${__API_PREFIX__}/api/user/alarm`)
            if(this.currentUser){
                this.currentUser.isAlarm = !this.currentUser.isAlarm
            }
        },
        async updateUserAlarmTime(minTime, maxTime){
            await axios.patch(`${__API_PREFIX__}/api/user/alarmTime`, {
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