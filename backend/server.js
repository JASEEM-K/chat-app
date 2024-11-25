import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDB } from './lib/connectDB.js'
import authRoute from './Routes/authRoutes.js'
import messageRoute from './Routes/messageRoute.js'
import { app, server } from './lib/socket.js'
import path from 'path'

dotenv.config()

const PORT = process.env.PORT || 5000
const __dirname = path.resolve()

const corsConfig = {
    origin: "http://localhost:5173",
    credentials: true,
}

app.use(cookieParser())
app.use(express.json({
    limit:"5mb",
}))
app.use(cors(corsConfig))

app.use('/api/auth',authRoute)
app.use('/api/message',messageRoute)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
    })
}

server.listen(PORT, () => {
    connectDB()
    console.log(`listening on http://localhost:${PORT}`)
})