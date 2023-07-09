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
import { UserContext } from '../../context/UserContext';
import service from '../../service';

const Chat = (props) => {
  const {
    chat,
    isOpen,
    isSelected,
    isSelectMode,
    isMobile,
    activeSpace,
    setIsOpen,
    toggleSelectedChat,
    setOpenChat,
    setMessages,
  } = props;
  const { user } = useContext(UserContext);
  const { setChats } = useContext(ChatContext);
  const [name, setName] = useState(chat.title || null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isCreator = chat.created_by === user?.id;
  const isSpaceOwner = activeSpace?.created_by === user?.id;
  const createdByName = chat?.created_by_name?.[0].toUpperCase() +
    chat?.created_by_name?.slice(1);

  const toggleEditMode = (e) => {
    e.stopPropagation();
    setIsEditing(prev => !prev);
    setIsDeleting(false);
  };

  const toggleDeleteMode = (e) => {
    e.stopPropagation();
    setIsDeleting(prev => !prev);
    setIsEditing(false);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setIsEditing(false);
    setIsDeleting(false);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();

    try {
      await service.remove(`/chats/${chat.id}`);

      setMessages([]);
      setChats((prevChats) => prevChats.filter((c) => c.id !== chat.id));
      setIsEditing(false);
      setIsDeleting(false);
      setOpenChat(null);
    } catch (error) {
      console.error(error);
      alert('Error deleting chat')
    }
  };

  const handleSaveEdit = async () => {
    try {
      if (chat.title !== name) {
        const updatedChat = await service.patch(`/conversations/${chat.id}`,
          { title: name }
        );

        setChats((prevChats) => [updatedChat, ...prevChats.filter((c) => {
          return (c.id !== chat.id);
        })]);
      }

      setIsEditing(false);
      setIsDeleting(false);
    } catch (error) {
      console.error(error);
      alert('Error saving chat name');
    }
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
      handleSaveEdit();
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (chat.unread > 0) {
      document.title = `(${chat.unread}) New Messages - Chatter.AI`;
    } else {
      document.title = 'Chatter.AI';
    }
  }, [chat.unread]);

  useEffect(() => {
    setIsEditing(false);
    setIsDeleting(false);
  }, [chat]);
  return (
    <div
    className={`chat-room flex justify-between items-center h-12 p-3 pl-1 pr-2 mb-0.5 mr-0.5 rounded-xl shadow hover:bg-opacity-75 transition-all duration-100 ease-in-out cursor-pointer ${isOpen ? 'bg-blue-600 bg-opacity-50' : 'bg-black bg-opacity-30'}`}
    onClick={isSelectMode && isCreator ? toggleSelect : handleSelect}
  >
      <div className="flex">
        {isSelectMode && isCreator && (
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
            onBlur={handleSaveEdit}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <div className={`flex items-center min-w-fit ${!isEditing ? 'ml-3' : ''}`}>
            <button className="chat-room__name text-slate-200 text-left">{name}</button>
            {chat.unread && (
              <span className="badge flex justify-center items-center bg-slate-200 text-darker-grey text-[10px] font-bold rounded-full max-h-fit px-1 h-4 mt-1 mx-2">
                {chat.unread}
              </span>
            )}
            {!isCreator && (
              <span className="chat-creator text-slate-400 text-xs ml-2 mt-0.5">{createdByName}</span>
            )}
          </div>
        )}
      </div>
      {(isSpaceOwner || isCreator || isSelectMode || chat.type === 'private') && (
        <div className="chat-room__icons flex justify-end min-w-fit">
          {isCreator && (isEditing || isDeleting) ? (
            <div className="flex">
              <button
                onClick={isDeleting ? handleDelete : handleSaveEdit}
                className="hover:bg-white hover:bg-opacity-20 rounded p-1"
              >
                <MdCheck className="text-slate-200" />
              </button>
              <button
                onClick={handleCancel}
                className="mx-1 hover:bg-white hover:bg-opacity-20 rounded"
              >
                <MdClose className="text-slate-200" />
              </button>
            </div>
          ) : (!isSelectMode || isSpaceOwner) && (
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
          )}
        </div>
      )}
    </div>
  );
};

export default Chat;
