import React, { useEffect, useState,useReducer } from 'react';
import { MaterialReactTable, createMRTColumnHelper, useMaterialReactTable } from 'material-react-table';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { generateCsv, mkConfig } from 'export-to-csv';
import ContactEdit from './ContactEdit';
import ContactAdd from './ContactAdd';
import Cookies from 'js-cookie';
import { Instagram } from 'react-content-loader';
import { message } from 'antd';

const columnHelper = createMRTColumnHelper();
const chat= Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reducer, forceUpdate] = useReducer(x => x + 1,0)
  

  const handleSubscribe = async (row) => {
    console.log('Subscribe clicked for row:', row);

    try {
      const newStatus = row.status === 'subscribed' ? 'unsubscribed' : 'subscribed';
      const response = await fetch(`https://ci4backend.smartyuppies.com/Contact/changeContactStatus/${row.id}/${newStatus}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Update the contacts state after successful status change
      setContacts((prevContacts) => 
        prevContacts.map((contact) => 
          contact.id === row.id ? { ...contact, status: newStatus } : contact
        )
      );
      console.log('Contact status changed successfully:', row);
    } catch (error) {
      console.error('Error changing contact status:', error);
      // Handle error state or display an error message
    }
  };
  const handleEdit = (row) => {
    setSelectedContact(row);
    setOpenEdit(true);
  };
  const handleDelete = async (row) => {
    console.log('Delete clicked for row:', row);

    try {
      const response = await fetch(`https://ci4backend.smartyuppies.com/Contact/deleteContact/${row.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Update the contacts state after successful deletion
      message.success('Contact updated successfully');
      setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== row.id));
      console.log('Contact deleted successfully:', row);
    } catch (error) {
      console.error('Error deleting contact:', error);
      // Handle error state or display an error message
    }
  };
  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      size: 150,
      enableEditing: false,
    }),
    columnHelper.accessor('phone_number', {
      header: 'Phone Number',
      size: 150,
    }),
    columnHelper.accessor('country', {
      header: 'Country',
      size: 150,
    }),
    columnHelper.accessor('lead_source', {
      header: 'LeadSource',
      size: 150,
    }),
    columnHelper.accessor('company_name', {
      header: 'CompanyName',
      size: 150,
    }),
    columnHelper.accessor('company_adress', {
      header: 'CompanyAdress',
      size: 150,
    }),
    columnHelper.accessor('status', {
      header: 'Subscription Status',
      size: 150,
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            variant="contained"
            size="small"
           className='border-solid border-green-600 border-2 p-2 bg-white font-poppins shadow-xl rounded-lg text-green-600 hover:text-white hover:bg-green-800'
            onClick={() => handleSubscribe(row.original)}
          >
            {row.original.status === 'subscribed' ? 'Unsubscribe' : 'Subscribe'}
          </button>
          <button
            variant="contained"
            size="small"
            className='border-solid border-green-600 border-2 shadow-xl bg-white font-poppins p-2 rounded-lg text-green-600 hover:text-white hover:bg-green-800'
            onClick={() => handleEdit(row.original)}
          >
            Edit
          </button>
          <button
            variant="contained"
            size="small"
            className='border-solid border-green-600 border-2 font-poppins bg-white  shadow-xl p-2 rounded-lg text-green-600 hover:text-white hover:bg-green-800'

            onClick={() => handleDelete(row.original)}
          >
            Delete
          </button>
        </Box>
      ),
      size: 200,
    }),
  ];

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: true,
    filename: 'all-data',
  });

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true)

      try {
        const response = await fetch('https://ci4backend.smartyuppies.com/Contact/fetchAllContacts/pages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: chat.username }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setContacts(data.contacts || []);
        setLoading(false)
      
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, [reducer]);

  const handleExportData = () => {
    const csv = generateCsv(csvConfig);
    const csvContent = csv(contacts);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'all-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const table = useMaterialReactTable({
    columns,
    data: contacts,
    enableRowSelection: true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    renderTopToolbarCustomActions: () => (
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
        }}
      >
        <Button onClick={handleExportData}  startIcon={<FileDownloadIcon  />}   sx={{
            backgroundColor: '#00a727',color:'white',
            '&:hover': { backgroundColor: '#00a728' },
          }}>
          Export All Data
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#00a727',
            '&:hover': { backgroundColor: '#00a728' },
          }}
          onClick={() => setOpenAdd(!openAdd)}
        >
         Add Contact
        </Button>
      </Box>
    ),
  });

  return (
    <div className="rounded-xl">
       {loading ? (
        <div className='text-center'>
          <Instagram className='text-gray-200' />
        </div>  
      ) : (
      <MaterialReactTable table={table} />
    )}
      {openAdd && <ContactAdd onClose={() => setOpenAdd(false)} forceUpdate={forceUpdate} />}
      {openEdit && <ContactEdit contact={selectedContact} onClose={() => setOpenEdit(false)} forceUpdate={forceUpdate} />}
    </div>
  );
};

export default Contacts;
