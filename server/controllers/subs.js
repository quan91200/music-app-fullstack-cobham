import prisma from '../prismaClient.js'

// Tạo đăng ký mới
export const createSubscription = async (req, res) => {
    const { userId, plan, subscriptionPeriod } = req.body

    try {
        // Kiểm tra nếu người dùng đã có đăng ký hay chưa
        const existingSubscription = await prisma.subscription.findFirst({
            where: { userId, isActive: true },
        })

        if (existingSubscription) {
            return res.status(400).json({
                error: 'User already has an active subscription'
            })
        }

        // Xử lý ngày hết hạn dựa trên (plan) & (subscriptionPeriod)
        // Xử lý ngày hết hạn dựa trên subscriptionPeriod
        let endDate
        const now = new Date()
        const endDateCopy = new Date(now) // Giữ nguyên giá trị gốc của now
        switch (subscriptionPeriod) {
            case 'DAY':
                endDate = new Date(endDateCopy.setDate(endDateCopy.getDate() + 1)) // 1 ngày
                break
            case 'WEEK':
                endDate = new Date(endDateCopy.setDate(endDateCopy.getDate() + 7)) // 1 tuần
                break
            case 'MONTH':
                endDate = new Date(endDateCopy.setMonth(endDateCopy.getMonth() + 1)) // 1 tháng
                break
            case 'YEAR':
                endDate = new Date(endDateCopy.setFullYear(endDateCopy.getFullYear() + 1)) // 1 năm
                break
            default:
                return res.status(400).json({ error: 'Invalid subscription period' })
        }

        // Xử lý các gói đăng ký (plan)
        switch (plan) {
            case 'regular':
                // Logic cho gói regular
                break
            case 'premium1':
                // Logic cho gói premium1
                break
            case 'premium2':
                // Logic cho gói premium2
                break
            case 'unlimited':
                // Logic cho gói unlimited
                break
            default:
                return res.status(400).json({ error: 'Invalid subscription plan' })
        }

        // Tạo đăng ký mới
        const subscription = await prisma.subscription.create({
            data: {
                userId,
                plan,
                startDate: new Date(),
                endDate,
                isActive: true,
                subscriptionPeriod,
            },
        })

        return res.status(201).json(subscription)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo đăng ký' })
    }
}

// Cập nhật trạng thái đăng ký
export const updateSubscription = async (req, res) => {
    const { subscriptionId, isActive } = req.body

    try {
        // Cập nhật trạng thái của đăng ký
        const updatedSubscription = await prisma.subscription.update({
            where: { id: subscriptionId },
            data: { isActive },
        })

        return res.status(200).json(updatedSubscription)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật đăng ký' })
    }
}

// Admin phân gói đăng ký cho người dùng khác
export const assignSubscription = async (req, res) => {
    const { userId, plan, subscriptionPeriod } = req.body
    const adminId = req.user.id // ID của admin hiện tại

    try {
        // Kiểm tra nếu người dùng có phải là admin không
        const admin = await prisma.user.findUnique({ where: { id: adminId } })
        if (admin.role !== 'ADMIN') {
            return res.status(403).json({ error: 'You are not authorized to assign subscriptions' })
        }

        // Kiểm tra xem người dùng có đăng ký đang hoạt động hay không
        const existingSubscription = await prisma.subscription.findFirst({
            where: {
                userId,
                isActive: true,  // Kiểm tra nếu có đăng ký nào đang hoạt động
            },
        })

        if (existingSubscription) {
            // Nếu có đăng ký hoạt động, trả về lỗi
            return res.status(400).json({
                error: 'User already has an active subscription'
            })
        }

        // Xử lý ngày hết hạn dựa trên subscriptionPeriod
        let endDate
        const now = new Date()
        const endDateCopy = new Date(now) // Giữ nguyên giá trị gốc của now

        switch (subscriptionPeriod) {
            case 'DAY':
                endDate = new Date(endDateCopy.setDate(endDateCopy.getDate() + 1)) // 1 ngày
                break
            case 'WEEK':
                endDate = new Date(endDateCopy.setDate(endDateCopy.getDate() + 7)) // 1 tuần
                break
            case 'MONTH':
                endDate = new Date(endDateCopy.setMonth(endDateCopy.getMonth() + 1)) // 1 tháng
                break
            case 'YEAR':
                endDate = new Date(endDateCopy.setFullYear(endDateCopy.getFullYear() + 1)) // 1 năm
                break
            default:
                return res.status(400).json({ error: 'Invalid subscription period' })
        }

        // Kiểm tra các gói đăng ký
        switch (plan) {
            case 'regular':
                break
            case 'premium1':
                break
            case 'premium2':
                break
            case 'unlimited':
                break
            default:
                return res.status(400).json({ error: 'Invalid subscription plan' })
        }

        // Tạo đăng ký mới cho người dùng
        const subscription = await prisma.subscription.create({
            data: {
                userId,
                plan,
                startDate: new Date(),
                endDate,
                isActive: true,
                subscriptionPeriod,
            },
        })

        return res.status(201).json(subscription)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi phân gói đăng ký' })
    }
}

// Lấy danh sách đăng ký của người dùng
export const getUserSubscriptions = async (req, res) => {
    const { userId } = req.params

    try {
        const subscriptions = await prisma.subscription.findMany({
            where: {
                userId,
            },
        })

        if (!subscriptions.length) {
            return res.status(404).json({ error: 'No subscriptions found for this user' })
        }

        return res.status(200).json(subscriptions)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Error fetching subscriptions' })
    }
}

// Hủy đăng ký
export const cancelSubscription = async (req, res) => {
    const { subscriptionId } = req.params

    try {
        const subscription = await prisma.subscription.update({
            where: { id: subscriptionId },
            data: { isActive: false },
        })

        return res.status(200).json({ message: 'Subscription cancelled successfully', subscription })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Error cancelling subscription' })
    }
}
