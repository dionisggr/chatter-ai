import React from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

const Accordion = ({ children, title, isOpen, setOpenAccordion, newMessageCount }) => {
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
        <div className="flex">
        <span className="font-medium text-sm">{renderedTitle}</span>
          {newMessageCount && (
            <span className="flex justify-center items-center bg-slate-200 text-darker-grey text-[10px] font-bold rounded-full px-1.5 h-fit mt-0.5 mx-2">
              {newMessageCount}
            </span>
          )}
        </div>
        {isOpen
          ? <MdKeyboardArrowUp className="text-lg ml-2" />
          : <MdKeyboardArrowDown className="text-lg ml-2" />
        }
      </div>
      {isOpen && (
        <div className="px-2 py-1 mt-1 overflow-y-auto max-h-[51vh]">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
