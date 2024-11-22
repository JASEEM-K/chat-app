import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast'

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

    signUp: async (data) => {
        set({ isSigninngUp: true })
        try {
            const res = await axiosInstance.post('/auth/signup',data)

            set({authCheck: res.data})
            toast.success('Signup successful')
        } catch (error) {
            console.error('Error in signing up',error)
            toast.error('Signup failed')
        } finally {
            set({ isSigninngUp: false})
        }

    },

    login: async (data) => {
        set({ isLogining: true })
        try {
            const res = await axiosInstance.post('/auth/login',data)

            set({ authUser: res.data })
            toast.success('Login successful')
        } catch (error) {
            toast.error('Login failed',error)
            console.log('Error in login',error)
        } finally {
            set({ isLogining: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.get('/auth/logout')

            set({ authUser: null })
        } catch (error) {
            console.log('Error in logout',error)
            toast.error(error.response.data.error)
            //error.response.data.message
        }
    }
}))