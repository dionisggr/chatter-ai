import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

const Participants = ({ participants }) => {
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

  return (
    <div className={`absolute bottom-14 left-0 mb-10 ml-4`}>
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
                src={participant.avatar}
                alt={participant.username || participant.first_name}
                onMouseEnter={() => handleMouseEnter(participant, index)}
                onMouseLeave={handleMouseLeave}
              />
              <p className="text-white">{participant.username || participant.first_name}</p>
              {hoveredUser && hoveredUserIndex === index && (
                <div className="absolute p-3 justify-center bg-white text-black rounded shadow-lg left-16 ml-1 mt-2 -top-4 w-fit">
                  <h3 className="font-bold text-lg w-fit mx-auto">{`${hoveredUser.first_name} ${hoveredUser.last_name}`}</h3>
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