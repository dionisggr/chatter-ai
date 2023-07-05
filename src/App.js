import { useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
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
  const [inviteSpace, setInviteSpace] = useLocalStorage('inviteSpace');

  const [mainModal, setMainModal] = useState('Welcome');
  const [openChat, setOpenChat] = useState(null);
  const [openChatType, setOpenChatType] = useState('private');
  const [activeSpace, setActiveSpace] = useState(null);
  const [participants, setParticipants] = useState([]);

  const isProduction = true || process.env.REACT_APP_NODE_ENV === 'production';

  useDarkMode();

  const signInWithGoogle = async (credential) => {
    try {
      const auth = await service.post('/google', {
        apiKey: process.env.REACT_APP_API_KEY,
        credential
      });

      setToken(auth.token);
      setRefreshToken(auth.refreshToken);
    } catch (error) {
      console.error(error);
    }
  };

  const errorSignInWithGoogle = (response) => {
    console.error('Google Login failed:', response);
    // You can add more actions here like showing an error notification to the user
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

    const validateToken = async (inviteToken) => {
      try {
        const space = await service.post('/invites/validate', { inviteToken });

        setInviteToken(inviteToken);
        setInviteSpace(space);
        setMainModal('Welcome Invited');
      } catch (error) {
        console.error(error);
        setMainModal('Error Invited');
      }
    };

    if (match) {
      const jwtToken = match[1];

      validateToken(jwtToken);
    } else if (token) {
      setInviteToken(null);
      setInviteSpace(null);
      setMainModal(null);
    } else if (inviteToken) {
      setInviteToken(null);
      setInviteSpace(null);
    }
  }, [token, inviteToken, setInviteToken, removeLocalValue]);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
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
              participants={participants}
              setOpenChat={setOpenChat}
              setMainModal={setMainModal}
              setActiveSpace={setActiveSpace}
              setParticipants={setParticipants}
            />
          </div>
          {mainModal && (
            <Modal
              title={mainModal}
              setMainModal={setMainModal}
              onManualClose={() => setInviteToken(null)}
            >
              {mainModal === 'Welcome' && (
                <Welcome setMainModal={setMainModal} />
              )}
              {mainModal === 'Sign-Up' && (
                <SignUp
                  isProduction={isProduction}
                  inviteSpace={inviteSpace}
                  setInviteToken={setInviteToken}
                  setInviteSpace={setInviteSpace}
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
                  errorSignInWithGoogle={errorSignInWithGoogle}
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
                <OpenaiApiKey setMainModal={setMainModal} />
              )}
              {mainModal === 'Password Reset' && (
                <PasswordReset setMainModal={setMainModal} logout={logout} />
              )}
              {mainModal === 'Recover Password' && (
                <RecoverPassword setMainModal={setMainModal} logout={logout} />
              )}
              {mainModal === 'MFA' && (
                <MFA setMainModal={setMainModal} logout={logout} />
              )}
              {mainModal === 'Manage Participants' && (
                <ManageParticipants
                  openChat={openChat}
                  participants={participants}
                  setParticipants={setParticipants}
                  setMainModal={setMainModal}
                />
              )}
              {mainModal === 'Invite Users' && (
                <InviteUsers
                  openChat={openChat}
                  activeSpace={activeSpace}
                  setMainModal={setMainModal}
                />
              )}
              {mainModal === 'Welcome Invited' && (
                <WelcomeInvited
                  inviteToken={inviteToken}
                  inviteSpace={inviteSpace}
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
    </GoogleOAuthProvider>
  );
};

export default App;
