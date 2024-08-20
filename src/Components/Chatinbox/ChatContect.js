import React from 'react';
import { BsCheck2, BsCheck2All } from "react-icons/bs";

const ChatContect = ({ last_message, name, time, status, Phone_no }) => {
  // Ensure that name is defined and not empty before accessing its first character
  const firstLetter = name ? name.charAt(0).toUpperCase() : '';

  // Generate a random color code
  const randomColor = () => {
    return '#' + Math.floor(Math.random() * 215).toString(16);
  };
  // Function to truncate the last message to a specified number of characters
  const truncateMessage = (message, maxLength = 20) => {
    if (message) {
      return message.length > maxLength ? `${message.slice(0, maxLength)}...` : message;
    }
    return ''; // Return empty string if message is null
  };

  // Split the name into first and last parts
  const names = name ? name.split(' ') : [];
  const first = names[0];
  const last = names.length > 1 ? names[1] : '...';

  return (
    <div className='p-2 cursor-pointer'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          {/* Displaying the first letter as the avatar with a random background color */}
          <p
            className='bg-gradient-to-r from-blue-400 to-purple-500 rounded-full h-10 w-10 flex items-center justify-center text-center text-lg'
            style={{ color: 'white', backgroundColor: randomColor() }}
          >
            {firstLetter}
          </p>
          <div className='pl-4'>
            <p className='font-Poppins'>
              {first} {last && '...'}
            </p>
            <p className='text-sm text-gray-600 font-Poppins'>
              {truncateMessage(last_message, 20)}
            </p>
          </div>
        </div>
        <div className='text-right'>
          <p className='text-[10px] font-Poppins text-gray-400'>{time}</p>
          <p className='text-lg text-green-600'>
            {status === "read" ? <BsCheck2All /> : <BsCheck2 />}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatContect;
