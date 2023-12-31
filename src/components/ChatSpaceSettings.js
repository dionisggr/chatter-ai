import React, { useState, useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import service from '../service';
import websocket from '../websocket';

const ChatSpaceSettings = ({ setMainModal, activeSpace, setActiveSpace, setWebsockets }) => {
  const { spaces, setSpaces } = useContext(ChatContext);
  const [chatName, setChatName] = useState('');
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  const handleChatNameChange = (e) => {
    setChatName(e.target.value || '');
  };

  const handleUpdateChatSpaceName = async (e) => {
    e.preventDefault();

    try {
      await service.patch(`/spaces/${activeSpace.id}`,
        { name: chatName }
      );

      const newSpace = { ...activeSpace, name: chatName };

      setSpaces(spaces.map(space => {
        if (space.id === activeSpace.id) {
          return newSpace;
        }

        return space;
      }));
      setActiveSpace(newSpace);

      setMainModal(null);   
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteChatSpace = async (e) => {
    e.preventDefault();

    if (!activeSpace) {
      return;
    }

    try {
      await service.remove(`/spaces/${activeSpace.id}`);

      const newSpaces = spaces.filter(space => space.id !== activeSpace.id);

      setSpaces(newSpaces);
      setActiveSpace(newSpaces[0]);
      setMainModal(null);
      setShowDeleteConfirmModal(false);

      websocket.disconnect(activeSpace.id);
      setWebsockets((prev) => prev.filter(id => id !== activeSpace.id));
    } catch (error) {
      console.error(error);
      alert('Unauthorized to delete chat.');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center gap-2 relative'>
      <p className='text-xl font-semibold text-center mb-4'>Chat Space Settings</p>
      <p className='mb-2'>Here you can change the chat space name or delete the chat space. Be careful, deleting the chat is a permanent action.</p>
      <form onSubmit={handleUpdateChatSpaceName} className='w-full max-w-xs'>
        <input
          name='chatName'
          value={chatName}
          onChange={handleChatNameChange}
          placeholder='Chat Space Name'
          type='text'
          className='w-full input input-bordered focus:outline-none'
        />
        <button className='btn btn-primary text-white mt-4 py-2 w-full rounded'>
          Update
        </button>
        <button onClick={() => setMainModal('Manage Users')} className='btn btn-manage text-white bg-green-600 border-none hover:bg-green-700 bg-opacity-80 mt-2 py-2 w-full rounded'>
          Manage Users
        </button>
      </form>
      <button 
        onClick={() => setShowDeleteConfirmModal(true)} 
        className='btn text-white mt-1 py-2 px-4 bg-red-500 hover:bg-red-700 rounded border-none'
      >
        Delete Chat Space
      </button>
      {showDeleteConfirmModal && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
          <div className='mini-modal p-6 bg-white rounded max-w-md mx-auto'>
            <p className='mb-4 text-lg font-medium'>Are you sure you want to delete this chat? This cannot be undone.</p>
            <div className='flex justify-end'>
              <button onClick={() => setShowDeleteConfirmModal(false)} className='btn btn-secondary mr-2 py-1 px-3'>
                Cancel
              </button>
              <button onClick={handleDeleteChatSpace} className='btn btn-danger py-1 px-3'>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSpaceSettings;
