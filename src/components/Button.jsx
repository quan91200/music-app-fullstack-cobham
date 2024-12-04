import React from "react"
import PropTypes from "prop-types"

const Button = ({
    children,
    variant = "default",
    size = "medium",
    onClick,
    disabled = false,
    className = "",
    ...rest
}) => {
    const baseClasses = `transition duration-200 ease-in-out rounded font-medium focus:outline-none`

    const variantClasses = {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        secondary: "bg-gray-500 text-white hover:bg-gray-600",
        outline: "bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
        danger: "bg-red-500 text-white hover:bg-red-600",
        default: "bg-transparent text-white"
    }

    const sizeClasses = {
        small: "px-3 py-1 text-sm",
        medium: "px-4 py-2 text-base",
        large: "px-5 py-3 text-lg",
    }

    const disabledClasses = "bg-gray-300 text-gray-500 cursor-not-allowed"

    const computedClasses = `${baseClasses} ${disabled ? disabledClasses : variantClasses[variant]
        } ${sizeClasses[size]} ${className}`

    return (
        <button
            className={computedClasses}
            onClick={onClick}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(["primary", "secondary", "outline", "danger", "default"]),
    size: PropTypes.oneOf(["small", "medium", "large"]),
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
}

export default Button