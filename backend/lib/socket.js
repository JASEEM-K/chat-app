import express from 'express'
import { Server } from 'socket.io'
import http from 'http'


const app = express()
const server = http.createServer(app)

const io = new Server(server,{
    cors: {
        origin: ["http://localhost:5173"],
     }
})

// Store Online users 
let usersSocketMap = {}

io.on("connection",(socket) => {

    const userId = socket.handshake.query.userId
    if(userId) usersSocketMap[userId] = socket.id
    socket.broadcast.emit('Get-online-users',Object.keys(usersSocketMap))
    console.log("User Connected :",usersSocketMap)

    socket.on("disconnect", () => {
        delete usersSocketMap[userId]
        socket.broadcast.emit('Get-online-users', Object.keys(usersSocketMap))
    })
})


export { app , server}