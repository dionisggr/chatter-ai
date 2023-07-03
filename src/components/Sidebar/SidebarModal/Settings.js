import React, { useContext } from 'react';
import { MdExitToApp } from 'react-icons/md';
import { IoIosPeople } from 'react-icons/io';
import { UserContext } from '../../../context/UserContext';
import DarkMode from '../../DarkMode';

const Settings = ({ isOpen, setIsOpen, shouldClose, setShouldClose, activeSpace, setOpenSidebarModal, isSelectMode, setIsSelectMode, setMainModal }) => {
  const { user } = useContext(UserContext);

  const toggleSelectMode = () => {
    setOpenSidebarModal(null);
    setIsSelectMode(!isSelectMode);
  };

  const openChatSettings = () => {
    setMainModal('Chat Space Settings')
    setOpenSidebarModal(null);
  };

  const handleInviteToSpace = () => {
    setMainModal('Invite Users');
    setOpenSidebarModal(null);
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
      {activeSpace?.created_by === user?.id && (
        <button
          className="flex items-center space-x-2 text-md font-semibold p-4 transition-colors duration-200 hover:bg-dark-grey hover:bg-opacity-20 hover:text-yellow-600"
          onClick={handleInviteToSpace}
        >
          <IoIosPeople size={20} className="text-gray-400 hover:text-blue-700" />
          <h1>Invite to Space</h1>
        </button>
      )}
      {activeSpace?.created_by === user?.id && (
        <button
          className="flex items-center space-x-2 text-md font-semibold p-4 transition-colors duration-200 hover:bg-dark-grey hover:bg-opacity-20 hover:text-yellow-600"
          onClick={openChatSettings}
        >
          <MdExitToApp size={20} className="text-gray-400 hover:text-blue-700" />
          <h1>C-Space Settings</h1>
        </button>
      )}
      <DarkMode
        className="flex items-center space-x-2 text-md font-semibold p-4 py-5 transition-colors duration-200 hover:bg-dark-grey hover:bg-opacity-20 hover:text-yellow-600"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        shouldClose={shouldClose}
        setShouldClose={setShouldClose}
        setOpenSidebarModal={setOpenSidebarModal}
      />
    </div>
  );
};

export default Settings;
