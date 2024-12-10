import prisma from '../prismaClient.js'

// Tìm kiếm người dùng
export const searchUsers = async (req, res) => {
    const { query } = req.query // Lấy từ query string (VD: ?query=John)

    try {
        const users = await prisma.user.findMany({
            where: {
                name: {
                    contains: query, // tìm kiếm tên người dùng chứa từ khóa
                    mode: 'insensitive' // Không phân biệt hoa thường
                }
            }
        })
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ message: 'Error searching for users', error })
    }
}

// Tìm kiếm bài hát
export const searchSongs = async (req, res) => {
    const { query } = req.query

    try {
        const songs = await prisma.song.findMany({
            where: {
                title: {
                    contains: query,
                    mode: 'insensitive'
                }
            }
        })
        return res.status(200).json(songs)
    } catch (error) {
        return res.status(500).json({ message: 'Error searching for songs', error })
    }
}

// Tìm kiếm playlist
export const searchPlaylists = async (req, res) => {
    const { query } = req.query

    try {
        const playlists = await prisma.playlist.findMany({
            where: {
                name: {
                    contains: query,
                    mode: 'insensitive'
                }
            }
        })
        return res.status(200).json(playlists)
    } catch (error) {
        return res.status(500).json({ message: 'Error searching for playlists', error })
    }
}

// Tìm kiếm tổng hợp
export const searchAll = async (req, res) => {
    const { query } = req.query

    try {
        const users = await prisma.user.findMany({
            where: {
                name: {
                    contains: query,
                    mode: 'insensitive'
                }
            }
        })

        const songs = await prisma.song.findMany({
            where: {
                title: {
                    contains: query,
                    mode: 'insensitive'
                }
            }
        })

        const playlists = await prisma.playlist.findMany({
            where: {
                name: {
                    contains: query,
                    mode: 'insensitive'
                }
            }
        })

        return res.status(200).json({ users, songs, playlists })
    } catch (error) {
        return res.status(500).json({ message: 'Error searching', error })
    }
}