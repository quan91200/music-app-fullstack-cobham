// components/Toast.jsx
import React, { useEffect } from "react"
import styled, { keyframes } from "styled-components"
import { TiTick } from 'react-icons/ti'
import { getToastColor, getPositionStyles } from '../utilities/Styles'

const Toast = ({
    open = false,
    onClose = () => { },
    message,
    type,
    pos = 'top-left',
    duration = 3000
}) => {
    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                onClose()
            }, duration)

            return () => clearTimeout(timer)
        }
    }, [open, duration, onClose])

    if (!open) return null

    return (
        <ToastWrapper
            type={type}
            $pos={pos}
            onClick={onClose}
            $duration={duration}
        >
            <TiTick />
            <Message>{message}</Message>
        </ToastWrapper>
    )
}

export default Toast

const bgAnim = keyframes`
    0% {
        opacity: .4;
    }
    50% {
        opacity: .7;
    }
    100% {
        opacity: 1;
    }
`

const ToastWrapper = styled.div`
    position: fixed;
    animation: ${bgAnim} ${(props) => props.$duration}ms linear;
    ${(props) => getPositionStyles(props.$pos)} 
    background-color: ${(props) => getToastColor(props.type)};
    color: white;
    padding: 1.2rem 1rem;
    gap: .2rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`

const Message = styled.span`
    flex: 1;
`