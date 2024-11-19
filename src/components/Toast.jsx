import React, { useEffect } from "react"
import styled, { keyframes, css } from "styled-components"
import { TiTick } from 'react-icons/ti'

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
        <ToastWrapper type={type} $pos={pos} onClick={onClose} $duration={duration}>
            <TiTick />
            <Message>{message}</Message>
        </ToastWrapper>
    )
}

export default Toast

const bgAnim = (type) => keyframes`
     0% {
        opacity: .4;
    background-color: ${type === "success" ? "var(--success)" :
        type === "error" ? "var(--error)" :
            type === "info" ? "var(--info)" :
                type === "warning" ? "var(--warning)" : "var(--gray)"};
  }
  50% {
    opacity: .7;
    background-color: ${type === "success" ? "var(--success)" :
        type === "error" ? "var(--error)" :
            type === "info" ? "var(--info)" :
                type === "warning" ? "var(--warning)" : "var(--gray)"};
  }
  100% {
    opacity: 1;
    background-color: ${type === "success" ? "var(--success)" :
        type === "error" ? "var(--error)" :
            type === "info" ? "var(--info)" :
                type === "warning" ? "var(--warning)" : "var(--gray)"};
  }
`

const ToastWrapper = styled.div`
  position: fixed;
  animation: ${bgAnim} ${(props) => props.$duration}ms linear;
  ${(props) => {
        switch (props.$pos) {
            case "top-left":
                return "top: 1rem; left: 1rem;";
            case "top-right":
                return "top: 1rem; right: 1rem;";
            case "bottom-left":
                return "bottom: 1rem; left: 1rem;";
            case "bottom-right":
                return "bottom: 1rem; right: 1rem;";
            case "top-center":
                return "top: 1rem; left: 50%; transform: translateX(-50%);";
            case "bottom-center":
                return "bottom: 1rem; left: 50%; transform: translateX(-50%);";
            default:
                return "bottom: 1rem; right: 1rem;";
        }
    }}
  ${(props) => css`
    animation: ${bgAnim(props.type)} ${props.$duration}ms linear infinite;
  `}
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
