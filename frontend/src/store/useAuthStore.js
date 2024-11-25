import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast'
import { io } from 'socket.io-client'

const BASE_URL = import.meta.env.NODE_ENV === "development" ? 'http://localhost:5001' : '/'

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isLogining: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    isSigninngUp: false,
    OnlineUsers : [],
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check/")

            set({ authUser: res.data})
            get().connectSocket()
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
            toast.error('Login failed')
            console.log('Error in login',error)
        } finally {
            set({ isLogining: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.get('/auth/logout')

            set({ authUser: null })
            get().disConnectSocket()
        } catch (error) {
            console.log('Error in logout',error)
            toast.error("Error in logout")
            //error.response.data.message
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true})
        try {
            const res = await axiosInstance.put("/auth/update",data)

            set({ authUser: res.data})
            toast.success("Updated Profile Successfully")
        } catch (error) {
            console.log("Error in Updating Profile",error)
            toast.error("Something went wrong")
        } finally {
            set({ isUpdatingProfile: false})
        }
    },

    connectSocket: () => {
        const { authUser } = get() 
        if(!authUser || get().socket?.connected) return
        const socket = io(BASE_URL,{
            query:{
                userId:authUser._id
            }
        })
        socket.connect()

        set({socket:socket})
        
        socket.on("Get-online-users",(users) => {
            set({OnlineUsers:users})
        })
    },

    disConnectSocket: () => {
        if(get().socket?.connected) get().socket.disconnect()
    },

}))