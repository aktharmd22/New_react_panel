import React, { useState, useEffect } from 'react';
import CampaignTemplates from './CampaignTemplates';
import { RxUpdate } from "react-icons/rx";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const CommerceSettings = () => {
    const [groups, setGroups] = useState([]);
    const userData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await fetch('https://ci4backend.smartyuppies.com/GroupController/groups', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: userData?.username }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch groups');
                }

                const data = await response.json();
                setGroups(data.distinctGroupsData || []);
            } catch (error) {
                console.error('Error fetching groups:', error);
                setGroups([]); // Ensure groups is always an array
            }
        };

        if (userData) {
            fetchGroups();
        }
    }, [userData]);

    const [formData, setFormData] = useState({
        campaignName: '',
        campaignOwner: '',
        phoneNumber: userData.phone_number,
        audience: '',
        group: '',
        lead: '',
        googleSheetId: '',
        spreadsheetName: '',
        googleSheetApiKey: 'AIzaSyChYwEybck6gnonEh-lMYEIhVJDRNj7lxA',
    });
    const navigate = useNavigate();
    const [selectedTemplate, setSelectedTemplate] = useState([]); // State to hold selected template

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleGroupChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            audience: '' // Reset the audience state when group is selected
        });
    };

    const onSelectTemplate = (template) => {
        setSelectedTemplate(template);
       
        console.log('Selected Template:', selectedTemplate ?? null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedTemplate.length === 0) {
            message.error('Please select a template before proceeding.');
         
        } else {
            navigate('/campaignSelect', { state: { userData, formData, selectedTemplate } });
        }
    };

    return (
        <div className="flex flex-col w-full md:flex-row gap-6 md:gap-10 md:h-[620px] md:overflow-y-auto">
            {/* Left side - Form */}
            <div className="w-full md:w-1/2 shadow-lg bg-white h-auto md:h-[600px] rounded-xl border-solid border p-4 md:p-8">
                <h2 className="text-lg md:text-3xl mb-4 md:mb-6 text-center mt-4">Create <span className='text-green-600'>Campaign</span></h2>

                <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-3 md:mb-4">
                            <label className="block text-gray-700 text-sm md:text-md mb-1 md:mb-2" htmlFor="campaignName">
                                Campaign Name:
                            </label>
                            <input
                                className="appearance-none text-sm rounded-lg border border-solid border-gray-600 w-full py-2 px-3 text-gray-700 leading-tight focus:ring-gray-100 focus:outline-none focus:ring-white"
                                id="campaignName"
                                name="campaignName"
                                type="text"
                                value={formData.campaignName}
                                onChange={handleChange}
                                placeholder="Enter Campaign Name"
                                required
                            />
                        </div>
                        <div className="mb-3 md:mb-4">
                            <label className="block text-gray-700 text-sm md:text-md mb-1 md:mb-2" htmlFor="campaignOwner">
                                Campaign Owner:
                            </label>
                            <input
                                className="appearance-none text-sm rounded-lg border border-solid border-gray-600 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-white"
                                id="campaignOwner"
                                name="campaignOwner"
                                type="text"
                                value={formData.campaignOwner}
                                onChange={handleChange}
                                placeholder="Enter Campaign Owner"
                                required
                            />
                        </div>
                        <div className="mb-3 md:mb-4">
                            <label className="block text-gray-700 text-sm md:text-md mb-1 md:mb-2" htmlFor="phoneNumber">
                                From Phone Number:
                            </label>
                            <input
                                className="appearance-none text-sm rounded-lg border border-solid border-gray-600 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-white" 
                                id="phoneNumber"
                                name="phoneNumber"
                                type="text"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="Enter Phone Number"
                                required
                            />
                        </div>
                        <div className="mb-3 md:mb-4">
                            <label className="block text-gray-700 text-sm md:text-md mb-1 md:mb-2">Select Audience:</label>
                            <div className="flex flex-wrap">
                                <label className="inline-flex items-center mr-4">
                                    <input
                                        type="radio"
                                        className="form-radio text-green-500"
                                        name="audience"
                                        value="AllContacts"
                                        checked={formData.audience === 'AllContacts'}
                                        onChange={handleChange}
                                    />
                                    <span className="ml-2 text-sm">All Contacts</span>
                                </label>
                            </div>
                        </div>
                        <div className="mb-3 md:mb-4">
                            <label className="block text-gray-700 text-sm md:text-md mb-1 md:mb-2">Groups:</label>
                            <select
                                className="appearance-none text-sm rounded-lg border border-solid border-gray-600 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-white"
                                name="group"
                                value={formData.group}
                                onChange={handleGroupChange}
                            >
                                <option value="">Select Group</option>
                                {groups.map((group, index) => (
                                    <option key={index} value={group.groupname}>{group.groupname}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3 md:mb-4">
                            <label className="block text-gray-700 text-sm md:text-md mb-1 md:mb-2" htmlFor="googleSheetId">
                                Google Sheet ID:
                            </label>
                            <input
                                className="appearance-none text-sm rounded-lg border border-solid border-gray-600 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-white"
                                id="googleSheetId"
                                name="googleSheetId"
                                type="text"
                                value={formData.googleSheetId}
                                onChange={handleChange}
                                placeholder="Enter Google Sheet ID"
                                
                            />
                        </div>
                        <div className="mb-3 md:mb-4">
                            <label className="block text-gray-700 text-sm md:text-md mb-1 md:mb-2" htmlFor="spreadsheetName">
                                Spreadsheet Name:
                            </label>
                            <input
                                className="appearance-none text-sm rounded-lg border border-solid border-gray-600 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-white"
                                id="spreadsheetName"
                                name="spreadsheetName"
                                type="text"
                                value={formData.spreadsheetName}
                                onChange={handleChange}
                                placeholder="Enter Spreadsheet Name"
                               
                            />
                        </div>
                        <div className="mb-3 md:mb-4">
                            <label className="block text-gray-700 text-sm md:text-md mb-1 md:mb-2" htmlFor="googleSheetApiKey">
                                Google Sheet API Key:
                            </label>
                            <input
                                className="appearance-none text-sm rounded-lg border border-solid border-gray-600 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-white"
                                id="googleSheetApiKey"
                                name="googleSheetApiKey"
                                type="text"
                                value={formData.googleSheetApiKey}
                                onChange={handleChange}
                                placeholder="Enter Google Sheet API Key"
                               
                            />
                        </div>
                    </div>
                    {/* Error Message */}
                    <div className="flex items-center justify-center mt-6">
                        <button
                            className="bg-green-700 hover:bg-green-900 text-white flex mb-4 font-bold py-2 px-4 md:px-8 rounded-lg shadow"
                            type="submit"
                        >
                            <RxUpdate className='mx-1 md:mx-2 text-white-500' size={24} /> Create Campaign
                        </button>
                    </div>
                </form>
            </div>
            
            {/* Right side - Templates */}
            <div className="w-full md:w-1/2 shadow-lg bg-white h-auto md:h-[600px] rounded-xl p-4 md:p-8 overflow-y-scroll">
                <CampaignTemplates onSelectTemplate={onSelectTemplate} />
            </div>
        </div>
    );
};

export default CommerceSettings;
