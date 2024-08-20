import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { message } from 'antd';

const GroupView = ({ onClose, onClick }) => {
  const chat= Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;
  const [phones, setPhones] = useState([]);
 
  useEffect(() => {
    fetchPhoneData(); // Initial fetch when component mounts
  }, [onClick]); // Fetch data when onClick.group_name changes

  const fetchPhoneData = async () => {
    try {
      const response = await fetch('https://ci4backend.smartyuppies.com/GroupController/getGroupData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username:chat.username,
          group_name: onClick   // Assuming onClick.group_name is passed as a prop
        })
      });
      if (!response.ok) {
        throw new Error('Failed to fetch phone data');
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      setPhones(data); // Assuming data is { phones: [...] }
    } catch (error) {
      console.error('Error fetching phone data:', error);
    }
  };

  const handleCheckboxChange = (id) => {
    setPhones(prevPhones =>
      prevPhones.map((phone) =>
        phone.id === id ? { ...phone, selected: !phone.selected } : phone
      )
    );
    // Print the phone number when the checkbox state changes
    const changedPhone = phones.find(phone => phone.id === id);
    console.log('Phone number checkbox changed:', changedPhone.phone_number);
  };

  const handleUpdateClick = async () => {
    const selectedPhones = phones.filter(phone => phone.selected);
    console.log('Selected phones:', selectedPhones);

    try {
      const response = await fetch('https://ci4backend.smartyuppies.com/GroupController/createGroups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username:chat.username,
          group_name:"",  // The new group name
          old_group_name: onClick,  // Assuming no old group name is provided
          selected_contacts: selectedPhones.map(phone => `${phone.phone_number}|${phone.contact_name}`) // Format: phone_number|contact_name
        })
      });
      if (!response.ok) {
        throw new Error('Failed to update phone data');
      }
      message.success('Item Added successfully');
      
      const result = await response.json();
      console.log('Update result:', result);

      // Remove the successfully updated phones from the state
      setPhones(prevPhones => prevPhones.filter(phone => !phone.selected));
    } catch (error) {
      console.error('Error updating phone data:', error);
    }
    onClose()
  };

  // Print the phone numbers when the component mounts and updates
  useEffect(() => {
    if (phones.length > 0) {
      console.log('Phone numbers:', phones.map(phone => phone.phone_number));
    }
  }, [phones]);

  return (
    <div className="fixed right-0 top-0 h-full w-1/3 bg-white shadow-lg z-50">
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-green-600 text-white">
        <h2 className="text-lg font-poppins font-semibold">Phone Number Management</h2>
        <button onClick={onClose} className="text-white hover:text-gray-200 focus:outline-none">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M13.414 10l3.293 3.293a1 1 0 0 1-1.414 1.414L12 11.414l-3.293 3.293a1 1 0 1 1-1.414-1.414L10.586 10 7.293 6.707a1 1 0 0 1 1.414-1.414L12 8.586l3.293-3.293a1 1 0 1 1 1.414 1.414L13.414 10z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div className="px-4 py-3">
        <table className="w-full ">
          <thead>
            <tr className="bg-white border-solid border-gray-200 border rounded-lg shadow-lg ">
              <th className=" px-4 py-2 text-sm font-medium text-gray-700">Select</th>
              <th className=" px-4 py-2 text-sm font-medium text-gray-700">Phone Number</th>
            </tr>
          </thead>
          <div className='overflow-y-auto max-h-[480px]'>
          <tbody>
            {phones && phones.map((phone) => (
              <tr key={phone.id} className="">
                <td className=" px-4 py-2">
                  <input
                    type="checkbox"
                    checked={phone.selected}
                    onChange={() => handleCheckboxChange(phone.id)}
                    className="form-checkbox h-4 w-4 rounded-lg text-blue-600"
                  
                  />
                </td>
                <td className="px-4 py-2">{phone.phone_number}</td>
              </tr>
            ))}
          </tbody>
          </div>
        </table>
        <button
          onClick={handleUpdateClick}
          className="mt-4 px-4 py-2 bg-green-500 text-white font-poppins rounded w-full hover:bg-green-800 focus:outline-none focus:bg-blue-600"
        >
          Update Selected
        </button>
      </div>
    </div>
  );
};

export default GroupView;
