import React, { useState, useEffect } from 'react';
import { DatePicker, Space, message } from 'antd';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs'; // Import dayjs for date formatting

const GenerateLicense = ({ details, forceUpdate }) => {
  const chat = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;

  const [formData, setFormData] = useState({
    client_username: details?.username || '',
    password: details?.password || '',
    contact_number: details?.contact_number || '',
    validity_period: details?.date ? dayjs(details.date) : null, // Use dayjs for initial date
    db_name: details?.db_name || '',
    db_username: details?.db_username|| '',
    db_password: details?.db_password || '',
    crm_db_name: details?.crm_db_name || '',
    crm_db_username: details?.crm_db_username || '',
    crm_db_password: details?.crm_db_password || '',
    is_catalog: details?.iscatalogue || '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    if (details) {
      setFormData({
        client_username: details.username || '',
        password: details.password || '',
        contact_number: details.contact_number || '',
        validity_period: details.date ? dayjs(details.date) : null, // Use dayjs for initial date
        db_name: details.phone_number_id || '',
        db_username: details.app_id || '',
        db_password: details.db_password || '',
        crm_db_name: details.crm_db_name || '',
        crm_db_username: details.crm_db_username || '',
        crm_db_password: details.crm_db_password || '',
        is_catalog: details.iscatalogue || '',
      });
    }
    setModalOpen(true); // Automatically open the modal when component mounts
  }, [details]);

  const onChange = (date, dateString) => {
    setFormData({ ...formData, validity_period: date });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://ci4backend.smartyuppies.com/Home/updateLicense/${details.id}`, { // Replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.client_username,
          password: formData.password,
          app_id: chat.app_id,
          db_name: formData.db_name,
          db_password: formData.db_password,
          contact_number: formData.contact_number,
          db_username:formData.db_username,
          role: chat.role,
          validity: formData.validity_period ? formData.validity_period.format('YYYY-MM-DD') : null, // Format the date
          expiry_date: formData.validity_period ? formData.validity_period.format('YYYY-MM-DD') : null, // Format the date
          crm_db_username: formData.crm_db_username || null,
          crm_db_password: formData.crm_db_password || null,
          crm_db_name: formData.crm_db_name || null,
          iscatalogue: formData.is_catalog
        }),
      });

      if (response.ok) {
        message.success('License generated successfully');
        setFormData({
          client_username: '',
          password: '',
          contact_number: '',
          validity_period: null,
          db_name: '',
          db_username: '',
          db_password: '',
          crm_db_name: '',
          crm_db_username: '',
          crm_db_password: '',
          is_catalog: '',
        });
        handleModalClose();
      } else {
        message.error('Failed to generate license');
        console.error('Failed to generate license', response.status, response.statusText);
      }
    } catch (error) {
      message.error('Error generating license');
      console.error('Error:', error);
    }
    forceUpdate();
  };

  return (
    <Dialog open={modalOpen} onClose={handleModalClose}>
      
      <DialogTitle>Generate New License</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill out the form to generate a new license.
        </DialogContentText>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="client_username"
            name="client_username"
            label="Client Username"
            type="text"
            fullWidth
            value={formData.client_username}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="text"
            fullWidth
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="phone_number"
            name="contact_number"
            label="contact number"
            type="text"
            fullWidth
            value={formData.contact_number}
            onChange={handleChange}
          />
          <Space direction="vertical" style={{ width: '100%', marginTop: 16 }}>
            <DatePicker 
              style={{ width: '100%' }} 
              onChange={onChange} 
              format="YYYY-MM-DD"
              value={formData.validity_period}
            />
          </Space>
          <TextField
            margin="dense"
            id="phone_number_id"
            name="db_name"
            label="db name"
            type="text"
            fullWidth
            value={formData.db_name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="whatsapp_id"
            name="db_username"
            label="WhatsApp Business Account IDdb_username"
            type="text"
            fullWidth
            value={formData.db_username}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="db_password"
            name="db_password"
            label="db_password"
            type="text"
            fullWidth
            value={formData.db_password}
            onChange={handleChange}
          />
          <Select
            labelId="is_catalog-label"
            id="is_catalog"
            name="is_catalog"
            value={formData.is_catalog}
            onChange={handleChange}
            fullWidth
            displayEmpty
            style={{ marginTop: 16 }}
          >
            <MenuItem value="">
              <em>Select</em>
            </MenuItem>
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
          <TextField
            margin="dense"
            id="crm_db_name"
            name="crm_db_name"
            label="CRM DB Name"
            type="text"
            fullWidth
            value={formData.crm_db_name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="crm_db_username"
            name="crm_db_username"
            label="CRM DB Username"
            type="text"
            fullWidth
            value={formData.crm_db_username}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="crm_db_password"
            name="crm_db_password"
            label="CRM DB Password"
            type="text"
            fullWidth
            value={formData.crm_db_password}
            onChange={handleChange}
          />
          <DialogActions>
            <Button onClick={handleModalClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Generate
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateLicense;
