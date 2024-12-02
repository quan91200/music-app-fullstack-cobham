import React from "react"
import PropTypes from "prop-types"
import { Mon } from "../assets/images"

const Card = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`flex overflow-hidden p-2 ${className}`}
    >
      {children}
    </div>
  )
}

const Header = ({
  image = Mon,
  altText = "Card Header Image",
  className = "",
}) => {
  return (
    <div
      className={`w-full bg-gray-100 ${className}`}
    >
      <img
        className="w-full h-full object-cover"
        src={image}
        alt={altText}
      />
    </div>
  )
}

const Content = ({ children, className = "" }) => (
  <div className={`p-4 text-gray-700 ${className}`}>{children}</div>
)

const Footer = ({ children, className = "" }) => (
  <div
    className={`p-4 text-sm text-gray-500 border-t border-gray-200 ${className}`}
  >
    {children}
  </div>
)

Card.Header = Header
Card.Content = Content
Card.Footer = Footer

Card.propTypes = {
  className: PropTypes.string,
}

Header.propTypes = {
  image: PropTypes.string,
  altText: PropTypes.string,
  className: PropTypes.string,
}

Content.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

Footer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default Card