import { useState } from 'react';

const useChatCollection = () => {
  const [chats, setChats] = useState([]);

  return [chats, setChats];
};

export default useChatCollection;
