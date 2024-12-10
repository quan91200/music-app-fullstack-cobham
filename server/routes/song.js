import express from 'express'
import {
    addSong,
    updateSong,
    deleteSongUser,
    getAllSongs
} from '../controllers/song.js'

const router = express.Router()

//
router.get('/songs', getAllSongs)
// --- Thêm bài hát ---
router.post('/add', addSong)

// --- Sửa bài hát ---
router.put('/update/:id', updateSong)

// --- Xóa bài hát (User) ---
router.delete('/delete/:id', deleteSongUser)

export default router