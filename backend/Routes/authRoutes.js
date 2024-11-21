import express from 'express'
import cloudinary from '../lib/cloudinary.js'
import User from '../Models/userModel.js'
import { ProtectedRoute } from '../middleware/ProtectedRoute.js'
import { authCheck, login, logout, signUp } from '../Controllers/userController.js'
const route = express.Router()


route.post('/signup',signUp)

route.post('/login',login)

route.get('/logout',logout)

route.get('/check',ProtectedRoute,authCheck)

route.put('/update',ProtectedRoute , async (req,res) =>{
    try {
        const { profilePic } = req.body
        if(!profilePic){
            return res.status(400).json({error:"Profile Pic is required"})
        } 
        const cloudinaryResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(req.user._id, {profilePic: cloudinaryResponse.secure_url}, {new: true})

        res.status(200).json({updatedUser})
    } catch (error) {
        console.log("Error in updating profile pic",error)
        res.status(500).json({error:"Something went wrong"})
    }
})

export default route