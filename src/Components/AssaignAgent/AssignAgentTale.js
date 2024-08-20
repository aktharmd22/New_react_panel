import * as React from 'react';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AssignAgentEdit from './AssignAgentEdid';
import {message } from 'antd';

function MaterialUITables() {
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingRowId, setEditingRowId] = useState(null);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://ci4backend.smartyuppies.com/AssignAgent/viewAgent'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRows(data.agents);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [rows]);

  const handleEditClick = (id) => {
    setEditingRowId(editingRowId === id ? null : id);
  };

  const handleEdit = (id) => {
    setShow(!show);
    setEdit(id);
    console.log("data",edit)
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`https://ci4backend.smartyuppies.com/AssignAgent/deleteAgent/${id}`, {
        method: 'DELETE', // Ensure method is DELETE
      });
      if (!response.ok) {
        message.error('Failed to Delete');
        throw new Error('Network response was not ok');
      }
      message.success('Delete successfully');
      const data = await response.json();
      if (data.success) { // Assuming the response includes a success flag
        setRows(rows.filter((row) => row.id !== id)); // Update the state to remove the deleted row
      } else {
        console.error('Delete operation failed:', data.message);
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const filteredRows = rows.filter(
    (row) =>
      row.keyword?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      row.staff_name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      row.source_name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      row.status_name?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  return (
    <div className="rounded-lg shadow-xl overflow-x-scroll h-[600px] mb-4 border border-2">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Order Table</h1>
        <TextField
          placeholder="Search by customer name"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <TableContainer component={Paper} className="w-full">
        <Table aria-label="simple table" className="min-w-full divide-y divide-gray-200">
          <TableHead className="bg-gray-50">
            <TableRow>
              <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</TableCell>
              <TableCell className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">KEYWORD NAME</TableCell>
              <TableCell className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">STAFF NAME</TableCell>
              <TableCell className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">SOURCE</TableCell>
              <TableCell className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</TableCell>
              <TableCell className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="bg-white divide-y divide-gray-200">
            {filteredRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="px-6 py-4  whitespace-nowrap">{row.id}</TableCell>
                <TableCell className="px-6 py-4 font-poppins text-right whitespace-nowrap">{row.keyword}</TableCell>
                <TableCell className="px-6 py-4 font-poppins text-right whitespace-nowrap">{row.staff_name}</TableCell>
                <TableCell className="px-6 py-4  font-poppins text-right whitespace-nowrap">{row.source_name}</TableCell>
                <TableCell className="px-6 py-4 font-poppins text-right whitespace-nowrap">{row.status_name}</TableCell>
                <TableCell className="px-6 py-4 font-poppins text-right whitespace-nowrap">
                  <IconButton onClick={() => handleEditClick(row.id)}>
                    <EditIcon />
                  </IconButton>
                  {editingRowId === row.id && (
                    <div className="flex space-x-2">
                      <button
                        variant="outlined"
                        className='border-green-600 border-2 border-solid text-green-600 px-4 py-1 rounded mb-1'
                        onClick={() => handleEdit(row)}
                      >
                        Edit
                      </button>
                      <button
                        variant="outlined"
                        className='border-green-600 border-2 border-solid text-green-600 px-4 py-1 rounded mb-1'
                        onClick={() => handleDeleteClick(row.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {show && <AssignAgentEdit open={show} handleClose={handleEdit} data={edit} />}
    </div>
  );
}

export default MaterialUITables;
