import PropTypes from "prop-types"
import React from "react"
import UserLayout from "./UserLayout"
import AdminLayout from "./AdminLayout"

const Layout = ({ element, layout }) => {
    if (layout === 'user') {
        return <UserLayout>{element}</UserLayout>
    }
    if (layout === 'admin') {
        return <AdminLayout>{element}</AdminLayout>
    }
    return element
}

export default Layout

Layout.propTypes = {
    layout: PropTypes.oneOf(['default']),
    element: PropTypes.node,
}