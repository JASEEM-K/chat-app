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

io.on("connection",(socket) => {

    socket.on("disconnect",() => {

    })
})


export { app , server}