import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { TiTick } from "react-icons/ti"

const Toast = ({
    open = false,
    onClose = () => { },
    message,
    type,
    pos = "top-left",
    duration = 3000,
}) => {
    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                onClose()
            }, duration)

            return () => clearTimeout(timer)
        }
    }, [open, duration, onClose])

    if (!open) return null

    const positionClasses = {
        "top-left": "top-4 left-4",
        "top-right": "top-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "bottom-right": "bottom-4 right-4",
        "top-center": "top-4 left-1/2 transform -translate-x-1/2",
        "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
    }

    const typeClasses = {
        success: "bg-green-500",
        primary: "bg-red-500",
        info: "bg-blue-500",
        warning: "bg-yellow-500",
        outlineSuccess: "border-green-500 bg-transparent",
        outlinePrimary: "border-red-500 bg-transparent",
        outlineInfo: "border-blue-500 bg-transparent",
        outlineWarning: "border-yellow-500 bg-transparent"
    }

    return (
        <div
            className={`fixed ${positionClasses[pos]} p-4 rounded-lg shadow-lg flex items-center gap-2
                        text-white cursor-pointer animate-opacity transition-opacity duration-500 ${typeClasses[type]}`
            }
            onClick={onClose}
            style={{ animation: `opacity 1s ease-in-out` }}
        >
            <TiTick />
            <span className="flex-1">{message}</span>
        </div>
    )
}

export default Toast

Toast.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    message: PropTypes.string,
    type: PropTypes.oneOf([
        'success',
        'primary',
        'info',
        'warning',
        'outlineSuccess',
        'outlinePrimary',
        'outlineInfo',
        'outlineWarning'
    ]),
    pos: PropTypes.oneOf([
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
        'top-center',
        'bottom-center'
    ]),
    duration: PropTypes.number
}