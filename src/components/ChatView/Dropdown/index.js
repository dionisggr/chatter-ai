import React, { useState, useEffect, useCallback } from 'react';
import { Transition } from 'react-transition-group';
import { FiChevronUp, FiChevronDown, FiSettings } from 'react-icons/fi';

const Dropdown = ({ children, className, classes, inverted, selected, dropdownRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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

  const handleClickOutside = useCallback(e => {
    if (dropdownRef?.current?.contains(e.target)) {
      return;
    }

    setIsOpen(false);
  }, [dropdownRef]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={`bottom-0 inline-block h-fit text-left left-0 mb-2 sm:ml-4 z-[60] ${isMobile ? 'absolute top-2' : 'w-fit'} ${className}`}>
      <button
        type='button'
        onClick={(e) => setIsOpen(!isOpen)}
        className="bg-white hover:bg-gray-200 focus:outline-none border border-gray-300 rounded-2xl p-3 mb-1 text-sm text-gray-500 flex items-center justify-between min-w-fit"
      >
        <span>
          {selected?.value || selected || <FiSettings size={22} className="ml-1" />}
        </span>
        {isOpen
          ? <FiChevronUp size={18} className={`ml-1 transition-transform duration-200 ${inverted && 'transform rotate-180'}`} />
          : <FiChevronDown size={18} className={`ml-1 transition-transform duration-200 ${inverted && 'transform rotate-180'}`} />
        }
      </button>
      {isOpen && (
        <Transition timeout={200} in={isOpen}>
          {state => (
            <div
              className={`origin-bottom-right absolute mb-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 overflow-hidden ${classes}`}
              style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}
            >
              <div
                className="py-1 relative"
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
