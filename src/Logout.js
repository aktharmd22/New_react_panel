import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaFileUpload } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const Logout = () => {
  const chat = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null);
  const [userData, setUserData] = useState(null);
  const fileInputRef = React.createRef();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    phonenumber: '',
    image:'',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://ci4backend.smartyuppies.com/Signinpage/displaySignup/${chat.id}`); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          console.log("signup data ",data)
          setUserData(data);
          setInputs({
            username: data.username || '',
            password: data.password || '', // Password should be kept empty for security reasons
            phonenumber: data.phone_number || '',
            image: data.image || '',
          });
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    if (chat?.id) {
      fetchUserData();
    }
  }, [chat?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleLogout = () => {
    Cookies.remove('userData');
    navigate('/Login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to hold the form data
    const formData = new FormData();
    formData.append('username', inputs.username);
    formData.append('password', inputs.password);
    formData.append('id', chat.id);
    formData.append('phone_number', inputs.phonenumber);

    // Append the file if it's selected
    if (file) {
      formData.append('image', file);
    }

    try {
      const response = await fetch('https://ci4backend.smartyuppies.com/Signinpage/updateSignup', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Form submitted successfully:', result);
        // Handle successful submission, e.g., show a success message
        message.success('Form submitted successfully!');
      } else {
        console.error('Failed to submit form');
        message.error('Failed to submit form');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      message.error('An error occurred while submitting the form');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col items-center md:items-start">
        <div className="bg-gray-300 h-[150px] w-[150px] text-white rounded-full flex items-center justify-center text-[90px]">
          <img src={inputs.image} className='h-[150px] w-[150px] rounded-full' alt="profile" />
        </div>
        <div className="mt-8 md:ml-6 p-6">
          <button
            onClick={handleLogout}
            className="border border-solid border-black p-3 rounded-lg text-green-600"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-8 md:mt-0 md:ml-20">
        <h1 className="text-2xl font-bold mb-4">User Details</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="input1" className="block text-gray-700">Name</label>
            <input
              type="text"
              id="input1"
              name="username"
              value={inputs.username}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="input3" className="block text-gray-700">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="input3"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded pr-10"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="input4" className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              id="input4"
              name="phonenumber"
              value={inputs.phonenumber}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="fileInput" className="block text-gray-700">Upload File</label>
            <input
              type="file"
              id="fileInput"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              required
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="flex items-center bg-gray-200 p-2 rounded border border-gray-300"
            >
              <FaFileUpload className="text-gray-600 mr-2" />
              {file ? file.name : 'Choose a file'}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-800 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Logout;
