import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";


export const useChatStore = create((set,get) => ({
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

            set({users: res.data})
        } catch (error) {
            console.log("Error in getting Sidebar USers", error.response.data.error)
            toast.error("Something went wrong")
        } finally {
          set({ isUsersLoading: false })
        }
    },

    sendMessage: async (messageData) => {
        set({isSendingMessage: true})
        const { chats , selectedUser } = get()
        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData)

            set({chats: [...chats,res.data]})

        } catch (error) {
            console.log("Error in Sending Messages", error)
            toast.error("Something went wrong")
        } finally {
          set({ isGettingChats: false })
        }
    },

    connectSocketChats: () => {
        const { selectedUser } = get()
        if(!selectedUser) return

        const socket  = useAuthStore.getState().socket
        socket.on("Message",(message) => {
            set({chats: [...get().chats,message]})
        })
    },

    disconnectChat: () => {
        const socket = useAuthStore.getState().socket
        socket.off("Message")
    },

}))