import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import data from '../data';

/**
 * A custom hook for managing the conversation between the user and the AI.
 *
 * @returns {Object} An object containing the `chats` array and the `addChat` function.
 */
const useChatCollection = () => {
  const welcome = {
    id: uuidv4(),
    title: 'Welcome',
    createdAt: Date.now(),
    createdBy: 'chatgpt',
  };
  const [chats, setChats] = useState([]);

  return [chats, setChats];
};

export default useChatCollection;
