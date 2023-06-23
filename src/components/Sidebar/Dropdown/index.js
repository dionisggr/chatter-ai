import React, { useState } from 'react';
import Option from './Option';

const Dropdown = ({ options, selectedOption, setSelectedOption }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="nav chat-spaces relative w-full inline-flex"
    >
      <button
        onClick={() => setOpen(!open)}
        className={`flex justify-between items-center bg-darker-grey ${
          !open ? 'bg-opacity-50' : ''
        } p-2 pl-3 w-full text-left rounded-md font-medium text-white text-lg border border-gray-600 hover:bg-dark-grey hover:bg-opacity-100 focus:outline-none transition-colors duration-300`}
      >
        <span>{selectedOption}</span>
        {!open && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`w-6 h-6 transition-transform duration-500 ease-in-out ${
              open && 'transform rotate-180'
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </button>

      {open && (
        <div
          className={`${
            open ? 'fixed top-2' : 'absolute'
          } origin-top-right right-0 mt-2 w-full rounded-md shadow-lg bg-black bg-opacity-95 text-gray-300 ring-1 ring-gray-500 ring-opacity-5 transition-all duration-300 ease-in-out`}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Option
              className='pointer-events-none'
              setSelectedOption={() => { }}
              setOpen={() => { }}
            />
            {options
              .filter((option) => option !== selectedOption)
              .map((option) => (
                <Option
                  option={option}
                  setSelectedOption={setSelectedOption}
                  setOpen={setOpen}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
