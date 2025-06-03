import { defineStore } from "pinia";
import axios, { HttpStatusCode } from "axios";
import { useMainStore } from "@/store";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken')
    }),
    getters:{
        isAuthenticated: (state) => !!state.accessToken,
    },
    actions: {
        async login(id, pwd){
            
            try {
                const response = await axios.post(`${__API_PREFIX__}/api/malan-alter/auth/login`, {'username':id,'password': pwd})
                const {accessToken, refreshToken, expireAt} = response.data
                this.setTokens(accessToken, refreshToken)
                return {success: true}
            } catch (error){
                if (error.response?.data?.code === 'AUTH_005') {
                    return { 
                        success: false, 
                        message: error.response.data.message 
                    }
                }
                return { 
                    success: false, 
                    message: '로그인에 실패했습니다.' 
                }
            }
        },
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
        async signup(id, pwd){
            try{
                await axios.post(`${__API_PREFIX__}/api/malan-alter/auth/register`, {'username':id,'password': pwd})
            }catch(error){
                console.error("SignUp Fail", error)
                throw error
            }
        },
        isTokenExpired(){
            if(!this.accessToken) return true
            try{
                const payload = JSON.parse(atob(this.accessToken.split('.')[1]))
                return Date.now() >= payload.exp * 1000
            }catch(e){
                return true
            }
        },

        async logout(){
            await axios.post(`${__API_PREFIX__}/api/malan-alter/auth/logout`)
            this.accessToken = null
            this.refreshToken = null
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            // clear main store's registeredItems state.
            const mainStore = useMainStore()
            mainStore.clearRegisteredItems()
        },
        async renewToken(){
            const payload =JSON.parse(atob(this.accessToken.split('.')[1]))
            const refreshResponse = await axios.post(`${__API_PREFIX__}/api/malan-alter/auth/refresh`, {
                "username" : payload.sub,
                "refreshToken" : this.refreshToken
            })
            try{
                if(refreshResponse.status== HttpStatusCode.Ok){
                    const { accessToken, refreshToken} =  refreshResponse.data
                    this.setTokens(accessToken, refreshToken)
                }else{
                    console.warn(`API Server Return Status : ${refreshResponse.status}`)
                    this.logout()
                }
            }catch(error){
                console.error("Error occur in refreshing token")
                this.logout()
            }
        }
    },
})