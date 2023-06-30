import { createContext, useMemo } from 'react';
import useSpaceCollection from '../hooks/useSpaceCollection';
import useChatCollection from '../hooks/useChatCollection';
import useMessageCollection from '../hooks/useMessageCollection';

/**
 * ChatContext is a context object that is used to share collection of messages
 * between components
 */
const ChatContext = createContext({});

/**
 * ChatContextProvider is a functional component that serves as a provider for the ChatContext.
 * It provides the ChatContext to the components within its subtree.
 *
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} A ChatContext.Provider element.
 */
const ChatContextProvider = (props) => {
  const [spaces, setSpaces] = useSpaceCollection([]);
  const [chats, setChats] = useChatCollection([]);
  const [messages, setMessages] = useMessageCollection([]);
  const value = useMemo(() => ({
    spaces,
    setSpaces,
    chats,
    setChats,
    messages,
    setMessages,
  }), [spaces, setSpaces, chats, setChats, messages, setMessages]);

  return (
    <ChatContext.Provider value={value}>
      {props.children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatContextProvider };
