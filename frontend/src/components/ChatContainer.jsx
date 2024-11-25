import { useEffect, useRef } from "react"
import { useChatStore } from "../store/useChatStore"
import { useAuthStore } from "../store/useAuthStore"
import { formatMessageTime } from '../lib/utills.js'
import MessageSkeleton from "./Skeleton/MessageSkeleton"
import ChatHeader from "./ChatHeader"
import MessageInput from "./MessageInput"

const ChatContainer = () => {
    const { 
    chats,
    getChats,
    selectedUser,
    connectSocketChats,
    disconnectChat,
    isGettingChats,
    } = useChatStore()

    const { authUser } = useAuthStore()
    const messageEndRef = useRef(null)

    useEffect(() => {
        getChats(selectedUser._id);

        connectSocketChats();

        return () => disconnectChat();
        
    },[selectedUser._id,getChats,connectSocketChats,disconnectChat])

    useEffect(() => {
        if(messageEndRef.current && chats) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth"})
        }
    },[chats])

    if (isGettingChats) {
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );
    }

  return (
    <div className="flex-1 flex flex-col overflow-auto">

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <ChatHeader />
        {chats.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.sender === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >

            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.sender === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.img && (
                <img
                  src={message.img}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  )
}

export default ChatContainer