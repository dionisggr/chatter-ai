import React from 'react';
import { MdExitToApp } from 'react-icons/md';
import DarkMode from '../../DarkMode';

const Settings = ({ isOpen, setOpenSidebarModal, isSelectMode, setIsSelectMode }) => {
  const toggleSelectMode = () => {
    setOpenSidebarModal(null);
    setIsSelectMode(!isSelectMode);
  };

  return (
    <div
      className="flex flex-col justify-center rounded-md w-64 text-white relative"
    >
      <button
        className="flex items-center space-x-2 text-md font-semibold p-4 transition-colors duration-200 hover:bg-dark-grey hover:bg-opacity-20 hover:text-yellow-600"
        onClick={toggleSelectMode}
      >
        <MdExitToApp size={20} className="text-gray-400 hover:text-blue-700" />
        <h1>Select Mode</h1>
      </button>
      <DarkMode
        className="flex items-center space-x-2 text-md font-semibold p-4 py-5 transition-colors duration-200 hover:bg-dark-grey hover:bg-opacity-20 hover:text-yellow-600"
        isOpen={isOpen}
      />
    </div>
  );
};

export default Settings;
