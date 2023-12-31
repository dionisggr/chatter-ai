import React, { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import { MdAccountCircle, MdExitToApp } from 'react-icons/md';
import { FaKey } from 'react-icons/fa';

const Account = ({ setMainModal, setOpenSidebarModal, setIsOpen, shouldClose, setShouldClose, logout }) => {
  const { setUser } = useContext(UserContext);

  const handleOpenAIApiKey = () => {
    setOpenSidebarModal(null);
    setMainModal('OpenAI API Key');
  };

  const handleMyAccount = () => {
    setOpenSidebarModal(null);
    setMainModal('Account');

    if (shouldClose) {
      setShouldClose(false);
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setOpenSidebarModal(null);
    setMainModal('Login');
    logout();
  };

  return (
    <div
      className="flex flex-col justify-center rounded-md w-64 text-white relative"
    >
      <button
        className="flex items-center space-x-2 text-md font-semibold p-4 py-5 transition-colors duration-200 hover:bg-dark-grey hover:bg-opacity-20 hover:text-yellow-600"
        onClick={handleMyAccount}
      >
        <MdAccountCircle size={20} className="text-gray-400 hover:text-blue-700" />
        <h1>My Account</h1>
      </button>
      <button
        className="flex items-center space-x-2 text-md font-semibold p-4 py-5 transition-colors duration-200 hover:bg-dark-grey hover:bg-opacity-20 hover:text-yellow-600"
        onClick={handleOpenAIApiKey}
      >
        <FaKey size={17} className="text-gray-400 hover:text-blue-700" />
        <h1>OpenAI API Key</h1>
      </button>
      <button
        className="flex items-center space-x-2 text-md font-semibold p-4 transition-colors duration-200 hover:bg-dark-grey hover:bg-opacity-20 hover:text-yellow-600"
        onClick={handleLogout}
      >
        <MdExitToApp size={20} className="text-gray-400 hover:text-blue-700" />
        <h1>Logout</h1>
      </button>
    </div>
  );
};

export default Account;
