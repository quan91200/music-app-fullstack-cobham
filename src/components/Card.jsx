import React from "react"
import PropTypes from "prop-types"

const Card = ({
  children,
  type = "vertical",
  width = "20rem",
  height = "auto",
  boxShadow = "shadow-lg",
  rounded = "rounded-lg",
  border = "border border-gray-300",
  className = "",
}) => {
  return (
    <div
      className={`flex overflow-hidden ${boxShadow} ${rounded} ${border} ${type === "horizontal" ? "flex-row" : "flex-col"
        } ${className}`}
      style={{ width, height }}
    >
      {children}
    </div>
  )
}

const Header = ({
  children,
  image = null,
  altText = "Card Header Image",
  className = "",
}) => {
  return (
    <div
      className={`w-full ${image ? "h-56" : "p-4"} bg-gray-100 ${className}`}
    >
      {image ? (
        <img
          className="w-full h-full object-cover"
          src={image}
          alt={altText}
        />
      ) : (
        <h2 className="text-lg font-semibold text-center">{children}</h2>
      )}
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
  type: PropTypes.oneOf(["vertical", "horizontal"]),
  width: PropTypes.string,
  height: PropTypes.string,
  boxShadow: PropTypes.string,
  rounded: PropTypes.string,
  border: PropTypes.string,
  className: PropTypes.string,
}

Header.propTypes = {
  children: PropTypes.node,
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