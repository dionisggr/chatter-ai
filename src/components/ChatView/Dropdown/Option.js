import React from 'react';

const Option = ({ index, option, setIsOpen }) => {
  const handleSelectOption = (option) => {
    setIsOpen(false);
    
    if (option.callback) {
      option.callback();
    }
  };
  
  return (
    <a
      key={index}
      onClick={() => handleSelectOption(option)}
      className="block p-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer transition-colors duration-200" 
      style={{ pointerEvents: option?.isDisabled ? 'none' : undefined, color: option?.isDisabled ? 'gray' : 'blue' }}
      role="menuitem"
  >
    {option?.value || option}
  </a>
  );
};

export default Option;
