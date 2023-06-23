import React from 'react';
import { MdAccountCircle, MdExitToApp } from 'react-icons/md';

const NewChat = ({ setSidebarOpenModal }) => {
  const handleNewChat = (category) => {
    console.log('New Chat:', category);

    setSidebarOpenModal(null);
  };

  return (
    <div
      className="flex flex-col justify-center rounded-md w-64 text-white relative"
    >
      <button
        className="flex items-center space-x-2 text-md font-semibold p-4 py-5 transition-colors duration-200 hover:bg-dark-grey hover:bg-opacity-20 hover:text-yellow-600"
        onClick={() => handleNewChat('private')}
      >
        <MdAccountCircle size={20} className="text-gray-400 hover:text-blue-700" />
        <h1>Private</h1>
      </button>
      <button
        className="flex items-center space-x-2 text-md font-semibold p-4 transition-colors duration-200 hover:bg-dark-grey hover:bg-opacity-20 hover:text-yellow-600"
        onClick={() => handleNewChat('public')}
      >
        <MdExitToApp size={20} className="text-gray-400 hover:text-blue-700" />
        <h1>Public</h1>
      </button>
    </div>
  );
};

export default NewChat;
