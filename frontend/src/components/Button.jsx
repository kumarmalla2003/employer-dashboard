// src/components/Button.jsx
import React from "react";
import PropTypes from "prop-types";

const Button = ({
  children,
  onClick,
  className,
  type = "button",
  ...props
}) => {
  const baseClasses =
    "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

export default Button;
