import React, { useState } from 'react';
import CampaignTemplates from './ChatTempaltemap';
import Cookies from 'js-cookie';
import { message } from 'antd';

const Popup = ({ onClose,PhoneNO }) => {
  console.log("phonumbver",PhoneNO)
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null); // State to hold selected template
  const userData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;
  
  const onSelectTemplate = (template) => {
    setSelectedTemplate(template);
    console.log('Selected Template:', template);
  };
   
  const {name,language}=selectedTemplate || {};
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Selected option:', selectedOption);
    
    // Prepare the data to be sent in the request
   
  
    const requestData = {
      templete_name:name,
      language_code:language,
      phone_number_id:userData.phone_number_id,
      access_token:userData.access_token,
      phone_number:PhoneNO,
    };
    console.log("tempaltedata:",requestData)
    try {
      // Make a POST request to the server
      const response = await fetch('https://ci4backend.smartyuppies.com/Campaign/Messagetrigger', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        // Handle success
        message.success('Template sent successfully');

        console.log('Data submitted successfully');
        // You can add any additional success handling here, such as displaying a success message
      } else {
        // Handle server errors
        message.error('Failed to send');

        console.error('Failed to submit data:', response.statusText);
        // You can add error handling here, such as displaying an error message
      }
    } catch (error) {
      // Handle network errors
      console.error('Error submitting data:', error);
      // You can add error handling here, such as displaying an error message
    }

    onClose(); // Close the popup after submission
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-full overflow-y-scroll">
        <h2 className="text-xl font-semibold mb-4">Start your First Conversation</h2>
        <form onSubmit={handleSubmit}>
          <div className="w-full shadow-lg bg-white border-gray-200 h-fit  rounded-xl border-solid border overflow-y-scroll p-4 md:p-8 max-h-64">
            <CampaignTemplates onSelectTemplate={onSelectTemplate} />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-2"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
