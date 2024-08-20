import { useCallback, useState, useRef } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, MiniMap, Controls, Background,BackgroundVariant } from 'reactflow';
import 'reactflow/dist/style.css';
import AddPdf from './AddPdf';
import NodeContainer from './DragInputs';
import { GiClick } from 'react-icons/gi';
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import CustomEdge from './CustomEdge';
import ConnectionLine from '../ConnectLine';
import { FaListUl } from "react-icons/fa";
import ListDrag from './ListDrag';
import FlowKey from './FlowKey'
import Location from './FlowLocation'
import { MdLocationPin } from "react-icons/md";
import { MdOutlinePermMedia } from "react-icons/md";
import Swal from 'sweetalert2';
import { useNavigate, } from 'react-router-dom';
import Cookies from 'js-cookie';



const userData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;

const rfStyle = {
  backgroundColor: 'white',
 padding:10,
 color:"balck",
};

 // Initialize with an empty array

const nodeTypes = { nodeContainer: NodeContainer,  addPdf: AddPdf, listDrag: ListDrag,flowKey:FlowKey,location:Location};
const edgeTypes = {
  customEdge: CustomEdge, // Match the type here with the one you're using in addEdge
};

function Flow() {
  const navigate=useNavigate()
  const initialNodes = [{id:"0",
    type: 'flowKey',
    position: { x: Math.random() * 250, y: Math.random() * 250 },
    data: { onChange: (nodeId, inputType, value)=>{ setFlowKey((prevValues) => ({
      ...prevValues,
        [inputType]: value,
  
    }));} }}];
  const [nodes, setNodes] = useState(initialNodes); // Start with an empty nodes array
  const [edges, setEdges] = useState([]);
  const [inputpdf, setInputpdf] = useState({});
  const [inputButton, setInputButton] = useState({});
  const [list, setInputList] = useState({});
  const [flowName, setFlowName] = useState();
  const [flowKey, setFlowKey] = useState({});
  const [location, setLocation] = useState({});



  const [draggingEnabled, setDraggingEnabled] = useState(true);
  const sidebarRef = useRef(null);
  const extractConnectionData = () => {
    return edges.map((edge) => ({
      source_node_id: edge.source,
      button_id: edge.sourceHandle,
      target_node_id: edge.target,
      button_ids: edge.targetHandle,
    }));
  };
  
  const connectionData = extractConnectionData();
  const {message}=flowKey
  const combinedArray =  [
    {username:userData.username,phone_number_id:userData.phone_number_id},
    {Type:"flow_name",flow_start_keyword:message,flow_name:flowName},
    { Type: 'Document', data: inputpdf },
    { Type:"Text" ,data: inputButton},
    { Type: 'List', data: list  },
    { Type: 'Location', data: location  },
    { Type: 'Connection', data: connectionData  },
  ];
  const handleFlowName=(e)=>
  {
    setFlowName(e.target.value)
  }
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge({ ...connection, type: 'customEdge', animated: "true" }, eds)),
    [setEdges]
  );
  
 
  const handleSidebarItemClick = () => {
    const newNode = {
      id: (nodes.length).toString(),
      type: 'nodeContainer',
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: { onChange: handletextButtons },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };
  
  const handleSidebarImgDocument = () => {
    const newNode = {
      id: (nodes.length).toString(),
      type: 'addPdf',
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: { onChange: handleimageChange },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const handleSidebarList = () => {
    const newNode = {
      id: (nodes.length ).toString(),
      type: 'listDrag',
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data:{onChange:handleListDrag}
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };
  const handleSideLocation = () => {
    const newNode = {
      id: (nodes.length).toString(),
      type: 'location',
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: { onChange: handleLocate },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };
  const toggleDraggingEnabled = () => {
    setDraggingEnabled(!draggingEnabled);
  };

 
 
  const handleimageChange = (nodeId,inputType, value) => {
    setInputpdf((prevValues) => ({
      ...prevValues,
      [nodeId]: {
        ...prevValues[nodeId],
        [inputType]: value,
      },
    }));
  };
  const handleListDrag = (nodeId, inputType, value) => {
    setInputList((prevValues) => ({
      ...prevValues,
      [nodeId]:{
        ...prevValues[nodeId],
        [inputType]: value, 
      },
    }));
  };
  const handletextButtons = (nodeId, inputType, value) => {
    setInputButton((prevValues) => ({
      ...prevValues,
      [nodeId]:{
        ...prevValues[nodeId],
        [inputType]: value,
      },
    }));
  };
  const handleLocate = (nodeId,inputType, value) => {
    setLocation((prevValues) => ({
      ...prevValues,
      [nodeId]:{
        ...prevValues[nodeId],
        [inputType]: value,
      },
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log('Image_&_button:', JSON.stringify(combinedArray, null, 2));
  
    if (flowKey) {
      try {
        const response = await fetch('https://ci4backend.smartyuppies.com/ChatFlow/insertKeyword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "data": combinedArray })
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log('Success:', data);
  
        // Show the appropriate Swal alert based on the response
        Swal.fire({
          icon: data.status === "success" ? 'success' : 'error',
          title: data.message,
          showConfirmButton: false,
          timer: 2000,
        });
  
        if (data.status === "success") {
          navigate('/FlowEdit');
        }
  
      } catch (error) {
        console.error('Error:', error);
  
        // Show an error alert in case of an exception
        Swal.fire({
          icon: 'error',
          title: 'An error occurred',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } else {
      // Show an alert if no flowKey is present
      Swal.fire({
        icon: 'error',
        title: "Enter a value in the input fields",
        showConfirmButton: false,
        timer: 2000,
      });
      console.log("Enter a value");
    }
  };
  
   
  return (
    
    <div className="flex h-screen w-full bg-white">



      <div
        ref={sidebarRef}
        className="bg-white p-4 flex flex-col rounded-lg"
        style={{
          width: draggingEnabled ? '120px' : '20px',
          height: draggingEnabled ? '90%' : '90%',
         
          transition: 'width 0.5s ease-in-out',
        }}
      >
        <div className="flex items-center mb-4  rounded-2xl">
          <button
            onClick={toggleDraggingEnabled}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            {draggingEnabled ? (
              <MdOutlineKeyboardDoubleArrowLeft className="ml-8 text-black bg-white border-soild border-gray-200 border  shadow-lg rounded-full text-4xl" />
            ) : (
              <MdOutlineKeyboardDoubleArrowRight className="relative right-2  bg-white border-soild border-gray-200 border  bottom-1 right-7 text-4xl rounded-full text-black" />
            )}
          </button>
        </div>
        <div
          className={`flex-grow overflow-y-auto ${draggingEnabled ? 'opacity-100' : 'opacity-0'} transition-opacity`}
        > 
        <div >
         
         
          <div
            className="bg-white rounded-lg shadow-xl p-2 mt-3  cursor-pointer border-solid border-2 border-gray-200"
            onClick={handleSidebarItemClick}
          >
            <GiClick className="text-center ml-5 text-green-700 mx-20" />
            <p className="text-center text-sm mt-1 text-gray-600">Text</p>
            
          </div>
        
          <div
            className="bg-white rounded-lg shadow-lg p-2 mt-3  cursor-pointer border-solid border-2 border-gray-200"
            onClick={handleSidebarImgDocument}
          >
            <MdOutlinePermMedia className="text-center ml-5 text-green-700" />
            <p className="text-center text-sm mt-1 font-poppins text-gray-600">Media</p>
            
          </div>
          <div
            className="bg-white rounded-lg shadow-lg p-2 mt-3  cursor-pointer border-solid border-2 border-gray-200"
            onClick={handleSidebarList}
          >
            <FaListUl className="text-center ml-5 text-green-700" />
            <p className="text-center text-sm mt-1 text-gray-600">List</p>
            
           
           
          </div>
          <div
            className="bg-white rounded-lg shadow-lg p-2 mt-3  cursor-pointer border-solid border-2 border-gray-200"
            onClick={handleSideLocation}
          >
            <MdLocationPin className="text-center ml-5 text-green-700" />
            <p className="text-center text-sm mt-1 text-black">Location</p>
          </div>
          <div>
          </div>
        </div>
        </div>
      </div>
      
      <div className="flex-grow  w-full " style={{height:"87%"}}>
   <div className='flex  w-full h-14 bg-white border-dashed border-b border-gray-400'>
   <div className='mb-2'>
          <input type="text" className='  border-2 border-black border-solid mt-2 rounded-lg' placeholder='name the flow' required  onChange={handleFlowName}/>
      </div>
      <div className='ml-16'>
            <button
                onClick={handleSubmit}
                className=" mt-1  bg-green-500 text-white px-14 py-3 hover:bg-green-800 rounded font-poppins  "
              >
                Save Flow
              </button>
              </div>
            <div className='ml-30'>
            </div>
  </div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          animated={true}
          minZoom={0}
          fitView
          fitViewOptions={{
            padding: 2.5,
            
          }}
          connectionLineComponent={ConnectionLine}
        >
          <MiniMap />
          <Controls />
          <Background size={3} gap={30}style={rfStyle} variant={BackgroundVariant.Dots }  />
        </ReactFlow>
       
      </div>
    </div>
 
  );
}

export default Flow;