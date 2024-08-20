import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { message } from 'antd';

const CommerceSettings = () => {
    const chat = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;
    console.log("userdata", chat);
    const [formData, setFormData] = useState({
        username: chat.username,
        phone_number_id: chat.phone_number_id,
        id: chat.id,
        order_form_id: chat.order_form_id,
        upi_type: chat.upi_type,
        payment_config_id: chat.payment_config_id,
        catalogue_spreadsheet_id: chat.catalogue_spreadsheet_id,
        catalogue_spreadsheet_name: chat.catalogue_spreadsheet_name,
        catalogue_spreadsheet_key: chat.catalogue_spreadsheet_key,
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://ci4backend.smartyuppies.com/OrderController/commerceSettings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            console.log("userobject", formData);
            message.success('Updated Successfully');
            console.log('Settings updated successfully!', response);
        } else {
            message.error("Failed to update");
            console.error('Failed to update settings.');
        }
    };

    return (
        <div className="flex items-center justify-center h-fit py-8 px-4 md:px-0">
            <div className="w-full md:w-2/3 bg-white p-6 md:p-8 mb-6 rounded-xl shadow-lg">
                <h2 className="text-2xl md:text-3xl mb-8 md:mb-10 text-center">Configure <span className='text-green-600'>Commerce</span> Settings</h2>
                <form className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-900 text-md ml-2 md:ml-8 mb-2" htmlFor="order_form_id">
                            Order Form ID
                        </label>
                        <input
                            className="appearance-none rounded-lg border border-gray-600 ml-2 md:ml-8 mt-2 md:mt-4 w-full py-2 md:py-3 px-3 text-gray-500 focus:outline-none focus:shadow-outline focus:ring-white"
                            id="order_form_id"
                            type="text"
                            placeholder="Enter Order Form ID"
                            value={formData.order_form_id}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="mb-4 ml-2 md:ml-6">
                        <label className="block text-gray-900 text-md ml-2 md:ml-8 mb-2" htmlFor="payment_config_id">
                            Payment Config ID
                        </label>
                        <input
                            className="appearance-none rounded-lg border border-gray-600 ml-2 md:ml-8 mt-2 md:mt-4 w-full py-2 md:py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-white"
                            id="payment_config_id"
                            type="text"
                            placeholder="Enter Payment Config ID"
                            value={formData.payment_config_id}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-md mb-2 ml-2 md:ml-8" htmlFor="upi_type">
                            Payment Type
                        </label>
                        <select
                            className="appearance-none rounded-lg border border-gray-600 ml-2 md:ml-8 mt-2 md:mt-4 w-full py-2 md:py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-white"
                            id="upi_type"
                            value={formData.upi_type}
                            onChange={handleChange}
                        >
                            <option value={chat.upi_type}>{chat.upi_type}</option>
                            <option value={chat.upi_type === "razorpay" ? "upi" : "razerpay"}>{chat.upi_type === "razorpay" ? "upi" : "razerpay"}</option>
                        </select>
                    </div>

                    <div className="mb-4 ml-2 md:ml-6">
                        <label className="block text-gray-700 text-md mb-2 ml-2 md:ml-8" htmlFor="catalogue_spreadsheet_id">
                            Spreadsheet ID
                        </label>
                        <input
                            className="appearance-none rounded-lg border border-gray-600 ml-2 md:ml-8 mt-2 md:mt-4 w-full py-2 md:py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-white"
                            id="catalogue_spreadsheet_id"
                            type="text"
                            placeholder="Enter Spreadsheet ID"
                            value={formData.catalogue_spreadsheet_id}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-md mb-2 ml-2 md:ml-8" htmlFor="catalogue_spreadsheet_name">
                            Spreadsheet Name
                        </label>
                        <input
                            className="appearance-none rounded-lg border border-gray-600 ml-2 md:ml-8 mt-2 md:mt-4 w-full py-2 md:py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-white"
                            id="catalogue_spreadsheet_name"
                            type="text"
                            placeholder="Enter Spreadsheet Name"
                            value={formData.catalogue_spreadsheet_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-6 ml-2 md:ml-6">
                        <label className="block text-gray-700 text-md mb-2 ml-2 md:ml-8" htmlFor="catalogue_spreadsheet_key">
                            Spreadsheet Key
                        </label>
                        <input
                            className="appearance-none rounded-lg border border-gray-600 ml-2 md:ml-8 mt-2 md:mt-4 w-full py-2 md:py-3 px-3 text-gray-700 leading-tight focus:ring-white focus:outline-none focus:shadow-outline"
                            id="catalogue_spreadsheet_key"
                            type="text"
                            placeholder="Enter Spreadsheet Key"
                            value={formData.catalogue_spreadsheet_key}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2 flex items-center justify-center">
                        <button
                            className="bg-green-700 hover:bg-green-800 text-white py-2 md:py-3 px-8 md:px-20 rounded-lg focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Update <span className='ml-2'>Settings</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CommerceSettings;
