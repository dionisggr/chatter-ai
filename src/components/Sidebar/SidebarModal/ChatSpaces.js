import React from 'react';
import { MdAccountCircle, MdAddCircleOutline } from 'react-icons/md';

const ChatSpaces = ({ spaces, activeSpace, setActiveSpace, setOpenChat, setMessages, setOpenSidebarModal }) => {
  const handleSelectSpace = (space) => {
    setActiveSpace(space);
    setOpenSidebarModal(null);
    setOpenChat(null);
    setMessages([]);
  };

  const handleCreateSpace = () => {
    setOpenSidebarModal('New Chat Space');
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
      <button
        className="flex items-center space-x-2 bg-dark-grey bg-opacity-50 text-md font-semibold p-4 py-5 transition-colors duration-200 hover:bg-dark-grey hover:bg-opacity-20 hover:text-yellow-600"
        onClick={handleCreateSpace}
      >
        <MdAddCircleOutline size={20} className="text-gray-400 hover:text-blue-700" />
        <h1 className='opacity-70 text-sm'>Create New Space</h1>
      </button>
    </div>
  );
};

export default ChatSpaces;
