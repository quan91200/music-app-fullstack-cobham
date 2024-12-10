import React from 'react'
import PropTypes from "prop-types"

const Box = ({
    children,
    className
}) => {
    return (
        <div
            className={`flex flex-col overflow-hidden h-full ${className}`}
        >
            {children}
        </div>
    )
}

export default Box

Box.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
}