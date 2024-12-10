import prisma from '../prismaClient.js'

// --- Thêm bài hát ---
export const addSong = async (req, res) => {
    const { title, duration, artistId, albumId } = req.body
    const userId = req.user.id // Lấy userId từ thông tin người dùng đã xác thực

    try {
        const song = await prisma.song.create({
            data: {
                title,
                duration,
                artistId,
                albumId,
                userId, // Liên kết bài hát với người dùng
            },
        })
        res.status(201).json(song) // Trả về bài hát vừa tạo
    } catch (error) {
        res.status(500).json({ message: 'Error adding song', error })
    }
}

// --- Sửa bài hát ---
export const updateSong = async (req, res) => {
    const { id } = req.params
    const { title, duration, artistId, albumId } = req.body
    const userId = req.user.id // ID của người dùng hiện tại

    try {
        const song = await prisma.song.findUnique({ where: { id: parseInt(id) } })
        if (!song) {
            return res.status(404).json({ message: 'Song not found' })
        }

        // Kiểm tra quyền sửa bài hát (người dùng chỉ sửa bài hát của mình)
        if (song.userId !== userId && req.user.role !== 'ADMIN') {
            return res.status(403).json({
                message: 'You do not have permission to update this song'
            })
        }

        const updatedSong = await prisma.song.update({
            where: { id: parseInt(id) },
            data: {
                title,
                duration,
                artistId,
                albumId,
            },
        })
        res.status(200).json(updatedSong) // Trả về bài hát đã cập nhật
    } catch (error) {
        res.status(500).json({ message: 'Error updating song', error })
    }
}

// --- Xóa bài hát ---
export const deleteSongUser = async (req, res) => {
    const { id } = req.params
    userId = req.user.id

    try {
        const song = await prisma.song.findUnique({ where: { id: parseInt(id) } })
        if (!song) {
            return res.status(404).json({ message: 'Song not found' })
        }

        // Kiểm tra quyền xóa bài hát (người dùng chỉ xóa bài hát của mình)
        if (song.userId !== req.user.id && req.user.role !== 'ADMIN') {
            return res.status(403).json({
                message: 'You do not have permission to delete this song'
            })
        }

        await prisma.song.delete({
            where: { id: parseInt(id) },
        })
        res.status(200).json({ message: 'Song deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting song', error })
    }
}

// Lấy tất cả bài hát
export const getAllSongs = async (req, res) => {
    try {
        // Truy vấn tất cả bài hát từ cơ sở dữ liệu
        const songs = await prisma.song.findMany()

        // Trả về danh sách bài hát
        return res.status(200).json(songs)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: 'Đã xảy ra lỗi khi lấy danh sách bài hát'
        })
    }
}