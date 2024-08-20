import React, { useState } from 'react';
import { DatePicker, Space, message } from 'antd';
import Button from '@mui/material/Button';
import GenerateLicenseTable from './GenerateLicenseTable';
import Cookies from 'js-cookie';


const GenerateLicense = () => {
  const chat= Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;

  const [opens, setOpens] = useState(false);
  const [formData, setFormData] = useState({
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
    is_catalog: '', // Added new field for is_catalog
  });

  const onChange = (date, dateString) => {
    setFormData({ ...formData, validity_period: dateString });
  };

  const handleToggleApiDetails = () => {
    setOpens(!opens);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://ci4backend.smartyuppies.com/Home/generateLicense', { // Replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
              username: formData.client_username,
              password: formData.password,
              app_id: chat.app_id ,
              db_name: formData.db_name,
              db_password: formData.db_password,
              contact_number: formData.contact_number,
              role:chat.role,
              db_username:formData.db_username,
              validity: formData.validity_period,
              expiry_date: formData.validity_period,
              status: "active",
              client_role: chat.client_role,
              company_name: chat.client_username,
              crm_db_username: formData.crm_db_username ?? null,
              crm_db_password: formData.crm_db_password ?? null,
              crm_db_name: formData.crm_db_name ?? null,
              iscatalogue: formData.is_catalog,
        }),
      });

      if (response.ok) {
        message.success('License generated successfully');
        setFormData({
          client_username: '',
          password: '',
          contact_number: '',
          validity_period: null,
          phone_number_id: '',
          db_username: '',
          db_name:'',
          db_password: '',
          crm_db_name: '',
          crm_db_username: '',
          crm_db_password: '',
          is_catalog: '',
        });
        console.log("licences",formData)
      } else {
        message.error('Failed to generate license');
        console.error('Failed to generate license', response.status, response.statusText);
      }
    } catch (error) {
      message.error('Error generating license');
      console.error('Error:', error);
    }
  };

  return (
    <>
     <div className='md:flex md:justify-end'>
      <Button
        variant="contained"
        style={{ backgroundColor: '#00a727', color: '#FFFFFF', marginBottom: '1rem',marginLeft:'1rem' }}
        onClick={handleToggleApiDetails}
      >
        {opens ? "Generate License" : "View All Licenses"}
      </Button>
      </div>
      {opens ? <GenerateLicenseTable /> : (
        <div className='mb-8 '>
           <form className='p-4 uppercase' onSubmit={handleSubmit}>
          <div className='grid gap-16 grid-cols-1 lg:grid-cols-2'>
            <div className='lg:p-6 px-3 py-2 rounded-[15px] bg-white shadow-xl'>
              <h1 className={`text-center lg:py-3 pb-4  text-black text-[27px] `}>Generate <span className='text-[--second]'>Details</span></h1>
                <div className='mb-8'>
                  <label htmlFor="client_username" className="block mb-2 text-sm  dark-text-black">Client Username</label>
                  <input type="text" id="client_username" name="client_username" value={formData.client_username} onChange={handleChange} className="border border-2 border-gray-400 text-gray-900  text-sm rounded-lg focus:ring-gray-400 focus:border-[--second] block w-full   " required />
                </div>
                <div className='mb-8'>
                  <label htmlFor="password" className="block mb-2 text-sm text-gray-900  dark-text-black">Password</label>
                  <input type="text" id="password" name="password" value={formData.password} onChange={handleChange} className="border border-gray-400 border-2 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-[--second] block w-full " required />
                </div>
                <div className="grid gap-6 mb-6 grid-cols-2">
                  <div>
                    <label htmlFor="phone_number" className="block mb-2 mt-2  text-sm dark-text-black">Contact Number</label>
                    <input type="text" id="phone_number" name="contact_number" value={formData.contact_number} onChange={handleChange} className="border border-gray-400 border-2 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-[--second] block w-full" required />
                  </div>
                  <div>
                    <label htmlFor="validity_period" className="block mb-2 mt-2 text-sm  dark-text-black">Validity Period</label>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <DatePicker style={{ padding: '10px', border: '2px solid gray', width: '100%' }} onChange={onChange} />
                    </Space>
                  </div>
                </div>
            </div>
            <div className='p-6 rounded-[15px] bg-white border border shadow-xl border-gray-200'>
              <h1 style={{ wordWrap: 'break-word' }} className={`text-center py-3 pb-4  text-black text-[27px] `}>Enter <span className=''>Meta</span> <span className='text-[--second]'>Credentials</span></h1>
                <div className='mb-8'>
                  <label htmlFor="db_name" className="block mb-2 text-sm  dark-text-black">Db Name</label>
                  <input type="text" id="db_name" name="db_name" value={formData.db_name} onChange={handleChange} className="border border-gray-400 border-2 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-[--second] block w-full " required />
                </div>
                <div className='mb-10'>
                  <label htmlFor="db_username" className="block mb-2 text-sm  text-gray-900 dark-text-black">Db Username</label>
                  <input type="text" id="db_username" name="db_username" value={formData.db_username} onChange={handleChange} className="border border-gray-400 border-2 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-[--second] block w-full " required />
                </div>
                <div className='mb-1'>
                  <label htmlFor="db_password" className="block mb-2 text-sm  dark-text-black">Db password</label>
                  <input type="text" id="db_password" name="db_password" value={formData.db_password} onChange={handleChange} className="border border-gray-400 border-2 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-[--second] block w-full " required />
                </div>
                <div className="mb-8">
                  <label htmlFor="is_catalog" className="block mb-2 text-sm  dark-text-black">Is Catalog</label>
                  <select id="is_catalog" name="is_catalog" value={formData.is_catalog} onChange={handleChange} className="border border-2 border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-[--second] block w-full">
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className='mt-10 mb-10 text-center'>
                <Button type="submit" variant="contained" style={{ backgroundColor: '#00a727', color: '#FFFFFF' }}>Generate New License</Button>
              </div>
            </div>
          </div>
          <div className='px-8 mt-16 pt-4 my-6 bg-white rounded-[15px] border border border-gray-200 shadow-xl'>
            <h1 className={`text-center py-3  text-[27px] `}>Unlock a <span className='text-[--second]'>CRM</span></h1>
              <div className='mb-8'>
                <label htmlFor="crm_db_name" className="block mb-4 text-sm  dark-text-black">CRM DB Name</label>
                <input type="text" id="crm_db_name" name="crm_db_name" value={formData.crm_db_name} onChange={handleChange} className="border border-gray-400 border-2 text-gray-900 text-sm rounded-lg focus:ring-gray-400] focus:border-[--second] block w-full " required />
              </div>
              <div className="grid gap-6 mb-6 lg:grid-cols-2">
                <div>
                  <label htmlFor="crm_db_username" className="block mb-4 text-sm  text-gray-900 dark-text-black">CRM DB Username</label>
                  <input type="text" id="crm_db_username" name="crm_db_username" value={formData.crm_db_username} onChange={handleChange} className="border border-gray-400 border-2 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-[--second] block w-full " required />
                </div>
                <div>
                  <label htmlFor="crm_db_password" className="block mb-4 text-sm  dark-text-black">CRM DB Password</label>
                  <input type="text" id="crm_db_password" name="crm_db_password" value={formData.crm_db_password} onChange={handleChange} className="border border-gray-400 border-2 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-[--second] block w-full " required />
                </div>
              </div>
          </div>
          </form>
        </div>
      )}
    </>
  );
};

export default GenerateLicense;
