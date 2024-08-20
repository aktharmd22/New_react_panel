import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Cookies from 'js-cookie';
import CrmTable from './CrmTable';


const LeadTable = () => {
    
    const chat = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;

    const navigate = useNavigate();
    const [leads, setLeads] = useState([]);
    const [showCrmTable, setShowCrmTable] = useState(false);
    const [edit,setEdit] = useState({});


    useEffect(() => {
        const fetchLeads = async () => {
            const requestBody = {
                crm_db_name: chat.crm_db_name,
                crm_db_password: chat.crm_db_password,
                crm_db_username: chat.crm_db_username, 
            };

            try {
                const response = await fetch('https://ci4backend.smartyuppies.com/Leads/index', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });

                if (response.ok) {
                    const data = await response.json();
                    setLeads(data.statusCounts);
                } else {
                    console.error('Failed to fetch leads data.');
                }
            } catch (error) {
                console.error('Error fetching leads data:', error);
            }
        };

        fetchLeads();
    }, []);

    const handleView = (lead) => {
        setShowCrmTable(true);
        setEdit(lead)
    };

    return (
        <>
            {showCrmTable ? (
                <CrmTable status={edit} />
            ) : (
                <div className="rounded-xl shadow-[20px] h-[570px] shadoew-xl border-solid border border-gray-200 overflow-x-scroll h-[500px]">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="lead table">
                            <TableHead>
                                <TableRow className="bg-gray-100 sticky top-0">
                                    <TableCell align="center" className="px-4 py-2">Lead Status</TableCell>
                                    <TableCell align="center" className="px-4 py-2">Total Members</TableCell>
                                    <TableCell align="center" className="px-4 py-2">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {leads.map((lead,index) => (
                                    <TableRow key={index} className="bg-white hover:bg-gray-50">
                                        <TableCell align="center" className="px-4 py-2">{lead.name}</TableCell>
                                        <TableCell align="center" className="px-4 py-2">{lead.count}</TableCell>
                                        <TableCell align="center" className="px-4 py-2">
                                            <button
                                                className="bg-white border-solid border border-green-600 text-green-600 hover:text-white  px-6 py-2 rounded hover:bg-green-700 focus:outline-none"
                                                onClick={()=>handleView(lead)}
                                            >
                                                View
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </>
    );
};

export default LeadTable;
