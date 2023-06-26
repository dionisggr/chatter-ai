import React, { useState, useRef, useEffect } from 'react';
import { Transition } from 'react-transition-group';
import { FiChevronDown } from 'react-icons/fi';

const Dropdown = ({ options, selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const node = useRef();
  const defaultStyle = {
    transition: `opacity 200ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      return;
    }
    setIsOpen(false);
  };

  const handleSelectOption = (option) => {
    setSelected(option?.value || option);
    setIsOpen(false);

    if (option.callback) {
      option.callback();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={node} className="relative bottom-0 inline-block text-left mb-1 min-w-fit">
      <button
        type='button'
        onClick={(e) => setIsOpen(!isOpen)}
        className="bg-white hover:bg-gray-200 focus:outline-none border border-gray-300 rounded-md p-3 mb-1 text-sm text-gray-500 flex items-center justify-between"
      >
        <span>{selected?.value || selected}</span>
        <FiChevronDown className={`ml-2 transition-transform duration-200 ${isOpen && 'transform rotate-180'}`} />
      </button>
      {isOpen && (
        <Transition timeout={200} in={isOpen}>
          {state => (
            <div
              className={`origin-bottom-right absolute bottom-full mb-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 overflow-hidden`}
              style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}
            >
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {options.map((option, index) => (
                  <a
                    key={index}
                    onClick={() => handleSelectOption(option)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer transition-colors duration-200"
                    style={{ pointerEvents: option?.isDisabled ? 'none' : undefined, color: option?.isDisabled ? 'gray' : 'blue' }}
                    role="menuitem"
                  >
                    {option?.value || option}
                  </a>
                ))}
              </div>
            </div>
          )}
        </Transition>
      )}
    </div>
  );
};

export default Dropdown;
