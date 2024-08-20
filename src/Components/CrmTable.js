// src/components/CrmTable.js
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { message } from 'antd';


const CrmTable = ({ status }) => {
    const chat = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;

    const [phoneData, setPhoneData] = useState([]);

    useEffect(() => {
        const fetchPhoneData = async () => {
            try {
                const response = await fetch(`https://ci4backend.smartyuppies.com/Leads/view/${status.status}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        crm_db_name: chat.crm_db_name,
                        crm_db_password: chat.crm_db_password,
                        crm_db_username: chat.crm_db_username
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setPhoneData(data.leadDetails);
                } else {
                    console.error('Failed to fetch phone data.');
                }
            } catch (error) {
                console.error('Error fetching phone data:', error);
            }
        };

        fetchPhoneData();
    }, [status.status]); // Ensure this runs whenever `status.status` changes

    const handleAdd = async (phone) => {
        try {
            const response = await fetch('https://ci4backend.smartyuppies.com/Contact/addContacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone_number: chat.phone_number,
                    phone_number_id: chat.phone_number_id,
                    username: chat.username,
                    MobileNumber: phone.phonenumber,
                    Country: phone.country,
                    EmailAddress: phone.email,
                    Name: phone.name,
                }),
            });

            if (response.ok) {
                // Optionally, handle the response if needed
                message.success('Add Contact successfully');

                const data = await response.json();
                console.log('Contact added successfully:', data);
            } else {
                message.error('Failed to Add');

                console.error('Failed to add contact.');
            }
        } catch (error) {
            message.error('Failed to Add');
            console.error('Error adding contact:', error);
        }
    };

    return (
        <div className="rounded-xl shadow-[20px] h-[570px] shadoew-xl border-solid border border-gray-200 overflow-x-scroll h-[500px]">
            <table className="min-w-full bg-white shadow-md rounded my-6">
                <thead>
                    <tr className="bg-gray-100 sticky top-0 ">
                        <th className="py-3 px-6 ">Name</th>
                        <th className="py-3 px-6 ">Phone Number</th>
                        <th className="py-3 px-6 ">Status</th>
                        <th className="py-3 px-6 ">Source</th>
                        <th className="py-3 px-6 ">Assigned To</th>
                        <th className="py-3 px-6 ">Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {phoneData.map((phone,index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">{phone.name}</td>
                            <td className="py-3 px-6 text-left">{phone.phonenumber}</td>
                            <td className="py-3 px-6 text-left">{phone.status}</td>
                            <td className="py-3 px-6 text-left">{phone.source_name}</td>
                            <td className="py-3 px-6 text-left">{phone.assigned_name}</td>
                            <td className="py-3 px-6 text-left">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700 focus:outline-none"
                                    onClick={() => handleAdd(phone)}
                                >
                                    Add Contact
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CrmTable;
