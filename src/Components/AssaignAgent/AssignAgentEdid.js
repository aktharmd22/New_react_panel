import React, { useState,useEffect } from 'react';
import { Modal, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Cookies from 'js-cookie';
import { message } from 'antd';


const StaffModal = ({ open, handleClose, data }) => {
  const chat = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;
  // State variables
  const [keywordName, setKeywordName] = useState(data.keyword || ''); // Ensure keywordName is initialized correctly
  const [staffName, setStaffName] = useState(data.staff_name || ''); // Ensure staffName is initialized correctly
  const [status, setStatus] = useState(data.status_name    || ''); // Ensure status is initialized correctly
  const [source, setSource] = useState(data.source_name || ''); // Ensure source is initialized correctly
  const [agents, setAgents] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [statusData, setStatusData] = useState([]); // Ensure source is initialized correctly
  // Ensure source is initialized correctly
  // Ensure source is initialized correctly

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
        console.log('Raw response:', rawText);

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

        console.log('Fetched data:', data);

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
  }, []); 
  
  // Handle save function
  const handleSave = async () => {
    try {
      const response = await fetch(`https://ci4backend.smartyuppies.com/AssignAgent/updateAgent/${data.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          source_name:source,
          status_name:status,
          staff_name:staffName,
          status_id:status.id,
          source_id:source.id,
          staff_id:agents.staffid,
          phone_number_id:chat.phone_number_id,
        })
      });

      if (!response.ok) {
      message.error('Failed to Update');
      throw new Error('Network response was not ok');
      }
      message.success('update successfully');
      const result = await response.json();
      console.log('Success:', result);
      handleClose(); // Close modal on successful save
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <TextField
          fullWidth
          label="KEYWORD NAME"
          value={data.keyword}
          onChange={(e) => setKeywordName(e.target.value)}
          sx={{ mb: 2 }}
         readonly
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>STAFF NAME</InputLabel>
          <Select
            value={staffName}
            onChange={(e) => setStaffName(e.target.value)}
            label="STAFF NAME"
          >
             <MenuItem value={staffName}>
            <em>{staffName}</em>
        
          </MenuItem> 
          {agents.map((data,index)=>
            
            <MenuItem key={index} value={data.firstname}>{data.firstname}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>STATUS</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="STATUS"
          >
            <MenuItem value={status}>
            <em>{status}</em>
        
          </MenuItem> 
          {statusData.map((data,index)=>
            
            <MenuItem key={index} value={data.name}>{data.name}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>SOURCE</InputLabel>
          <Select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            label="SOURCE"
          >
             <MenuItem value={source}>
            <em>{source}</em>
        
          </MenuItem> 
          {sourceData.map((data,index)=>
            
            <MenuItem key={index} value={data.name}>{data.name}</MenuItem>)}
            
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSave} sx={{ mr: 2 }}>
          Save
        </Button>
        <Button variant="contained" color="secondary" onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default StaffModal;
