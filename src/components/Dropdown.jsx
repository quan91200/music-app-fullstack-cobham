import React from 'react'
import useDropdown from '../hook/useDropdown'
import { IoIosArrowDown } from "react-icons/io"
import PropTypes from 'prop-types'
import { Button } from './index'

const Dropdown = ({
    options,
    onSelect,
    placeholder = 'Option',
    shape = 'rectangle'
}) => {
    const { isOpen, toggleDropdown, selected, selectOption } = useDropdown(options)

    const Select = (option) => {
        selectOption(option)
        if (onSelect) onSelect(option)
    }

    return (
        <div className="relative">
            <Button
                className={`flex items-center justify-between border ${shape === 'circle' ? 'rounded-full h-12 w-12' : 'rounded-lg h-auto px-4 py-2'
                    } border-gray-300 text-gray-700 cursor-pointer hover:border-gray-400 transition-all`}
                onClick={() => toggleDropdown()}
            >
                {selected ? selected.label : placeholder}
                <IoIosArrowDown className="ml-2" />
            </Button>
            {isOpen && (
                <ul className="mt-1 border border-gray-300 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto z-50 fixed">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => Select(option)}
                            data-selected={selected?.value === option.value}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Dropdown

Dropdown.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.any.isRequired,
        })
    ).isRequired,
    onSelect: PropTypes.func,
    placeholder: PropTypes.string,
    shape: PropTypes.oneOf(['rectangle', 'circle']),
}