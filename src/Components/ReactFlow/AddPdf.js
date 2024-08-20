import React, { useState, useRef } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { MdCancel } from "react-icons/md";
import 'reactflow/dist/style.css';
import { ImFilePdf } from "react-icons/im";
import { FaImage } from 'react-icons/fa6';
import { RiDeleteBin5Line } from "react-icons/ri";

const rfStyle = {
  backgroundColor: 'white',
  left: 500,
  top: 10,
  padding: 8,
  borderStyle: 'solid',
  borderColor: 'green',
  borderWidth: 5,
};

const hfStyle = {
  backgroundColor: 'white',
  top: 8,
  padding: 8,
  borderStyle: 'solid',
  borderColor: 'green',
  borderWidth: 5,
};

function TextUpdaterNode({ data, onRemove, id, onTypeChange, showSelect, onPrifix }) {
  const [type, setType] = useState('');
  const [prefix, setPrefix] = useState('');
  const [textValue, setTextValue] = useState('');

  const onChange = (evt) => {
    const newValue = evt.target.value;
    setTextValue(newValue);
    if (data.onChange) {
      data.onChange(id, newValue );
    }
  };

  const handlePrefixChange = (e) => {
    const newPrefix = e.target.value;
    setPrefix(newPrefix);
    if (data.onChange) {
      onPrifix(id, textValue, newPrefix);
    }
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setType(newType);
    onTypeChange(id, newType, prefix);

    switch (newType) {
      case 'url':
        setPrefix('https://');
        break;
      case 'call':
        setPrefix('tel:');
        break;
      case 'email':
        setPrefix('mailto:');
        break;
      case 'whatsapp':
        setPrefix('https://wa.me/:');
        break;
      default:
        setPrefix('');
        break;
    }
  };

  return (
    <>
      <button onClick={onRemove} className="text-gray-600 hover:text-red-800 text-4xl mt-5">
        <MdCancel />
      </button>
      <div className='bg-white rounded-3xl p-4 shadow-lg mt-5'>
        <div className='block bg-[#eae6df] p-2 rounded-xl relative bottom-19 w-full'>
          <Handle type="source" position={Position.Left} id={`button_id_${id}`} style={rfStyle} />
          <input
            id="text"
            name="text"
            value={textValue}
            onChange={onChange}
            className='rounded-2xl p-10 text-2xl w-full'
            placeholder='Enter the text'
          />
          {showSelect && (
            <select
              onChange={handleTypeChange}
               className='rounded-2xl p-10 text-2xl w-full'
              value={type}
            >
              <option value="">Select type</option>
              <option value="url">URL</option>
              <option value="call">Call</option>
              <option value="email">Email</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          )}
          {prefix && (
            <div className='mt-2'>
              <input
                type="text"
                value={prefix}
                onChange={handlePrefixChange}
                className='rounded-2xl p-10 text-2xl w-full'
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function AddPdf({ id, data }) {
  const [inputBoxes, setInputBoxes] = useState([]);
  const [addButtonDisabled, setAddButtonDisabled] = useState(false);
  const { setNodes } = useReactFlow();
  const [keyword, setKeyword] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [show, setShow] = useState(false);
  const [selectAdded, setSelectAdded] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const addInputBox = () => {
    if (selectAdded) {
      alert('Please select an option from the dropdown before adding more buttons.');
      return;
    }

    const newId = inputBoxes.length + 1;
    setInputBoxes((prevInputBoxes) => [
      ...prevInputBoxes,
      {
        id: newId,
        component: (
          <TextUpdaterNode
            key={newId}
            id={newId}
            onRemove={() => removeInputBox(newId)}
            data={{ onChange: handleTextChange }}
            onTypeChange={handleTypeChange}
            showSelect={inputBoxes.length === 0}
            onPrifix={handleprifix}
          />
        )
      }
    ]);

    if (inputBoxes.length >= 2) {
      setAddButtonDisabled(true);
    }
  };

  const removeInputBox = (idToRemove) => {
    if (data.onChange) {
      data.onChange(id, `button_`, null);
    }
    if (data.onChange) {
      data.onChange(id, 'button_value', null);
    }
    if (data.onChange) {
      data.onChange(id, 'button_type',null);
    }
    setInputBoxes((prevInputBoxes) => prevInputBoxes.filter(({ id }) => id !== idToRemove));
    setAddButtonDisabled(false);
  };

  const handleTextChange = (inputId, value) => {
    if (data.onChange) {
      data.onChange(id, `button_${inputId}`, value);
    }
  };

  const handleTypeChange = (id, type, datas) => {
    if (data.onChange) {
      data.onChange(id, 'button_type', type);
    }
    setSelectAdded(type !== '');
  };

  const handleprifix = (id, types, prefix) => {
    if (data.onChange) {
      data.onChange(id, 'button_value', prefix);
    }
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
    if (data.onChange) {
      data.onChange(id, 'document_name', event.target.value);
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
    if (data.onChange) {
      data.onChange(id, 'document_caption', event.target.value);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      if (data.onChange) {
        data.onChange(id, 'uploaded_file_url', base64String);
      }
    };
    reader.readAsDataURL(file);
  };

  const Show = () => {
    setShow(true);
  };

  const Leave = () => {
    setShow(false);
  };
  const handledeleteNode=()=>
  {
    if (data.onChange) {
      data.onChange(id, 'button_value', null);
    }
    if (data.onChange) {
      data.onChange(id, 'button_type', null);
    }
    if (data.onChange) {
      data.onChange(id, `button`, null);
    }
    if (data.onChange) {
      data.onChange(id, 'document_name',null);
    }
    if (data.onChange) {
      data.onChange(id, 'uploaded_file_url',null);
    }
    if (data.onChange) {
      data.onChange(id, 'document_caption',null);
    }
    setNodes(prevNodes => prevNodes.filter((node) => node.id !== id))
  }
  return (
    <div
      className=' relative bg-[#ffffff]  rounded-[45px] p-7 shadow-2xl group hover:border-solid border-[4px] border-green-600'
      onMouseOver={Show}
      onMouseOut={Leave}
    >
      <Handle type="target" position={Position.Left} id="media_node" className='ml[10px]' style={hfStyle} />
     
      {show && (
        <div className='group-hover:translate-x-24 group-hover:transition duration-700 ease-in-out'>

        <button
          onClick={handledeleteNode}
          className="absolute right-0 top-0 text-black text-lg  rounded-full p-14 bg-white shadow-2xl hover:text-red-800">
        
          <RiDeleteBin5Line className='text-gray-600 hover:text-red-500' style={{ fontSize: 50 }} />
        </button>
        </div>
      )}
      <div className='flex bg-[#def7ec] border-l-[20px] border-green-500 text-green-500 rounded-[20px] mt-1 mb-2 p-4 w-full'>
        <ImFilePdf className='mt-5 text-4xl' />
        <h3 className='text-center text-[40px] mt-2 ml-4'>Media</h3>
      </div>

      <div className='bg-[#eae6df] border-[3px] border-solid border-red-600 rounded-[25px] p-3 mt-5'>
        <div className='block bg-[#eae6df] p-2 rounded-xl w-full'>
          <input
            type='text'
            placeholder='Enter a name'
            className='rounded-2xl p-10 text-3xl h-[150px] w-full'
            style={{ border: "none" }}
            value={keyword}
            onChange={handleKeywordChange}
          />
        </div>

        <div className='block bg-[#eae6df] p-2 rounded-xl mt-4 w-full'>
          <input
            type='text'
            placeholder='Enter a message'
            className='rounded-2xl p-10 text-3xl h-[150px] w-full'
            style={{ border: "none" }}
            value={message}
            onChange={handleMessageChange}
          />
        </div>

        <div className='bg-white p-5 mt-5  rounded-3xl'>
        <div className='p-5 ] rounded-2xl h-[350px] text-center'>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          {file ? (
            <img
              src={URL.createObjectURL(file)}
              alt="Uploaded"
              className="rounded-2xl mx-auto"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          ) : (
            <>
              <button
                onClick={handleButtonClick}
                className=" hover:text-gray-800 text-4xl"
              >
                <FaImage className='text-6xl mx-auto  text-black mt-[100px]' />
              </button>
              <p className="mt-2 text-3xl text-gray-500">+Upload a file</p>
            </>
          )}
        </div>
      </div>
        {inputBoxes.map(({ id, component }) => (
          <div key={id}>{component}</div>
        ))}
      </div>
      <button
          onClick={addInputBox}
          className='bg-white text-black shadow-2xl mt-4 text-4xl p-7 rounded-lg px-5 mt-6 w-full'
          disabled={addButtonDisabled}
        >
          Add Input Box
        </button>
    </div>
  );
}

export default AddPdf;
