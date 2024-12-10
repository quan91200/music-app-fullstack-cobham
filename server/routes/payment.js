import express from 'express'
import {
    createPayment,
    updatePaymentStatus,
    getPaymentsByUser,
    getAllPayments
} from '../controllers/payment.js'

const router = express.Router()

// --- Tạo mới thanh toán ---
router.post('/create', createPayment)

// --- Cập nhật trạng thái thanh toán (thành công, thất bại) ---
router.put('/update-status', updatePaymentStatus)

// --- Lấy tất cả các thanh toán của người dùng ---
router.get('/:userId', getPaymentsByUser)

// --- Lấy tất cả các thanh toán ---
router.get('/', getAllPayments)

export default router