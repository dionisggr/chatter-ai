import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import useLocalStorage from '../hooks/useLocalStorage';
import service from '../service';

const PasswordReset = ({ setMainModal, logout }) => {
  const { user, setUser } = useContext(UserContext);
  const [token, setToken] = useLocalStorage('token');
  const [refreshToken, setRefreshToken] = useLocalStorage('refreshToken');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordDetails, setPasswordDetails] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const requirements = 'Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.';

  const handleInputChange = (e) => {
    setPasswordDetails({
      ...passwordDetails,
      [e.target.name]: e.target.value,
    });
  };

  // const resetPassword = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setErrorMsg('');

  //   if (passwordDetails.newPassword.length < 8) {
  //     setErrorMsg("New password must be at least 8 characters long");
  //     return setLoading(false);
  //   }

  //   const { newPassword: password } = passwordDetails;
  //   const body = { password, token };

  //   if (user) {
  //     body.currentPassword = passwordDetails.currentPassword;
  //   }

  //   let response = await service.update(`/users/${user.id}`, body);

  //   if (!response.ok) {
  //     const error = await response.json();

  //     if (error?.message?.includes('jwt')) {
  //       const reauthorization = await service.reauthorize(response, refreshToken);

  //       if (reauthorization.ok) {
  //         return resetPassword(e);
  //       } else {
  //         return logout();
  //       }
  //     }
  //   }

  //   const auth = await response.json();

  //   setToken(token);
  //   setRefreshToken(auth.refreshToken);
  //   setUser(auth.user);
  //   setLoading(false);
  //   setMainModal('Account');
  // };

  const resetPasswordDev = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (passwordDetails.newPassword.length < 8 || passwordStrength < 4) {
      setLoading(false);
      return alert(requirements);
    }

    setLoading(false);
    setMainModal('Account');
  };

  useEffect(() => {
    if (!user) {
      // setMainModal('Login');
    }
  }, [user])

  const evaluatePasswordStrength = () => {
    let strength = 0;
    if (/[A-Z]/.test(passwordDetails.newPassword)) strength++; 
    if (/[a-z]/.test(passwordDetails.newPassword)) strength++; 
    if (/[0-9]/.test(passwordDetails.newPassword)) strength++; 
    if (/[^A-Za-z0-9]/.test(passwordDetails.newPassword)) strength++; 

    setPasswordStrength(strength);
  };

  useEffect(() => {
    evaluatePasswordStrength();
  }, [passwordDetails.newPassword]);

  return (
    <form
      onSubmit={resetPasswordDev}
      className='flex flex-col items-center justify-center gap-2 relative'>
      {user && (
        <button
          onClick={() => setMainModal('Account')}
          className="self-start bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-5 mr-4"
        >
          Back to Account
        </button>
      )}
      <p className='text-4xl font-semibold text-center mb-8'>Reset Password</p>
      {user && (
        <input
          name='currentPassword'
          value={passwordDetails.currentPassword}
          onChange={handleInputChange}
          placeholder='Current Password'
          type='password'
          required
          className='w-full max-w-xs input input-bordered mb-4'
        />
      )}
      <input
        name='newPassword'
        value={passwordDetails.newPassword}
        onChange={handleInputChange}
        placeholder='New Password'
        type='password'
        required
        className='w-full max-w-xs input input-bordered'
      />
      <input
        name='confirmPassword'
        value={passwordDetails.confirmPassword}
        onChange={handleInputChange}
        placeholder='Confirm Password'
        type='password'
        required
        className='w-full max-w-xs input input-bordered'
      />
      <div className={`w-full max-w-xs h-2 rounded bg-gray-300 mt-2`}>
        <div style={{width: `${passwordStrength * 25}%`}} 
          className={`h-full rounded transition-all duration-500 
          ${passwordStrength === 1 ? 'bg-red-600' : passwordStrength === 2 ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
      </div>
      <p className="text-xs text-gray-500 w-3/4 mt-1">{requirements}</p>
      <button disabled={loading} className='btn btn-primary text-white mt-6 py-2 w-1/3 min-w-fit rounded'>
        {loading ? (
          <span className='w-56 progress progress-info' />
        ) : (
          'Change Password'
        )}
      </button>
      <p className="mt-2">{errorMsg}</p>
    </form>
  );
};

export default PasswordReset;
