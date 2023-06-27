import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { CSSTransition } from 'react-transition-group';
// import './searchUsers.css'; // Importing our custom CSS file

const SearchUsers = ({ isOpen, setIsOpen }) => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClose = () => {
    setSearchText('');
    setIsOpen(false);
  };

  return (
    <CSSTransition in={isOpen} timeout={300} classNames="search" unmountOnExit>
      <div className="w-64 h-full bg-white absolute top-0 left-0 z-10 p-4">
        <div className="flex items-center justify-between">
          <input
            className="w-full border border-gray-300 rounded-lg py-2 px-4"
            placeholder="Search users..."
            value={searchText}
            onChange={handleInputChange}
          />
          <button className="ml-2 p-1" onClick={handleClose}>
            <MdClose size={24} />
          </button>
        </div>
        <div className="mt-4">
          {/* Render your search results here */}
        </div>
      </div>
    </CSSTransition>
  );
};

export default SearchUsers;
