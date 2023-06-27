import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import service from '../service';

import data from '../data';
import { validate } from 'uuid';

const WelcomeUser = ({ setMainModal }) => {
  const [token] = useLocalStorage('token');
  const [chatSpace, setChatSpace] = useState(null);

  const validateTokenDev = () => {
    const space = data.organizations.filter(({ id }) => token == id)?.[0];

    if (space) {
      setChatSpace(space.name);
    } else {
      setMainModal('Error Invited');
    }
  };

  const handleSignup = () => {
    setMainModal('Sign-Up')
  }

  useEffect(() => {
    if (token) {
      validateTokenDev();
    } else {
      setMainModal('Welcome');
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-3xl leading-9 font-extrabold text-gray-900">
        Welcome to {chatSpace}!
      </h2>
      <p className="mt-2 text-center text-sm leading-5 text-gray-600">
        Thank you for accepting the invitation. Please sign up to join the chat.
      </p>

      <div className="flex justify-center mt-6">
        <button onClick={handleSignup} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default WelcomeUser;
