import React, { useState, useContext } from 'react';
import { ChatContext } from '../../../context/ChatContext';
import service from '../../../service';

const NewChatSpace = ({ setOpenSidebarModal, setOpenChat }) => {
  const { setSpaces, setChats, setMessages } =
    useContext(ChatContext);
  
  const [chatName, setChatName] = useState('');

  const handleInputChange = (e) => {
    setChatName(e.target.value);
  };

  const handleNewChat = async () => {
    const data = { name: chatName };

    const newSpace = await service.post('/spaces', data);

    if (newSpace) {
      setSpaces((prevSpaces) => [...prevSpaces, newSpace]);
      setChats([]);
      setMessages([]);
      setOpenChat(null);      
      setOpenSidebarModal(null);
    }
  };

  return (
    <div className="flex flex-col justify-center rounded-md w-64 relative p-4">
      <input 
        className="border border-gray-400 p-2 mb-4 rounded" 
        type="text" 
        placeholder="Chat Space Name" 
        value={chatName} 
        onChange={handleInputChange}
      />

      <div className="flex space-x-2">
        <button
          className="flex-grow text-center text-white py-2 transition-colors duration-200 hover:bg-dark-grey hover:bg-opacity-20 hover:text-yellow-600"
          onClick={handleNewChat}
        >
          Create
        </button>

        <button
          className="flex-grow text-center text-white py-2 transition-colors duration-200 hover:bg-dark-grey hover:bg-opacity-20 hover:text-yellow-600"
          onClick={() => setOpenSidebarModal(null)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NewChatSpace;
