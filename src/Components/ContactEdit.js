import React, { useState } from 'react';
import { message } from 'antd';

const ContactEdit = ({ contact, onClose, forceUpdate }) => {
  const [formData, setFormData] = useState({
    id: contact?.id || '',
    name: contact?.name || '',
    email: contact?.email || '',
    country: contact?.country || '',
    lead_source: contact?.lead_source || '',
    company_name: contact?.company_name || '',
    company_adress: contact?.company_adress || '',
    phone_number: contact?.phone_number || '',
    column1: contact?.column1 || '',
    column2: contact?.column2 || '',
    column3: contact?.column3 || '',
    column4: contact?.column4 || '',
    column5: contact?.column5 || '',
    column6: contact?.column6 || '',
    column7: contact?.column7 || '',
    column8: contact?.column8 || '',
    column9: contact?.column9 || '',
    column10: contact?.column10 || '',
    column11: contact?.column11 || '',
    column12: contact?.column12 || '',
    column13: contact?.column13 || '',
    column14: contact?.column14 || '',
    column15: contact?.column15 || '',
    column16: contact?.column16 || '',
    column17: contact?.column17 || '',
    column18: contact?.column18 || '',
    column19: contact?.column19 || '',
    column20: contact?.column20 || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://ci4backend.smartyuppies.com/Contact/updateContact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        message.error('Failed to Update');
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      message.success('Contact updated successfully');
      const data = await response.json();
      console.log('Contact updated successfully:', data);
      onClose();
    } catch (error) {
      message.error('Failed to Update');
      console.error('Error updating contact:', error);
    }
    forceUpdate();
  };

  return (
    <div className="fixed inset-0 z-50 flex w-full justify-center items-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg mt-6 mb-6 h-[500px] shadow-lg w-full max-w-lg max-h-screen overflow-hidden">
        <div className="flex justify-between space-x-4 mb-4">
          <h2 className="text-2xl font-bold">Edit Contact</h2>
          <div className="flex space-x-2">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-700 text-white rounded-lg focus:outline-none"
            >
              Save
            </button>
            <button
              type="button"
              className="px-4 py-2 text-red-600 font-bold rounded-lg focus:outline-none"
              onClick={onClose}
            >
              X
            </button>
          </div>
        </div>
        <form className="overflow-y-auto max-h-[400px] pr-2"> {/* Added scrollbar */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Mobile No</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='lead_source' className='block text-sm font-medium text-gray-700 mb-2'>
              Lead Source
            </label>
            <input
              type='text'
              id='lead_source'
              name='lead_source'
              value={formData.lead_source}
              onChange={handleChange}
              className='border border-gray-300 rounded py-2 px-3 w-full'
              placeholder='Enter Lead Source'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='company_name' className='block text-sm font-medium text-gray-700 mb-2'>
              Company Name
            </label>
            <input
              type='text'
              id='company_name'
              name='company_name'
              value={formData.company_name}
              onChange={handleChange}
              className='border border-gray-300 rounded py-2 px-3 w-full'
              placeholder='Enter Company Name'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='company_adress' className='block text-sm font-medium text-gray-700 mb-2'>
              Company Address
            </label>
            <input
              type='text'
              id='company_adress'
              name='company_adress'
              value={formData.company_adress}
              onChange={handleChange}
              className='border border-gray-300 rounded py-2 px-3 w-full'
              placeholder='Enter Company Address'
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[...Array(20)].map((_, index) => (
              <div key={index} className="col-span-2 w-full">
                <label className="block text-gray-700 mb-2">Column {index + 1}</label>
                <input
                  type="text"
                  name={`column${index + 1}`}
                  value={formData[`column${index + 1}`]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactEdit;
