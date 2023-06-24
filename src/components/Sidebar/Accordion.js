import React from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

const Accordion = ({ children, title, isOpen, setOpenAccordion }) => {
  const toggleOpen = () => {
    if (isOpen) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(title);
    }
  }
  const renderedTitle = title[0].toUpperCase() + title.slice(1);

  return (
    <div className={`w-full ${isOpen ? 'flex-grow' : ''}`}>
      <div
        className="flex justify-between items-center h-9 px-3 pr-4 bg-darker-grey text-slate-200 cursor-pointer select-none transition-all duration-200 ease-in-out hover:bg-opacity-75"
        onClick={toggleOpen}
      >
        <span className="font-medium text-sm">{renderedTitle}</span>
        {isOpen
          ? <MdKeyboardArrowUp className="text-lg" />
          : <MdKeyboardArrowDown className="text-lg" />
        }
      </div>
      {isOpen && (
        <div className="px-2 py-1 mt-1 overflow-y-auto max-h-[50vh]">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
