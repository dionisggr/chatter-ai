import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

const Accordion = (props) => {
  const { children, title, isOpen, setOpenAccordion, unread } = props;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const renderedTitle = title[0].toUpperCase() + title.slice(1);
  
  const toggleOpen = () => {
    if (isOpen) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(title);
    }
  }  
  useEffect(() => {
    const handleResize = () => {
      const isMobileNow = window.innerWidth <= 768;

      setIsMobile(isMobileNow);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className="w-full overflow-y-scroll"
      style={{ maxHeight: isMobile ? '50vh' : '' }}
    >
      <div
        className="flex justify-between items-center h-9 px-3 pr-4 bg-darker-grey text-slate-200 cursor-pointer select-none transition-all duration-200 ease-in-out hover:bg-opacity-75"
        onClick={toggleOpen}
      >
        <div className="flex">
        <span className="font-medium text-sm">{renderedTitle}</span>
          {unread && (
            <span className="flex justify-center items-center bg-slate-200 text-darker-grey text-[10px] font-bold rounded-full px-1.5 h-fit mt-0.5 mx-2">
              {unread}
            </span>
          )}
        </div>
        {isOpen
          ? <MdKeyboardArrowUp className="text-lg ml-2" />
          : <MdKeyboardArrowDown className="text-lg ml-2" />
        }
      </div>
      {isOpen && (
        <>
          <div className="px-2 py-1 overflow-y-auto max-h-[54vh]">
            {children}
          </div>
        </>
      )}
    </div>
  );
};

export default Accordion;
