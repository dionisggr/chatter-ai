import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 * A custom hook for managing the conversation between the user and the AI.
 *
 * @returns {Object} An object containing the `messages` array and the `addMessage` function.
 */
const useMessageCollection = () => {
  const initialMsg = {
    id: uuidv4(),
    content: '**Hi there!** *Welcome to Chatter.AI. You might want to ask me, "What can I do in this app?".',
    user_id: 'chatgpt',
    createdAt: Date.now(),
  }
  const [messages, setMessages] = useState([]);

  const upsertMessages = (messages) => {
    setMessages((prev) => [...prev, ...messages]);
  };

  return [messages, setMessages, upsertMessages];
}

export default useMessageCollection;
