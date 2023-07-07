import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
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
import ManageParticipants from './components/ChatView/Participants/ManageParticipants';
import ManageUsers from './components/ManageUsers';
import Modal from './components/Modal';
import Sidebar from './components/Sidebar';
import ChatView from './components/ChatView';
import service from './service';
import websocket from './websocket';

const App = () => {
  const [, , , clearStorage] = useLocalStorage();
  const [, setRefreshToken] = useLocalStorage('refreshToken');
  const [token, setToken] = useLocalStorage('token');
  const [inviteToken, setInviteToken] = useLocalStorage('inviteToken');
  const [inviteSpace, setInviteSpace] = useLocalStorage('inviteSpace');
  const [openaiApiKey, setOpenaiApiKey, removeOpenaiApiKey] =
    useLocalStorage('openaiApiKey');

  const [mainModal, setMainModal] = useState('Welcome');
  const [openChat, setOpenChat] = useState(null);
  const [openChatType, setOpenChatType] = useState('private');
  const [activeSpace, setActiveSpace] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [websockets, setWebsockets] = useState([]);

  const isProduction = true || process.env.REACT_APP_NODE_ENV === 'production';

  useDarkMode();

  const signInWithGoogle = async (credential) => {
    try {
      const auth = await service.post('/google', {
        apiKey: process.env.REACT_APP_API_KEY,
        credential,
      });

      setToken(auth.token);
      setRefreshToken(auth.refreshToken);
    } catch (error) {
      console.error(error);
    }
  };

  const errorSignInWithGoogle = (response) => {
    console.error('Google Login failed:', response);
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
        setInviteToken(inviteToken);
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
  }, [token, inviteToken, setInviteToken, setInviteSpace]);

  useEffect(() => {
    const getSpace = async () => {
      const space = await service.post('/invites/validate', { inviteToken });

      setInviteSpace(space);
    };

    if (inviteToken) {
      getSpace();
    }
  }, [inviteToken]);

  useEffect(() => {
    if (openChat?.type === 'public' && !websockets.includes(openChat.id)) {
      websocket.connect(openChat.id);
      setWebsockets((prev) => [...prev, openChat.id]);

      websocket.handleMessage = (event) => {
        const { action, id, user_id, user } = JSON.parse(event.data);
        console.log('what', event.data)

        if (openChat.id !== id || openChat.created_by === user_id) {
          return;
        }

        if (['leave_chat', 'remove_participant'].includes(action)) {
          setParticipants((prev) => prev.filter((p) => p.id !== user_id));
        }

        if (action === 'join_chat') {
          setParticipants((prev) => [...prev, user]);
        }
      };
    }
  }, [openChat, websockets]);

  useEffect(() => {
    return () => { websocket.disconnect() };
  }, []);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <UserContextProvider>
        <ChatContextProvider>
          <div className="flex transition duration-500 ease-in-out">
            <Sidebar
              isProduction={isProduction}
              openChat={openChat}
              openChatType={openChatType}
              activeSpace={activeSpace}
              setOpenChatType={setOpenChatType}
              setOpenChat={setOpenChat}
              setMainModal={setMainModal}
              setActiveSpace={setActiveSpace}
              setParticipants={setParticipants}
              setWebsockets={setWebsockets}
              logout={logout}
            />
            <ChatView
              isProduction={isProduction}
              openChat={openChat}
              openChatType={openChatType}
              activeSpace={activeSpace}
              participants={participants}
              openaiApiKey={openaiApiKey}
              clearStorage={clearStorage}
              setOpenChat={setOpenChat}
              setMainModal={setMainModal}
              setActiveSpace={setActiveSpace}
              setParticipants={setParticipants}
              setWebsockets={setWebsockets}
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
                <Router>
                  <SignUp
                    inviteSpace={inviteSpace}
                    setMainModal={setMainModal}
                    login={login}
                  />
                </Router>
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
                  setWebsockets={setWebsockets}
                  setMainModal={setMainModal}
                />
              )}
              {mainModal === 'OpenAI API Key' && (
                <OpenaiApiKey
                  apiKey={openaiApiKey}
                  setApiKey={setOpenaiApiKey}
                  removeApiKey={removeOpenaiApiKey}
                  setMainModal={setMainModal}
                />
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
              {mainModal === 'Manage Users' && (
                <ManageUsers activeSpace={activeSpace} />
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
