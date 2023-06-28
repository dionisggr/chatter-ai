import React, { useState, useEffect, useContext } from 'react';
import sha256 from 'js-sha256';
import { UserContext } from '../context/UserContext';

import data from '../data';

const Login = ({ setMainModal, login, signInWithGoogle }) => {
  const { user, setUser } = useContext(UserContext);
  
  const [loading, setLoading] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    emailOrUsername: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState((newErrorMg) => {
    if (newErrorMg) {
      setTimeout(() => setErrorMsg(''), 3000);
    }

    return newErrorMg;
  });

  const handleInputChange = (e) => {
    setLoginDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  };

  const handleLoginWithDemo = () => {
    const userData = data.users.filter(u => u.id === 'demo')[0];

    setUser(userData);
    setMainModal(null);
  };

  const handleLogin = async (evt) => {
    evt.preventDefault();

    setLoading(true);

    const { emailOrUsername, password } = loginDetails;

    if (!emailOrUsername || !password) {
      return setErrorMsg('Please fill in all fields');
    }

    const credentials = { password: sha256(password) };

    if (emailOrUsername.includes('@')) {
      credentials.email = emailOrUsername;
    } else {
      credentials.username = emailOrUsername;
    }
    
    const auth = await login(credentials);

    setUser(auth.user);    
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      setMainModal(null);
    }
  }, [user])

  return (
    <form
      onSubmit={handleLogin}
      className='flex flex-col items-center justify-center gap-2 relative'>
      <p className='text-4xl font-semibold text-center mb-8'>Log In</p>
      <button 
        onClick={signInWithGoogle}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-3 mr-4">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" className="w-5 h-5 inline-block mr-2 mb-1" />
        Sign in with Google
      </button>
      <button 
        onClick={handleLoginWithDemo}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mb-1">
        Demo
      </button>
      <input
        name='emailOrUsername'
        value={loginDetails.username}
        onChange={handleInputChange}
        placeholder='Email or Username'
        type='text'
        required
        className='w-full max-w-xs input input-bordered focus:outline-none'
      />
      <input
        name='password'
        value={loginDetails.password}
        onChange={handleInputChange}
        placeholder='Password'
        type='password'
        required
        className='w-full max-w-xs input input-bordered focus:outline-none'
      />
      <span
        onClick={() => setMainModal('Recover Password')}
        className="text-blue-600 cursor-pointer">
        Forgot your password?
      </span>
      <button disabled={loading} className='btn btn-primary text-white mt-4 py-2 w-1/3 rounded'>
        {loading ? (
          <span className='w-56 progress progress-info' />
        ) : (
          'Log In'
        )}
      </button>
      <p className="mt-2">{errorMsg}</p>
      <p className="text-center mt-4">
        Don't have an account?{" "}
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
