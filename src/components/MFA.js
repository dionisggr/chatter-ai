import React, { useState, useEffect, createRef } from 'react';

const MFA = ({ setMainModal }) => {
  const [code, setCode] = useState(new Array(6).fill('')); // initialize 6 length array
  const [errorMsg, setErrorMsg] = useState('');
  
  const inputRefs = Array.from({length: 6}).map(() => createRef());
  
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    
    setCode([...code.slice(0, index), element.value, ...code.slice(index+1)]);

    //Focus next input
    if (element.nextSibling){
      element.nextSibling.focus();
    }
  };
  
  const handleKeyDown = (e, index) => {
    // clear current box
    console.log(code);
    if (code.filter(Boolean).length && e.keyCode === 8 || e.keyCode === 46) {
      setCode([...code.slice(0, index - 1), '', ...code.slice(index)]);
      if (e.target.previousSibling) {
        e.target.previousSibling.focus();
      }
    }
  };
  
  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text');
    setCode([...paste.slice(0,6), ...new Array(6).fill('').slice(paste.length)]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Add your code validation logic here

    setMainModal('ResetPassword');
  };

  // useEffect to focus the first input on component mount
  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  return (
    <form
      onSubmit={onSubmit}
      className='flex flex-col items-center justify-center gap-2 mx-8 relative text-center'>
      <p className='text-4xl font-semibold mb-8'>MFA Authentication</p>
      <p className='mb-4'>Please enter the 6-digit code that we sent to your email.</p>
      <div className='flex space-x-2 mb-6'>
        {code.map((digit, idx) => (
          <input
            type='text'
            maxLength='1'
            key={idx}
            value={digit}
            onChange={e => handleChange(e.target, idx)}
            onKeyDown={e => handleKeyDown(e, idx)}
            onPaste={handlePaste}
            ref={inputRefs[idx]}
            className='w-12 h-12 text-2xl border-2 border-gray-600 rounded text-center'
          />
        ))}
      </div>
      <p className='text-sm text-gray-500 mb-4'>This code is valid for 5 minutes</p>
      <button type="submit" className='btn btn-primary text-white mt-4 py-2 w-1/3 rounded'>
        Validate
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

export default MFA;
