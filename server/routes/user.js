import express from 'express'
import {
    createUser,
    getUserProfile,
    updateUser,
    deleteUser
} from '../controllers/user.js'

const router = express.Router()

// --- Tạo người dùng mới ---
router.post('/register', createUser)

// --- Lấy thông tin người dùng (Profile) ---
router.get('/profile', getUserProfile)

// --- Cập nhật thông tin người dùng ---
router.put('/profile', updateUser)

// --- Xóa tài khoản người dùng ---
router.delete('/profile', deleteUser)

export default router