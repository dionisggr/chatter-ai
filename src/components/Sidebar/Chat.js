import React, { useContext, useState, useEffect } from 'react';
import {
  MdArrowDropDown,
  MdDelete,
  MdEdit,
  MdCheck,
  MdClose,
} from 'react-icons/md';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import { ChatContext } from '../../context/ChatContext';

const Chat = ({ chat, isSelected, isSelectMode, toggleSelectedChat, newMessageCount }) => {
  const { setMessages } = useContext(ChatContext);
  const [name, setName] = useState(chat.name);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleEditName = (e) => {
    setName(e.target.value);
  };

  const handleSaveEdit = () => {
    // save your changes here...
    toggleEditMode();
  };

  const handleDeleteChat = () => {
    setMessages([]);
  };

  const toggleSelect = () => {
    toggleSelectedChat(chat);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      toggleEditMode();
      // save your changes here...
    }
  };

  useEffect(() => {
    if (newMessageCount > 0) {
      document.title = `(${newMessageCount}) New Messages - Chatter.AI`;
    } else {
      document.title = 'Chatter.AI';
    }
  }, [newMessageCount]);

  return (
    <div className="chat-room flex justify-between items-center bg-black bg-opacity-30 p-3 pl-1 pr-2 mb-0.5 rounded-xl shadow hover:bg-opacity-75 transition-all duration-100 ease-in-out cursor-pointer">
      <div className="flex">
        {isSelectMode && (
          <button onClick={toggleSelect} className="mx-2 rounded">
            {isSelected ? (
              <MdCheckBox size={22} className="text-slate-200" />
            ) : (
              <MdCheckBoxOutlineBlank size={22} className="text-slate-400" />
            )}
          </button>
        )}
        {isEditing ? (
          <input
            className="chat-room__name text-slate-200 outline-none border-none ml-3 max-w-[85%]"
            style={{ background: 'transparent', border: 'none' }}
            value={name}
            onChange={handleEditName}
            onBlur={toggleEditMode}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <div className={`flex ${!isEditing ? 'ml-3' : ''}`}>
            <button className="chat-room__name text-slate-200">{name}</button>
            {newMessageCount && (
              <span className="badge flex justify-center items-center bg-slate-200 text-darker-grey text-[10px] font-bold rounded-full max-h-fit px-1 h-4 mt-1 mx-2">
                {newMessageCount}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="chat-room__icons flex justify-end">
        {isEditing ? (
          <>
            <button
              onClick={toggleEditMode}
              className="mx-2 hover:bg-white hover:bg-opacity-20 rounded"
            >
              <MdCheck className="text-slate-200" />
            </button>
            <button
              onClick={() => {
                setName(chat.name);
                toggleEditMode();
              }}
              className="mx-2 hover:bg-white hover:bg-opacity-20 rounded"
            >
              <MdClose className="text-slate-200" />
            </button>
          </>
        ) : (
          <div>
            <button
              onClick={toggleEditMode}
              className="hover:bg-white hover:bg-opacity-20 rounded p-1"
            >
              <MdEdit className="text-slate-200" />
            </button>
            <button
              onClick={handleDeleteChat}
              className="hover:bg-white hover:bg-opacity-20 rounded p-1"
            >
              <MdDelete className="text-slate-200" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
