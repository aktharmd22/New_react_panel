import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { BsSendArrowDown } from "react-icons/bs";
import ChartContact from './ChatContect'; // Corrected import path
import { IoSearchSharp } from "react-icons/io5";
import { MdOutlineAttachFile } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import AssignChat from './AssignTeamMemberChat';
import ChatweCrm from './AssignWeCrm'
import { BulletList } from 'react-content-loader';
import { RiFunctionAddLine } from "react-icons/ri";
import { message } from 'antd';
import { useLocation } from 'react-router-dom';
import { IoMdCall } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import ChatCrm from './ChatCrm'
import { MdMail } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import SelectedTemplates from './SelectTemplate'
const App = () => {
  const [chatData, setChatData] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [assignopen,setAgentopen]=useState(false);
  const [assignwecrmopen,setAssignwecrmopen]=useState(false);
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState(false);
  const [dateTime, setDateTime] = useState('');
  const [remimder, setRemimder] = useState('');
  const [notes,setNotes]=useState("");
  const location = useLocation();
  const [shownotes,setShowNotes]=useState("");
  const [phoneNumbers, setPhoneNumbers] = useState(null);
  const [templateshow,setTemplateshow] = useState(false)
  // Get the location object
  

  const chat = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;
 
  const chatContainerRef = useRef(null);
  useEffect(() => {
    // Retrieve phoneNumbers from URL or some other source
    const queryParams = new URLSearchParams(window.location.search);
    const phoneNumber = queryParams.get('phone_number');
    setPhoneNumbers(phoneNumber);
  }, []);

  useEffect(() => {
    if (phoneNumbers) {
      handleContactClick(phoneNumbers);
    }
  }, [phoneNumbers]);
  useEffect(() => {
    fetchContacts();  
  }, []);

  useEffect(() => {
  
    if (selectedContact) {
      const intervalId = setInterval(() => {
        handleContactClick(selectedContact);
      }, 1000);

      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }
  }, [selectedContact]);

  useEffect(() => {
    filterContacts(searchTerm);
  }, [searchTerm, contacts]);

  const fetchContacts = async () => {
  
    try {
      const response = await fetch(`https://appnew.smartyuppies.com/applistchat/${chat.phone_number_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_role: chat.client_role,
          user_id: chat.id,
        })
      });
      const responseData = await response.json();
      if (responseData && responseData.customerData) {
        setContacts(responseData.customerData);
        setFilteredContacts(responseData.customerData); // Initialize filteredContacts
        setLoading(false)
      
      } else {
        console.error('No customer data found in response');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };
  
  const handleContactClick = async (contact) => {
    setSelectedContact(contact); // Store the selected contact
  
    // Ensure `contact` and `phoneNumbers` are defined and valid
    const phoneNumber = contact.customer_phone_number ?? phoneNumbers;
    
    if (!phoneNumber) {
      console.error('No phone number available for fetching messages.');
      return;
    }
  
    try {
      const response = await fetch(`https://appnew.smartyuppies.com/appchatmessages/${chat.phone_number_id}/${phoneNumber}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      
      // Check if messages are returned and is an array
      if (responseData && Array.isArray(responseData.messages)) {
        // Scroll to bottom after setting chat data
        scrollToBottom();
        setChatData(responseData.messages);
      } else {
        console.error('No messages found for the contact');
        // Optionally, clear chat data if no messages are found
        setChatData([]);
      }
    } catch (error) {
      console.error('Error fetching messages:', error.message);
    }
  };
   
  const handleSend = async () => {
    if (selectedContact) {
      if (newMessage.trim() !== '') {
        // Prepare new text message data
        const currentTime = getTime();
        const newMessageData = {
          id: chatData.length + 1,
          way: 'out',
          message: newMessage,
          time: currentTime,
          last_message: 'New Message',
          name: 'Current User'
        };

        // Update the UI optimistically
        setChatData(prevChatData => [...prevChatData, newMessageData]);
        setNewMessage('');

        try {
          // Send the message to the backend
          const response = await fetch(`https://appnew.smartyuppies.com/appsendmessage`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              phone_number_id: chat.phone_number_id,
              customer_phone_number: selectedContact.customer_phone_number,
              message: newMessage,
              way: 'out'
            })
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const responseData = await response.json();
          console.log('Message sent successfully:', responseData);

        } catch (error) {
          console.error('Error sending message:', error.message);
          // Optionally, you could revert the optimistic update here
          setChatData(prevChatData => prevChatData.filter(msg => msg.id !== newMessageData.id));
        }
      }

      if (selectedFile) {
        // Handle sending file as Base64
        const fileBase64 = await convertFileToBase64(selectedFile);
          console.log('File uploaded successfully:', fileBase64);
        

        // Prepare new file message data
        const newFileMessage = {
          id: chatData.length + 1,
          way: 'out',
          message_type: 'image', // Ensure the message type is set to image
          message: fileBase64, // Include the base64 encoded file
          time: getTime(),
          last_message: 'New Image',
          name: 'Current User'
        };

        // Update the UI optimistically
        setChatData(prevChatData => [...prevChatData, newFileMessage]);
        setSelectedFile(null);

        try {
          // Send the file as Base64 to the backend
          const response = await fetch(`https://appnew.smartyuppies.com/appsendmessage`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              customer_name: selectedContact.customer_name,
              base64File: fileBase64,
              way: 'out',
              customer_phone_number: selectedContact.customer_phone_number,
              phone_number_id: chat.phone_number_id
            })
          });
         
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const responseData = await response.json();
          console.log('File uploaded successfully:',responseData);
          
        } catch (error) {
          console.error('Error uploading file:', error.message);
          // Optionally, you could revert the optimistic update here
        }
      }
    }
  };

  const filterContacts = (term) => {
    if (term === '') {
      setFilteredContacts(contacts);
    } else {
      setFilteredContacts(
        contacts.filter((contact) =>
          contact.customer_phone_number?.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  function getTime() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  
  const firstItem = chatData[0];

  const Chatusername = selectedContact?.customer_name;
  const MobileNumber = selectedContact?.customer_phone_number;
 
  ;
 

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

 const handleToggleAgent=()=>
  {
    setAgentopen(!assignopen)
   
  }
  
 const handleToggleAgentWeCrm=()=>
  {
    setAssignwecrmopen(!assignwecrmopen)
    setAgentopen(false)
  }

  
  const handleNewCavo=()=>
  {
    setTemplates(!templates)
  }
  useEffect(() => {
    
    const handleshownotes = async () => {
      const phoneNumber = MobileNumber ?? phoneNumbers;
    
    if (!phoneNumber) {
      console.error('No phone number available for fetching messages.');
      return;
    }
      try {
        const response = await fetch(`https://ci4backend.smartyuppies.com/ChatInbox/notesCheck/${phoneNumber}/${chat.phone_number_id}`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setShowNotes(result.data);
         console.log("notedata",shownotes)
      } catch (error) {
        
      }
    };

    handleshownotes();
  }, [selectedContact,notes]);
  const handlenotessave = async () => {
    // Data to be sent in the POST request
    const data = {
      user_id:chat.id,
      username:chat.username,
      phone_number_id:chat.phone_number_id,
      phone_number: firstItem.customer_phone_number,
      name:firstItem.customer_name,
      notes:notes,
      
    };
    console.log("crmdata",data)
    try {
      const response = await fetch('https://ci4backend.smartyuppies.com/ChatInbox/insertNotes', {
        method: 'POST', // Specify the request method
        headers: {
          'Content-Type': 'application/json', // Specify content type as JSON
        },
        body: JSON.stringify(data), // Convert data to JSON
      });
  
      if (!response.ok) {
        message.error('Failed to Add');
        throw new Error('Network response was not ok');
      }
      message.success('Add Contact successfully');
      const result = await response.json(); // Parse the JSON response
      console.log('Success:', result); // Handle the success result
      localStorage.setItem('id', JSON.stringify(result));

    } catch (error) {
      console.error('Error:', error); // Handle errors
      message.error('Failed to Add');
    }
    setNotes(" ")
  };
  const handlecrmSubbmit = async () => {
    // Data to be sent in the POST request
    const data = {
      user_id:chat.id,
      username:chat.username,
      phone_number_id:chat.phone_number_id,
      phone_number: firstItem.customer_phone_number,
      name:firstItem.customer_name,
      remainder	:dateTime,
      notes:notes,
      
    };
    console.log("crmdata",data)
    try {
      const response = await fetch('https://ci4backend.smartyuppies.com/ChatInbox/insertDetails', {
        method: 'POST', // Specify the request method
        headers: {
          'Content-Type': 'application/json', // Specify content type as JSON
        },
        body: JSON.stringify(data), // Convert data to JSON
      });
  
      if (!response.ok) {
        message.error('Failed to Add');
        throw new Error('Network response was not ok');
      }
      message.success('Add Contact successfully');
      const result = await response.json(); // Parse the JSON response
      console.log('Success:', result); // Handle the success result
      localStorage.setItem('id', JSON.stringify(result));

    } catch (error) {
      console.error('Error:', error); // Handle errors
      message.error('Failed to Add');
    }
    setNotes(" ")
  };
  const handleAdd = async (phone) => {
    try {
        const response = await fetch('https://ci4backend.smartyuppies.com/Contact/addContacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone_number: chat.phone_number,
                phone_number_id: chat.phone_number_id,
                username: chat.username,
                MobileNumber:MobileNumber,
                Country:null,
                EmailAddress:null,
                Name:Chatusername,
            }),
        });

        if (response.ok) {
            // Optionally, handle the response if needed
            message.success('Add  successfully');

            const data = await response.json();
            console.log('Contact added successfully:', data);
        } else {
            message.error('Failed to Add');

            console.error('Failed to add contact.');
        }
    } catch (error) {
        message.error('Failed to Add');
        console.error('Error adding contact:', error);
    }
};
const handletemplateshoe=()=>
{
  setTemplateshow(!templateshow)
}
const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    handleSend();
  }
};
  return (
    <>
    <div className='mt-4'>
   <ChatCrm />
   </div>
  <div className='grid grid-cols-1 md:grid-cols-2 md:relative md:bottom-[50px] h-[620px] mt-4 '>
    <div className="flex h-[600px] mt-[30px] w-[1000px]  shadow-xl  ">
     
      <div className="w-1/3 bg-white rounded-xl text-white shadow-2xl">
        <div className='h-16 w-full  border-r border-solid border-gray-400 '>
          <div className='p-3 flex'>
            <p className='text-3xl bg-gradient-to-r  rounded-full from-[#01949A] to-[#004369] p-1'><FaUserCircle /></p>
            <p className='p-2 text-black '>{chat?.username.toUpperCase()}</p>
          </div>
        </div>
        <div className="flex flex-col h-[548px]  p-3">
          <div className='flex pb-2'>
            <p className='p-2  rounded-s-lg text-gray-600 bg-gray-100'><IoSearchSharp /></p>
            <input
              className='p-1 px-10  rounded-e-lg text-sm text-black bg-gray-100 outline-none  ring-none'
              placeholder='Search the Contact'
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className=" overflow-y-scroll l   shadow-xl bg-white w-full border-solid border-gray-200 border-y   bg-gray-100 text-black">
            {filteredContacts.map((contact, index) => (
              <div key={contact.customer_id} onClick={() => handleContactClick(contact)}>
                {loading ? (
                 <div className='text-center'>
                 <BulletList     foregroundColor={'#999'} className='text-gray-500' />
               </div>):(
                <ChartContact
                  name={contact.customer_name}
                  last_message={contact.last_message.message}
                  time={contact.last_message.received_at_ist}
                  status={contact.last_message.status}
                  Phone_no={contact.customer_phone_number}
                />
              )}
                {index !== filteredContacts.length - 1 && <hr className="my-2 border-gray-300 hover:bg-[#F0F2F5]" />}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='text-red-700'></div>
      <div className="w-4/5 rounded-xl bg-[url('https://i.pinimg.com/originals/07/b3/7d/07b37d9e8af59caf15b0f8e1b49da368.jpg')] flex flex-col">
        <div className='h-16 w-full bg-white rounded-r-xl border border-solid border-gray-200   '>
          {firstItem && (
            <div className='ml-2 p-1'>
              {firstItem.customer_name && (
                <h1 className='   font-sans'>{firstItem.customer_name}</h1>
              )}
              {firstItem.customer_phone_number && (
                <p className=' text-gray-500 text-sm font-sans'>{firstItem.customer_phone_number}</p>
              )}
              
            </div>
          )}
          
      
        </div>
         
        <div className="flex-1 overflow-y-auto p-5" ref={chatContainerRef}>
        <button
             className="p-3 text-gary-800 rounded-xl   shadow-2xl border-solid  fixed left-[1060px] top-80 text-2xl"
             onClick={scrollToBottom}
           >
           <MdKeyboardDoubleArrowDown />
           </button>
          {chatData && (
            <>
              {chatData.map((chatt) => (
                <div
                  key={chatt.id}
                  className={`flex ${chatt.way === 'out' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`message ${chatt.way === 'out' ? 'bg-[#d9fdd3] self-end mt-3 mr-4 pr-10 p-1  font-Poppins' : 'bg-white text-black self-start mt-3 mr-4 pr-10 p-1  font-sans'} text-sm max-w-[250px] rounded-lg`}
                  >
                    {chatt.message_type === "image"  ? (
                     
                      <img src={chatt.message} alt={chatt.message} style={{ maxWidth: '100%', height: 'auto' }} />
                     
                    ) : (
                      <div style={{ wordWrap: 'break-word' }}>{chatt.message}</div>
                    )}
                    <div className="text-xs text-gray-500 text-right ml-6 relative left-8 top-1">
                      <p>{`${chatt.way === 'in' ? chatt.received_at_ist : chatt.received_at_ist}`}</p>
                    </div>
                  </div>
               
                </div>
                
              ))}
                
            </>
            
          )}
        
        </div>
        {templateshow && <SelectedTemplates PhoneNO={selectedContact?.customer_phone_number} onClose={handletemplateshoe}/>}
        <div className="flex p-2 border-l rounded-r-xl border-gray-200 bg-white">
          {/* Input area */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="p-3 bg-green-500 text-white rounded-full shadow-2xl border-solid border-gray-400 cursor-pointer mr-2">
            <MdOutlineAttachFile />
          </label>
          <button className="p-3 bg-green-500 text-white rounded-full shadow-2xl border-solid border-gray-400 cursor-pointer mr-2" onClick={handletemplateshoe}><IoMdAdd/></button>
          <textarea
            rows="1"
            className="flex-1  border-none focus:ring-white rounded-md focus:outline-none resize-none"
            value={newMessage}
            onKeyDown={handleKeyDown}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
          />
          <button
            className={`p-3 ${selectedFile ?  'bg-black' : 'bg-green-500'} text-white rounded-full shadow-2xl border-solid border-gray-400`}
            onClick={handleSend}
          >
            <BsSendArrowDown />
          </button>
         
        </div>
      </div>
    </div>
   
    {firstItem &&
    <div className="w-[400px] h-[600px] mt-[30px] relative shadow-xl left-[310px] bg-white overflow-x-scroll">
    <div className="h-16 w-full flex bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg px-6 border border-solid border-gray-200">
      {firstItem && (
        <div className="ml-2 p-1 sticky top-0 bg-gradient-to-r from-blue-400 to-purple-500">
          {firstItem.customer_name && (
            <h1 className="text-white font-poppins">
              Name: <span className="ml-2 font-normal text-sm">{firstItem.customer_name}</span>
            </h1>
          )}
          {firstItem.customer_phone_number && (
            <p className="text-white font-poppins">
              Phone No: <span className="ml-2 font-normal text-sm">{firstItem.customer_phone_number}</span>
            </p>
          )}
        </div>
      )}
      <div className='mt-4 ml-4 text-lg'>  
          <button className='bg-white text-green-600 p-2 mr-4 rounded-full'><IoMdCall /></button>
          <button className='bg-white text-green-600 p-2 rounded-full '><MdMail/></button>
      </div>

    </div>
    <div className="grid md:grid-cols-2 gap-2 px-6 mt-2">
      <button
        className="flex items-center  bg-green-500 hover:bg-green-800 text-white p-1 rounded-lg w-full justify-center"
        onClick={handleToggleAgent}
      >
        <MdKeyboardDoubleArrowDown size={24} />
        <span className="ml-2">Assign Team </span>
      </button>
      <button
        className="flex justify-center bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg w-full"
        onClick={handleAdd}
      >
        <MdKeyboardDoubleArrowDown size={24} />
        <span className="ml-2">Add to Contact</span>
      </button>
  
      {assignopen && (
        <div className="mt-2">
          <AssignChat onClose={handleToggleAgent} name={firstItem?.customer_phone_number} />
        </div>
      )}
  
      {assignwecrmopen && (
        <div className="mt-2">
          <ChatweCrm onClose={handleToggleAgentWeCrm} />
        </div>
      )}
    </div>
    <div className="w-full h-[200px] overflow-y-scroll bg-gray-100 p-2 border border-gray-200 mt-4" style={{ direction: 'rtl' }}>
      <div style={{ direction: 'ltr' }}>
        {shownotes && shownotes.length > 0 && (
          shownotes.map((note, index) => (
            <div key={index} className="mb-2">
              <p className="text-sm font-semibold">{note.username}</p>
              <p className="text-sm">{note.notes}</p>
              <p className="text-xs text-gray-500">{note.created_at}</p>
            </div>
          ))
        )}
      </div>
    </div>
    <textarea
      className="w-full h-20 mt-4 p-3 border resize-none border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
      placeholder="Write your notes here..."
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
    ></textarea>
    <div className='text-center'>
    <button className='bg-green-500 px-6 py-3 rounded-lg hover:bg-greeen-800 text-white font-poppins mb-2'onClick={handlenotessave}>Save Notes</button>
    </div>
<div className="flex flex-col md:grid md:grid-cols-2 gap-4 items-center justify-center  bg-blue-100 rounded-xl w-full px-6">
  <div className="p-6 rounded-lg">
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium text-black">Select Remainder</label>
      <input
        type="datetime-local"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
  <div className="mt-4 md:mt-0 flex justify-center items-center">
    <button
      onClick={handlecrmSubbmit}
      className="px-6 py-3 font-poppins text-white bg-blue-500 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Submit
    </button>
  </div>
</div>
  </div>
  }
  </div>
  </>
  );
};

export default App;