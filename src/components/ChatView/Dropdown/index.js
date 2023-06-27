import React, { useState, useEffect } from 'react';
import { Transition } from 'react-transition-group';
import { FiChevronDown, FiSettings } from 'react-icons/fi';

const Dropdown = ({ children, selected, dropdownRef }) => {
  const [isOpen, setIsOpen] = useState(false);
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
    if (dropdownRef.current.contains(e.target)) {
      return;
    }

    setIsOpen(false);
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
    <div ref={dropdownRef} className="relative bottom-0 inline-block text-left mb-1 min-w-fit">
      <button
        type='button'
        onClick={(e) => setIsOpen(!isOpen)}
        className="bg-white hover:bg-gray-200 focus:outline-none border border-gray-300 rounded-md p-3 mx-2 mb-1 text-sm text-gray-500 flex items-center justify-between"
      >
        <span>{selected?.value || selected || <FiSettings size={20} className="ml-1" />}</span>
        <FiChevronDown size={18} className={`ml-1 mt-1 transition-transform duration-200 ${isOpen && 'transform rotate-180'}`} />
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
                {React.Children.map(children, child => {
                  if (React.isValidElement(child)) {
                      return React.cloneElement(child, { setIsOpen });
                  }
                  return child;
                })}
              </div>
            </div>
          )}
        </Transition>
      )}
    </div>
  );
};

export default Dropdown;
