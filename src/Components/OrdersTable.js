import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import OrderDetail from './OrderDetail'; // Import the modal component
import Cookies from 'js-cookie';
import { Instagram } from 'react-content-loader';

const OrderTable = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const userData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://ci4backend.smartyuppies.com/OrderController/listOrders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        phone_number_id: userData.phone_number_id
                    }),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setLoading(false);
                setData(jsonData.orders);
                setFilteredData(jsonData.orders); // Initialize filteredData with the full data set
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleView = (order) => {
        setSelectedOrder(order);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setSelectedOrder(null);
    };

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        if (term === '') {
            setFilteredData(data);
        } else {
            const filtered = data.filter(order =>
                order.customer_name.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredData(filtered);
        }
    };

    return (
        <div className="rounded-lg shadow-xl overflow-x-scroll h-[570px]">
            <div className="p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Order Table</h1>
                <input
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search by customer name"
                    variant="outlined"
                    size="small"
                    className="mb-4 lg:mb-0 focus:ring-none p-2 bg-gray-50 rounded-lg border- border border-gray-400 focus:outline-gray-300"
                />
            </div>
            {loading ? (
                <Instagram backgroundColor={'#E5E4E2'} />
            ) : (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="order table">
                        <TableHead>
                            <TableRow className="bg-gray-100 sticky top-0">
                                <TableCell align="center" className="px-4 py-2">Order Name</TableCell>
                                <TableCell align="center" className="px-4 py-2">Order ID</TableCell>
                                <TableCell align="center" className="px-4 py-2">Ordered Placed</TableCell>
                                <TableCell align="center" className="px-4 py-2">Amount</TableCell>
                                <TableCell align="center" className="px-4 py-2">Payment Status</TableCell>
                                <TableCell align="center" className="px-4 py-2">Order Status</TableCell>
                                <TableCell align="center" className="px-4 py-2">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.map((order,index) => (
                                <TableRow key={index} className="bg-white hover:bg-gray-50">
                                    <TableCell align="center" className="px-4 py-2">{order.customer_name}</TableCell>
                                    <TableCell align="center" className="px-4 py-2">{order.order_id}</TableCell>
                                    <TableCell align="center" className="px-4 py-2">{order.date}</TableCell>
                                    <TableCell align="center" className="px-4 py-2">{order.total_amount}</TableCell>
                                    <TableCell align="center" className="px-4 py-2">{order.payment_status}</TableCell>
                                    <TableCell align="center" className="px-4 py-2">{order.order_status}</TableCell>
                                    <TableCell align="center" className="px-4 py-2">
                                        <button
                                            className="border-2 border-green-600 border-solid text-green-600 hover:text-white px-5 py-2 rounded-lg hover:bg-green-500 focus:outline-none"
                                            onClick={() => handleView(order)}
                                        >
                                            View
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {/* Modal */}
            <OrderDetail isOpen={isOpen} onClose={handleCloseModal} order={selectedOrder}  />
        </div>
    );
};

export default OrderTable;
