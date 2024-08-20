import React, { useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { IoLocationOutline } from "react-icons/io5";
import 'reactflow/dist/style.css';
import { RiDeleteBin5Line } from "react-icons/ri";  

const hfStyle = { backgrxoundColor: 'white', top: 20, padding: 8, borderStyle: 'solid', borderColor: "green", borderWidth: 5 };

function  Location({ id, data }) {
  const [inputBoxes, setInputBoxes] = useState([]);
  const { setNodes } = useReactFlow();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [footer, setFooter] = useState('');
  const [longitude, setLongitude] = useState('');

  const [show, setShow] = useState(false);

 
  const handleListChange = (e) => {
    setLongitude(e.target.value)
    if (data.onChange) {
      data.onChange(id, "longitude",e.target.value);
    }
  };

  const handleKeywordChange = (event) => {
    setTitle(event.target.value);
    if (data.onChange) {
      data.onChange(id, 'latitude', event.target.value);
    }
  };

  const handleMessageChange = (event) => {
    setBody(event.target.value);
    if (data.onChange) {
      data.onChange(id, 'location_name', event.target.value);
    }
  };

  const handleFooterChange = (event) => {
    setFooter(event.target.value);
    if (data.onChange) {
      data.onChange(id, 'location_address', event.target.value);
    }
  };

  const shows = () => setShow(true);
  const leave = () => setShow(false);
 const handledeleteNode=()=>
 {
  if (data.onChange) {
    data.onChange(id, 'location_name',null);
  }
  if (data.onChange) {
    data.onChange(id, 'location_address', null);
  }
  if (data.onChange) {
    data.onChange(id, 'latitude',null);
  }
  if (data.onChange) {
    data.onChange(id, "longitude",null);
  }
  setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id))
 }
  return (
    <div className='bg-[#ffffff] rounded-[45px] p-10 shadow-2xl hover:border-solid border-[4px] border-green-600' onMouseOver={shows} onMouseOut={leave}>
      <Handle type="target" position={Position.Left} id="AddImage_Handle_key" className='ml[10px]' style={hfStyle} />

      {show && (
        <div className=''>

        <button
          onClick={handledeleteNode}
          className="absolute right-0 top-0 text-black text-lg  rounded-full p-14 bg-white shadow-2xl hover:text-red-800">
        
          <RiDeleteBin5Line className='text-gray-600 hover:text-red-500' style={{ fontSize: 50 }} />
        </button>
        </div>
      )}

      <div className='flex bg-[#def7ec] border-l-[20px] border-green-500 text-green-500 rounded-[20px] mt-2 mb-2 p-4 w-full'>
        <IoLocationOutline className='mt-5 text-4xl' />
        <h3 className='text-center text-[40px] mt-2 ml-4'> Location</h3>
      </div>

      <div className='bg-[#eae6df] border-[4px] border-solid border-red-600 rounded-[25px] p-3 mt-5'>
        <div className='block bg-[#eae6df] p-2 rounded-xl relative bottom-19 w-full'>
          <input 
            type='text' 
            placeholder='Enter a longitude' 
            className='rounded-2xl p-10 text-3xl h-[150px] w-full' 
            style={{ border: "none" }} 
            value={longitude} 
            onChange={handleListChange} 
          />
        </div>
        <div className='block bg-[#eae6df] p-2 rounded-xl relative bottom-19 w-full'>
          <input 
            type='text' 
            placeholder='Enter a Latitude' 
            className='rounded-2xl p-10 text-3xl h-[150px] w-full' 
            style={{ border: "none" }} 
            value={title} 
            onChange={handleKeywordChange} 
          />
        </div>  
        <div className='block bg-[#eae6df] p-2 rounded-xl relative bottom-19 w-full'>
          <input
            type="text"
            style={{ border: "none" }}
            className='rounded-2xl p-10 text-3xl h-[150px] w-full' 
            onChange={handleFooterChange}
            value={footer}
            placeholder='Enter the Name'
          />
        </div>
        <div className='block bg-[#eae6df] p-2 rounded-xl w-full'>
          <textarea 
            id="w3review" 
            name="w3review" 
            rows="4" 
            cols="36" 
            placeholder='Enter the Address' 
            className='rounded-2xl border-green-600 border-3 text-3xl' 
            style={{ border: "none" }} 
            value={body} 
            onChange={handleMessageChange}
          ></textarea>
        </div>
        {inputBoxes.map(({ id, component }) => (
          <div key={id} style={{ marginBottom: '10px' }}>
            {component}
          </div>
        ))}
      </div>
      
      
    </div>
  );
}

export default Location;
