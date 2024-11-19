import React, { } from 'react'
import useDropdown from '../hook/useDropdown'
import styled from 'styled-components'

const Dropdown = ({
    options,
    onSelect,
    placeholder = 'Option',
    shape = 'rectangle'
}) => {
    const { isOpen, toggleDropdown, selected, selectOption }
        = useDropdown(options)

    const Select = (option) => {
        selectOption(option)
        if (onSelect) onSelect(option)
    }

    return (
        <DropdownWrapper>
            <DropdownHeader onClick={() => toggleDropdown()} shape={shape}>
                {selected ? selected.label : placeholder}
            </DropdownHeader>
            {isOpen && (
                <DropdownList>
                    {options.map((option, index) => (
                        <DropdownItem
                            key={index}
                            onClick={() => Select(option)}
                            data-selected={selected?.value === option.value}
                        >
                            {option.label}
                        </DropdownItem>
                    ))}
                </DropdownList>
            )}
        </DropdownWrapper>
    )
}

export default Dropdown

const DropdownWrapper = styled.div`
    position: relative;
`

const DropdownHeader = styled.div`
    border-radius: ${({ shape }) =>
        (shape === "circle" ? "50%" : "0.25rem")};
    height: ${({ shape }) =>
        (shape === "circle" ? '3.2rem' : 'auto')};
    width: ${({ shape }) =>
        (shape === "circle" ? '3.2rem' : 'auto')};
    border: 1px solid #ccc;
    background-color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    &:hover {
        border-color: #888;
    }
`

const DropdownList = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;   
`

const DropdownItem = styled.li`
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: clamp(0.75rem, 2.5vw, 1rem);
    transition: font-size 0.2s ease;
    overflow: hidden;

    &:hover {
        background-color: #f5f5f5;
    }
`