import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Assign from '../../assests/task.png';
import Button from '@mui/material/Button';
import MaterialUITables from './AssignAgentTale';
import Cookies from 'js-cookie';
import { message } from 'antd';
import AgentCrm from './AssaignahentCrm'

const AssignAgent = ({ open }) => {
  const chat = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;

  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    keyword: '',
    source_name: '',
    status_name: '',
    staff_name: '',
    phone_number_id: chat.phone_number_id,
    status_id: '',
    staff_id: '',
    source_id: '',
  });

  // State to hold fetched data
  const [agents, setAgents] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [statusData, setStatusData] = useState([]);

  const handleShow = () => {
    setShow(!show);
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e, idField) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      [idField]: e.target.selectedOptions[0].getAttribute('data-id'),
    });
  };

  const handleFillKeyword = () => {
    setFormData({
      ...formData,
      keyword: 'all chat',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(' response:', formData);

    try {
      const url = 'https://ci4backend.smartyuppies.com/AssignAgent/insert';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        message.error('Failed to Insert');
        throw new Error('Network response was not ok');
      }
      message.success('Insert Successfully');
      // Handle displaying response data or other logic as needed
    } catch (error) {
      console.error('Error:', error);
      // Handle error states or display error message
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://ci4backend.smartyuppies.com/AssignAgent/index';
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone_number_id: chat.phone_number_id,
            crm_db_name: chat.crm_db_name,
            crm_db_password: chat.crm_db_password,
            crm_db_username: chat.crm_db_username,
          }),
        });

        // Log the raw response text
        const rawText = await response.text();
     

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Validate and parse the JSON response
        let data;
        try {
          data = JSON.parse(rawText);
        } catch (jsonError) {
          console.error('JSON parsing error:', jsonError);
          // Optionally, handle the invalid JSON case here
          return; // Exit if JSON is invalid
        }

       

        // Setting fetched data into state variables
        setAgents(data.staffData || []);
        setSourceData(data.sourceData || []);
        setStatusData(data.statusData || []);
      } catch (error) {
        console.error('Error:', error);
        // Handle error states or display error message
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <>
    <div className='md:flex md:justify-end'>
      <Button
        type="button"
        variant="contained"
        style={{ backgroundColor: '#00a727', color: '#FFFFFF', marginTop: '1.5rem',marginBottom:'1.5rem' }}
        onClick={handleShow}
      >
        View All Assigned Agent
      </Button>
      </div>
      {show ? (
        <MaterialUITables />
      ) : (
        <div className="p-6 rounded-lg bg-white mb-2shadow-2">
          <h1 className="py-3 pb-8  lg:text-2xl sm:text-2xl sm:text-center">
            Keyword Based <span className="text-[--second]">Assignment</span> / Transfer To{' '}
            <span className="">CRM</span>
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center">
            <div className="flex-grow sm:w-3/4 px-8 py-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <label htmlFor="keywords" className="block mb-2 text-md font-poopins text-black dark-text-black">
                    Keywords
                  </label>
                  <input
                    type="text"
                    id="keywords"
                    name="keyword"
                    value={formData.keyword}
                    onChange={handleInputChange}
                    className="border border-gray-300 border p-2 text-gray-900 text-md rounded-lg focus:ring-gray-300 focus:border-[--second] block w-full p-2.5"
                    placeholder=""
                    required
                  />
                </div>
                <Button
                  type="button"
                  variant="contained"
                  style={{ backgroundColor: '#00a727', color: '#FFFFFF', marginBottom: '1.5rem' }}
                  onClick={handleFillKeyword}
                >
                  All chat
                </Button>
                <div className="flex justify-between  mb-8">
                  <div className="w-1/3">
                    <label htmlFor="select_option_1" className="block mb-2 ml-4 mr-8 text-md   text-black dark-text-black">
                      Select Source
                    </label>
                    <select
                      id="select_option_1"
                      name="source_name"
                      value={formData.source_name}
                      onChange={(e) => handleSelectChange(e, 'source_id')}
                      className="border border-gray-300 border p-2 text-gray-900 mr-8  text-md rounded-lg focus:ring-[--second] focus:border-[--second] block w-full"
                      required
                    >
                      <option value="">Select Source</option>
                      {sourceData.map((source) => (
                        <option key={source.id} value={source.name} data-id={source.id}>
                          {source.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-1/3">
                    <label htmlFor="select_option_2" className="block mb-2 mr-4 ml-12 text-md  text-black dark-text-black">
                      Select Status
                    </label>
                    <select
                      id="select_option_2"
                      name="status_name"
                      value={formData.status_name}
                      onChange={(e) => handleSelectChange(e, 'status_id')}
                      className="border border-gray-300 border p-2 text-gray-900 text-md ml-12 rounded-lg focus:ring-[--second] focus:border-[--second] block w-full"
                      required
                    >
                      <option value="">Select Satus</option>
                      {statusData.map((status) => (
                        <option key={status.id} value={status.name} data-id={status.id}>
                          {status.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-1/3"></div>
                </div>
                <div className="mb-8">
                  <label htmlFor="whatsapp_id" className="block mb-2 text-sm text-gray-900 uppercase  dark-text-black">
                    Select Agent
                  </label>
                  <select
                    id="whatsapp_id"
                    name="staff_name"
                    value={formData.staff_name}
                    onChange={(e) => handleSelectChange(e, 'staff_id')}
                    className="border-x border-gray-300 border shadow p-2 text-gray-900 text-md rounded-lg focus:ring-[--second] focus:border-[--second] block w-full"
                    required
                  >
                    <option value="">Select Agent</option>
                    {agents.map((agent) => (
                      <option className={" border-solid border-gray-200 border-2 rounded-xl"} key={agent.staffid} value={agent.firstname} data-id={agent.staffid}>
                        {agent.firstname}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="my-11 text-center">
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: '#00a727', color: '#FFFFFF' }}
                  >
                    Assign to Agent
                  </Button>
                </div>
              </form>
            </div>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              transition={{ type: 'spring', stiffness: 120, duration: 2.5, delay: 0.1 }}
              className="lg:w-3/4 lg:flex hidden"
            >
              <AgentCrm />
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

export default AssignAgent;
