import React from 'react';

const Option = ({ className = '', option = '', setSelectedOption, setOpen }) => {
  return (
    <button
      className={`flex items-center w-full h-12 text-left px-4 py-4 mx-2 text-md text-gray-300 hover:bg-dark-grey hover:text-gray-100 focus:outline-none focus:bg-gray-700 focus:text-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-600 focus:ring-gray-500 transition-all duration-300 ease-in-out ${className}`}
      role="menuitem"
      onClick={() => setSelectedOption(option) && setOpen(false)}
    >
      {option}
    </button>
  );
};

export default Option;
