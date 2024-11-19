import { useState } from 'react'

/**
 * Hook to toggle a boolean state.
 * @param {boolean} initialValue
 * @returns {[boolean, function]}
 */

const useToggle = (initialToggleValue = false) => {
    const [isOpen, setIsOpen] = useState(initialToggleValue)

    const toggle = (value) => {
        setIsOpen((prev) => (typeof value === "boolean" ? value : !prev))
    }

    return [isOpen, toggle]
}

export default useToggle