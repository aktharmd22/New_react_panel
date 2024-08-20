import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { message } from 'antd';

const Popup = ({ onClose }) => {
  const userData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;
  console.log("userdata",userData)
  const[alert,setAlert]=useState();
  const [formData, setFormData] = useState({
    business_name: '',
    phone_number: '',
    phone_number_id: '',
    app_id: '',
    access_token: '',
    username:userData.username,
    id:userData.id,
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("connectaccount", formData);
    
    try {
      const response = await fetch('https://ci4backend.smartyuppies.com/ConnectAccount/addAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.success === true) {
          message.success(data.message);
        } else {
          message.error(data.message);
        }
        setAlert(data); // Ensure setAlert is properly initialized
        console.log("Response data:", data);
        onClose(); // Ensure onClose is defined
      } else {
        const errorMessage = `Failed to add account: ${response.statusText}`;
        message.error(errorMessage);
        console.error(errorMessage);
      }
    } catch (error) {
      message.error('Network issue');
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black bg-opacity-50 absolute inset-0" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 z-10 w-11/12 md:w-1/2 lg:w-1/3">
        <h2 className="text-xl font-bold mb-4">Business Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Business Name</label>
            <input
              type="text"
              name="business_name"
              value={formData.business_name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number ID</label>
            <input
              type="text"
              name="phone_number_id"
              value={formData.phone_number_id}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">WhatsApp Business Account ID</label>
            <input
              type="text"
              name="app_id"
              value={formData.app_id}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Permanent Access Token</label>
            <input
              type="text"
              name="access_token"
              value={formData.access_token}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
