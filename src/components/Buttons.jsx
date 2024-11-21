import React from 'react'
import styled from 'styled-components'

const Buttons = ({
    size,
    type,
    children,
    onClick,
    disabled
}) => {
    return (
        <Button
            size={size}
            type={type}
            onClick={onClick}
            aria-disabled={disabled}
        >
            {children}
        </Button>
    )
}

export default Buttons

const Button = styled.button`
    font-size: 1rem;
    padding: .5rem .25rem;
    border: none;
    border-radius: .25rem;
    color: white;
    outline: none;
    box-shadow: 0 0 .5rem #aaa;
    transition: linear .3s ease-in-out;
    width: ${(props) =>
        props.size === 'lg' ? '100%' :
            props.size === 'md' ? '75%' :
                props.size === 'sm' ? '50%' : 'auto'};
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    opacity: ${(props) => (props.disabled ? 0.6 : 1)};
    background-color: ${(props) =>
        props.type === 'success' ? 'var(--success)' :
            props.type === 'error' ? 'var(--error)' :
                props.type === 'info' ? 'var(--info)' :
                    props.type === 'warning' ? 'var(--warning)' : 'var(--gray)'};

&:hover {
        opacity: ${(props) => (props.disabled ? 0.6 : 0.8)};
    }

    &:active {
        transform: ${(props) => (props.disabled ? 'none' : 'scale(0.98)')};
    }
`