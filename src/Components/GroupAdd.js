import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { message } from 'antd';

const GroupAdd = ({ onClose, onClick, share }) => {
  const chat = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;

  const [phones, setPhones] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [checkboxes, setCheckboxes] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Initialize checkboxes from localStorage or with default values
    const storedCheckboxes = JSON.parse(localStorage.getItem('checkboxes')) || {};
    const initialCheckboxes = onClick.reduce((acc, item) => {
      acc[item.id] = storedCheckboxes[item.id] || false;
      return acc;
    }, {});
    setCheckboxes(initialCheckboxes);
    setPhones(onClick); // Set phones data

    // Cleanup function for potential side effects
    return () => {
      localStorage.removeItem('checkboxes');
    };
  }, [onClick]);

  const handleSubmit = async (selectedContacts) => {
    const payload = {
      username: chat.username,
      group_name: groupName,
      old_group_name: share,
      selected_contacts: selectedContacts,
    };

    console.log('Sending payload:', payload);

    try {
      const response = await fetch('https://ci4backend.smartyuppies.com/GroupController/createGroups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        message.success('Item added successfully');

        const responseData = await response.json();
        console.log('Group created:', responseData);
        setSuccessMessage('Group successfully created!');
        setTimeout(() => {
          setSuccessMessage('');
          onClose();
        }, 3000);

      } else {
        const errorData = await response.json();
        console.error('Failed to create group', response.status, response.statusText);
        setErrorMessage(errorData.message || 'Failed to create group');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while creating the group.');
    }
    // onClose(); Removed to avoid premature closing
  };

  const handleCheckboxChange = (id) => {
    const updatedCheckboxes = {
      ...checkboxes,
      [id]: !checkboxes[id]
    };
    setCheckboxes(updatedCheckboxes);
    localStorage.setItem('checkboxes', JSON.stringify(updatedCheckboxes));
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  return (
    <div className="fixed right-0 top-0 h-full w-1/3 bg-white shadow-lg z-50">
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-green-500 text-white">
        <h2 className="text-lg font-semibold">Phone Number Management</h2>
        <button onClick={onClose} className="text-white hover:text-gray-200 focus:outline-none">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M13.414 10l3.293 3.293a1 1 0 0 1-1.414 1.414L12 11.414l-3.293 3.293a1 1 0 1 1-1.414-1.414L10.586 10 7.293 6.707a1 1 0 0 1 1.414-1.414L12 8.586l3.293-3.293a1 1 0 0 1 1.414 1.414L13.414 10z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div className="px-4 py-3">
        {successMessage && (
          <div className="mb-4 text-green-500 text-center">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">
            {errorMessage}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="group-name" className="block text-sm font-medium text-gray-700">
            Group Name
          </label>
          <input
            type="text"
            id="group-name"
            value={groupName}
            onChange={handleGroupNameChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder={share}
            required
          />
        </div>
        <div className="overflow-y-auto max-h-96">
          <table className="w-full ">
            <thead>
              <tr className="bg-white border-solid border-gray-200 border rounded-lg shadow-lg ">
                <th className="px-4 py-2 text-sm font-medium text-gray-700">Select</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-700">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {phones.map((phone) => (
                <tr key={phone.id} className="">
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={checkboxes[phone.id] || false}
                      onChange={() => handleCheckboxChange(phone.id)}
                      className="form-checkbox h-4 w-4 rounded-lg text-blue-600"
                    />
                  </td>
                  <td className="px-4 py-2">{phone.phone_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={() => handleSubmit(
            phones.filter(item => checkboxes[item.id])
              .map(item => `${item.phone_number}|${item.name || 'null'}`)
          )}
          className="mt-4 px-4 py-1 bg-blue-500 text-white rounded w-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Create Group
        </button>
      </div>
    </div>
  );
};

export default GroupAdd;
