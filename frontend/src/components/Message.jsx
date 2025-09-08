import React from "react";

const Message = ({ message, type }) => {
  if (!message) {
    return null;
  }

  const baseClasses = "px-2 py-1 rounded-md border text-center";
  const typeClasses = {
    error: "bg-red-100 border-red-700 text-red-500",
    success: "bg-green-100 border-green-700 text-green-500",
    warning: "bg-yellow-100 border-yellow-700 text-yellow-500",
  };

  const className = `${baseClasses} ${typeClasses[type] || typeClasses.error}`;

  return <div className={className}>{message}</div>;
};

export default Message;
