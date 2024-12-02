import PropTypes from 'prop-types'
import React from 'react'

const Popup = ({
    open,
    onClose,
    children,
    hideWrap = false,
    position = 'center',
}) => {
    if (!open) return null

    const positionClasses = {
        center: 'items-center justify-center',
        top: 'items-start justify-center',
        bottom: 'items-end justify-center',
        left: 'items-center justify-start',
        right: 'items-center justify-end',
    }

    return (
        <div
            className={`fixed inset-0 z-50 flex ${positionClasses[position] || 'items-center justify-center'
                } ${hideWrap ? 'bg-transparent' : 'bg-black bg-opacity-50'}`}
            onClick={onClose}
        >
            <div
                className="max-w-full max-h-[90vh] overflow-auto bg-white rounded-lg shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

export default Popup

Popup.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.node,
    hideWrap: PropTypes.bool,
    position: PropTypes.oneOf(['center', 'top', 'bottom', 'left', 'right'])
}