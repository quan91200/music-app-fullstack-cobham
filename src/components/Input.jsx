import React from 'react'
import PropTypes from 'prop-types'

const Inputs = ({
    type,
    title = '',
    required,
    icon = null,
    placeholder = 'Fill value ...'
}) => {
    return (
        <label className="flex flex-col my-2">
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
                    className={`p-2 pl-${icon ? '8' : '4'} text-base border border-gray-300 
                        rounded-md w-full focus:outline-none focus:ring-2 focus:ring-dodgerblue`}
                />
            </div>
        </label>
    )
}

Inputs.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string,
    required: PropTypes.bool,
    icon: PropTypes.element,
    placeholder: PropTypes.string,
}

export default Inputs