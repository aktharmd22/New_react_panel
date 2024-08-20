import React, { useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { MdCancel } from "react-icons/md";
import 'reactflow/dist/style.css';
import { IoImagesOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";  

const rfStyle = { backgroundColor: 'white', left: 430, padding: 8, borderStyle: 'solid', borderColor: "green", borderWidth: 5 };
const hfStyle = { backgroundColor: 'white', top: 20, padding: 8, borderStyle: 'solid', borderColor: "green", borderWidth: 5 };

function TextUpdaterNode({ data, onRemove, id }) {
  const [text, setText] = useState('');
  const [caption, setCaption] = useState('');

  const handleTextChange = (evt) => {
    const newText = evt.target.value;
    setText(newText);
    if (data.onChange) {
      data.onChange(id, { [`list_title_${id}`]: newText, [`list_description_${id}`]: caption });
    }
  };
  const handleCaptionChange = (evt) => {
    const newCaption = evt.target.value;
    setCaption(newCaption);
    if (data.onChange) {
      data.onChange(id, { [`list_title_${id}`]: text, [`list_description_${id}`]: newCaption });
    }
  };

  return (
    <>
      <button onClick={onRemove} className="text-gray-600 hover:text-red-800 text-4xl mt-5"><MdCancel /></button>
      <div className='bg-white rounded-3xl p-4 shadow-lg mt-5'>
        <div className='block bg-[#eae6df] p-2 rounded-xl relative bottom-19 w-full'>
          <Handle type="source" position={Position.Top} id={`List_id_${id}`} style={rfStyle} />
          <input 
            id="text" 
            name="text" 
            onChange={handleTextChange} 
            value={text} 
            className='rounded-2xl p-10 text-3xl h-[150px] w-full' 
            placeholder='Enter the text' 
          />
          <div className='mt-3'>
            <textarea 
              id="w3review" 
              name="w3review" 
              rows="4" 
              cols="43" 
              placeholder='Description' 
              className='rounded-2xl border-green-600 border-3 text-2xl' 
              style={{ border: "none" }} 
              onChange={handleCaptionChange}
              value={caption}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}

function ListDrag({ id, data }) {
  const [inputBoxes, setInputBoxes] = useState([]);
  const [addButtonDisabled, setAddButtonDisabled] = useState(false);
  const { setNodes } = useReactFlow();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [footer, setFooter] = useState('');
  const [show, setShow] = useState(false);

  const addInputBox = () => {
    const newId = inputBoxes.length + 1;
    setInputBoxes((prevInputBoxes) => [
      ...prevInputBoxes,
      { id: newId, component: <TextUpdaterNode key={newId} id={newId} onRemove={() => removeInputBox(newId)} data={{ onChange: handleListChange }} /> }
    ]);

    if (inputBoxes.length === 9) {
      setAddButtonDisabled(true);
    }
  };

  const removeInputBox = (idToRemove) => {
    setInputBoxes((prevInputBoxes) => prevInputBoxes.filter(({ id }) => id !== idToRemove));
    setAddButtonDisabled(false);
  };

  

  const handleKeywordChange = (event) => {
    setTitle(event.target.value);
    if (data.onChange) {
      data.onChange(id, 'header', event.target.value);
    }
  };

  const handleMessageChange = (event) => {
    setBody(event.target.value);
    if (data.onChange) {
      data.onChange(id, 'body', event.target.value);
    }
  };

  const handleFooterChange = (event) => {
    setFooter(event.target.value);
    if (data.onChange) {
      data.onChange(id, 'footer', event.target.value);
    }
  };
  const handleListChange = (inputId, value) => {
    if (data.onChange) {
      data.onChange(id, inputId, value);
    }
  };
  const shows = () => setShow(true);
  const leave = () => setShow(false);
 const handledeleteNode=()=>
 {
  if (data.onChange) {
    data.onChange(id, 'header', null);
  }if (data.onChange) {
    data.onChange(id, 'body',null);
  }
  if (data.onChange) {
    data.onChange(id, 'footer', null);
  }
  if (data.onChange) {
    data.onChange(id, { [`list_title_`]:null, [`list_description`]:null});
  }
  if (data.onChange) {
    data.onChange(id, { [`list_title_`]: null, [`list_description_`]: null});
  }
  setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id))
 }
  return (
    <div className='relativebg-[#ffffff] rounded-[45px] p-7 shadow-2xl hover:border-solid border-[4px] border-green-600' onMouseOver={shows} onMouseOut={leave}>
      <Handle type="target" position={Position.Left} id="a" className='ml[10px]' style={hfStyle} />

      {show && (
        <button
          onClick={handledeleteNode}
          className="absolute right-0 top-0 text-black text-lg  rounded-full p-14 bg-white shadow-2xl hover:text-red-800">
        
          <RiDeleteBin5Line className='text-gray-600 hover:text-red-500' style={{ fontSize: 50 }} />
        </button>
      )}

      <div className='flex bg-[#def7ec] border-l-[20px] border-green-500 text-green-500 rounded-[20px] mt-1 mb-2 p-4 w-full'>
        <IoImagesOutline className='mt-5 text-4xl' />
        <h3 className='text-center text-[40px] mt-2 ml-4'> List</h3>
      </div>

      <div className='bg-[#eae6df] border-[4px] border-solid border-red-600 rounded-[25px] p-3 mt-5'>
        <div className='block bg-[#eae6df] p-2 rounded-xl relative bottom-19 w-full'>
          <input 
            type='text' 
            placeholder='Enter a name' 
            className='rounded-2xl p-10 text-3xl h-[150px] w-full' 
            style={{ border: "none" }} 
            value={title} 
            onChange={handleKeywordChange} 
          />
        </div>

        <div className='block bg-[#eae6df] p-2 rounded-xl w-full'>
          <textarea 
            id="w3review" 
            name="w3review" 
            rows="4" 
            cols="36" 
            placeholder='Enter the caption' 
            className='rounded-2xl border-green-600 border-3 text-3xl' 
            style={{ border: "none" }} 
            value={body} 
            onChange={handleMessageChange}
          ></textarea>
        </div>

        <div className='block bg-[#eae6df] p-2 rounded-xl relative bottom-19 w-full'>
          <input
            type="text"
            style={{ border: "none" }}
            className='rounded-2xl p-10 text-3xl h-[150px] w-full' 
            onChange={handleFooterChange}
            value={footer}
            placeholder='Enter the Footer'
          />
        </div>

        {inputBoxes.map(({ id, component }) => (
          <div key={id} style={{ marginBottom: '10px' }}>
            {component}
          </div>
        ))}
      </div>
      
      <button onClick={addInputBox} className='bg-green-500 text-4xl shadow-2xl p-7 rounded-[15px] px-5 mt-6 text-white w-full' disabled={addButtonDisabled}>
        <span className='mr-2'>+</span>Add Button
      </button>
    </div>
  );
}

export default ListDrag;
