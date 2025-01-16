import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/AuthStore';

// Create a simple Verify Code Page
function VerifyCodePage() {
  const {verifyEmail} = useAuthStore()
  const navigate = useNavigate();
  const [token, setCode] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');



  const handleChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const v = verifyEmail(token)
    if (v) {
      setIsValid(true);
      setIsSubmitted(true);
      setErrorMessage('');
      navigate('/login')
    } else {
      setIsValid(false);
      setIsSubmitted(true);
      setErrorMessage('Invalid verification code. Please try again.');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 border border-gray-300 rounded-lg shadow-lg bg-white text-center">
        <h2 className="text-2xl font-semibold">Verify Your Code</h2>
        <p className="mt-2 text-gray-600">Enter the verification code sent to your email </p>
        
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input
            type="text"
            value={token}
            onChange={handleChange}
            placeholder="Enter your code"
            maxLength="6"
            className="w-full p-3 text-lg text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          
          <button type="submit" className="w-full p-3 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
            Verify
          </button>
        </form>

        {isSubmitted && (
          <div className="mt-4">
            {isValid ? (
              <p className="text-green-500 font-semibold">Code verified successfully!</p>
            ) : (
              <p className="text-red-500 font-semibold">{errorMessage}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyCodePage;
