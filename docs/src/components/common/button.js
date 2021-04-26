import React from "react";

const Button = ({ children, label, icon }) => {
  return (
    <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 transition-all border rounded-md bg-light hover:text-white dark:text-gray-300 dark:border-gray-600 hover:bg-primary dark:hover:bg-primary dark:bg-gray-800 dark:hover:border-primary hover:shadow-lg">
      {icon && <i className={`ri-${icon} mr-2 text-lg leading-4 opacity-50`} />}
      {children || label}
    </button>
  );
};

export default Button;
