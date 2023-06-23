import { useEffect, useState } from 'react';
import { ChatContextProvider } from './context/chatContext';
import { UserContextProvider } from './context/userContext';
import Sidebar from './components/Sidebar';
import ChatView from './components/ChatView';
import Modal from './components/Modal';
import OpenaiApiKey from './components/OpenaiApiKey';
import Account from './components/Account.js';

const App = () => {
  const [mainModal, setMainModal] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const ModalContent = {
    OpenaiApiKey,
    Account,
  };

  useEffect(() => {
    if (!mainModal) {
      const apiKey = window.localStorage.getItem('api-key');

      if (!apiKey) {
        // setMainModal('Settings');
      }
    }
  }, [mainModal]);

  return (
    <UserContextProvider>
      <ChatContextProvider>
        <div className='flex transition duration-500 ease-in-out'>
          <Sidebar
            setMainModal={setMainModal}
          />
          <ChatView />
        </div>

        {mainModal && (
          <Modal title={mainModal} setMainModal={setMainModal}>
            {mainModal === 'OpenAI API Key' &&
              <OpenaiApiKey mainModal={mainModal} setMainModal={setMainModal} />}
            {mainModal === 'Account' &&
              <Account mainModal={mainModal} setMainModal={setMainModal} />}
          </Modal>
        )}
      </ChatContextProvider>
    </UserContextProvider>
  );
};

export default App;
