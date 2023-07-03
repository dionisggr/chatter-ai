import React, { useState, useEffect } from 'react';

const WelcomeInvited = ({ inviteToken, setMainModal }) => {
  const [chatSpace, setChatSpace] = useState(null);

  const validateTokenDev = () => {
    const space = data.organizations.filter(({ id }) => inviteToken == id)?.[0];

    if (space) {
      setChatSpace(space.name);
    } else {
      setMainModal('Error Invited');
    }
  };

  const handleSignup = () => {
    setMainModal('Sign-Up');
  }

  useEffect(() => {
    if (inviteToken) {
      validateTokenDev();
    } else {
      setMainModal('Welcome');
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-3xl leading-9 font-extrabold text-gray-900">
        Welcome to Chatter.AI!
      </h2>
      <p className="my-4 text-center text-sm leading-5 text-gray-600">
        An invitation has led you here.
      </p>
      <p className="mt-2 text-center text-sm leading-5 text-gray-600 w-3/4 mx-auto">
        Complete your invitation to the <b>{chatSpace}</b> chat space by signing up below!
      </p>

      <div className="flex justify-center mt-8">
        <button onClick={handleSignup} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default WelcomeInvited;
