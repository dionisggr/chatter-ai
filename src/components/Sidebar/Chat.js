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
    <div className="chat-room">
      <button className="chat-room__name">{name}</button>
      <div className="chat-room__icons">
        <button onClick={handleOpenDropdown}>
          <MdArrowDropDown />
        </button>
        <button onClick={() => handleDeleteChat(id)}>
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default Chat;
