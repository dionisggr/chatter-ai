import React from 'react';
import { useSpring, animated } from 'react-spring';

const Welcome = ({ setMainModal }) => {
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500,
  });

  return (
    <animated.div
      style={fade}
      className="flex flex-col items-center justify-center gap-6 pb-4"
    >
      <h1 className="text-4xl font-bold text-center">Chatter.AI</h1>
      <p className="text-lg text-center">Welcome!</p>

      <p className="text-md">
        Chatter.AI makes it easier for groups, teams, friends, and families to
        chat with AI, all in one place. No more jumping between chats.
      </p>

      <p className="text-md">
        Test our AI personalities in the demo chat space on your left.
      </p>

      <p className="text-md">
        Ready to go? Click 'create' at the top left and invite your friends to
        join your own chat space!
      </p>

      <div className="w-full ml-4">
        <label>You can create:</label>
        <ul className="list-disc list-inside ml-2">
          <li>Public Chats (With AI and others)</li>
          <li>Private Chats (1:1 with AI)</li>
          <li>Direct Messages (With others)</li>
        </ul>
      </div>

      <button
        onClick={() => setMainModal('Login')}
        className="btn btn-primary text-white mt-5 py-2 px-8 rounded"
      >
        Explore
      </button>
    </animated.div>
  );
};

export default Welcome;
