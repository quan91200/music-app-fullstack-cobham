import express from 'express'
import {
    getAllUsers,
    updateUserInfo,
    assignAdminRole,
    removeAdminRole,
    deleteUser,
    deleteSongAdmin,
    deletePlaylist
} from '../controllers/admin.js'

const router = express.Router()

// --- Xem tất cả người dùng ---
router.get('/users', getAllUsers)

// --- Sửa thông tin người dùng ---
router.put('/users/:id', updateUserInfo)

// --- Thêm quyền admin cho người dùng ---
router.put('/users/:id/assign-admin', assignAdminRole)

// --- Xóa quyền admin của người dùng ---
router.put('/users/:id/remove-admin', removeAdminRole)

// --- Xóa người dùng ---
router.delete('/users/:id', deleteUser)

// --- Xóa bài hát (Admin có thể xóa bài hát của bất kỳ người dùng nào) ---
router.delete('/songs/:id', deleteSongAdmin)

// --- Xóa playlist (Admin có thể xóa playlist của bất kỳ người dùng nào) ---
router.delete('/playlists/:id', deletePlaylist)

export default router