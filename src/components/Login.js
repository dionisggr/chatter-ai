import React, { useState, useEffect, useContext } from 'react';
import sha256 from 'js-sha256';
import { GoogleLogin } from '@react-oauth/google';
import { UserContext } from '../context/UserContext';
import useLocalStorage from '../hooks/useLocalStorage';
import service from '../service';

const Login = ({ setMainModal, login }) => {
  const { user, setUser } = useContext(UserContext);

  const [, setToken] = useLocalStorage('token');
  const [, setRefreshToken] = useLocalStorage('refreshToken');

  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    emailOrUsername: '',
    password: '',
  });

const apiKey = process.env.REACT_APP_API_KEY;

  const handleInputChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  };

  const handleLogin = async (evt, data = loginData) => {
    evt.preventDefault();
  
    setLoading(true);
  
    const { emailOrUsername, password } = data;
  
    if (!emailOrUsername || !password) {
      alert('Please fill in all fields');
      return;
    }
  
    const credentials = { password: sha256(password) };
  
    if (emailOrUsername.includes('@')) {
      credentials.email = emailOrUsername;
    } else {
      credentials.username = emailOrUsername;
    }
  
    try {
      const auth = await login({ apiKey, ...credentials });
  
      setUser(auth.user);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };
  
  const handleLoginWithDemo = async () => {
    const demoData = {
      emailOrUsername: process.env.REACT_APP_DEMO_EMAIL,
      password: process.env.REACT_APP_DEMO_PASSWORD,
    }
    await handleLogin({ preventDefault: () => {} }, demoData);
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

  useEffect(() => {
    if (user) {
      setMainModal(null);
    }
  }, [user, setMainModal])

  return (
    <form
      onSubmit={handleLogin}
      className='flex flex-col items-center justify-center gap-2 relative'>
      <p className='text-4xl font-semibold text-center mb-4'>Log In</p>
      <GoogleLogin
        onSuccess={handleSignInWithGoogle}
      />
      <button 
        onClick={handleLoginWithDemo}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-2">
        Demo
      </button>
      <input
        name='emailOrUsername'
        value={loginData.username}
        onChange={handleInputChange}
        placeholder='Email or Username'
        type='text'
        className='w-full max-w-xs input input-bordered focus:outline-none'
      />
      <input
        name='password'
        value={loginData.password}
        onChange={handleInputChange}
        placeholder='Password'
        type='password'
        className='w-full max-w-xs input input-bordered focus:outline-none'
      />
      <span
        onClick={() => setMainModal('Recover Password')}
        className="text-blue-600 cursor-pointer">
        Forgot your password?
      </span>
      <button disabled={loading} className='btn btn-primary text-white mt-4 py-2 w-1/3 rounded min-w-fit'>
        {loading ? (
          <span className='w-56 progress progress-info' />
        ) : (
          'Log In'
        )}
      </button>
      <p className="text-center mt-4">
        Don't have an account?{" "}
        <br className="sm:hidden" />
        <span
          onClick={() => setMainModal('Sign-Up')}
          className="text-blue-600 cursor-pointer">
          Sign up here
        </span>.
      </p>
    </form>
  );
};

export default Login;
