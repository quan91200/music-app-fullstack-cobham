// Box.jsx
import React from 'react'
import styled from 'styled-components'

const Box = ({
    children,
    padding,
    margin,
    background,
    border,
    borderRadius,
    width,
    style = {},
    ...rest
}) => {
    return (
        <Boxs
            padding={padding}
            margin={margin}
            background={background}
            border={border}
            borderRadius={borderRadius}
            width={width}
            style={style}
            {...rest}
        >
            {children}
        </Boxs>
    )
}

export default Box

const Boxs = styled.div`
    display: ${({ display }) => display || "flex"};
    justify-content: ${({ justifyContent }) => justifyContent || "center"};
    align-items: ${({ alignItems }) => alignItems || "center"};
    padding: ${({ padding }) => padding || "1rem"};
    margin: ${({ margin }) => margin || "0"};
    background: ${({ background }) => background || "transparent"};
    border: ${({ border }) => border || "none"};
    border-radius: ${({ borderRadius }) => borderRadius || ".25rem"};
    width: ${({ width }) => width || "10%"};
`