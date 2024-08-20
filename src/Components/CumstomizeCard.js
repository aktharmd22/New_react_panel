import { useState } from 'react';
import { motion } from 'framer-motion';
import { MdDeleteOutline } from "react-icons/md";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { MdOutlineModeEdit } from "react-icons/md";
import CustomizeEdit from './CustimizeTeamEdit';

const Card = ({ id, title, description, imageUrl, remove, forceUpdate }) => {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleEdit = (id) => {
    setShow(true);
    setEdit(id);
  };

  const handleHide = () => {
    setShow(false);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <motion.div
      className="max-w-sm rounded-xl overflow-hidden bg-white shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl relative z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="flex justify-between p-2">
        <button
          className="text-green-700  rounded-full p-1 mr-2 hover:bg-gray-300 transition"
          onClick={() => handleEdit(id)}
        >
          <MdOutlineModeEdit size={24} />
        </button>
        <button
          className=" text-green-700 rounded-full p-1 hover:bg-gray-300 transition"
          onClick={() => remove(id)}
        >
          <MdDeleteOutline size={20} />
        </button>
      </div>
      <div className="flex justify-center "> {/* Centering container */}
    <motion.img
      className="object-cover h-48 w-48 rounded-full"
      src={imageUrl}
      alt="Profile"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
    />
  </div>
      <div className="px-6 py-4">
        <div className="mb-2 text-center">
          <h3 className="text-md text-gray-700 font-poppins">User Name : {title}</h3>
        </div>
        <div className="text-center">
          <h3 className="text-md flex text-gray-700 items-center font-poppin justify-center">
            Password : {passwordVisible ? description : '********'}
            <button onClick={togglePasswordVisibility} className="ml-2">
              {passwordVisible ? <FaEye className="text-gray-500" /> : <FaEyeSlash className="text-gray-500" />}
            </button>
          </h3>
        </div>
      </div>
      {show && <div className='w-screen'><CustomizeEdit edit={edit} title={title} description={description} show={handleHide} forceUpdate={forceUpdate} /></div>}
    </motion.div>
  );
};

export default Card;
