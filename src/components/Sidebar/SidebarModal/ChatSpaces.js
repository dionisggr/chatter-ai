import React from 'react';
import { MdAccountCircle } from 'react-icons/md';

const ChatSpaces = ({ spaces, activeSpace, setActiveSpace, setOpenSidebarModal }) => {
  const handleSelectSpace = (space) => {
    console.log('Selected Space:', space);

    setActiveSpace(space);
    setOpenSidebarModal(null);
  };

  return (
    <div
      className="flex flex-col justify-center rounded-md w-64 text-white relative"
    >
      {spaces.filter((s) => s.id !== activeSpace?.id).map((space) => (
        <button
          key={space.id}
          className="flex items-center space-x-2 text-md font-semibold p-4 py-5 transition-colors duration-200 hover:bg-dark-grey hover:bg-opacity-20 hover:text-yellow-600"
          onClick={() => handleSelectSpace(space)}
        >
          <MdAccountCircle size={20} className="text-gray-400 hover:text-blue-700" />
          <h1>{space.name}</h1>
        </button>
      ))}
    </div>
  );
};

export default ChatSpaces;
