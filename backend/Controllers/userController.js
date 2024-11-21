import { generateToken } from '../lib/Utils.js'
import User from '../Models/userModel.js'
import bcrypt from 'bcryptjs'

export const signUp = async (req,res) => {
    try {
        const {username , email , password , fullName } = req.body
        if(!username || !email || !password || !fullName){
            return res.status(400).json({error:"All fields are required"})
        }

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        if(!emailRegex.test(email)){
            return res.status(400).json({error:"Invalid email"})
        }

        const usernameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9_]{1,14}[a-zA-Z0-9])?$/g
        if(!usernameRegex.test(username)){
            return res.status(400).json({error:"Invalid Username format"})
        }

        if(password.length < 6){
            return res.status(400).json({error: "Password must be at least 6 characters"})
        }

        const satl = await bcrypt.getSalt(10)
        const hashPass = await bcrypt.hash(password,satl)

        const newUser = new User({
            username,
            email,
            password: hashPass,
            fullName,
        })

        if(newUser){
            generateToken(newUser._id, res)
            await newUser.save()
            return res.status(200).json({user:newUser})
        }else{
            return res.status(500).json({error:"Something went wrong"})
        }

    } catch (error) {
        console.error("Error in Signing User :", error)
        return res.status(500).json({error:"Something went wrong"})
    }
}

export const login = async (req,res) => {
    try {
        const { username , password } = req.body
        const user = await User.findOne({username})
        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({error:"Invalid credentials"})
        }
        generateToken
        return res.status(200).json({user})
    } catch (error) {
        console.error("Error in Logging User :", error)
        return res.status(500).json({error:"Something went wrong"})
    }
}

export const logout = async (req,res) => {
    try {
        res.cookie('jwt', '', {maxAge: 0})
        res.status(200).json({message:"Logout successful"})
    } catch (error) {
        console.error("Error in Logging out User :", error)
        return res.status(500).json({error:"Something went wrong"})
    }
}

export const authCheck = (req,res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in auth check",error)
        return res.status(500).json({error:"Something went wrong"})
    }
}