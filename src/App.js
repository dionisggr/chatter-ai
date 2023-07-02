import { useEffect, useState } from 'react';
import { ChatContextProvider } from './context/ChatContext';
import { UserContextProvider } from './context/UserContext';
import useLocalStorage from './hooks/useLocalStorage';
import useDarkMode from './hooks/useDarkMode';
import Welcome from './components/Welcome';
import WelcomeInvited from './components/WelcomeInvited';
import ErrorInvited from './components/ErrorInvited';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Account from './components/Account';
import ChatSpaceSettings from './components/ChatSpaceSettings';
import PasswordReset from './components/PasswordReset';
import RecoverPassword from './components/RecoverPassword';
import MFA from './components/MFA';
import OpenaiApiKey from './components/OpenaiApiKey';
import InviteUsers from './components/InviteUsers';
import ManageParticipants from './components/ChatView/Participants/Manage';
import Modal from './components/Modal';
import Sidebar from './components/Sidebar';
import ChatView from './components/ChatView';

import service from './service';

const App = () => {
  const [, , removeLocalValue, clearStorage] = useLocalStorage();

  const [, setRefreshToken] = useLocalStorage('refreshToken');
  const [token, setToken] = useLocalStorage('token');
  const [inviteToken, setInviteToken] = useLocalStorage('inviteToken');

  const [mainModal, setMainModal] = useState('Welcome');
  const [openChat, setOpenChat] = useState(null);
  const [openChatType, setOpenChatType] = useState('private');
  const [activeSpace, setActiveSpace] = useState(null);

  const isProduction = true || process.env.REACT_APP_NODE_ENV === 'production';

  useDarkMode();

  const signInWithGoogle = () => {
    if (isProduction) {
      // const clientId = 'YOUR_GOOGLE_CLIENT_ID';
      // const redirectUri = 'YOUR_REDIRECT_URI';
      // const url = 'https://accounts.google.com/o/oauth2/v2/auth' +
      //   `?client_id=${clientId}` + 
      //   `&redirect_uri=${redirectUri}` +
      //   '&response_type=token' +
      //   '&scope=https://www.googleapis.com/auth/userinfo.email';

      // window.open(url, '_self');
    }
  };

  const login = async (credentials) => {
    try {
      const auth = await service.post('/login', credentials);

      setToken(auth.token);
      setRefreshToken(auth.refreshToken);
    
      return auth;
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      if (isProduction) {
        await service.post('/logout', {});
      }

      clearStorage();
      setMainModal('Login');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const path = window.location.pathname;
    const match = path.match(/\/space\/(.+)/);

    if (match) {
      const jwtToken = match[1];

      setInviteToken(jwtToken);
      setMainModal('Welcome Invited');
    } else if (inviteToken) {
      removeLocalValue('inviteToken');
    } else if (token) {
      setMainModal(null);
    }
  }, [token, inviteToken, setInviteToken, removeLocalValue]);
  
  return (
    <UserContextProvider>
      <ChatContextProvider>
        <div className="flex transition duration-500 ease-in-out">
          <Sidebar
            isProduction={isProduction}
            openChatType={openChatType}
            activeSpace={activeSpace}
            setOpenChatType={setOpenChatType}
            setOpenChat={setOpenChat}
            setMainModal={setMainModal}
            setActiveSpace={setActiveSpace}
            logout={logout}
          />
          <ChatView
            isProduction={isProduction}
            openChat={openChat}
            openChatType={openChatType}
            activeSpace={activeSpace}
            setOpenChat={setOpenChat}
            setMainModal={setMainModal}
            setActiveSpace={setActiveSpace}
          />
        </div>
        {mainModal && (
          <Modal
            title={mainModal}
            setMainModal={setMainModal}
            onManualClose={() => setInviteToken(null)}
          >
            {mainModal === 'Welcome' && (
              <Welcome setMainModal={setMainModal}/>
            )}
            {mainModal === 'Sign-Up' && (
              <SignUp
                isProduction={isProduction}
                setMainModal={setMainModal}
                signInWithGoogle={signInWithGoogle}
                login={login}
              />
            )}
            {mainModal === 'Login' && (
              <Login
                isProduction={isProduction}
                login={login}
                signInWithGoogle={signInWithGoogle}
                setMainModal={setMainModal}
              />
            )}
            {mainModal === 'Account' && (
              <Account setMainModal={setMainModal} />
            )}
            {mainModal === 'Chat Space Settings' && (
              <ChatSpaceSettings
                activeSpace={activeSpace}
                setActiveSpace={setActiveSpace}
                setMainModal={setMainModal}
              />
            )}
            {mainModal === 'OpenAI API Key' && (
              <OpenaiApiKey
                setMainModal={setMainModal}
              />
            )}
            {mainModal === 'Password Reset' && (
              <PasswordReset
                setMainModal={setMainModal}
                logout={logout}
              />
            )}
            {mainModal === 'Recover Password' && (
              <RecoverPassword
                setMainModal={setMainModal}
                logout={logout}
              />
            )}
            {mainModal === 'MFA' && (
              <MFA
                setMainModal={setMainModal}
                logout={logout}
              />
            )}
            {mainModal === 'Manage Participants' && (
              <ManageParticipants
                openChat={openChat}
                setMainModal={setMainModal}
              />
            )}
            {mainModal === 'Invite Users' && (
              <InviteUsers
                openChat={openChat}
                setMainModal={setMainModal}/>
            )}
            {mainModal === 'Welcome Invited' && (
              <WelcomeInvited
                inviteToken={inviteToken}
                setMainModal={setMainModal}
              />
            )}
            {mainModal === 'Error Invited' && (
              <ErrorInvited setMainModal={setMainModal} />
            )}
          </Modal>
        )}
      </ChatContextProvider>
    </UserContextProvider>
  );
};

export default App;
