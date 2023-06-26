import React from 'react';
import { useSpring, animated } from 'react-spring';

// Welcome Component 
const Welcome = ({ setMainModal }) => {
  // Fade in animation using react-spring
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500,
  });

  return (
    <animated.div style={fade} className="flex flex-col items-center justify-center gap-6 pb-4">
      <h1 className='text-4xl font-bold text-center'>Chatter.AI</h1>
      <p className='text-lg text-center'>Welcome chatter!</p>
      
      {/* Explain the goal of the app */}
      <p className='text-md'>
        This app is designed to simplify communication with AI among groups, teams, friends, family, and more, eliminating the need to constantly switch between conversations.
      </p>
      
      {/* Describe the default chat space */}
      <p className='text-md'>
        The default chat space on your left features AI bots with personalities for you to try out—think of it as a <i>demo</i>.
      </p>
      
      {/* Instructions to create a chat space */}
      <p className='text-md'>
        When you're ready, create your own chat space at the top left and invite others to join!
      </p>
      
      {/* List of chat space options */}
      <div className='w-full ml-4'>
        <label>
          You can create:
        </label>
        <ul className='list-disc list-inside ml-2'>
          <li>Public Chat Spaces (AI + Others)</li>
          <li>Private Chat Spaces (1:1 with AI)</li>
          <li>Direct Messages (Others)</li>
        </ul>
      </div>
      
      {/* "Try Now" button */}
      <button 
        onClick={() => setMainModal('Login')}
        className='btn btn-primary text-white mt-5 py-2 px-4 rounded'
      >
        Try Now
      </button>
    </animated.div>
  );
};

export default Welcome;
