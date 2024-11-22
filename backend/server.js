import express from 'express'
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDB } from './lib/connectDB.js'
import authRoute from './Routes/authRoutes.js'
import messageRoute from './Routes/messageRoute.js'

dotenv.config()

const app = express()
const server = http.createServer(app)
const socket = new Server(server)

const PORT = process.env.PORT || 5000
const corsConfig = {
    origin: "http://localhost:5173",
    credentials: true,
}

app.use(cookieParser())
app.use(express.json())
app.use(cors(corsConfig))

app.use('/api/auth',authRoute)
app.use('/api/message',messageRoute)

app.listen(PORT, () => {
    connectDB()
    console.log(`listening on http://localhost:${PORT}`)
})