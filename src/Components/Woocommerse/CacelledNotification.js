import React, { useState,useEffect } from 'react';
import Cookies from 'js-cookie';
const chat = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;
function CancelledNotification() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const [notifications, setNotifications] = useState('');


  const handleButtonClick = (buttonValue) => {
    setMessage((prevMessage) => prevMessage + ' ' + buttonValue);
  };
   const phone_number_id=chat.phone_number_id;
   const id=chat.id;

  const handleShow = () => {
    setShow(!show);
  };
  const addNotification = () => {
    const notificationData = { name, message,phone_number_id,id };

    fetch('https://ci4backend.smartyuppies.com/WoocommerceNotificationController/store', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notificationData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Optionally, handle success and reset form fields or update UI
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error scenarios
      });
  };
  useEffect(() => {
    // Fetch notifications when component mounts
    fetchNotifications();
  }, []); // Empty dependency array means this effect runs only once when component mounts

  const fetchNotifications = () => {
    fetch('https://ci4backend.smartyuppies.com/woocommerce/index', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id:id}),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Notifications:', data);
        setNotifications(data.templates); 
        console.log("notification",data.templates)// Update state with fetched notifications
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
        // Handle error scenarios
      });
  };
  return (
    <div className="p-4">
      <button 
        onClick={handleShow} 
        className="bg-white  w-full border-solid border-gray-200 border shadow-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50"
      >
      CancelledNotification
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
              onChange={(e) => setName(e.target.value)}
            >
              <option value="">Select Notification</option>

              
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
              onClick={ addNotification} 
              className="bg-green-500 mb-5 hover:bg-green-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              AddNotification
            </button>
          </div>
          
          <div className="space-x-2 mb-5">
            <button 
              onClick={() =>{ handleButtonClick('Button 1')} } 
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

export default CancelledNotification;
