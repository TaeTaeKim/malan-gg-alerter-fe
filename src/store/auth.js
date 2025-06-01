import { defineStore } from "pinia";
import axios from "axios";

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
                return true
            } catch (error){
                console.error(error)

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
        async logout(){
            await axios.post(`${__API_PREFIX__}/api/malan-alter/auth/logout`)
            this.accessToken = null
            this.refreshToken = null
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')

        }
    },
})