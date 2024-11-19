import { useState } from 'react'

/**
 * Hook to manage dropdown state.
 * @param {Array} initialOptions
 * @returns {{
 *   selected: object,
 *   selectOption: function,
 *   options: Array,
 *   isOpen: boolean,
 *   toggleDropdown: function
 * }}
 */

const useDropdown = (initialOptions = []) => {

    const [options] = useState(initialOptions)
    const [selected, setSelected] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = (value) => {
        setIsOpen((prev) => (typeof value === "boolean" ? value : !prev))
    }

    const selectOption = (option) => {
        setSelected(option);
        setIsOpen(false);
    }

    return {
        selected,
        selectOption,
        options,
        isOpen,
        toggleDropdown,
    }
}
export default useDropdown