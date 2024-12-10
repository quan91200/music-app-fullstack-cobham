import { DashboardAdmin } from '../pages/admin/index'
import Login from '../pages/Login'
import { DashboardUser } from '../pages/user/index'

export const publicRoutes = [
    { path: '/', element: <DashboardUser />, layout: 'user' },
    { path: '/login', element: <Login />, layout: 'user' },
]

export const privateRoutes = []

export const protectedRoutes = [
    { path: '/', element: <DashboardUser />, layout: 'user' },
    { path: '/', element: <DashboardAdmin />, layout: 'admin' },
]