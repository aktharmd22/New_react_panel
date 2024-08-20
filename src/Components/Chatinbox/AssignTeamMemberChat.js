import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const ChatAssignMember = ({ name, onClose }) => {
  const [agents, setAgents] = useState([]);
  const [formData, setFormData] = useState({
    staff_name: '',
    staff_id: '',
  });
  const [isChecked, setIsChecked] = useState(false);

  const chat = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;

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

        const rawText = await response.text();

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        let data;
        try {
          data = JSON.parse(rawText);
        } catch (jsonError) {
          console.error('JSON parsing error:', jsonError);
          return;
        }

        setAgents(data.staffData || []);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (e, key) => {
    const selectedAgent = agents.find(agent => agent.firstname === e.target.value);
    setFormData({
      ...formData,
      staff_name: e.target.value,
      staff_id: selectedAgent ? selectedAgent.staffid : '',
    });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async () => {
    try {
      const url = 'https://ci4backend.smartyuppies.com/Teams/assignTeamMember';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          staffId: formData.staff_id,
          customerNumber:name,
          maskCustomerNumber: isChecked ,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white w-1/5 h-80vh p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Form Example</h2>
        <div className="mb-8">
          <label htmlFor="whatsapp_id" className="block mb-2 text-sm text-gray-900 uppercase">
            Select Agent
          </label>
          <select
            id="whatsapp_id"
            name="staff_name"
            value={formData.staff_name}
            onChange={(e) => handleSelectChange(e, 'staff_name')}
            className="border-x border-gray-300 border shadow p-2 text-gray-900 text-md rounded-lg focus:ring-[--second] focus:border-[--second] block w-full"
            required
          >
            <option value="">Select Agent</option>
            {agents.map((agent) => (
              <option
                className="border-solid border-gray-200 border-2 rounded-xl"
                key={agent.staffid}
                value={agent.firstname}
                data-id={agent.staffid}
              >
                {agent.firstname}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <span className="ml-2 text-sm">Check me!</span>
          </label>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssignMember;
