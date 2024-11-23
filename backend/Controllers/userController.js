import { generateToken } from '../lib/Utils.js'
import User from '../Models/userModel.js'
import bcrypt from 'bcryptjs'

export const signUp = async (req,res) => {
    try {
        const {email , password , fullName } = req.body
        if(!email || !password || !fullName){
            return res.status(400).json({error:"All fields are required"})
        }

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if(!emailRegex.test(email)){
            return res.status(400).json({error:"Invalid email"})
        }

        const emailAlreadyExists = await User.findOne({email})
        if(emailAlreadyExists){
            return res.status(400).json({error:"Email already exists"})
        }

        if(password.length < 6){
            return res.status(400).json({error: "Password must be at least 6 characters"})
        }

        const salt = bcrypt.genSaltSync(10)
        const hashPass = await bcrypt.hash(password,salt)

        const newUser = new User({
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
        const { email , password } = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({error:"Invalid credentials"})
        }
        generateToken(user._id, res)
        user.password = undefined
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