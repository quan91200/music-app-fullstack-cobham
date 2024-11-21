import React from 'react'
import styled from 'styled-components'
import { getPositionStyles } from '../utilities/Styles'

const Popup = ({
    open,
    onClose,
    children,
    hideWrap = false,
    position = "center",
}) => {

    if (!open) return null

    return (
        <WrapperPopup
            onClick={onClose}
            $hideWrap={hideWrap}
            $position={position}
        >
            <Foreground
                onClick={(e) => e.stopPropagation()}
                $position={position}
            >
                <Container>
                    {children}
                </Container>
            </Foreground>
        </WrapperPopup>
    )
}

export default Popup

const WrapperPopup = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 999;
    display: flex;
    justify-content: center;
    background: ${({ $hideWrap }) =>
        $hideWrap ? "transparent" :
            "linear-gradient(90deg, rgba(0, 0, 0, .5), rgba(0, 0, 0, .3))"};
    ${(props) => getPositionStyles(props.$pos)};
`

const Foreground = styled.div`
    position: absolute;
    width: 40vw;
    max-width: 40%;
    height: max-content;
    margin: 2rem 0;
    background-color: white;
    border-radius: .25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 .25rem #444;
    z-index: 10;
`

const Container = styled.div`
    margin: 1rem;
    width: 100%;
`
