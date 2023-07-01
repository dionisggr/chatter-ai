import React, { useState,useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

const Participants = ({ participants, openChat }) => {
  const [open, setOpen] = useState(false);
  const [hoveredUser, setHoveredUser] = useState(null);
  const [hoveredUserIndex, setHoveredUserIndex] = useState(null);
  const nodeRef = useRef(null);

  const handleMouseEnter = (user, index) => {
    setHoveredUser(user);
    setHoveredUserIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredUser(null);
  };

  useEffect(() => {
    setOpen(false);
  }, [openChat]);

  return (
    <div className={`absolute bottom-4 left-0 ml-4`}>
      <CSSTransition
        nodeRef={nodeRef}
        in={open}
        timeout={300}
        classNames="whip"
        unmountOnExit
      >
        <div ref={nodeRef} className="bg-dark-grey flex flex-col bg-opacity-95 p-2 rounded-lg mb-4">
          {participants.map((participant, index) => (
            <div key={index} className="relative text-center inline-block">
              <img
                className="w-12 h-12 rounded-full m-1 border-2 border-white hover:border-blue-500 cursor-pointer"
                style={{border: participant.id === openChat?.created_by ? '2px solid yellow' : ''}}
                src={participant.avatar || 'https://i.imgur.com/HeIi0wU.png'}
                alt={participant.username || participant.first_name}
                onMouseEnter={() => handleMouseEnter(participant, index)}
                onMouseLeave={handleMouseLeave}
              />
              {participant.isCreator && 
                <div className="absolute text-xs text-white top-0 right-0">Admin</div>}
              <p className="text-white">{participant.username || participant.first_name || participant}</p>
              {hoveredUser && hoveredUserIndex === index && (
                <div className="absolute p-3 justify-center bg-white text-black rounded shadow-lg left-16 ml-1 mt-2 -top-4 w-fit">
                  <h3 className="font-bold text-lg w-fit mx-auto">{`${hoveredUser.username || hoveredUser.first_name || ''}`}</h3>
                  <p className="mt-1">{hoveredUser.email}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CSSTransition>
      <button
        className="bg-dark-grey bg-opacity-95 text-white flex items-center px-3 mx-2 py-2 rounded-2xl"
        onClick={() => setOpen(!open)}
      >
        {open ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
      </button>
    </div>
  );
};

export default Participants;
