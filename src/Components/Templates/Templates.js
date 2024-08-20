import React, { useState, useEffect } from 'react';
import TemplateFetch from './TempalateFeach';
import Cookies from 'js-cookie';

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [show, setShow] = useState(true);
  const [penting, setPenting] = useState(false);


  const userData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;

  useEffect(() => {
    const fetchData = async () => {
      if (userData) {
        try {
          const response = await fetch('https://ci4backend.smartyuppies.com/Templates/fetchTemplate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              access_token: userData.access_token,
              app_id: userData.app_id,
              username: userData.username
            }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const result = await response.json();
         // console.log("Template data:", result.data);
          setTemplates(result.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [userData]);

  const handleShow = () => {
    setShow(true);
    setPenting(false)
  };
  const handlpendingeShow = () => {
    setPenting(true); 
    setShow(false);


  
   
   }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-poppins text-center mb-8">Templates</h1>
      <div className='lg:flex justify-center ml-10 gap-4'>
      <button
        onClick={handleShow}
        className="mb-2 px-6 py-2 text-sm shadew-xl  text-green-600 border-green-500 border-2 shadow-lg rounded-lg focus:ring-0 focus:ring-gray-300 hover:bg-green-700 hover:text-white"
      >
        Approved
      </button>
      <button
        onClick={handlpendingeShow}
        className="mb-2 px-6 py-2 text-sm  shadew-xl font-poppins text-green-600 border-green-500 border-2 shadow-lg rounded-lg focus:ring-0 focus:ring-gray-300 hover:bg-green-700 hover:text-white"
      >
        Penting
      </button>
      </div>
      {show && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates
            .filter(template => template.status === "APPROVED")
            .map((template, index) => (
              <TemplateFetch key={index} template={template} />
            ))}
        </div>
      )}
       {penting && (
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-2">
          {templates
            .filter(template => template.status !== "APPROVED")
            .map((template, index) => (
              <TemplateFetch key={index} template={template} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Templates;
