import React, { useState, useEffect, useContext, useCallback } from 'react';
import { UserContext } from '../context/UserContext';
import useLocalStorage from '../hooks/useLocalStorage';
import service from '../service';
import sha256 from 'js-sha256';
import utils from '../utils';

import data from '../data';

const SignUp = ({ setMainModal, login, signInWithGoogle }) => {
  const { setUser } = useContext(UserContext);

  const [, setToken] = useLocalStorage('token');
  const [, setRefreshToken] = useLocalStorage('refreshToken');

  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [accountDetails, setAccountDetails] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const apiKey = process.env.REACT_APP_API_KEY;
  const passwordRequirements = 'Password must be at least 8 characters long ' +
    'and include an uppercase letter, a number, and a special character.';

  const handleInputChange = (e) => {
    setAccountDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginWithDemo = async (evt) => {
    evt.preventDefault();

    const credentials = {
      email: process.env.REACT_APP_DEMO_EMAIL,
      password: sha256(process.env.REACT_APP_DEMO_PASSWORD),
    };

    try {
      const auth = await login({ apiKey, ...credentials });

      setUser(auth.user);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { password, confirmPassword } = accountDetails;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return setLoading(false);
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return setLoading(false);
    }

    if (accountDetails.confirmPassword.length < 8 || passwordStrength < 4) {
      setLoading(false);
      return alert(passwordRequirements);
    }

    try {
      const auth = await service.post('/signup',
        utils.camelToSnakeCase(accountDetails)
      );

      setUser(auth.user);
      setToken(auth.token);
      setRefreshToken(auth.refreshToken);
      setLoading(false);
      setMainModal(null);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const evaluatePasswordStrength = useCallback(() => {
    let strength = 0;
    if (/[A-Z]/.test(accountDetails.password)) strength++; // Uppercase
    if (/[a-z]/.test(accountDetails.password)) strength++; // Lowercase
    if (/[0-9]/.test(accountDetails.password)) strength++; // Integers
    if (/[^A-Za-z0-9]/.test(accountDetails.password)) strength++; // Special characters

    setPasswordStrength(strength);
  }, [accountDetails.password]);

  useEffect(() => {
    evaluatePasswordStrength();
  }, [accountDetails.password, evaluatePasswordStrength]);

  return (
    <form
      onSubmit={handleSignUp}
      className='flex flex-col items-center justify-center gap-2 relative'
    >
      <p className='text-4xl font-semibold text-center mb-8'>Sign Up</p>
      <button 
        onClick={signInWithGoogle}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-5 mr-4">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" className="w-5 h-5 inline-block mr-2 mb-1" />
        Sign in with Google
      </button>
      <button 
        onClick={handleLoginWithDemo}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-8 border border-gray-400 rounded shadow mb-1 mr-4">
        Demo
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
        placeholder='Username (optional)'
        type='text'
        className='w-full max-w-xs input input-bordered focus:outline-none'
      />
      <input
        name='email'
        value={accountDetails.email}
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
      <p className="text-xs text-gray-500 w-3/4 mt-1">{passwordRequirements}</p>
      <button disabled={loading} className='btn btn-primary text-white mt-4 py-2 w-1/3 rounded'>
        {loading ? (
          <span className='w-56 progress progress-info' />
        ) : (
          'Join The Fun!'
        )}
      </button>
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
