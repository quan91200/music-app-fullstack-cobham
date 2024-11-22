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
        error: "bg-red-500",
        info: "bg-blue-500",
        warning: "bg-yellow-500",
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