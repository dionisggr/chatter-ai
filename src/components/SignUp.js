import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';

import data from '../data';

const SignUp = ({ setMainModal, signInWithGoogle }) => {
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [accountDetails, setAccountDetails] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setAccountDetails({
      ...accountDetails,
      [e.target.name]: e.target.value,
    });
  };

  const signUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (accountDetails.password !== accountDetails.confirmPassword) {
      setErrorMsg("Passwords do not match");
      setLoading(false);
      return;
    }

    if (accountDetails.password.length < 8) {
      alert("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    // API Code here

    setLoading(false);
    setMainModal(null);
  };

  const signInWithDemo = () => {
    const userData = data.users[0];

    setUser(userData);
    setMainModal(null);
  };

  const evaluatePasswordStrength = () => {
    let strength = 0;
    if (/[A-Z]/.test(accountDetails.password)) strength++; // checks for uppercase letters
    if (/[a-z]/.test(accountDetails.password)) strength++; // checks for lowercase letters
    if (/[0-9]/.test(accountDetails.password)) strength++; // checks for numbers
    if (/[^A-Za-z0-9]/.test(accountDetails.password)) strength++; // checks for special characters

    setPasswordStrength(strength);
  };

  useEffect(() => {
    evaluatePasswordStrength();
  }, [accountDetails.password]);

  return (
    <form
      onSubmit={signUp}
      className='flex flex-col items-center justify-center gap-2 relative'>
      <p className='text-4xl font-semibold text-center mb-8'>Sign Up</p>
      <button 
        onClick={signInWithGoogle}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-5 mr-4">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" className="w-5 h-5 inline-block mr-2 mb-1" />
        Sign in with Google
      </button>
      <button 
        onClick={signInWithDemo}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-1 mr-4">
        Demo Login
      </button>
      <input
        name='firstName'
        value={accountDetails.firstName}
        onChange={handleInputChange}
        placeholder='First name (optional)'
        type='text'
        className='w-full max-w-xs input input-bordered focus:outline-none'
      />
      <input
        name='lastName'
        value={accountDetails.lastName}
        onChange={handleInputChange}
        placeholder='Last name (optional)'
        type='text'
        className='w-full max-w-xs input input-bordered focus:outline-none'
      />
      <input
        name='username'
        value={accountDetails.username}
        onChange={handleInputChange}
        placeholder='Email'
        type='email'
        required
        className='w-full max-w-xs input input-bordered focus:outline-none'
      />
      <input
        name='password'
        value={accountDetails.password}
        onChange={handleInputChange}
        placeholder='Password'
        type='password'
        required
        className='w-full max-w-xs input input-bordered focus:outline-none'
      />
      <input
        name='confirmPassword'
        value={accountDetails.confirmPassword}
        onChange={handleInputChange}
        placeholder='Confirm Password'
        type='password'
        required
        className='w-full max-w-xs input input-bordered focus:outline-none'
      />
      <div className={`w-full max-w-xs h-2 rounded bg-gray-300 mt-2`}>
        <div style={{width: `${passwordStrength * 25}%`}} 
          className={`h-full rounded transition-all duration-500 
          ${passwordStrength === 1 ? 'bg-red-600' : passwordStrength === 2 ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
      </div>
      <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
      <button disabled={loading} className='btn btn-primary text-white mt-4 py-2 w-1/3 rounded'>
        {loading ? (
          <span className='w-56 progress progress-info' />
        ) : (
          'Join The Fun!'
        )}
      </button>
      <p className="mt-2">{errorMsg}</p>
      <p className="text-center mt-4">
        Already registered?{" "}
        <span
          onClick={() => setMainModal('Login')}
          className="text-blue-600 cursor-pointer">
          Login here
        </span>.
      </p>
    </form>
  );
};

export default SignUp;
