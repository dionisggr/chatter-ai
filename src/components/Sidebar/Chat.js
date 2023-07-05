import React, { useContext, useState, useEffect } from 'react';
import {
  MdDelete,
  MdEdit,
  MdCheck,
  MdClose,
  MdCheckBoxOutlineBlank,
  MdCheckBox
} from 'react-icons/md';
import { ChatContext } from '../../context/ChatContext';
import service from '../../service';

const Chat = ({ chat, isOpen, isSelected, isSelectMode, isMobile, setIsOpen, toggleSelectedChat, setOpenChat, newMessageCount, setMessages }) => {
  const { setChats } = useContext(ChatContext);
  const [name, setName] = useState(chat.title || null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const toggleDeleteMode = () => {
    setIsDeleting(!isDeleting);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();

    try {
      await service.remove(`/chats/${chat.id}`);

      setIsEditing(false);
      setIsDeleting(false);
      setOpenChat(null);
      setMessages([]);
      setChats((prevChats) => prevChats.filter((c) => c.id !== chat.id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveEdit = () => {
    setChats((prevChats) => prevChats.map((c) => {
      return (c.id === chat.id) ? { ...c, name } : c;
    }));
    setIsEditing(false);
    setIsDeleting(false);
  };

  const toggleSelect = () => {
    toggleSelectedChat(chat);
    setOpenChat(chat);
  };

  const handleSelect = () => {
    if (isMobile) {
      setIsOpen(false);
    }

    setOpenChat(chat);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit(); // save your changes when 'Enter' is pressed
      e.preventDefault(); // prevent the form submission
    }
  };

  useEffect(() => {
    if (newMessageCount > 0) {
      document.title = `(${newMessageCount}) New Messages - Chatter.AI`;
    } else {
      document.title = 'Chatter.AI';
    }
  }, [newMessageCount]);

  useEffect(() => {
    setIsEditing(false);
    setIsDeleting(false);
  }, [chat])

  return (
    <div
    className={`chat-room flex justify-between items-center h-12 p-3 pl-1 pr-2 mb-0.5 rounded-xl shadow hover:bg-opacity-75 transition-all duration-100 ease-in-out cursor-pointer ${isOpen ? 'bg-blue-600 bg-opacity-50' : ''}`}
    onClick={isSelectMode ? toggleSelect : handleSelect}
  >
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
            onChange={({ target }) => setName(target.value)}
            onBlur={handleSaveEdit} // save your changes when the input loses focus
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <div className={`flex min-w-fit ${!isEditing ? 'ml-3' : ''}`}>
            <button className="chat-room__name text-slate-200 text-left">{name}</button>
            {newMessageCount && (
              <span className="badge flex justify-center items-center bg-slate-200 text-darker-grey text-[10px] font-bold rounded-full max-h-fit px-1 h-4 mt-1 mx-2">
                {newMessageCount}
              </span>
            )}
          </div>
        )}
      </div>
      {(chat.type === 'private' || isSelectMode) && (
        <div className="chat-room__icons flex justify-end min-w-fit">
          {(isEditing || isDeleting) ? (
            <div className="flex">
              <button
                onClick={isDeleting ? handleDelete : handleSaveEdit}
                className="hover:bg-white hover:bg-opacity-20 rounded p-1"
              >
                <MdCheck className="text-slate-200" />
              </button>
              <button
                onClick={toggleEditMode}
                className="mx-1 hover:bg-white hover:bg-opacity-20 rounded"
              >
                <MdClose className="text-slate-200" />
              </button>
            </div>
          ) : (!isSelectMode && (
            <div>
              <button
                onClick={toggleEditMode}
                className="hover:bg-white hover:bg-opacity-20 rounded p-1"
              >
                <MdEdit className="text-slate-200" />
              </button>
              <button
                onClick={toggleDeleteMode}
                className="hover:bg-white hover:bg-opacity-20 rounded p-1"
              >
                <MdDelete className="text-slate-200" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chat;
