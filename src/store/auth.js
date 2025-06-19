import { defineStore } from "pinia";
import axios, { HttpStatusCode } from "axios";
import { useMainStore } from "@/store";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
        isRefreshing: false,
    }),
    getters:{
        isAuthenticated: (state) => !!state.accessToken,
    },
    actions: {
        setTokens(accessToken, refreshToken){
            this.accessToken = accessToken,
            this.refreshToken = refreshToken
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        },
        initialize() {
            if (this.accessToken) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`
            }
        },

        async logout(){
            await axios.post(`${__API_PREFIX__}/api/alerter/auth/logout`)
            this.accessToken = null
            this.refreshToken = null
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            // clear main store's registeredItems state.
            const mainStore = useMainStore()
            mainStore.clearRegisteredItems()
        },
        async renewToken(){
            if(this.isRefreshing){
                while (this.isRefreshing) {
                    await new Promise(resolve => setTimeout(resolve, 10))
                }
                return // First refresh is done, use its result
            }
            this.isRefreshing = true
            try{
                const payload =JSON.parse(atob(this.accessToken.split('.')[1]))
                const refreshResponse = await axios.post(`${__API_PREFIX__}/api/alerter/auth/refresh`, {
                    "userId" : payload.sub,
                    "refreshToken" : this.refreshToken
                })
                if(refreshResponse.status === HttpStatusCode.Ok){
                    const { accessToken, refreshToken} =  refreshResponse.data
                    this.setTokens(accessToken, refreshToken)
                }else{
                    console.warn(`API Server Return Status : ${refreshResponse.status}`)
                    this.logout()
                }
            }catch(error){
                console.error("Error occur in refreshing token")
                this.logout()
            }finally {
                this.isRefreshing = false
            }
        }
    },
})