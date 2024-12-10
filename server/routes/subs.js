import express from 'express'
import {
    createSubscription,
    updateSubscription,
    assignSubscription,
    getUserSubscriptions,
    cancelSubscription
} from '../controllers/subs.js'
import {
    isAdmin,
    isAuthenticated
} from '../middleware/authMiddleware.js'

const router = express.Router()

// Tạo đăng ký mới
router.post('/subscriptions', isAuthenticated, createSubscription)

// Cập nhật trạng thái đăng ký
router.put('/subscriptions/:subscriptionId', isAuthenticated, updateSubscription)

// Admin phân bổ đăng ký cho người dùng khác
router.post('/subscriptions/assign', isAdmin, assignSubscription)

// Lấy danh sách đăng ký của người dùng
router.get('/subscriptions/:userId', isAuthenticated, getUserSubscriptions)

// Hủy đăng ký
router.delete('/subscriptions/:subscriptionId/cancel', isAuthenticated, cancelSubscription)

export default router