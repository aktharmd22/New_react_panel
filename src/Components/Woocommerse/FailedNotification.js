import React, { useState } from 'react';

function FailtedNotification() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);

  const handleButtonClick = (buttonValue) => {
    setMessage((prevMessage) => prevMessage + ' ' + buttonValue);
  };

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div className="p-4">
      <button 
        onClick={handleShow} 
        className="bg-white  w-full border-solid border-gray-200 border shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50"
      >
      FailtedNotification
      </button>
      
      {show && (
        <div className="mt-4 border p-4 rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="notification" className="block text-sm font-medium text-gray-700">
              Notification
            </label>
            <select 
              id="notification" 
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="notification">Notification</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input 
              id="name" 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message:
            </label>
            <textarea 
              id="message" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
          <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-green-500 mb-5 hover:bg-green-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              AddNotification
            </button>
          </div>
          
          <div className="space-x-2 mb-5">
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  mb-5 shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 1
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 2
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200 mb-5  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200 mt-5  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
             <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>
            <button 
              onClick={() => handleButtonClick('Button 1')} 
              className="bg-white  hover:bg-gray-200 border-solid border-gray-200  border  shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Button 3
            </button>


          </div>
        </div>
      )}
    </div>
  );
}

export default FailtedNotification;
