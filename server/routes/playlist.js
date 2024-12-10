import express from 'express'
import {
    addPlaylist,
    updatePlaylist,
    deletePlaylistUser,
    getAllPlaylist
} from '../controllers/playlist.js'

const router = express.Router()

router.get('/playlist', getAllPlaylist)
// --- Thêm playlist ---
router.post('/add', addPlaylist)

// --- Sửa playlist ---
router.put('/update/:id', updatePlaylist)

// --- Xóa playlist (User) ---
router.delete('/delete/:id', deletePlaylistUser)

export default router