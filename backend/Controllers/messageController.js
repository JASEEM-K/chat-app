import cloudinary from "../lib/cloudinary.js"
import Message from "../Models/messageModel.js"
import User from "../Models/userModel.js"


export const getUserSideBar = async (req, res) => {
    try {
        const users = await User.find({_id: {$ne: req.user._id}}).select("username profilePic fullName _id")

        res.status(200).json({users})
    } catch (error) {
        console.log("Error in getting user side bar", error)
        return res.status(500).json({error: "Something went wrong"})       
    }
}

export const getMessages = async (req, res) => {
    try {
        const userId = req.params.id
        const messages = await Message.find({
            $or:[
                {sender: req.user._id, receiver: userId},
                {sender: userId, receiver: req.user._id}
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getting messages", error)
        return res.status(500).json({error: "Something went wrong"})
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text ,image } = req.body
        const receiverId = req.params.id
        let imgUrl
        if((!text && !image) || (text && image)){
            return res.status(400).json({error: "Please provide text or profile pic"})
        }

        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imgUrl = uploadResponse.secure_url
        }
        const newMessage = new Message({
            text,
            img:imgUrl,
            sender: req.user._id,
            receiver: receiverId,
        })

        await newMessage.save()
        res.status(200).json(newMessage)
    } catch (error) {
        
    }
} 