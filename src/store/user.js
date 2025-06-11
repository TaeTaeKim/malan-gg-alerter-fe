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
                maxAlarmTime: res.data.maxTime
            }
        },

        async toggleCurrentUserAlarm(){
            await axios.patch(`${__API_PREFIX__}/api/user/alarm`)
        },
        async updateUserAlarmTime(minTime, maxTime){
            await axios.patch(`${__API_PREFIX__}/api/user/alarmTime`, {
                minTime: minTime,
                maxTime: maxTime
            })

        }

    }
})