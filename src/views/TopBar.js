import React from 'react';
//import { BiSearchAlt2 } from "react-icons/bi";

const TopBar = ({ open, setOpen }) => {
  return (
    <>
      <nav className={`m-2 rounded ${open && 'bg-[--third]'} duration-500 bg-[--primary] px-4 py-6 flex justify-between sticky top-0 z-10`}>  
        <div className='flex gap-x-5 items-center'>
        
        <div className="px-1 items-center flex text-xl">     
          <span className="text-2xl  text-white">SMART YUPPIES ❤️</span>
          {/* <span className='ml-4 text-lg text-white'>WELCOME TO SMART YUPPIES </span> */}
        </div></div>     
        <div className="flex items-center gap-x-5">
          {/* <form className='w-[240px]  relative'>
            <div className='relative'>
              <input
                type="search"
                placeholder='Search'
                className={`w-full p-4 rounded-full text-lg ${open && 'placeholder-[--third]' }  placeholder-[--primary] focus:outline-none`}
                style={{ '::placeholder': { fontSize: '1.5rem', color: 'Blue' } }}
              />
              <button
                className={`text-xl bg-[--primary] ${!open && 'bg-[--third]'}  text-white absolute right-1 top-1/2 -translate-y-1/2 p-4 rounded-full  transition-transform duration-300 transform hover:scale-110`}
              >
                <BiSearchAlt2 className='text-xl' />
              </button>
            </div>
          </form> */}
          <span className='text-white'>USER BUTTON</span>
        </div>
      </nav>
      
      
    </>
  );
}

export default TopBar;
