import mongoose from 'mongoose'
import { config  } from 'dotenv'

config()

export const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected : ${con.connection.host}`)
    } catch (error) {
        console.log('Error in DB connection', error)
    }
}