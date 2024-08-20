import React, { useState, useEffect, useReducer } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import GenerateLicenActive from './GenerateLicenceEditExpired';
import { message } from 'antd';

const GenerateTable = () => {
  const [actionOpen, setActionOpen] = useState(null);
  const [show, setShow] = useState(false); // Changed to false to hide the details initially
  const [orders, setOrders] = useState([]);
  const [details, setDetails] = useState({});
  const [counts, setCounts] = useState({});

  const [reducer, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    fetchOrders();
  }, [reducer]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://ci4backend.smartyuppies.com/Home/licenseActive/inactive');
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

  const handleView = (order) => {
    setDetails(order);
    setShow(true);
  };

  const handleActionClick = (orderId) => {
    setActionOpen(actionOpen === orderId ? null : orderId);
  };

  const handleActivate = async (order) => {
    try {
      const status = order.status === 'active' ? 'expired' : 'active';
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
        message.success('Updated successfully');

        console.log('License status changed:', order.id);
        forceUpdate(); // Refresh the data after activation
      } else {
        message.error('Failed to update ');

        console.error('Failed to change license status', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <h1 className="bg-gray-200 font-poppins mb-4 p-2 text-sm w-[100px]  text-green-700 rounded-xl">
        Total:
        <span className="bg-white ml-2 p-2 text-sm text-green-800 w-12 h-12 rounded-full shadow-2xl">
          {counts?.count}
        </span>
      </h1>

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
                      <div className="flex flex-col bg-white p-3 shadow-lg rounded-lg items-center mt-2">
                        <button
                              className="border-green-600 border-2 border-solid text-green-600 px-4 py-1 rounded mb-1"
                              onClick={() => handleView(order)}
                        >
                          Edit
                        </button>
                        <button
                              className="border-green-600 border-2 border-solid text-green-600 px-4 py-1 rounded mb-1"
                              onClick={() => handleActivate(order)}
                        >
                          {order.status === 'active' ? 'Expire' : 'Activate'}
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
      {show && <GenerateLicenActive details={details} forceUpdate={forceUpdate} />}
    </>
  );
};

export default GenerateTable;
