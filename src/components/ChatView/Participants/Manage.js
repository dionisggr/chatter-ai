import React, { useState, useEffect, useContext } from 'react';
import { ChatContext } from '../../../context/ChatContext';
import { UserContext } from '../../../context/UserContext';
import data from '../../../data';

const ManageParticipants = ({ openChat, setChats, setMainModal }) => {
  const { user } = useContext(UserContext);
  const [errorMsg, setErrorMsg] = useState('');
  const [participants, setParticipants] = useState([]);

  const removeParticipant = async (participantId) => {
    if (window.confirm("Are you sure you want to remove this participant?")) {
      setParticipants(participants.filter((p) => p.id !== participantId));

      if (participantId === user?.id) {
        setChats((prev) => prev.filter((chat) => chat.id !== openChat.id));
        setMainModal(null);
      }
    }
  };

  useEffect(() => {
    const participantIds = data.user_conversations
      .filter((uc) => uc.conversation_id === openChat?.id)
      .map((uc) => uc.user_id);
    const newParticipants = data.users.filter((u) => participantIds.includes(u.id));

    setParticipants(newParticipants);
  }, [openChat]);

  return (
    <div className='flex flex-col items-center justify-center gap-2 relative'>
      <p className='text-2xl font-semibold text-center mb-4'>Manage Participants</p>
      <div className="grid grid-cols-3 gap-4 justify-items-center">
        {participants.map((participant) => (
          <div key={participant.id} className="group relative">
            <div className="w-16 h-16 border-2 border-blue-300 rounded-full overflow-hidden bg-gray-100 cursor-pointer">
              <img src={participant.avatar} alt={participant.username || participant.first_name} className="object-cover w-full h-full" />
              <button onClick={() => removeParticipant(participant.id)} className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="text-center mt-1">
              <p>{participant.username || participant.first_name}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2">{errorMsg}</p>
    </div>
  );
};

export default ManageParticipants;
