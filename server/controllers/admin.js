import prisma from '../prismaClient.js'

// --- Xem tất cả người dùng ---
export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                playlists: true,  // Nếu cần thông tin playlist của người dùng
                songs: true,      // Nếu cần thông tin bài hát của người dùng
            },
        })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error })
    }
}

// --- Sửa thông tin người dùng ---
export const updateUserInfo = async (req, res) => {
    const { id } = req.params
    const { email, password, name, role, userType } = req.body

    try {
        const user = await prisma.user.findUnique({ where: { id: parseInt(id) } })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        // Admin có thể sửa thông tin người dùng khác
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                email,
                password,
                name,
                role,
                userType,
            },
        })

        res.status(200).json(updatedUser) // Trả về thông tin người dùng đã cập nhật
    } catch (error) {
        res.status(500).json({ message: 'Error updating user info', error })
    }
}

// --- Thêm quyền admin cho người dùng ---
export const assignAdminRole = async (req, res) => {
    const { id } = req.params

    try {
        const user = await prisma.user.findUnique({ where: { id: parseInt(id) } })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        // Kiểm tra xem người dùng đã có quyền admin chưa
        if (user.role === 'ADMIN') {
            return res.status(400).json({ message: 'User is already an admin' })
        }

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                role: 'ADMIN', // Cập nhật quyền thành admin
            },
        })

        res.status(200).json(updatedUser) // Trả về thông tin người dùng đã cập nhật quyền
    } catch (error) {
        res.status(500).json({ message: 'Error assigning admin role', error })
    }
}

// --- Xóa quyền admin của người dùng ---
export const removeAdminRole = async (req, res) => {
    const { id } = req.params

    try {
        const user = await prisma.user.findUnique({ where: { id: parseInt(id) } })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        // Kiểm tra xem người dùng có quyền admin hay không
        if (user.role !== 'ADMIN') {
            return res.status(400).json({ message: 'User is not an admin' })
        }

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                role: 'USER', // Cập nhật quyền thành người dùng thường
            },
        })

        res.status(200).json(updatedUser) // Trả về thông tin người dùng đã cập nhật quyền
    } catch (error) {
        res.status(500).json({ message: 'Error removing admin role', error })
    }
}

// --- Xóa người dùng ---
export const deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        const user = await prisma.user.findUnique({ where: { id: parseInt(id) } })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        // Xóa người dùng
        await prisma.user.delete({
            where: { id: parseInt(id) },
        })

        res.status(200).json({ message: 'User deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error })
    }
}

// --- Xóa bài hát ---
export const deleteSongAdmin = async (req, res) => {
    const { id } = req.params

    try {
        const song = await prisma.song.findUnique({ where: { id: parseInt(id) } })
        if (!song) {
            return res.status(404).json({ message: 'Song not found' })
        }

        // Admin có thể xóa bài hát của bất kỳ người dùng nào
        await prisma.song.delete({
            where: { id: parseInt(id) },
        })

        res.status(200).json({ message: 'Song deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting song', error })
    }
}

// --- Xóa playlist ---
export const deletePlaylist = async (req, res) => {
    const { id } = req.params

    try {
        const playlist = await prisma.playlist.findUnique({ where: { id: parseInt(id) } })
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' })
        }

        // Admin có thể xóa playlist của bất kỳ người dùng nào
        await prisma.playlist.delete({
            where: { id: parseInt(id) },
        })

        res.status(200).json({ message: 'Playlist deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting playlist', error })
    }
}