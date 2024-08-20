import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from '@mui/material';
const ThisMonthExpires = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch('https://ci4backend.smartyuppies.com/Home/licenseExpried'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        
      } 
    };

    fetchData();
  }, []);

  return (
    <div className="rounded-xl shadow-[20px] overflow-x-scroll h-[500px]">
        <div className=' '>
         <h1 className='text-center text-xl font-popins  mb-10'>This Month Expires</h1>
    </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="order table">
        <TableHead>
          <TableRow className="bg-orange-200 sticky top-0">
            <TableCell align="center" className="px-4 py-2  font-popins ">Name</TableCell>
            <TableCell align="center" className="px-4 py-2 font-popins ">phone_number</TableCell>
            <TableCell align="center" className="px-4 py-2 font-popins ">validity</TableCell>
            <TableCell align="center" className="px-4 py-2 font-popins ">expiry_date</TableCell>
            <TableCell align="center" className="px-4 py-2 font-popins ">ThisMonthExpires</TableCell>
            {/* Add more table headers as needed */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell align="center" className="px-4 py-2 font-popins ">{item.username}</TableCell>
              <TableCell align="center" className="px-4 py-2 font-popins">{item.phone_number}</TableCell>
              <TableCell align="center" className="px-4 py-2 font-popins">{item.validity}</TableCell>
              <TableCell align="center" className="px-4 py-2 font-popins">{item.expiry_date}</TableCell>
              <TableCell align="center" className="px-4 py-2 font-popins">{item.date}</TableCell>

              {/* Add more table cells as needed */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default ThisMonthExpires;
