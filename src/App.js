import { useEffect, useState } from 'react';
import { ChatContextProvider } from './context/ChatContext';
import { UserContextProvider } from './context/UserContext';
import useLocalStorage from './hooks/useLocalStorage';
import Welcome from './components/Welcome';
import WelcomeInvited from './components/WelcomeInvited';
import ErrorInvited from './components/ErrorInvited';
import Sidebar from './components/Sidebar';
import SignUp from './components/SignUp';
import Account from './components/Account';
import PasswordReset from './components/PasswordReset';
import RecoverPassword from './components/RecoverPassword';
import MFA from './components/MFA';
import Login from './components/Login';
import OpenaiApiKey from './components/OpenaiApiKey';
import ChatView from './components/ChatView';
import Modal from './components/Modal';
import ManageParticipants from './components/ChatView/Participants/Manage';
import InviteUsers from './components/InviteUsers';
import service from './service';

const App = () => {
  const [token, setToken] = useLocalStorage('token');
  const [ , setRefreshToken] = useLocalStorage('refreshToken');
  const [openaiApiKey, setOpenaiApiKey] = useLocalStorage('openaiApiKey');
  const [mainModal, setMainModal] = useState(null);
  const [openChat, setOpenChat] = useState(null);

  const signInWithGoogle = () => {
    const clientId = 'YOUR_GOOGLE_CLIENT_ID';
    const redirectUri = 'YOUR_REDIRECT_URI';
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email`;
    window.open(url, '_self');
  };

  const logout = async () => {
    // await service.post('/logout', { token });

    setOpenaiApiKey(null);
    setToken(null);
    setRefreshToken(null);
    setMainModal('Welcome');
  };

  useEffect(() => {
    const path = window.location.pathname;
    const match = path.match(/\/space\/(.+)/);
    if (match) {
      const jwtToken = match[1];

      setToken(jwtToken);
      setMainModal('Welcome Invited');
    }
  }, []);

  useEffect(() => {
    console.log(token, typeof token)
    if (!token && !openaiApiKey) {
      setMainModal('Welcome');
    }
  }, [openaiApiKey]);

  return (
    <UserContextProvider>
      <ChatContextProvider>
        <div className="flex transition duration-500 ease-in-out">
          <Sidebar
            openChat={openChat}
            setOpenChat={setOpenChat}
            setMainModal={setMainModal}
            logout={logout}
          />
          <ChatView
            openChat={openChat}
            logout={logout}
            setMainModal={setMainModal}
          />
        </div>
        {mainModal && (
          <Modal title={mainModal} setMainModal={setMainModal}>
            {mainModal === 'Welcome' && (
              <Welcome setMainModal={setMainModal}/>
            )}
            {mainModal === 'Sign-Up' && (
              <SignUp
                setMainModal={setMainModal}
                signInWithGoogle={signInWithGoogle}
              />
            )}
            {mainModal === 'Login' && (
              <Login
                setMainModal={setMainModal}
                signInWithGoogle={signInWithGoogle}
              />
            )}
            {mainModal === 'Account' && (
              <Account setMainModal={setMainModal} />
              
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
                setMainModal={setMainModal}/>
            )}
            {mainModal === 'Invite Users' && (
              <InviteUsers
                openChat={openChat}
                setMainModal={setMainModal}/>
            )}
            {mainModal === 'Welcome Invited' && (
              <WelcomeInvited setMainModal={setMainModal}/>
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
