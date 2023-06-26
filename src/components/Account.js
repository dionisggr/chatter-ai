import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import _ from 'lodash';
import utils from '../utils';
import data from '../data';

// Placeholder image link, you can replace with your own placeholder link
const placeholderImg = 'https://via.placeholder.com/150';

const MyAccount = ({ setMainModal, signInWithGoogle }) => {
  const { user, setUser } = useContext(UserContext);
  const [isDirty, setIsDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [account, setAccount] = useState(user || {});
  const [avatar, setAvatar] = useState(user?.avatar || placeholderImg);

  const handleInputChange = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value || '',
    });
  };

  const updateAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // Add your account update logic here

    setLoading(false);
    setMainModal(null);
  };

  useEffect(() => {
    const user = utils.snakeToCamelCase(data?.users[0] || {});

    setUser(user);
    setAccount(user);
  }, []);

  useEffect(() => {
    setIsDirty(!_.isEqual(account, user));
  }, [user, account]);

  const handleAvatarEdit = (e) => {
    // Add your avatar editing logic here
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleChangePassword = () => {
    window.location.href = "/password/change";
  };

  return (
    <form
      onSubmit={updateAccount}
      className='flex flex-col items-center justify-center gap-2 relative'>
      <div className='avatar-edit-container relative'>
        <img src={avatar || placeholderImg} alt='User avatar' className='avatar rounded-full w-24 h-24' />
        <label 
          htmlFor='avatar-input' 
          className='absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded transition-colors duration-200 cursor-pointer'
        >
          Edit
        </label>
        <input 
          type='file' 
          onChange={handleAvatarEdit} 
          className='edit-avatar-btn'
          style={{display: 'none'}}
          id='avatar-input'
        />
      </div>
      <p className='text-2xl font-semibold text-center mb-4'>My Account</p>
      <input
        name='firstName'
        value={account.firstName}
        onChange={handleInputChange}
        placeholder='First name'
        type='text'
        className='w-full max-w-xs input input-bordered focus:outline-none'
      />
      <input
        name='lastName'
        value={account.lastName}
        onChange={handleInputChange}
        placeholder='Last name'
        type='text'
        className='w-full max-w-xs input input-bordered focus:outline-none'
      />
      <input
        name='username'
        value={account.username}
        onChange={handleInputChange}
        placeholder='Username'
        type='username'
        required
        className='w-full max-w-xs input input-bordered focus:outline-none'
      />
      <input
        name='email'
        value={account.email}
        onChange={handleInputChange}
        placeholder='Email'
        type='email'
        required
        className='w-full max-w-xs input input-bordered focus:outline-none'
      />
      <button onClick={handleChangePassword} className='btn btn-primary text-white mt-4 py-2 px-4 rounded'>
        Change Password
      </button>
      <button disabled={!isDirty} className='btn btn-primary text-white py-2 w-1/3 rounded'>
        {loading ? (
          <span className='w-56 progress progress-info' />
        ) : (
          'Update'
        )}
      </button>
      <p className="mt-2">{errorMsg}</p>
    </form>
  );
};

export default MyAccount;
