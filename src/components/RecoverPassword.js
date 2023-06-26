import React, { useState } from 'react';

const RecoverPassword = ({ setMainModal }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // Add your email validation and sending logic here

    setLoading(false);
    setMainModal('MFA');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center justify-center gap-2 mx-8 relative text-center'>
      <p className='text-4xl font-semibold mb-8'>Recover Password</p>
      <p className='mb-4'>Enter the email address associated with your account.</p>
      <p className='mb-2'>We will send you a link to reset your password if an account exists with the entered email.</p>
      <p className='mb-6'>Don't forget to check your spam folder as well!</p>
      <p className='mb-6 text-sm text-gray-500'>Note: If you've registered using your Google Account, please head to Google's own recovery process.</p>
      <input
        name='email'
        value={email}
        onChange={handleEmailChange}
        placeholder='Email'
        type='text'
        required
        className='w-full max-w-xs input input-bordered'
      />
      <button disabled={loading} className='btn btn-primary text-white mt-4 py-2 w-1/3 rounded'>
        {loading ? (
          <span className='w-56 progress progress-info' />
        ) : (
          'Submit'
        )}
      </button>
      <p className="mt-2">{errorMsg}</p>
      <p className="text-center mt-4">
        Remember your password?{" "}
        <span
          onClick={() => setMainModal('Login')}
          className="text-blue-600 cursor-pointer">
          Log in here
        </span>.
      </p>
    </form>
  );
};

export default RecoverPassword;
