import React, { useEffect } from 'react'
import { Button, Dropdown } from './index'
import { bgTypes, generateGradient, colorSchemes } from '../utilities/spFunc'
import useDropdown from '../hook/useDropdown'

const DropdownBgColor = ({ onUpdateBackground }) => {
    const { selected: selectedBgType, selectOption: selectBgType }
        = useDropdown(bgTypes, bgTypes[0])

    const { selected: selectedColorScheme, selectOption: selectColorScheme }
        = useDropdown(
            Object.keys(colorSchemes).map(key =>
                ({ label: key, value: colorSchemes[key] })),
            { label: '1', value: colorSchemes['1'] }
        )

    const colorSchemesOptions = Object.keys(colorSchemes).map((key) => ({
        label: key,
        value: colorSchemes[key]
    }))

    useEffect(() => {
        if (selectedBgType && selectedColorScheme) {
            const gradient = generateGradient(selectedBgType, selectedColorScheme.value)
            document.body.style.background = gradient
            console.log(gradient)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleUpdateBackground = () => {
        if (selectedBgType && selectedColorScheme) {
            const gradient = generateGradient(selectedBgType.value,
                selectedColorScheme.value)
            onUpdateBackground(gradient)
            document.body.style.background = gradient
        }
    }

    return (
        <div className="p-4 flex">
            <div className="flex flex-row gap-4">
                <Dropdown
                    options={bgTypes.map(bgType => ({ label: bgType, value: bgType }))}
                    onSelect={selectBgType}
                    placeholder="Option Background"
                />

                <Dropdown
                    options={colorSchemesOptions}
                    onSelect={selectColorScheme}
                    placeholder="Option Color"
                />

                <Button variant='danger'
                    onClick={handleUpdateBackground}
                >
                    Save
                </Button>
            </div>
        </div>
    )
}

export default DropdownBgColor