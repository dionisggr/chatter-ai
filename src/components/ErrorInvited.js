import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ErrorInvited = ({ errorMessage, setMainModal }) => {
  const [ , setInviteToken] = useLocalStorage('inviteToken');

  const handleSignUp = () => {
    setInviteToken(null);
    setMainModal('Sign-Up');
  }

  return (
    <div className='flex flex-col items-center justify-center gap-1 relative w-10/12 mx-auto'>
      <p className='text-4xl font-semibold text-center mb-8'>Whoops!</p>
      <p className="text-center text-lg leading-6 font-medium text-gray-900">
        I could not find the chat you're looking for.
      </p>
      <p className="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
        {errorMessage}
      </p>
      <p className="mt-2 text-sm leading-5 text-gray-600 max-w">
        This could be due to a few reasons:
      </p>
      <div className="text-center max-w">
        <ul className="list-disc list-inside text-sm leading-5 text-gray-600 inline-block text-left">
          <li>The link might be broken</li>
          <li>The chat space no longer exists</li>
          <li>Maybe it was the plan all along...</li>
        </ul>
      </div>
      <p className="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
        Just to be sure, double-check the link with the person who invited you.
      </p>
      <p className="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
        You can always sign-up for an account, and start your very own Chat Space!
      </p>
      <div className="flex justify-center mt-6">
        <button onClick={handleSignUp} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Sign-Up!
        </button>
      </div>
    </div>
  );
}

export default ErrorInvited;
