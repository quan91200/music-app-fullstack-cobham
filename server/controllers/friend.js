import prisma from '../prismaClient.js'

// --- Thêm bạn bè ---
export const addFriend = async (req, res) => {
    const { friendId } = req.body
    const userId = req.user.id // Lấy userId từ thông tin người dùng đã xác thực

    try {
        // Kiểm tra nếu người dùng đã là bạn bè
        const existingFriendship = await prisma.friend.findFirst({
            where: {
                OR: [
                    { userId, friendId },
                    { userId: friendId, friendId: userId },
                ],
            },
        })

        if (existingFriendship) {
            return res.status(400).json({ message: 'You are already friends' })
        }

        const newFriendship = await prisma.friend.create({
            data: {
                userId,
                friendId,
            },
        })

        res.status(201).json(newFriendship) // Trả về thông tin kết bạn thành công
    } catch (error) {
        res.status(500).json({ message: 'Error adding friend', error })
    }
}

// --- Xóa bạn bè ---
export const removeFriend = async (req, res) => {
    const { friendId } = req.params
    const userId = req.user.id // Lấy userId từ thông tin người dùng đã xác thực

    try {
        // Kiểm tra nếu người dùng và bạn bè có quan hệ
        const friendship = await prisma.friend.findFirst({
            where: {
                OR: [
                    { userId, friendId: parseInt(friendId) },
                    { userId: parseInt(friendId), friendId: userId },
                ],
            },
        })

        if (!friendship) {
            return res.status(404).json({ message: 'Friendship not found' })
        }

        await prisma.friend.delete({
            where: {
                id: friendship.id,
            },
        })

        res.status(200).json({ message: 'Friend removed successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error removing friend', error })
    }
}

// --- Lấy danh sách bạn bè ---
export const getFriends = async (req, res) => {
    const userId = req.user.id // ID của người dùng hiện tại

    try {
        const friends = await prisma.friend.findMany({
            where: {
                OR: [
                    { userId: userId },
                    { friendId: userId },
                ],
            },
            include: {
                user: true,
                friend: true,
            },
        })

        // Trả về danh sách bạn bè
        res.status(200).json(friends)
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving friends', error
        })
    }
}