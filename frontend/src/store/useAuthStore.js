import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'

export const useAuthStore = create((set) => ({
    authUser: null,
    isLogining: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    isSigninngUp: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check/")

            set({ authUser: res.data})
        } catch (error) {
            console.log('Error in checking auth',error)
            set({ authUser: null})
        } finally {
            set({ isCheckingAuth: false})
        }
    },

    signUp: async ({username , email , password }) => {
        try {
            set({ isSigninngUp: true})
            const res = await axiosInstance.post('/auth/signup',{username , email , password},)

            set({authCheck: res})
        } catch (error) {
            console.log('Error in signing up',error)
        } finally {
            set({ isSigninngUp: false})
        }

    }
}))