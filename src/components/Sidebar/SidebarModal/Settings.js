import React, { useContext } from 'react';
import { MdAccountCircle, MdExitToApp } from 'react-icons/md';
import DarkMode from '../../DarkMode';

const Account = ({ open, setSidebarOpenModal, setMainModal }) => {
  const handleOpenAIApiKey = () => {
    setSidebarOpenModal(null);
    setMainModal('OpenAI API Key');
  };

  const handleClearChats = () => {
    setSidebarOpenModal(null);
    setMainModal('Clear all chats');
  };

  return (
    <div
      className="flex flex-col justify-center rounded-md w-64 text-white relative"
    >
      <DarkMode
        className="flex items-center space-x-2 text-md font-semibold p-4 py-5 transition-colors duration-200 hover:bg-dark-grey hover:bg-opacity-20 hover:text-yellow-600"
        open={open}
      />
      <button
        className="flex items-center space-x-2 text-md font-semibold p-4 py-5 transition-colors duration-200 hover:bg-dark-grey hover:bg-opacity-20 hover:text-yellow-600"
        onClick={handleOpenAIApiKey}
      >
        <MdAccountCircle size={20} className="text-gray-400 hover:text-blue-700" />
        <h1>OpenAI API Key</h1>
      </button>
      <button
        className="flex items-center space-x-2 text-md font-semibold p-4 transition-colors duration-200 hover:bg-dark-grey hover:bg-opacity-20 hover:text-yellow-600"
        onClick={handleClearChats}
      >
        <MdExitToApp size={20} className="text-gray-400 hover:text-blue-700" />
        <h1>Clear all chats</h1>
      </button>
    </div>
  );
};

export default Account;
