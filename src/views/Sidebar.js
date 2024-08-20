import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi'; // Icon for the hamburger menu
const Sidebar = ({ menus }) => {
  const chat = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate('/Logout');
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <section className='flex flex-col text-white text-sm h-full'>
      {/* Hamburger menu for mobile */}
      <div className='bg-[--third] p-3 w-full flex justify-between md:hidden'>
        <div className='flex items-center'>
          <button onClick={toggleSidebar} className='text-white text-2xl'>
            <FiMenu />
          </button>
        </div>
       
      </div>

      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block bg-[--third] h-full p-3 w-16 px-2 custom-scrollbar`} style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {menus?.map((menu) => (
          <React.Fragment key={menu.id}>
            <NavLink
              to={menu.nav}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-500 ease-in-out text-white ${menu.nav === window.location.pathname ? 'bg-[#00a727] text-white' : ''}`}
            >
              <div className='transform'>
                {React.createElement(menu.icon, { size: '21' })}
              </div>
              
            </NavLink>
            <h2 className='whitespace-pre uppercase text-white text-[9px] font-medium  mt-1 text-center'>
          {menu.name}
        </h2>
          </React.Fragment>
          
        ))}
      </div>

      <button onClick={handleLogin} className='w-full mt-auto'>
        <div className='flex items-center p-3 bg-[--primary] w-full transition-all duration-500 ease-in-out'>
          <div className='border rounded-full bg-white border-green-1000 border-2 h-10 text-green-800 text-center text-2xl w-10 flex items-center justify-center'>
            {chat?.username?.charAt(0)}
          </div>
          <div className='ml-2'>
        
           
          </div>
        </div>
      </button>
    </section>
  );
};

export default Sidebar;
