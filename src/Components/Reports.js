import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';
import Button from '@mui/material/Button';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReportSidebars from './Reportsidebar';
import Cookies from 'js-cookie';
import { List } from 'react-content-loader';

const Reports = ({ open }) => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(1); // Initial page number
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  const userData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching starts

      try {
        const response = await fetch(`https://ci4backend.smartyuppies.com/analytics/reports/getReports?page=${page}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            phone_number_id: userData.phone_number_id
          })
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData.campaignInfo);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [page]);
  const handleToggle = (rowData) => {
    setSelectedRow(rowData);
    setPopup(!popup);
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
    setPopup(false);
  };

  const getMuiTheme = () =>
    createTheme({
      typography: {
        fontFamily: '',
      },
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: {
              padding: '10px 4px',
              textAlign: 'center', // Center align header text
            },
            body: {
              padding: '7px 15px',
              marginRight: '', // Center align body text
            },
          },
        },
      },
    });

  const columns = [
    {
      name: 'campaign_name',
      label: 'Campaign Name',
      options: {
        customBodyRender: (value) => (
          <div>{value}</div>
        ),
      },
    },
    {
      name: 'date',
      label: 'Date',
      options: {
        customBodyRender: (value) => (
          <div >{value}</div>
        ),
      },
    },
    {
      name: 'owner_name',
      label: 'Owner Name',
      options: {
        customBodyRender: (value) => (
          <div >{value}</div>
        ),
      },
    },
    {
      name: 'contacts',
      label: 'Contacts',
      options: {
        customBodyRender: (value) => (
          <div >{value}</div>
        ),
      },
    },
    {
      name: 'sent_count',
      label: 'Sent',
      options: {
        customBodyRender: (value) => (
          <div>{value}</div>
        ),
      },
    },
    {
      name: 'failed_count',
      label: 'Failed',
      options: {
        customBodyRender: (value) => (
          <div >{value}</div>
        ),
      },
    },
    {
      name: 'actions',
      label: 'Actions',
      options: {
        customBodyRender: (value, tableMeta) => (
          <Button
            variant="contained"
            onClick={() => handleToggle(data[tableMeta.rowIndex])}
            sx={{
              backgroundColor: 'white',
              color: '#00a727',
              padding: '4px 12px',
              textAlign: 'center',
              borderRadius: '5px',
              border: '1px solid #00a727',
              textTransform: 'lowercase',
              fontSize: '15px',
              fontWeight: '600',
              '&:hover': {
                backgroundColor: '#00a727',
                scale: '1.0',
                textAlign: 'center',
                color: 'white',
              },
              '&:focus': {
                backgroundColor: '#00a727',
                color: 'white'
              },
            }}
          >
            View
          </Button>
        ),
        filter: false,
      },
    },
  ];

  const handleIncrement = () => {
    setPage(page + 1);
  };

  const handleDecrement = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const options = {
    filter: true,
    filterType: 'dropdown',
    responsive: 'standard',
    selectableRows: 'none',
    download: true,
    print: false,
    viewColumns: true,
    elevation: 0,
    pagination: false, // Disable default pagination
  };

  return (
    <div>
      {loading ? (
        <div className='text-center'>
          <List className='text-gray-200' />
        </div>
      ) : (
        <div>
          <div className={`bg-white border-solid border shadow-lg mb-4 rounded-xl px-5 py-3`}>
            <div className={`flex justify-center  items-center text-lg font-bold`}>
              <h2>LATEST CAMPAIGNS</h2>
            </div>
          </div>
          <div className={`bg-white mb-4 border-gray-300 border border-solid shadow-lg rounded-xl px-5 py-3`}>
            <ThemeProvider theme={getMuiTheme()}>
              <div style={{ textTransform: 'uppercase', fontWeight: '900', height: '90%', width: '100%' }}>
                <MUIDataTable
                  title={'Campaign Report'}
                  data={data}
                  columns={columns}
                  options={options}
                  style={{ width: '100%', margin: '0', padding: '0' }}
                />
                <div>
                  {popup && (
                    <div className='translate-x duration-700'>
                      <ReportSidebars onClick={handleCloseModal} data={selectedRow} />
                    </div>
                  )}
                </div>
                <div className='relative'>
                  <div className='flex lg:mt-5  gap-5 lg:ml-[1200px]'>
                    <button onClick={handleDecrement} className='bg-white text-black p-2 shadow-2xl border-solid border-gray-200 border rounded-full text-lg'><FaChevronLeft /></button>
                    <button onClick={handleIncrement} className='bg-white text-black p-2  shadow-2xl border-solid border-gray-200 border rounded-full text-lg'><FaChevronRight /></button>
                  </div>
                </div>
              </div>
            </ThemeProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
