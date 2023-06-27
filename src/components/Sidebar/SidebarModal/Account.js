import React, { useContext } from 'react';
import { MdAccountCircle, MdExitToApp } from 'react-icons/md';
import { UserContext } from '../../../context/UserContext';

const Account = ({ setOpenSidebarModal, setMainModal, logout }) => {
  const { user, setUser } = useContext(UserContext);

  const handleOpenAIApiKey = () => {
    setOpenSidebarModal(null);
    setMainModal('OpenAI API Key');
  };

  const handleMyAccount = () => {
    setOpenSidebarModal(null);
    setMainModal('Account');
  };

  const handleLogout = () => {
    window.localStorage.removeItem('chatter-ai');
    setUser(null);
    setOpenSidebarModal(null);
    logout();

    console.log('Logged out');
  };

  return (
    <div
      className="flex flex-col justify-center rounded-md w-64 text-white relative"
    >
      <button
        className="flex items-center space-x-2 text-md font-semibold p-4 py-5 transition-colors duration-200 hover:bg-dark-grey hover:bg-opacity-20 hover:text-yellow-600"
        onClick={handleMyAccount}
        disabled={user.id === 'demo'}
      >
        <MdAccountCircle size={20} className="text-gray-400 hover:text-blue-700" />
        <h1>My Account</h1>
      </button>
      <button
        className="flex items-center space-x-2 text-md font-semibold p-4 py-5 transition-colors duration-200 hover:bg-dark-grey hover:bg-opacity-20 hover:text-yellow-600"
        onClick={handleOpenAIApiKey}
      >
        <MdAccountCircle size={20} className="text-gray-400 hover:text-blue-700" />
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
