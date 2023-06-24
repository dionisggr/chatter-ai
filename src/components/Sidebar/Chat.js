import React, { useContext } from 'react';
import { MdArrowDropDown, MdDelete } from 'react-icons/md';
import { ChatContext } from '../../context/ChatContext';

const Chat = ({ chat }) => {
  const { setMessages } = useContext(ChatContext);
  const { id, name } = chat;

  const handleDeleteChat = (chatId) => {
    // TODO: Remove chat from context and state
    setMessages([]);
  };

  const handleOpenDropdown = () => {
    // TODO: Implement functionality for opening chat-specific dropdown
  };

  return (
    <div className="chat-room flex justify-between items-center bg-black bg-opacity-30 p-3 mr-2 mb-0.5 rounded-xl shadow hover:bg-opacity-75 transition-all duration-200 ease-in-out cursor-pointer">
      <button className="chat-room__name text-slate-200">{name}</button>
      <div className="chat-room__icons flex justify-end">
        <button onClick={handleOpenDropdown} className="mx-2">
          <MdArrowDropDown className="text-slate-200" />
        </button>
        <button onClick={() => handleDeleteChat(id)} className="mx-2">
          <MdDelete className="text-slate-200" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
