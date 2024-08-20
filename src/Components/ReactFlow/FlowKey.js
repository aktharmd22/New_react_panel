import React, { useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { MdCancel } from "react-icons/md";
import 'reactflow/dist/style.css';
import { PiRadioButton } from "react-icons/pi";
import { RiDeleteBin5Line } from "react-icons/ri";

const rfStyle = {
  backgroundColor: 'white',
  left: 660,
  padding: 8,
  borderStyle: 'solid',
  borderColor: "green",
  borderWidth: 5,
};

const hfStyle = {
  backgroundColor: 'white',
  top: 20,
  padding: 8,
  borderStyle: 'solid',
  borderColor: "green",
  borderWidth: 5,
};


const FlowKey = ({ id, data }) => {
  const [inputBoxes, setInputBoxes] = useState([]);
  const [message, setMessage] = useState('');
  const { setNodes } = useReactFlow();
  const [show, setShow] = useState(false);
  const handleChanges = (event) => {
    setMessage(event.target.value);
    if (data.onChange) {
      data.onChange(id, 'message', event.target.value);
    }
  };

  
  return (
    <div className='bg-[white] rounded-[45px]  p-7 shadow-yellow-900 hover:border-solid hover:border-[4px] hover:border-green-800' >
     
      <div className='flex bg-[#def7ec] border-l-[20px] border-green-500 text-green-500 rounded-[20px] mt-1 mb-2 p-4 w-full'>
        <PiRadioButton className='mt-1 text-4xl' />
        <h3 className='text-center text-4xl mt-2 ml-4 '>Keyword</h3>
      </div>
      <div className='bg-[#eae6df] border-[3px] border-solid border-red-700 rounded-[25px] p-2 mt-5'>
        
        <div className='block bg-gray-200 p-4 rounded-lg relative bottom-19 mt-1'>
        <Handle type="source" position={Position.Left} id={`${id}`} style={hfStyle} />
          <input
            id="w3review"
            name="w3review"
            value={message}
            placeholder='Type Keyword'
            className='rounded-2xl focus:ring-white p-6  text-center text-4xl'
            style={{ border: "none" }}
            onChange={handleChanges}
            required
          />
        </div>
        {inputBoxes.map((inputBox) => (
          <div key={inputBox.id} style={{ marginBottom: '15px' }}>
            {inputBox.component}
          </div>
        ))}
      </div>
     
    </div>
  );
};

export default FlowKey;
