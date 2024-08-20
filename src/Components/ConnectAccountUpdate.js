import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { message } from 'antd';

const PopupForm = ({ onClose, account,forceUpdate }) => {
  const userData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;
  const [formData, setFormData] = useState({
    email: account.email,
    description: account.description,
    websites: account.websites,
    about: account.about,
    address: account.address,
    profilePicture: null, // Initially set to null
  });
  const [initialProfilePictureUrl] = useState(account.profile_picture_url); // Store the initial profile picture URL

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let profilePictureBase64 = initialProfilePictureUrl; // Use the initial URL by default
    if (formData.profilePicture instanceof File) {
      profilePictureBase64 = await convertFileToBase64(formData.profilePicture);
    }

    // Create a JSON object from the form data
    const dataToSend = {
      messaging_product: 'whatsapp', // Add the required parameter
      email: formData.email,
      description: formData.description,
      websites: formData.websites,
      about: formData.about,
      address: formData.address,
      profile_picture_url: profilePictureBase64,
    };

    console.log("sample", dataToSend);
    try {
      const response = await fetch(`https://graph.facebook.com/v20.0/${userData.phone_number_id}/whatsapp_business_profile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userData.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        message.error('Failed to Update');
        const errorText = await response.text();
        console.error(`Error response: ${response.status} ${response.statusText}`);
        console.error(`Error details: ${errorText}`);
        throw new Error('Network response was not ok');
      }

      // Handle response if needed
      message.success(' Update succssfully');

      const result = await response.json();
      console.log('Success:', result);

      // Close the popup after successful submission
      onClose();
    } catch (error) {
      console.error('Error submitting data:', error);
      message.error('Correct the Network');
    }
    forceUpdate()
  };

  // Helper function to convert file to base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
   
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative overflow-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-semibold"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Upload Details</h2>
        <form onSubmit={handleSubmit} className="overflow-x-auto">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Websites</label>
            <input
              type="text"
              name="websites"
              value={formData.websites}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">About</label>
            <input
              type="text"
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              rows="4"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Profile Picture</label>
            <input
              type="file"
              name="profilePicture"
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <button
            type="submit"
            className="hover:bg-green-800 border-2 border-solid border-green-800 w-[90px] rounded-lg  hover:text-white text-green-800 py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
