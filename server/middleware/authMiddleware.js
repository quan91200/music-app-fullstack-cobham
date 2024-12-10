import jwt from 'jsonwebtoken'

// Middleware để kiểm tra quyền truy cập của người dùng
export const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
        return res.status(401).json({ error: 'Không có quyền truy cập' })
    }

    jwt.verify(token, 'secretKey', (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token không hợp lệ' })
        }
        req.user = user
        next()
    })
}

// Middleware để kiểm tra nếu là admin
export const requireAdmin = (req, res, next) => {
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Bạn không có quyền truy cập' })
    }
    next()
}

// Middleware để kiểm tra quyền của người dùng
export const requireUser = (req, res, next) => {
    if (req.user.role !== 'USER' && req.user.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Bạn không có quyền truy cập' })
    }
    next()
}

// Middleware kiểm tra người dùng đã đăng nhập chưa
export const isAuthenticated = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
        return res.status(401).json({ error: 'Không có quyền truy cập' })
    }

    jwt.verify(token, 'secretKey', (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token không hợp lệ' })
        }
        req.user = user
        next()
    })
}

// Middleware kiểm tra người dùng có phải admin không
export const isAdmin = (req, res, next) => {
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Bạn không có quyền truy cập' })
    }
    next()
}