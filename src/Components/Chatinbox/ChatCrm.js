import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import AddNewContact from './Add_newContact'

function Breadcrumb({ open, menus }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [overdata, setOverdata] = useState([]);
  const [histrydata, setHistrydata] = useState([]);
  const [todaysdata, setTodaysdata] = useState([]);
  const[addContacts,setAddContacts]=useState(false);
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((x) => x);
  const [breadCrumbPath, setBreadCrumbPath] = useState("");
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)'
  });
  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('https://ci4backend.smartyuppies.com/ChatInbox/todayRecords/today');
        const result = await response.json();
        setTodaysdata(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('https://ci4backend.smartyuppies.com/ChatInbox/overdueRecords/overdue');
        const result = await response.json();
        setOverdata(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      let newPath = "";
      pathnames.forEach((name, index) => {
        newPath += `/${name}`;
        if (index === pathnames.length - 1) {
          setBreadCrumbPath(newPath);
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [pathnames]);

  const handleOverDue = () => {
    navigate('/OverDue')

  };

  const handleTodayCallBack = () => {
    navigate('/TodaysCallback')
  };

  const handleFetureCallback = () => {
    navigate('/FetureCallBack')
  };
  const  handleHistory = () => {
    navigate('/History')
  };
  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('https://ci4backend.smartyuppies.com/ChatInbox/futureRecords/future');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('https://ci4backend.smartyuppies.com/ChatInbox/historyRecords/closed');
        const result = await response.json();
        setHistrydata(result); // Adjust according to your data structure
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const handleAddContact=()=>
  {
    setAddContacts(!addContacts)
  }
  return (

    <div className="mb-2">
     
      <div className="mx-4  px-2 relative text-black duration-500 my-5 py-4 flex md:justify-around flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center font-semibold">
       <div className='relative '>
        <button className="bg-green-600 text-white px-4 font-poppins  py-3 sm:text-sm rounded" onClick={handleOverDue}>
          OverDue<span className='text-sm absolute animate-bounce  font-poppins  top-0   text-green-600 bg-white shadow-xl w-[22px] h-[22px]  rounded-full'>{overdata?.count}</span>
        </button>
        </div>
        <div className='relative'>
        <button className="bg-green-600 text-white font-poppins  px-4 py-3 sm:text-sm rounded" onClick={handleFetureCallback}>
          FutureCallback<span className='text-sm animate-bounce  font-poppins absolute top-0 text-green-600 bg-white shadow-xl w-[22px] h-[22px]  rounded-full'>{data?.count}</span>
        </button>
        </div>
        <div className='relative'>
        <button className="bg-green-600 text-white px-4 font-poppins    py-3 sm:text-sm rounded" onClick={handleTodayCallBack}>
          TodaysCallback<span className='text-sm animate-bounce  font-poppins absolute top-0 text-green-600 bg-white shadow-xl w-[22px] h-[22px]  rounded-full'>{todaysdata?.count}</span>
        </button>
        </div>
        <div className='relative'>
        <button className="bg-green-600 text-white font-poppins   px-4 py-3  sm:text-sm rounded" onClick={handleHistory}>
          Task Completed <span className='text-sm animate-bounce  font-poppins absolute top-0 text-green-600 bg-white shadow-xl  w-[22px] h-[22px]  rounded-full'>{histrydata?.count}</span>
        </button>
        </div>
        
        <button className="bg-green-600 text-white font-poppins flex   px-4 py-3  sm:text-sm rounded" 
        onClick={handleAddContact}
      >
        <MdKeyboardDoubleArrowDown size={24} />
        <span className="ml-2">Add New Contact</span>
      </button>
      {addContacts && (
        <div className="px-6 mt-2">
          <AddNewContact onClose={handleAddContact} />
        </div>
      )}
      </div>
    </div>
  );
}

export default Breadcrumb;
