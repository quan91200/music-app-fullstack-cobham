import PropTypes from "prop-types"
import React from "react"
import DefaultLayout from "./DefaultLayout"

const Layout = ({ element, layout }) => {
    if (layout === 'default') {
        return <DefaultLayout>{element}</DefaultLayout>
    }

    return element
}

export default Layout

Layout.propTypes = {
    layout: PropTypes.oneOf(['default']),
    element: PropTypes.node,
}