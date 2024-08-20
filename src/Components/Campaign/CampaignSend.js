import React, { useState } from 'react';
import CampaignContent from '../AssaignAgent/CampaignContent';
import { IoPersonCircle } from "react-icons/io5";
import { BsSendExclamation } from "react-icons/bs";

const MobileChatApp = ({ name, messages,file }) => {
  const [newMessage, setNewMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null); // State to store selected template

  const handleMessageSend = () => {
    let messageToSend = newMessage;
    if (selectedTemplate) {
      messageToSend = selectedTemplate.text; // Use selected template message
    }

    if (messageToSend.trim() !== '') {
      const updatedMessages = [...messages, { text: messageToSend, sender: 'user' }];
      console.log(updatedMessages); // Replace with state update or API call
      setNewMessage('');
      setSelectedTemplate(null);
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setNewMessage(template.text); // Set template message into input
  };

  return (
    <div className="w-[350px] mx-auto border-solid mb-3 border-gray-200 border rounded-xl shadow-xl bg-white p-3">
      {/* Header with Avatar */}
      <div className="bg-green-500 h-20 text-white flex items-center justify-between px-4 rounded-t-xl">
        <div className="flex items-center">
            <IoPersonCircle className='size-10 text-gray-300'/>
          <h1 className="text-xl font-bold">Your Brand Name</h1>
        </div>
        <p >Online</p>
      </div>
      

      {/* Message area */}
      <div className="bg-[url('https://i.pinimg.com/originals/07/b3/7d/07b37d9e8af59caf15b0f8e1b49da368.jpg')] p-4 shadow-md mb-10 overflow-y-auto">
        <CampaignContent file={file}/>
      </div>

      {/* Message input and send button */}
      <div className="flex">
        <input
          type="text"
          className="flex-1 px-4 py-2 border-none rounded-l-lg focus:outline-none"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:ring-white focus:outline-none"
          onClick={handleMessageSend}
        >
         <BsSendExclamation/>
        </button>
      </div>
    </div>
  );
};

export default MobileChatApp;
