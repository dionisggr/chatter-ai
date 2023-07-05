import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import { ChatContext } from '../../../context/ChatContext';
import service from '../../../service';

const ManageParticipants = ({ openChat, participants, setParticipants, setMainModal }) => {
  const { user } = useContext(UserContext);
  const { setMessages } = useContext(ChatContext);

  const isCreator = openChat?.created_by === user?.id;

  const removeParticipant = async ({ id, username, first_name}) => {
    if (id === user?.id) return;

    if (window.confirm("Are you sure you want to remove this participant?")) {
      try {
        await service.remove(`/chats/${openChat?.id}/participants/${id}`);
        
        setParticipants((prev) => prev?.filter((p) => p.id !== id));

        const newMsg = {
          content: `${username || first_name || id} was removed from the chat`,
          user_id: 'chatterai',
        }

        await service.post(`/conversations/${openChat?.id}/messages`, newMsg);  
      
        setMessages((prev) => [...prev, { ...newMsg, conversation_id: openChat?.id }]);
        setMainModal(null);
      } catch (error) {
        console.error(error);
        alert('Error removing participant');
      }
    }
  };

  useEffect(() => {
    const getParticipants = async () => {
      try {
        const newParticipants = await service.get(`/chats/${openChat?.id}/participants`);

        if (newParticipants) {
          setParticipants(newParticipants);
        }
      } catch (error) {
        console.error(error);
        setParticipants([]);
        alert('Error getting participants');
      }
    };

    if (openChat) {
      getParticipants();
    }
  }, [user, openChat]);

  return (
    <div className='flex flex-col items-center justify-center gap-2 relative'>
      <p className='text-2xl font-semibold text-center mb-4'>{isCreator && 'Manage'} Participants</p>
      <div className="grid grid-cols-3 gap-4 justify-items-center">
      {participants?.map((participant) => {
  // Add a check to determine if this is the current user
  const isCurrentUser = user?.id === participant.id;

  return (
    <div key={participant.id} className="group relative">
      <div className={`w-16 h-16 border-2 ${isCurrentUser ? 'border-yellow-500' : 'border-blue-300'} rounded-full overflow-hidden bg-gray-100 cursor-pointer`}>
        <img src={participant.avatar} alt={participant.username || participant.first_name} className="object-cover w-full h-full" />
        {isCreator && !isCurrentUser && (
          <button onClick={() => removeParticipant(participant)} className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 text-red-500">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <div className="text-center mt-1">
        <p>{participant.username || participant.first_name}</p>
      </div>
    </div>
  );
})}

      </div>
    </div>
  );
};

export default ManageParticipants;
