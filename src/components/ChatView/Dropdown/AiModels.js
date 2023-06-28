import React from 'react';

const AiModels = ({ aiModels, setSelected, setIsOpen }) => {
  const handleClick = (model) => {
    setSelected(model);
    setIsOpen(false);
  };

  return (
    <>
      {aiModels?.map((model) => (
        <button
          key={model}
          onClick={() => handleClick(model)}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-b border-gray-200"
          role="menuitem"
        >
          {model}
        </button>
      ))}
    </>
  );
};

export default AiModels;
