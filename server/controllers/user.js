import prisma from '../prismaClient.js'

// Tạo người dùng mới
export const createUser = async (req, res) => {
    const { email, password, name } = req.body

    try {
        const user = await prisma.user.create({
            data: {
                email,
                password,
                name,
            }
        })

        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json({
            error: 'Đã xảy ra lỗi khi tạo người dùng'
        })
    }
}

// Lấy thông tin người dùng (profile)
export const getUserProfile = async (req, res) => {
    const userId = req.user.id // Giả sử thông tin người dùng đã được xác thực và có trong req.user

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                playlists: true, // Bao gồm thông tin playlist của người dùng
                songs: true, // Bao gồm thông tin bài hát của người dùng
            }
        })

        if (!user) {
            return res.status(404).json({
                error: 'Người dùng không tồn tại'
            })
        }

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({
            error: 'Đã xảy ra lỗi khi lấy thông tin người dùng'
        })
    }
}

// Cập nhật thông tin người dùng
export const updateUser = async (req, res) => {
    const userId = req.user.id
    const { name, email } = req.body

    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: { name, email },
        })

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({
            error: 'Đã xảy ra lỗi khi cập nhật thông tin người dùng'
        })
    }
}

// Xóa tài khoản người dùng
export const deleteUser = async (req, res) => {
    const userId = req.user.id

    try {
        const user = await prisma.user.delete({
            where: { id: userId },
        })

        return res.status(200).json({
            message: 'Tài khoản đã được xóa thành công'
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Đã xảy ra lỗi khi xóa tài khoản'
        })
    }
}