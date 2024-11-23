import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


export const useChatStore = create((set) => ({
    chats: [],
    users: [],
    selectedUser: null,
    isGettingChats: false,
    isUsersLoading: false,
    isSelectedUser: false,
    isSendingMessage: false,

    getChats: async (id) => {
        set({isGettingChats: true})
        try {
            const res = await axiosInstance.get(`/message/${id}`)
            set({chats: res.data})
        } catch (error) {
            console.log("Error in getting chats", error)
            toast.error("Something went wrong")
        } finally {
          set({ isGettingChats: false })
        }
    },

    setSelectedUser: (user) => set({selectedUser:user}),


    getUsers: async () => {
        set({isUsersLoading: true})
        try {
            const res = await axiosInstance.get('/message/getSideBar')

            console.log("GetUsers Clg")
            console.log(res.data.users)
            set({users: res.data})
        } catch (error) {
            console.log("Error in getting chats", error.response.data.error)
            toast.error("Something went wrong")
        } finally {
          set({ isUsersLoading: false })
        }
    },

    sendMessage: async (id) => {
        set({isSendingMessage: true})
        try {
            const res = await axiosInstance.get(`/message/send/${id}`)

            set({chats: res.data})
        } catch (error) {
            console.log("Error in getting chats", error)
            toast.error("Something went wrong")
        } finally {
          set({ isGettingChats: false })
        }
    },



}))