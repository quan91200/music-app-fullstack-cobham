import prisma from '../prismaClient.js'

// --- Thêm playlist ---
export const addPlaylist = async (req, res) => {
    const { name, privacy } = req.body
    const userId = req.user.id // ID của người dùng hiện tại

    try {
        const newPlaylist = await prisma.playlist.create({
            data: {
                name,
                userId,
                privacy,
            },
        })
        res.status(201).json(newPlaylist)
    } catch (error) {
        res.status(500).json({ message: 'Error adding playlist', error })
    }
}

// --- Sửa playlist ---
export const updatePlaylist = async (req, res) => {
    const { id } = req.params
    const { name, privacy } = req.body
    const userId = req.user.id // ID của người dùng hiện tại

    try {
        const playlist = await
            prisma.playlist.findUnique({ where: { id: parseInt(id) } })
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' })
        }

        // Kiểm tra xem người dùng có quyền sửa playlist này không (người dùng phải là chủ của playlist)
        if (playlist.userId !== userId) {
            return res.status(403).json({
                message: 'You do not have permission to update this playlist'
            })
        }

        const updatedPlaylist = await prisma.playlist.update({
            where: { id: parseInt(id) },
            data: {
                name,
                privacy,
            },
        })

        res.status(200).json(updatedPlaylist)
    } catch (error) {
        res.status(500).json({ message: 'Error update playlist', error })
    }
}

// --- Xóa playlist --- (User)
export const deletePlaylistUser = async (req, res) => {
    const { id } = req.params
    const userId = req.user.id // Lấy thông tin người dùng từ JWT hoặc session

    try {
        const playlist = await prisma.playlist.findUnique({
            where: { id: parseInt(id) }
        })
        if (!playlist) {
            return res.status(404).json({
                message: 'Playlist not found'
            })
        }

        // Kiểm tra nếu playlist thuộc về người dùng này mới cho phép xóa
        if (playlist.userId !== userId) {
            return res.status(403).json({
                message: 'You are not the owner of this playlist'
            })
        }

        await prisma.playlist.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({
            message: 'Playlist deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting playlist', error
        })
    }
}

// Lấy tất cả album
export const getAllPlaylist = async (req, res) => {
    try {
        // Truy vấn tất cả album từ cơ sở dữ liệu
        const albums = await prisma.album.findMany()

        // Trả về danh sách album
        return res.status(200).json(albums)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: 'Đã xảy ra lỗi khi lấy danh sách album'
        })
    }
}