import React, { useState } from 'react';
import { checkApiKey } from '../utils/checkKeys';

const OpenaiApiKey = ({ apiKey, setApiKey, setMainModal }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [input, setInput] = useState(apiKey || '');

  const saveKey = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const keys = input;

    await checkApiKey(keys);

    console.log('OpenAI API Key works!');
    setApiKey(keys);
    setMainModal(null);

    setLoading(false);
  };

  const handleRemoveApiKey = () => {
    setApiKey(null);
    setInput('');
  };

  return (
    <form
      onSubmit={saveKey}
      className='flex flex-col items-center justify-center gap-2'>
      <p className='text-2xl mb-4 font-semibold'>Use your OpenAI API Key.</p>
      <p>Keys are saved only in your own browser</p>
      <p className='italic'>
        Get OpenAI API key{' '}
        <a
          className='text-blue-600'
          rel='noreferrer'
          target='_blank'
          href='https://platform.openai.com/account/api-keys'>
          here
        </a>
        .
      </p>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type='password'
        className='w-full max-w-xs input input-bordered focus:outline-none'
      />
      <button disabled={loading} className='w-fit max-w-xs btn btn-outline'>
        {loading ? (
          <span className='w-56 progress progress-info' />
        ) : (
          'Save to LocalStorage'
        )}
      </button>
      {apiKey && input && (
        <span
          onClick={handleRemoveApiKey}
          disabled={loading}
          className='w-full max-w-xs btn btn-error'>
          Remove key
        </span>
      )}
      <p>{errorMsg}</p>
    </form>
  );
};

export default OpenaiApiKey;
