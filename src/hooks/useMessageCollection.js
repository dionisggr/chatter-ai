import { useState } from 'react';

const useMessageCollection = () => {
  const [messages, setMessages] = useState([]);

  return [messages, setMessages];
}

export default useMessageCollection;
