import React, { useState } from 'react'
import styled, { keyframes, css } from 'styled-components'

const Tooltip = ({
    children,
    content,
    placement = 'top',
    delay = 200,
    arrow = true,
    animation = "fade"
}) => {
    const [visible, setVisible] = useState(false)

    let timer

    const showTooltip = () => {
        timer = setTimeout(() => setVisible(true), delay)
    }

    const hideTooltip = () => {
        clearTimeout(timer)
        setVisible(false)
    }

    return (
        <Wrapper
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
        >
            {children}
            {visible && (
                <Content $placement={placement} $animation={animation}>
                    {content}
                    {arrow && <Arrow $placement={placement} />}
                </Content>
            )}
        </Wrapper>
    )
}

export default Tooltip

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`

const scaleIn = keyframes`
    from {
        transform: scale(.8);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
`

const Wrapper = styled.div`
    position: relative;
    display: inline-block;
    cursor: pointer;
`
const Content = styled.div`
    position: absolute;
    background: #333;
    color: #fff;
    padding: 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    white-space: nowrap;
    z-index: 10;
    ${({ $animation }) =>
        $animation === "fade"
            ? css`
                  animation: ${fadeIn} 0.2s ease-out;
              `
            : $animation === "scale"
                ? css`
                  animation: ${scaleIn} 0.2s ease-out;
              `
                : ""}

    ${({ $placement }) => {
        switch ($placement) {
            case "top":
                return `
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    margin-bottom: 0.5rem;
                `;
            case "bottom":
                return `
                    top: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    margin-top: 0.5rem;
                `;
            case "left":
                return `
                    right: 100%;
                    top: 50%;
                    transform: translateY(-50%);
                    margin-right: 0.5rem;
                `;
            case "right":
                return `
                    left: 100%;
                    top: 50%;
                    transform: translateY(-50%);
                    margin-left: 0.5rem;
                `;
            default:
                return "";
        }
    }}
`

const Arrow = styled.div`
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;

    ${({ $placement }) => {
        switch ($placement) {
            case "top":
                return `
                    border-width: 0.5rem 0.5rem 0 0.5rem;
                    border-color: #333 transparent transparent transparent;
                    bottom: -0.5rem;
                    left: 50%;
                    transform: translateX(-50%);
                `;
            case "bottom":
                return `
                    border-width: 0 0.5rem 0.5rem 0.5rem;
                    border-color: transparent transparent #333 transparent;
                    top: -0.5rem;
                    left: 50%;
                    transform: translateX(-50%);
                `;
            case "right":
                return `
                    border-width: 0.5rem 0.5rem 0.5rem 0;
                    border-color: transparent #333 transparent transparent;
                    left: -0.5rem;
                    top: 50%;
                    transform: translateY(-50%);
                `;
            case "left":
                return `
                    border-width: 0.5rem 0 0.5rem 0.5rem;
                    border-color: transparent transparent transparent #333;
                    right: -0.5rem;
                    top: 50%;
                    transform: translateY(-50%);
                `;
            default:
                return "";
        }
    }}
`
