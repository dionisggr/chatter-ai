import React, { useContext, useState, useEffect } from 'react';
import { MdArrowDropDown, MdDelete, MdEdit, MdCheck, MdClose } from 'react-icons/md';
import { ChatContext } from '../../context/ChatContext';

const Chat = ({ chat, newMessageCount }) => {
  const { setMessages } = useContext(ChatContext);
  const { id, name: initialName } = chat;
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      toggleEditMode();
      // save your changes here...
    }
  };

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

  useEffect(() => {
    if (newMessageCount > 0) {
      document.title = `(${newMessageCount}) New Messages - Chatter.AI`;
    } else {
      document.title = 'Chatter.AI';
    }
  }, [newMessageCount]);  useEffect(() => {
    if (newMessageCount > 0) {
      document.title = `(${newMessageCount}) New Messages - Your App Name`;
    } else {
      document.title = 'Your App Name';
    }
  }, [newMessageCount]);

  return (
    <div className="chat-room flex justify-between items-center bg-black bg-opacity-30 p-3 mr-2 mb-0.5 rounded-xl shadow hover:bg-opacity-75 transition-all duration-100 ease-in-out cursor-pointer">
      {isEditing ? (
        <input
          className="chat-room__name text-slate-200 outline-none border-none max-w-[70%]"
          style={{ background: 'transparent', border: 'none' }}
          value={name}
          onChange={handleEditName}
          onBlur={toggleEditMode}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <div className="flex">
          <button className="chat-room__name text-slate-200">{name}</button>
          {newMessageCount && (
            <span className="badge flex justify-center items-center bg-slate-200 text-darker-grey text-[10px] font-bold rounded-full max-h-fit px-1 h-4 mt-1 mx-2">
              {newMessageCount}
            </span>
          )}
        </div>
      )}
      <div className="chat-room__icons flex justify-end">
        {isEditing ? (
          <>
            <button onClick={toggleEditMode} className="mx-2">
              <MdCheck className="text-slate-200" />
            </button>
            <button onClick={() => { setName(initialName); toggleEditMode(); }} className="mx-2">
              <MdClose className="text-slate-200" />
            </button>
          </>
        ) : (
          <>
            <button onClick={toggleEditMode} className="mx-2">
              <MdEdit className="text-slate-200" />
            </button>
            <button onClick={handleDeleteChat} className="mx-2">
              <MdDelete className="text-slate-200" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
