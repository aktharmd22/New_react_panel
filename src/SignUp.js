import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!username || !password || !phoneNumber) {
      message.error("All fields are required");
      return;
    }

    try {
      const response = await fetch('https://ci4backend.smartyuppies.com/signinpage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          phone_number: phoneNumber,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        message.success('Signed in successfully');
        console.log("signup", data);
        navigate('/Login');
      } else {
        message.error(data.message || 'An error occurred');
      }
    } catch (error) {
      message.error("An error occurred during sign up. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'phoneNumber') {
      setPhoneNumber(value);
    }
  };

  const handleLogin = () => {
    navigate('/Login');
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSignUp();
    }
  };
  return (
    <div className="fixed inset-0 bg-gradient-to-r from-green-400 to-blue-500 flex justify-center items-center">
      <div className="bg-white border border-gray-200 shadow-2xl p-8 w-full max-w-md rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Sign Up</h1>

        <input
          type="text"
          name="username"
          placeholder="Enter your Username"
          value={username}
          onChange={handleInputChange}
          className="block w-full border border-gray-300 rounded-md p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          onKeyDown={handleKeyDown}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your Password"
          value={password}
          onChange={handleInputChange}
          className="block w-full border border-gray-300 rounded-md p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          onKeyDown={handleKeyDown}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Enter your Phone Number"
          value={phoneNumber}
          onChange={handleInputChange}
          className="block w-full border border-gray-300 rounded-md p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          onKeyDown={handleKeyDown}
       />
        <button
          onClick={handleSignUp}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Sign Up
        </button>
       
        <p className="mt-4 text-center text-gray-700">
          Already have an account?{' '}
          <button
            className="text-green-500 hover:underline"
            onClick={handleLogin}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
