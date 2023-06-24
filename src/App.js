import { useEffect, useState, useContext, useCallback } from 'react';
import { ChatContextProvider } from './context/ChatContext';
import { UserContextProvider } from './context/UserContext';
import useLocalStorage from './hooks/useLocalStorage';
import Sidebar from './components/Sidebar';
import Account from './components/Account.js';
import OpenaiApiKey from './components/OpenaiApiKey';
import ChatView from './components/ChatView';
import Modal from './components/Modal';
import service from './service';


const App = () => {
  const [token, setToken] = useLocalStorage('token');
  const [ , setRefreshToken] = useLocalStorage('refreshToken');
  const [openaiApiKey, setOpenaiApiKey] = useLocalStorage('openaiApiKey');
  const [mainModal, setMainModal] = useState(null);
  const [openChat, setOpenChat] = useState(null);
  const ModalContent = {
    'OpenAI API Key': OpenaiApiKey,
    Account
  }[mainModal] || null;

  const logout = async () => {
    await service.post('/logout', token);

    setOpenaiApiKey(null);
    setToken(null);
    setRefreshToken(null);
    setMainModal('Welcome');
  };

  useEffect(() => {
    if (!mainModal) {
      if (!openaiApiKey) {
        // setMainModal('Settings');
      }
    }
  }, [mainModal, openaiApiKey]);

  return (
    <UserContextProvider>
      <ChatContextProvider>
        <div className='flex transition duration-500 ease-in-out'>
          <Sidebar
            openChat={openChat}
            setOpenChat={setOpenChat}
            setMainModal={setMainModal}
            logout={logout}
          />
          <ChatView />
        </div>

        {mainModal && (
          <Modal title={mainModal} setMainModal={setMainModal}>
            <ModalContent mainModal={mainModal} setMainModal={setMainModal} />
          </Modal>
        )}
      </ChatContextProvider>
    </UserContextProvider>
  );
};

export default App;
