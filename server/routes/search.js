import express from 'express'
import {
    searchUsers,
    searchSongs,
    searchPlaylists,
    searchAll
} from '../controllers/search.js'

const router = express.Router()

// Tìm kiếm người dùng
router.get('/users', searchUsers)

// Tìm kiếm bài hát
router.get('/songs', searchSongs)

// Tìm kiếm playlist
router.get('/playlists', searchPlaylists)

// Tìm kiếm tổng hợp (tất cả người dùng, bài hát và playlist)
router.get('/all', searchAll)

export default router