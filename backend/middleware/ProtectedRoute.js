import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js';

export const ProtectedRoute = async (req, res, next) => {
    try {
        const token = await req.cookies.jwt;
        if(!token){
            return res.status(401).json({ error: 'Unauthorized -No token ' })
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        if(!decode){
            return res.status(401).json({ error: 'Unauthorized -Invalid token' })
        }
        const user = await User.findById(decode.userId).select("-password")
        if(!user){
            return res.status(404).json({ error: 'User not found' })
        }
        req.user = user
        next()
    } catch (error) {
        if(error.name === "JsonWebTokenError"){
            return res.status(401).json({ error: 'Unauthorized -Token invalid' })
        }
        if(error.name === "TokenExpiredError"){
            return res.status(401).json({ error: 'Unauthorized -Token expired' })
        }
        console.log("Error in Protected Route",error)
        return res.status(500).json({ error: 'Something went wrong' })
    }
}
