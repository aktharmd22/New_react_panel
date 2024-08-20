import React, { useState } from 'react';
import { message } from 'antd';

const PopupForm = ({ edit, show,forceUpdate,title,description}) => {
  const [formData, setFormData] = useState({
    name:title,
    password:description ,
    image: null,
    imageBase64: '', // New state to hold base64 string
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file,
          imageBase64: reader.result.split(',')[1], // Extract base64 string
        });
      };

      reader.readAsDataURL(file);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async () => {
    const formDataToSend = {
      username: formData.name,
      password: formData.password,
      image: formData.imageBase64,
    };

    console.log("FormData to send:", formDataToSend);

    try {
      const response = await fetch(`https://ci4backend.smartyuppies.com/Teams/updateTeamMember/${edit}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });
      if (!response.ok) {
        message.error('Failed to Update');
        throw new Error('Failed to remove card');
      

      }
      message.success('Update  successfully');
      const data = await response.json(); // Expecting JSON response
      console.log('Success:', data);
      // Additional logic here if needed
      // Close the popup after submission
      show(); // Close the popup after successful submission
    } catch (error) {
      console.error('Fetch error:', error);
    }
    forceUpdate()
  };

  return (
    <div className="fixed inset-0 flex items-center justify-end z-[5000]"> {/* Ensure z-index is high */}
      <div className="bg-white p-8 rounded-l transition-all duration-1000 ease-in-out shadow-lg w-full h-full overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Popup Form</h2>
          <button className="text-gray-400 hover:text-gray-600" onClick={show}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 mt-1 rounded w-full focus:outline-none focus:ring focus:border-blue-500"
          />
        </label>
        <label className="block mb-2">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 mt-1 rounded w-full focus:outline-none focus:ring focus:border-blue-500"
          />
        </label>
        <label className="block mb-2">
          <div className="flex items-center">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M15 10a5 5 0 11-10 0 5 5 0 0110 0zm-8 0a1 1 0 112 0 1 1 0 01-2 0zm8 0a1 1 0 100-2h-1.5a3.5 3.5 0 00-6.856 0H3a1 1 0 100 2h1.5a3.5 3.5 0 006.856 0H17z" clipRule="evenodd" />
              </svg>
              <span className="text-blue-500">Choose Image</span>
            </label>
          </div>
        </label>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={show} // Assuming show function is passed to close the popup
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupForm;
