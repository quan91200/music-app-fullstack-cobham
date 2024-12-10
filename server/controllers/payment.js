import prisma from '../prismaClient.js'

// Tạo mới thanh toán
export const createPayment = async (req, res) => {
    const { userId, amount, paymentMethod } = req.body

    try {
        // Tạo một bản ghi thanh toán mới
        const payment = await prisma.payment.create({
            data: {
                userId,
                amount,
                paymentMethod,
                status: 'PENDING',
                // Mặc định 'PENDING' khi thanh toán chưa hoàn tất
            },
        })

        return res.status(201).json(payment)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: 'Đã xảy ra lỗi khi tạo thanh toán'
        })
    }
}

// Cập nhật trạng thái thanh toán (thành công, thất bại)
export const updatePaymentStatus = async (req, res) => {
    const { paymentId, status } = req.body

    try {
        // Cập nhật trạng thái thanh toán
        const updatedPayment = await prisma.payment.update({
            where: { id: paymentId },
            data: { status },
        })

        return res.status(200).json(updatedPayment)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: 'Đã xảy ra lỗi khi cập nhật thanh toán'
        })
    }
}

// Lấy tất cả các thanh toán của người dùng
export const getPaymentsByUser = async (req, res) => {
    const { userId } = req.params

    try {
        // Lấy tất cả thanh toán của người dùng
        const payments = await prisma.payment.findMany({
            where: { userId },
        })

        return res.status(200).json(payments)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: 'Đã xảy ra lỗi khi lấy thanh toán'
        })
    }
}

// Lấy tất cả các thanh toán
export const getAllPayments = async (req, res) => {
    try {
        // Lấy tất cả thanh toán trong hệ thống
        const payments = await prisma.payment.findMany()

        return res.status(200).json(payments)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: 'Đã xảy ra lỗi khi lấy tất cả thanh toán'
        })
    }
}