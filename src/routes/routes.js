import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'

export const publicRoutes = [
    { path: '/', element: <Dashboard />, layout: 'default' },
    { path: '/login', element: <Login />, layout: 'default' },
]

export const privateRoutes = []

export const protectedRoutes = [
    { path: '/', element: <Dashboard />, layout: 'default' }
]