import React, { useState, useEffect, useMemo } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import * as XLSX from 'xlsx';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactAdd = ({ onClose ,forceUpdate}) => {
  const [groups, setGroups] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    newGroup: '',
    country: '',
    email: '',
    mobile: '',
    column1: '',
    column2: '',
    column3: '',
    column4: '',
    column5: '',
    column6: '',
    column7: '',
    column8: '',
    column9: '',
    column10: '',
    column11: '',
    column12: '',
    column13: '',
    column14: '',
    column15: '',
    column16: '',
    column17: '',
    column18: '',
    column19: '',
    column20: '',
    imageType: '',
    imageFile: null,
  });

  const userData = useMemo(() => Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : {}, []);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('https://ci4backend.smartyuppies.com/GroupController/groups', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: userData?.username }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch groups');
        }

        const data = await response.json();
       
        setGroups(data.distinctGroupsData || []);
      } catch (error) {
        console.error('Error fetching groups:', error);
        setGroups([]);
      }
    };

    if (userData?.username) {
    
    }
    fetchGroups();
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imageFile: file, imageType: file.type });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://ci4backend.smartyuppies.com/Contact/addContacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userData?.username,
          phone_number_id: userData?.phone_number_id,
          name: formData.name,
          country: formData.country,
          phone_number: formData.mobile,
          email: formData.email,
          column1: formData.column1,
          column2: formData.column2,
          column3: formData.column3,
          column4: formData.column4,
          column5: formData.column5,
          column6: formData.column6,
          column7: formData.column7,
          column8: formData.column8,
          column9: formData.column9,
          column10: formData.column10,
          column11: formData.column11,
          column12: formData.column12,
          column13: formData.column13,
          column14: formData.column14,
          column15: formData.column15,
          column16: formData.column16,
          column17: formData.column17,
          column18: formData.column18,
          column19: formData.column19,
          column20: formData.column20,
        }),
      });

      if (response.ok) {
        toast.success('Successfully Added', {
          position: 'top-center',
          autoClose: 5000,
        });
        setFormData({
          name: '',
          country: '',
          email: '',
          mobile: '',
          column1: '',
          column2: '',
          column3: '',
          column4: '',
          column5: '',
          column6: '',
          column7: '',
          column8: '',
          column9: '',
          column10: '',
          column11: '',
          column12: '',
          column13: '',
          column14: '',
          column15: '',
          column16: '',
          column17: '',
          column18: '',
          column19: '',
          column20: '',
          imageType: '',
          imageFile: null,
        });
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    forceUpdate()
    onClose()
  };

  const handleShow = () => {
    setShow(!show);
  };

  const handleDownloadExcel = () => {
    const headers = [
      'Name', 'MobileNumber', 'Country', 'EmailAddress', 
      'Column1', 'Column2', 'Column3', 'Column4', 'Column5', 'Column6','Column7','Column8',,'Column9','Column10','Column11','Column12','Column13','Column14'
      ,'Column15','Column16','Column17','Column18','Column19','Column20'
    ];

    const data = [
      {
        Name: formData.name,
        MobileNumber: formData.mobile,
        Country: formData.country,
        EmailAddress: formData.email,
        Column1: formData.column1,
        Column2: formData.column2,
        Column3: formData.column3,
        Column4: formData.column4,
        Column5: formData.column5,
        Column6: formData.column6,
        Column7: formData.column7,
        Column9: formData.column8,
        Column10: formData.column9,
        Column11: formData.column10,
        Column12: formData.column11,
        Column13: formData.column12,
        Column14: formData.column13,
        Column15: formData.column15,
        Column16: formData.column16,
        Column17: formData.column17,
        Column18: formData.column18,
        Column19: formData.column19,
        Column20: formData.column20
      }
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'contact_data.xlsx');
  };

  const handleImport = async () => {
    try {
      if (!formData.imageFile) {
        console.error('No file selected');
        return;
      }

      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64data = reader.result.split(',')[1]; // Extracting base64 data

        try {
          const response = await fetch('https://ci4backend.smartyuppies.com/Contact/ContactExcelImport', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: userData?.username,
              phone_number_id: userData?.phone_number_id,
              existing_group: formData.imageType,
              group_name: formData.newGroup,
              excel: base64data, // Include base64 data in the request
            }),
          });
        
          if (response.ok) {
            
            const responseData = await response.json();
            console.log('Import successful',responseData);
            toast.success('Successfully Added', {
              position: 'top-center',
              autoClose: 5000,
            });
          } else {
            console.error('Import failed');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      reader.readAsDataURL(formData.imageFile); // Read file as base64
    } catch (error) {
      console.error('Error:', error);
    }
    forceUpdate()
  };

  return (
    <>
       <ToastContainer />
    <div className='relative'>

      <div className='fixed inset-0 bg-black opacity-50 z-10'></div>

      <div className='fixed right-0 top-0 h-full bg-white w-full max-w-lg p-4 duration-700 z-20 overflow-y-auto'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-bold'>Campaign Report</h2>
          <button onClick={onClose} className='text-red-500 rounded-full'>
            <MdOutlineCancel size={24} />
          </button>
        </div>
        <div className='flex justify-end mb-4'>
          <button
            onClick={handleDownloadExcel}
            className='bg-green-700 hover:bg-green-800 text-white  py-2 px-4 rounded'
          >
            Download Excel
          </button>
        </div>
        <hr className='mb-4' />

        <button
          type='button'
          onClick={handleShow}
          className='bg-white text-black w-full mb-3 border-gray-200 border-solid border shadow-lg  py-2 px-4 rounded'
        >
          Import via Excel
        </button>
        <div className='text-center'>
            <button
             onClick={handleSubmit}
              className='bg-green-700 hover:bg-green-800 mb-4 text-white  py-2 px-8 w-full rounded-lg'
            >
              Add Contact
            </button>
          </div>
        {show && (
          <div className='bg-white border-solid border-gray border p-2 rounded-xl shadow-xl mb-4'>
            <div className='flex items-center mb-4'>
              <label htmlFor='imageType' className='mr-2'>Select Group  :
              <select
                id='imageType'
                name='imageType'
                className='border rounded w-[20px] p-2'
                onChange={handleChange}
                value={formData.imageType}
              >
                
                
                {groups.map((imageType, index) => (
                  <option key={index} value={imageType.groupname}>{imageType.groupname}</option>
                ))}
              </select>
              </label>
            </div>
            <div className='flex items-center mb-4'>
              <label htmlFor='imageFile' className='mr-2'>Upload Image:</label>
              <input
                type='file'
                id='imageFile'
                name='imageFile'
                onChange={handleImageChange}
                accept='.xlsx, .xls, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                className='border rounded px-2 py-1'
              />
            </div>
            <div className='flex items-center mb-4'>
              <label htmlFor='country' className='mr-2'>NewGroupName:</label>
              <input
                type='text'
                id='country'
                name='newGroup'
                value={formData.newGroup}
                onChange={handleChange}
                className='border rounded px-2 py-1 flex-1'
              />
            </div>
            <div className='text-center'>
              <button
                type='button'
                onClick={handleImport}
                className='bg-green-700 hover:bg-green-800 text-white  py-2 px-8  rounded'
              >
                Import
              </button>
            </div>
          </div>
        )}

        <form  className='bg-white p-4 rounded shadow-md'>
          <div className='mb-4'>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-2'>
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='border border-gray-300 rounded py-2 px-3 w-full'
              placeholder='Enter name'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='country' className='block text-sm font-medium text-gray-700 mb-2'>
              Country
            </label>
            <input
              type='text'
              id='country'
              name='country'
              value={formData.country}
              onChange={handleChange}
              className='border border-gray-300 rounded py-2 px-3 w-full'
              placeholder='Enter country'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='border border-gray-300 rounded py-2 px-3 w-full'
              placeholder='Enter email'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='mobile' className='block text-sm font-medium text-gray-700 mb-2'>
              Mobile Number
            </label>
            <input
              type='text'
              id='mobile'
              name='mobile'
              value={formData.mobile}
              onChange={handleChange}
              className='border border-gray-300 rounded py-2 px-3 w-full'
              placeholder='Enter mobile number'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='column1' className='block text-sm font-medium text-gray-700 mb-2'>
              Column 1
            </label>
            <input
              type='text'
              id='column1'
              name='column1'
              value={formData.column1}
              onChange={handleChange}
              className='border border-gray-300 rounded py-2 px-3 w-full'
              placeholder='Enter column 1'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='column2' className='block text-sm font-medium text-gray-700 mb-2'>
              Column 2
            </label>
            <input
              type='text'
              id='column2'
              name='column2'
              value={formData.column2}
              onChange={handleChange}
              className='border border-gray-300 rounded py-2 px-3 w-full'
              placeholder='Enter column 2'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='column3' className='block text-sm font-medium text-gray-700 mb-2'>
              Column 3
            </label>
            <input
              type='text'
              id='column3'
              name='column3'
              value={formData.column3}
              onChange={handleChange}
              className='border border-gray-300 rounded py-2 px-3 w-full'
              placeholder='Enter column 3'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='column4' className='block text-sm font-medium text-gray-700 mb-2'>
              Column 4
            </label>
            <input
              type='text'
              id='column4'
              name='column4'
              value={formData.column4}
              onChange={handleChange}
              className='border border-gray-300 rounded py-2 px-3 w-full'
              placeholder='Enter column 4'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='column5' className='block text-sm font-medium text-gray-700 mb-2'>
              Column 5
            </label>
            <input
              type='text'
              id='column5'
              name='column5'
              value={formData.column5}
              onChange={handleChange}
              className='border border-gray-300 rounded py-2 px-3 w-full'
              placeholder='Enter column 5'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='column6' className='block text-sm font-medium text-gray-700 mb-2'>
              Column 6
            </label>
            <input
              type='text'
              id='column6'
              name='column6'
              value={formData.column6}
              onChange={handleChange}
              className='border border-gray-300 rounded py-2 px-3 w-full'
              placeholder='Enter column 6'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='column7' className='block text-sm font-medium text-gray-700 mb-2'>
              Column 7
            </label>
            <input
              type='text'
              id='column7'
              name='column7'
              value={formData.column7}
              onChange={handleChange}
              className='border border-gray-300 rounded py-2 px-3 w-full'
              placeholder='Enter column 7'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='column8' className='block text-sm font-medium text-gray-700 mb-2'>
              Column 8
            </label>
            <input
              type='text'
              id='column8'
              name='column8'
              value={formData.column8}
              onChange={handleChange}
              className='border border-gray-300 rounded py-2 px-3 w-full'
              placeholder='Enter column 8'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='column9' className='block text-sm font-medium text-gray-700 mb-2'>
              Column 9
            </label>
            <input
              type='text'
              id='column9'
              name='column9'
              value={formData.column9}
              onChange={handleChange}
              className='border border-gray-300 rounded py-2 px-3 w-full'
              placeholder='Enter column 9'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='column10' className='block text-sm font-medium text-gray-700 mb-2'>
              Column 10
            </label>
            <input
              type='text'
              id='column10'
              name='column10'
              value={formData.column10}
              onChange={handleChange}
              className='border border-gray-300 rounded py-2 px-3 w-full'
              placeholder='Enter column 10'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='column11' className='block text-sm font-medium text-gray-700 mb-2'>
              Column 11
            </label>
            <input
              type='text'
              id='column11'
              name='column11'
              value={formData.column11}
              onChange={handleChange}
              className='border border-gray-300 rounded py-2 px-3 w-full'
              placeholder='Enter column 11'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='column12' className='block text-sm font-medium text-gray-700 mb-2'>
              Column 12
            </label>
            <input
              type='text'
              id='column12'
              name='column12'
              value={formData.column12}
              onChange={handleChange}
              className='border border-gray-300 rounded py-2 px-3 w-full'
              placeholder='Enter column 12'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='column13' className='block text-sm font-medium text-gray-700 mb-2'>
              Column 13
            </label>
            <input
              type='text'
              id='column13'
              name='column13'
              value={formData.column13}
              onChange={handleChange}
              className='border border-gray-300 rounded py-2 px-3 w-full'
              placeholder='Enter column 13'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='column14' className='block text-sm font-medium text-gray-700 mb-2'>
              Column 14
            </label>
            <input
              type='text'
              id='column14'
              name='column14'
              value={formData.column14}
              onChange={handleChange}
              className='border border-gray-300 rounded py-2 px-3 w-full'
              placeholder='Enter column 14'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='column15' className='block text-sm font-medium text-gray-700 mb-2'>
              Column 15
            </label>
            <input
              type='text'
              id='column15'
              name='column15'
              value={formData.column15}
              onChange={handleChange}
              className='border border-gray-300 rounded py-2 px-3 w-full'
              placeholder='Enter column 15'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='column16' className='block text-sm font-medium text-gray-700 mb-2'>
              Column 16
            </label>
            <input
              type='text'
              id='column16'
              name='column16'
              value={formData.column16}
              onChange={handleChange}
              className='border border-gray-300 rounded py-2 px-3 w-full'
              placeholder='Enter column 16'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='column17' className='block text-sm font-medium text-gray-700 mb-2'>
              Column 17
            </label>
            <input
              type='text'
              id='column17'
              name='column17'
              value={formData.column17}
              onChange={handleChange}
              className='border border-gray-300 rounded py-2 px-3 w-full'
              placeholder='Enter column 17'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='column18' className='block text-sm font-medium text-gray-700 mb-2'>
              Column 18
            </label>
            <input
              type='text'
              id='column18'
              name='column18'
              value={formData.column18}
              onChange={handleChange}
              className='border border-gray-300 rounded py-2 px-3 w-full'
              placeholder='Enter column 18'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='column19' className='block text-sm font-medium text-gray-700 mb-2'>
              Column 19
            </label>
            <input
              type='text'
              id='column19'
              name='column19'
              value={formData.column19}
              onChange={handleChange}
              className='border border-gray-300 rounded py-2 px-3 w-full'
              placeholder='Enter column 19'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='column20' className='block text-sm font-medium text-gray-700 mb-2'>
              Column 20
            </label>
            <input
              type='text'
              id='column20'
              name='column20'
              value={formData.column20}
              onChange={handleChange}
              className='border border-gray-300 rounded py-2 px-3 w-full'
              placeholder='Enter column 20'
            />
          </div>

          
         
        </form>
      </div>
    </div>
    </>
  );
};

export default ContactAdd;
