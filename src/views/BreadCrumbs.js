import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

function Breadcrumb({ open, menus = [] }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [histrydata, setHistrydata] = useState([]);

  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((x) => x);

  const isMobile = useMediaQuery({
    query: '(max-width: 768px)'
  });

  const handleCampaign = () => {
    navigate('/Campaigns');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const futureResponse = await fetch('https://ci4backend.smartyuppies.com/ChatInbox/futureRecords/future');
        const futureResult = await futureResponse.json();
        setData(futureResult);

        const historyResponse = await fetch('https://ci4backend.smartyuppies.com/ChatInbox/historyRecords/closed');
        const historyResult = await historyResponse.json();
        setHistrydata(historyResult); // Adjust according to your data structure
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative m-2">
      <div className="mx-4 bg-white rounded-lg px-2 font-poppins text-black duration-500 my-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className={`text-[25px] ${isMobile && open ? 'hidden' : ''} flex flex-wrap gap-x-2 items-center`}>
          {pathnames.map((name, index) => {
            const isLast = index === pathnames.length - 1;
            const cleanName = name.replace(/[^\w\s]/gi, ' '); // Remove special characters
            const menu = menus.find((menu) => menu.name.toLowerCase() === cleanName.toLowerCase());

            const displayName = menu ? menu.name : cleanName; // Use menu name if available, otherwise fallback to the cleaned name

            return isLast ? (
              <span key={index} className="uppercase ">{displayName}</span>
            ) : (
              <span key={index}>
                <Link to={menu ? menu.nav : `/${cleanName}`} className="uppercase text-blue-500 hover:text-blue-700">
                  {displayName}
                </Link>
                {index < pathnames.length - 1 && <span className="mx-2">/</span>}
              </span>
            );
          })}
        </div>
        {/* Conditionally render the button only on non-mobile screens */}
        {!isMobile && (
          <button onClick={handleCampaign} className="absolute bottom-4 right-6 bg-green-500 text-white py-2 px-4 rounded shadow-lg hover:bg-green-600">
            Start Campaign
          </button>
        )}
      </div>
    </div>
  );
}

export default Breadcrumb;
