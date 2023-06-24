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
  const [spaces, setSpaces, upsertSpaces] = useSpaceCollection([]);
  const [chats, setChats, upsertChats] = useChatCollection([]);
  const [messages, setMessages, upsertMessages] = useMessageCollection([]);
  const value = useMemo(() => ({
    spaces,
    setSpaces,
    upsertSpaces,
    chats,
    setChats,
    upsertChats,
    messages,
    setMessages,
    upsertMessages,
  }), [chats, messages, setChats, setMessages, setSpaces, spaces, upsertChats, upsertMessages, upsertSpaces]);

  return (
    <ChatContext.Provider value={value}>
      {props.children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatContextProvider };
