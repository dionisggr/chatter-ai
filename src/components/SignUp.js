import React, { useState, useEffect, useContext, useCallback } from 'react';
import sha256 from 'js-sha256';
import { GoogleLogin } from '@react-oauth/google';
import { UserContext } from '../context/UserContext';
import useLocalStorage from '../hooks/useLocalStorage';
import service from '../service';
import utils from '../utils';

const SignUp = ({ setMainModal, inviteSpace, setInviteSpace, setInviteToken, login, signInWithGoogle }) => {
  const { setUser } = useContext(UserContext);

  const [, setToken] = useLocalStorage('token');
  const [, setRefreshToken] = useLocalStorage('refreshToken');

  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [accountDetails, setAccountDetails] = useState({
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

    const details = {};

    for (const key in accountDetails) {
      if (key && key !== 'confirmPassword') {
        details[key] = accountDetails[key];
      }

      if (key === 'password') {
        details[key] = sha256(accountDetails[key]);
      }
    }

    if (inviteSpace) {
      details.organization_id = inviteSpace.id;
    }

    try {
      const auth = await service.post('/signup',
        utils.camelToSnakeCase(details)
      );

      window.localStorage.removeItem('chatter-ai');

      setUser(auth.user);
      setToken(auth.token);
      setRefreshToken(auth.refreshToken);
      setLoading(false);
      setMainModal(null);
    } catch (error) {
      alert(error.message || error);
    }
  };

  const handleSignInWithGoogle = async ({ credential }) => {
    try {
      const auth = await service.post('/google', {
        apiKey: process.env.REACT_APP_API_KEY,
        credential
      });

      setToken(auth.token);
      setRefreshToken(auth.refreshToken);
      setUser(auth.user);
    } catch (error) {
      console.log('runs')
      console.error(error);
    }
  }

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
      <p className='text-4xl font-semibold text-center mb-6'>Sign Up</p>
      <GoogleLogin
        onSuccess={handleSignInWithGoogle}
      />
      <button 
        onClick={handleLoginWithDemo}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-8 border border-gray-400 rounded shadow mr-4 m-2 mb-2">
        Demo
      </button>
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
      <button disabled={loading} className='btn btn-primary text-white mt-4 py-2 w-1/3 rounded min-w-fit'>
        {loading ? (
          <span className='w-56 progress progress-info' />
        ) : (
          'Join The Fun!'
        )}
      </button>
      <p className="text-center mt-4">
        Already registered?{" "}
        <br className="sm:hidden" />
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
