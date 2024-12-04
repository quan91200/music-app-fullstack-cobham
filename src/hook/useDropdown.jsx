import { useState } from 'react'

const useDropdown = (initialOptions = [], defaultSelected = null) => {

    const [options] = useState(initialOptions)
    const [selected, setSelected] = useState(defaultSelected)
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