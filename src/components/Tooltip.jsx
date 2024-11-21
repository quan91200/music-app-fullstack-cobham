import React, { useState, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { fadeIn, scaleUp } from '../utilities/Animation'
import { getPlaceTooltip } from '../utilities/Styles'

const Tooltip = ({
    children,
    content,
    placement = 'top',
    delay = 200,
    arrow = true,
    animation = "fade"
}) => {
    const [visible, setVisible] = useState(false)
    const [finalPlacement, setFinalPlacement] = useState(placement)

    const tooltipRef = useRef(null)
    const targetRef = useRef(null)

    let timer

    const showTooltip = () => {
        timer = setTimeout(() => setVisible(true), delay)
    }

    const hideTooltip = () => {
        clearTimeout(timer)
        setVisible(false)
    }

    const calculatePosition = () => {
        if (!tooltipRef.current || !targetRef.current) return

        const targetRect = targetRef.current.getBoundingClientRect()
        const tooltipRect = tooltipRef.current.getBoundingClientRect()

        let newPlacement = finalPlacement

        const spaceTop = targetRect.top
        const spaceBottom = window.innerHeight - targetRect.bottom
        const spaceLeft = targetRect.left
        const spaceRight = window.innerWidth - targetRect.right

        if (spaceTop >= tooltipRect.height && spaceBottom >= tooltipRect.height) {
            newPlacement = 'bottom'
        }

        if (newPlacement === 'top' && spaceTop < tooltipRect.height) {
            newPlacement = 'bottom'
        } else if (newPlacement === 'bottom' && spaceBottom < tooltipRect.height) {
            newPlacement = 'top'
        } else if (newPlacement === 'left' && spaceLeft < tooltipRect.width) {
            newPlacement = 'right'
        } else if (newPlacement === 'right' && spaceRight < tooltipRect.width) {
            newPlacement = 'left'
        }

        setFinalPlacement(newPlacement)
    }

    useEffect(() => {
        if (visible) {
            calculatePosition()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible, finalPlacement])

    const { contentStyles, arrowStyles } = getPlaceTooltip(finalPlacement)

    return (
        <Wrapper
            ref={targetRef}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
        >
            {children}
            {visible && (
                <Content ref={tooltipRef} $animation={animation} $contentStyles={contentStyles}>
                    {content}
                    {arrow && <Arrow $arrowStyles={arrowStyles} />}
                </Content>
            )}
        </Wrapper>
    )
}

export default Tooltip

const Wrapper = styled.div`
    position: relative;
    display: inline-block;
    cursor: pointer;
`

const Content = styled.div`
    position: absolute;
    background: rgba(0, 0, 0, .3);
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
                  animation: ${scaleUp} 0.2s ease-out;
              `
                : ""}

    ${({ $contentStyles }) => $contentStyles}  
`

const Arrow = styled.div`
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;

    ${({ $arrowStyles }) => $arrowStyles}  
`