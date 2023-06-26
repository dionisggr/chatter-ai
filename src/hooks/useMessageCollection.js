import { useState } from 'react';

/**
 * A custom hook for managing the conversation between the user and the AI.
 *
 * @returns {Object} An object containing the `messages` array and the `addMessage` function.
 */
const useMessageCollection = () => {
  const [messages, setMessages] = useState([]);

  return [messages, setMessages];
}

export default useMessageCollection;
