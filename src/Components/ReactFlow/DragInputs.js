import React, { useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { MdCancel } from "react-icons/md";
import { PiRadioButton } from "react-icons/pi";
import { RiDeleteBin5Line } from "react-icons/ri";
import 'reactflow/dist/style.css';

// Define styles for handles
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
// TextUpdaterNode Component
const TextUpdaterNode = ({ data, onRemove, id, type, onChangeType, showSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedType, setSelectedType] = useState(type);
  const[idshow,setidshow]=useState(true);
  const onChange = (evt) => {
    if (data.onChange) {
      data.onChange(id, evt.target.value);
    }
  }; 
  if(selectedType && (id===2 || id===3))
  {
    setidshow(false)
  }
  const handleTypeChange = (e) => {
    if (!showSelect) {
      alert('Select option is only available for the first button.');
      return;
    }
    const newType = e.target.value;
    setSelectedType(newType);
    const defaultValue = getDefaultValue(newType);
    setInputValue(defaultValue);
    onChangeType(id, newType, defaultValue);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onChangeType(id, selectedType, value);
  };

  const getDefaultValue = (type) => {
    switch (type) {
      case 'url': return 'https://';
      case 'call': return 'tel:';
      case 'email': return 'mailto:';
      case 'whatsapp': return 'https://wa.me/';
      default: return '';
    }
  };
  return (
    <div>
      <button onClick={onRemove} className="text-gray-600  mt-4 hover:text-red-800 text-5xl">
        <MdCancel />
      </button>
      <div className='bg-white rounded-3xl p-4 shadow-lg mt-5'>
        <div className='block bg-[#eae6df] p-2 rounded-xl relative bottom-19 w-full'>
          <Handle type="source" position={Position.Top} id={`button_id_${id}`} style={rfStyle} />
        {idshow && (<input
            id="text"
            name="text"
            onChange={onChange}
            className='rounded-2xl p-20 text-4xl w-full'
            placeholder='Enter the text'
          />)}
          {showSelect && (
            <select
              onChange={handleTypeChange}
             className='rounded-2xl p-20 text-4xl w-full'
              value={selectedType}
            >
              <option value="">Select type</option>
              <option value="url">URL</option>
              <option value="call">Call</option>
              <option value="email">Email</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          )}
          {selectedType && (
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
               className='rounded-2xl p-20 text-4xl w-full'
              placeholder={`Enter ${selectedType} value`}
            />
          )}
        </div>
      </div>
    </div>
  );
};
// NodeContainer Component
const NodeContainer = ({ id, data }) => {
  const [inputBoxes, setInputBoxes] = useState([]);
  const [message, setMessage] = useState("");
  const { setNodes } = useReactFlow();
  const [show, setShow] = useState(false);
  const [button,setButton]=useState();
  const [buttonTypeSelected, setButtonTypeSelected] = useState(null);
  const MAX_INPUT_BOXES = 3;
  const addInputBox = () => {
    if (inputBoxes.length >= MAX_INPUT_BOXES) {
      alert('Maximum number of input boxes reached.');
      return;
    }
    if (buttonTypeSelected) {
      alert('Button type is already selected. Please remove it before adding new buttons.');
      return;
    }
    const newId = inputBoxes.length + 1;
    setInputBoxes((prevInputBoxes) => [
      ...prevInputBoxes,
      {
        id: newId,
        type: '', 
        component: (
          <TextUpdaterNode
            key={newId}
            id={newId}
            onRemove={() => removeInputBox(newId)}
            data={{ onChange: handleTextChange }}
            onChangeType={handleTypeChange}
            type=''
            showSelect={inputBoxes.length === 0}
          />
        )
      }
    ]);
  };

  const removeInputBox = (idToRemove) => {
    if (data.onChange) {
      data.onChange(id, 'button_type',null)
      data.onChange(id, 'button_value',null);
    }
    if (data.onChange) {
      data.onChange(id, 'button_' ,null);
    }
    setInputBoxes((prevInputBoxes) => {
      const updatedInputBoxes = prevInputBoxes.filter(({ id }) => id !== idToRemove);
      // Reset button type selection if all buttons of that type are removed
      const remainingTypes = new Set(updatedInputBoxes.map(box => box.type));
      if (remainingTypes.size === 0) {
        setButtonTypeSelected(null);
      }
      return updatedInputBoxes;
    });
  };
  const handleTextChange = (inputId,value) => {
    console.log("buttonvalue",value)
    setButton(value)
    if (data.onChange) {
      data.onChange(id, 'button_' + inputId,button);
    }
  };
  const handleChanges = (event) => {
    setMessage(event.target.value);
    if (data.onChange) {
      data.onChange(id, 'message', message);
    }
  };
  const handleTypeChange = (id, type, value) => {
    if (inputBoxes.length >= MAX_INPUT_BOXES) {
      alert('Cannot select button type. Maximum number of input boxes reached.');
      return;
    }
    setButtonTypeSelected(type); // Set state based on the selected type
    setInputBoxes((prevInputBoxes) =>
      prevInputBoxes.map((box) =>
        box.id === id ? { ...box, type, value } : box
      )
    );
    // Notify parent component of type change
    if (data.onChange) {
      data.onChange(id, 'button_type', type);
      data.onChange(id, 'button_value', value);
    }
  };
  const shows = () => { setShow(true); }
  const leave = () => { setShow(false); }
 const handledeleteNode=()=>
 {
  setMessage('');
    if (data.onChange) {
      data.onChange(id, 'message', null);
    }
    if (data.onChange) {
      data.onChange(id, 'button_type',null)
      data.onChange(id, 'button_value',null);
    }
    if (data.onChange) {
      data.onChange(id, 'button_' ,null);
    }
  setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id))
 }
  return (
    <div className=' relative bg-[white] rounded-[45px] p-7 shadow-2xl hover:border-solid hover:border-[4px] hover:border-green-600 ' onMouseOver={shows} onMouseOut={leave}>
      {show && (

        <div className=''>
        <button
          onClick={handledeleteNode}
          className="absolute right-0 top-0 text-black text-lg  rounded-full p-14 bg-white shadow-2xl hover:text-red-800">
          <RiDeleteBin5Line className='text-gray-600 hover:text-red-800' style={{ fontSize: 40 }} />
        </button>
        </div>
      )}
      <div className='flex bg-[#def7ec] border-l-[20px] border-green-500 text-green-500 rounded-[20px] mt-1 mb-2 p-4 w-full'>
        <PiRadioButton className='mt-1 text-4xl' />
        <h3 className='text-center text-4xl mt-2 ml-4'>Text Button</h3>
      </div>
      <div className='bg-[#eae6df] border-[3px] border-solid border-red-700 rounded-[25px] p-2 mt-5'>
        <Handle type="target" position={Position.Left} id={`${id}`} style={hfStyle} />
        <div className='block bg-gray-200 p-4 rounded-lg relative bottom-19 mt-1'>
          <textarea
            id="w3review"
            name="w3review"
            rows="6"
            cols="50"
            value={message}
            placeholder='message'
            className='rounded-2xl border-green-600 border-3 text-4xl'
            style={{ border: "none" }}
            onChange={handleChanges}
          ></textarea>
          {inputBoxes.map(({ id, component }) => (
            <div key={id} style={{ marginBottom: '15px' }}>
              {component}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={addInputBox}
        className='bg-white text-black shadow-2xl mt-4 text-4xl p-7 rounded-lg px-5 mt-6 w-full'
        disabled={inputBoxes.length >= MAX_INPUT_BOXES}
      >
        <span className='mr-4'>+</span> Add Button
      </button>
    </div>  
  );
};
export default NodeContainer;
