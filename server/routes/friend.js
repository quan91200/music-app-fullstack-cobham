import express from 'express'
import {
    addFriend,
    removeFriend,
    getFriends
} from '../controllers/friend.js'

const router = express.Router()

// --- Thêm bạn bè ---
router.post('/add', addFriend)

// --- Xóa bạn bè ---
router.delete('/remove/:friendId', removeFriend)

// --- Lấy danh sách bạn bè ---
router.get('/', getFriends)

export default router