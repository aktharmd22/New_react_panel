    import React, { useState } from 'react';
    import { MdModeEdit } from "react-icons/md";
    import { motion } from 'framer-motion';
    import GroupView from './GroupView';
    import GroupAdd from './GroupAdd.js';
    import 'react-toastify/dist/ReactToastify.css';
    import Cookies from 'js-cookie';
    import { message } from 'antd';


    const DropdownMenu = ({ isOpen, toggleDropdown, share ,datas,forceUpdate}) => {
        const chat= Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;


    const [view, setView] = useState(false);
    const [add,setAdd]=useState(false);
    // Animation variants for the dropdown
    const dropdownVariants = {
        hidden: { opacity: 0, scale: 0.95, y: -20 }, // Start from a slightly smaller size and above
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } }
    };

    const handleView = () => {
        setView(!view);
    };
    const handleAdd=()=>
        {
            setAdd(!add);
        }
    const handleDelete = async () => {
        try {
        // Perform your delete API call here
        const response = await fetch('https://ci4backend.smartyuppies.com/GroupController/deleteGroup', {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json'
            // Add any required headers (e.g., authentication headers)
            },
            body: JSON.stringify({
            // Add any parameters required for the delete operation
            username:chat.username,
            group_name: share
            })
        });

        if (!response.ok) {
            message.error('failed to delete');
            throw new Error('Failed to delete item');
        }

        // Optionally handle success response
        message.success('Item deleted successfully');
        console.log('Item deleted successfully');
       
        // Close dropdown or perform any other action after deletion
        // Example: close dropdown after delete
        } catch (error) {
        message.error('failed to delete');
        console.error('Error deleting item:', error);
       
        }
        forceUpdate();
    };
  
    return (
        <>
          
        <div className="relative inline-block text-left">
        
        <button onClick={toggleDropdown} className='bg-white rounded-lg  border-solid border-gray-200 border shadow-lg p-2 text-white focus:outline-none'>
            <MdModeEdit className='text-black' size="18px" />
        </button>
        {isOpen && (
            <motion.div
            initial="hidden"
            animate="visible"
            variants={dropdownVariants}
            className="absolute z-50 top-0 right-10 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-visible"
            >
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <button onClick={handleView} className="block px-4 py-2  w-full text-sm text-gray-700 hover:bg-gray-100">View</button>
                <button  onClick={handleAdd}className="block px-4 py-2  w-full  text-sm text-gray-700 hover:bg-gray-100">Add</button>
                <button onClick={handleDelete} className="block px-4  w-full  py-2 text-sm text-gray-700 hover:bg-gray-100">Delete</button>
            </div>
            </motion.div>
        )}
        {view && (<GroupView onClose={handleView} onClick={share} />)}
        {add &&(<GroupAdd onClose={handleAdd} onClick={datas} share={share}/> )}
        </div>
        </>
    );
    };

    export default DropdownMenu;
