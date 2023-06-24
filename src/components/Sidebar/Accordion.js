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

  return (
    <div className="w-full flex-grow">
      <div
        className="flex justify-between items-center h-8 px-3 pr-4 bg-darker-grey text-slate-200 cursor-pointer select-none"
        onClick={toggleOpen}
      >
        <span className="font-medium text-sm">{title}</span>
        {isOpen
          ? <MdKeyboardArrowUp className="text-lg" />
          : <MdKeyboardArrowDown className="text-lg" />
        }
      </div>
      {isOpen && (
        <div className="px-2 py-1 mt-2 overflow-auto">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
