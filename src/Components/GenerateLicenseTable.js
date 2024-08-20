import React, { useState, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import GenerateLicenseExpired from './GenerateLicenceTableExpired';
import GenerateLicenseActive from './GenerateLicenceEditActive'; // Ensure the import path is correct

const GenerateTable = () => {
  const [actionOpen, setActionOpen] = useState(null);
  const [show, setShow] = useState(true);
  const [edit, setEdit] = useState(false);
  const [orders, setOrders] = useState([]);
  const [details, setDetails] = useState({});
  const [counts, setCounts] = useState({});
  const [reducer, forceUpdate] = useReducer(x => x + 1, 0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, [reducer]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://ci4backend.smartyuppies.com/Home/licenseActive/active'); // Replace with your API endpoint
      if (response.ok) {
        const datas = await response.json();
        setOrders(datas.data);
        setCounts(datas);
      } else {
        console.error('Failed to fetch orders', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdited = (order) => {
    setDetails(order);
    setEdit(!edit);
  };

  const handleActionClick = (orderId) => {
    setActionOpen((prev) => (prev === orderId ? null : orderId));
  };

  const handleActivate = async (order) => {
    try {
      const status = order.status === 'active' ? 'inactive' : 'active';
      const response = await fetch('https://ci4backend.smartyuppies.com/Home/changeLicenseStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: order.id,
          status: status,
        }),
      });

      if (response.ok) {
        fetchOrders(); // Refresh the data after activation
      } else {
        console.error('Failed to activate license', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMonthExpires = () => {
    navigate('/LicenceThisMonth');
  };

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <>
      <h1 className="text-center text-2xl">{show ? 'Active License' : 'Expired License'}</h1>
      <div className="lg:flex justify-end">
        <Button
          variant="contained"
          style={{ backgroundColor: '#00a727', color: '#FFFFFF', marginBottom: '1rem', marginRight: '1em', paddingRight: '15px' }}
          onClick={handleClick}
        >
          {show ? "Expired" : "Active"}
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: '#00a727', color: '#FFFFFF', marginBottom: '1rem', marginRight: '1em', paddingRight: '15px' }}
          onClick={handleMonthExpires}
        >
          This Month Expires
        </Button>
      </div>
    
      {show ? (
        <>
          <h1 className='bg-gray-200 p-2 w-[100px]  mb-4 text-green-700 font-poppins rounded-xl'>Total:<span className='bg-white ml-2 p-2 text-green-800 w-10 h-10 text-sm rounded-full shadow-2xl'>{counts?.count}</span></h1>

          <div className="rounded-xl shadow-[20px] overflow-x-scroll h-[500px]">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="order table">
                <TableHead>
                  <TableRow className="bg-gray-100 sticky top-0">
                    <TableCell align="center" className="px-4 py-2">Name</TableCell>
                    <TableCell align="center" className="px-4 py-2">Role</TableCell>
                    <TableCell align="center" className="px-4 py-2">Phone Number ID</TableCell>
                    <TableCell align="center" className="px-4 py-2">Expiry Date</TableCell>
                    <TableCell align="center" className="px-4 py-2">Status</TableCell>
                    <TableCell align="center" className="px-4 py-2">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="bg-white hover:bg-gray-50">
                      <TableCell align="center" className="px-4 py-2">{order.username}</TableCell>
                      <TableCell align="center" className="px-4 py-2">{order.role}</TableCell>
                      <TableCell align="center" className="px-4 py-2">{order.phone_number_id}</TableCell>
                      <TableCell align="center" className="px-4 py-2">{order.expiry_date}</TableCell>
                      <TableCell align="center" className="px-4 py-2">{order.status}</TableCell>
                      <TableCell align="center" className="px-4 py-2">
                        <Tooltip title="Edit">
                          <IconButton onClick={() => handleActionClick(order.id)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                       
                        {actionOpen === order.id && (
                          <div className="flex flex-col bg-white shadow-lg rounded-lg p-4 items-center mt-2">
                            <button
                              className="border-green-600 border-2 border-solid text-green-600 px-4 py-1 rounded mb-1"
                              onClick={() => handleEdited(order)}
                            >
                              Edit
                            </button>
                            <button
                              className="border-green-600 border-2 border-solid text-green-600 px-2 py-1 rounded"
                              onClick={() => handleActivate(order)}
                            >
                              {order.status === 'active' ? 'Inactive' : 'Active'}
                            </button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      ) : (
        <GenerateLicenseExpired />
      )}

      {edit && <GenerateLicenseActive details={details} onClose={handleEdited} forceUpdate={forceUpdate} />}
    </>
  );
};

export default GenerateTable;
