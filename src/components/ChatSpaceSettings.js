import React, { useState } from 'react';
import service from '../service';

const ChatSpaceSettings = ({ setMainModal }) => {
  const [chatName, setChatName] = useState('');
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  const handleChatNameChange = (e) => {
    setChatName(e.target.value || '');
  };

  const handleUpdateChatName = async (e) => {
    e.preventDefault();

    try {
      await service.update('/chats', { name: chatName });

      setMainModal(null);   
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteChat = (e) => {
    e.preventDefault();
    // Add your chat delete logic here
    setShowDeleteConfirmModal(false);
  };

  return (
    <div className='flex flex-col items-center justify-center gap-2 relative'>
      <p className='text-xl font-semibold text-center mb-4'>Chat Space Settings</p>
      <p className='mb-2'>Here you can change the chat space name or delete the chat space. Be careful, deleting the chat is a permanent action.</p>
      <form onSubmit={handleUpdateChatName} className='w-full max-w-xs'>
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
              <button onClick={handleDeleteChat} className='btn btn-danger py-1 px-3'>
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
