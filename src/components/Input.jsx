import React from 'react'
import PropTypes from 'prop-types'

const Input = ({
    type,
    title = '',
    required,
    icon = null,
    placeholder = 'Fill value ...'
}) => {
    return (
        <label className="flex flex-col my-1">
            {title && (
                <div className="flex items-start justify-start text-lg">
                    {title}
                    {required && <span className="text-red-500">*</span>}
                </div>
            )}
            <div className="relative flex items-center justify-start">
                {icon && (
                    <div className="absolute left-2 text-xl text-gray-400">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    placeholder={placeholder}
                    className={`${icon ? 'pl-8 p-2' : 'pl-4'} text-base border border-gray-300 
                        rounded-md w-full focus:outline-none focus:ring-2 focus:ring-dodgerblue`}
                />
            </div>
        </label>
    )
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string,
    required: PropTypes.bool,
    icon: PropTypes.element,
    placeholder: PropTypes.string,
}

export default Input