import express from 'express'
import { ProtectedRoute } from '../middleware/ProtectedRoute.js'
import { getMessages, getUserSideBar, sendMessage } from '../Controllers/messageController.js'


const route = express.Router()

route.get('/getSideBar',ProtectedRoute,getUserSideBar)

route.get('/:id',ProtectedRoute,getMessages)

route.post('/send/:id',ProtectedRoute,sendMessage)

export default route