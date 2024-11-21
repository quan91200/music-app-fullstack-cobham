import React from "react"
import styled, { css } from "styled-components"
import { getBoxShadow } from "../utilities/Styles"

const Card = ({
  children,
  type = "vertical",
  width,
  height,
  boxShadow,

}) => {
  return <CardWrapper
    type={type}
    width={width}
    height={height}
    $boxShadow={boxShadow}
  >
    {children}
  </CardWrapper>
}

const Header = ({
  children,
  type,
  image = "https://via.placeholder.com/500x300.png?text=Card+Image",
  altText,
  width,
  height
}) => {
  return (
    <CardHeader type={type} width={width}
      height={height}>
      {type === "horizontal" && image ? (
        <Image alt={altText || image} src={image} />
      ) : (
        children
      )}
    </CardHeader>
  )
}

const Content = ({ children }) => <CardContent>{children}</CardContent>

const Footer = ({ children }) => <CardFooter>{children}</CardFooter>

Card.Header = Header
Card.Content = Content
Card.Footer = Footer

export default Card

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: .5rem;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.2);
  flex-direction: ${({ type }) => (type === "horizontal" ? "row" : "column")};
  width: ${({ width }) => width || "20rem"};
  height: ${({ height }) => height || "5rem"};
  box-shadow: ${(props) => getBoxShadow(props.$boxShadow)};
`

const CardHeader = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  ${({ type }) =>
    type === "horizontal" &&
    css`
      height: 100%;
      border-bottom: none;
    `}
`
const Image = styled.img`
      width: 100%;
      height: 100%;
      object-fit: cover;
`

const CardContent = styled.div`
  font-size: 1rem;
  color: #555;
`

const CardFooter = styled.div`
  color: #888;
`