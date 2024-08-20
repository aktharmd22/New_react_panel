import React, { useEffect, useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaEnvelopeOpen } from "react-icons/fa6";
import { GrSend } from "react-icons/gr";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Cookies from 'js-cookie';
import { MdOutlineVerified } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

const DashBoard = ({ open, data }) => {
  const userData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;
  const [newCardData, setNewCardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://ci4backend.smartyuppies.com/Home/dashboard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: userData.username,
            phone_number_id: userData.phone_number_id
          })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setNewCardData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="h-full overflow-y-auto">
      <div>
        <h2 className="pb-3 text-3xl font-Poppins">
          Welcome back,{" "}
          <span className="font-Poppins text-[--second]">{userData.username.toUpperCase()}</span>{" "}
          <span
            style={{ transitionDelay: `300ms` }}
            className={`${open && "rotate-90"}`}
          >
          
          </span>
        </h2>
        <p className="text-gray-500 font-Poppins">
          Get a quick overview of your campaign's current status below, or
          click into one of the sections for a more detailed breakdown.
        </p>
      </div>

      <div className="my-8 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 font-Poppins">
          {newCardData && (
            <>
              <div className="bg-white  rounded-xl font-Poppins  group shadow-lg p-4">
                <div className="flex items-center gap-x-2">
                  <div className="bg-white rounded-full p-3 inline-block group-hover:ring-[--second] ring-2 ring-[--primary]">
                    <MdOutlineVerified className="text-2xl  group-hover:text-[--second] text-[--primary]" />
                  </div>
                  <span className="group-hover:text-[--second] text-[--primary] font-Poppins">
                    SUBSCRIBED CLIENTS
                  </span>
                </div>

                <div className="my-6 flex flex-row md:items-center">
                  <div className="text-5xl ml-6 font-bold mt-2 md:mt-0 md:mr-4">{newCardData.subscribedContactsCount}</div>
                
                </div>
                <div className="flex items-center">
                  <div className="my-4">
                    <div className="bg-[--second] group-hover:bg-[--primary] rounded-full p-3 inline-block animate-bounce duration:600">
                      <FaArrowTrendUp className="text-xl text-white" />
                    </div>
                  </div>
                  <div className="p-3 text-2xl group-hover:text-[--primary] font-Poppins text-[--second]">
                    <span className="">+</span> Increasing
                  </div>
                </div>
              </div>
              <div className="bg-white  rounded-xl   group shadow-lg p-4">
                <div className="flex items-center gap-x-2">
                  <div className="bg-white rounded-full p-3 inline-block group-hover:ring-[--second] ring-2 ring-[--primary]">
                    <FaWhatsapp className="text-2xl group-hover:text-[--second] text-[--primary]" />
                  </div>
                  <span className="group-hover:text-[--second] text-[--primary] font-Poppins">
                    WHATSAPP SENT
                  </span>
                </div>

                <div className="my-6 flex flex-row md:items-center">
                  <div className="text-5xl ml-6 font-bold mt-2 md:mt-0 md:mr-4">{newCardData.statusCounts.sent}</div>
                 
                </div>
                <div className="flex items-center">
                  <div className="my-4">
                    <div className="bg-[--second] group-hover:bg-[--primary] rounded-full p-3 inline-block animate-bounce duration:600">
                      <FaArrowTrendUp className="text-xl text-white" />
                    </div>
                  </div>
                  <div className="p-3 text-2xl group-hover:text-[--primary] font-Poppins text-[--second]">
                    <span className="">+</span> Increasing
                  </div>
                </div>
              </div>
              <div className="bg-white group shadow-lg rounded-xl p-4">
                <div className="flex items-center gap-x-2">
                  <div className="bg-white group-hover:ring-[--second] rounded-full p-3 inline-block ring-2 ring-[--primary]">
                    <GrSend className="text-2xl group-hover:text-[--second] text-[--primary]" />
                  </div>
                  <span className="group-hover:text-[--second] text-[--primary] font-Poppins">
                    WHATSAPP DELIVERED
                  </span>
                </div>
                <div className="my-6 flex flex-row md:items-center">
                  <div className="text-5xl ml-6 font-bold mt-2 md:mt-0 md:mr-4">{newCardData.statusCounts.delivered}</div>
                
                </div>

                <div className="flex items-center">
                  <div className="my-4">
                    <div className="bg-[--second] group-hover:bg-[--primary] rounded-full p-3 inline-block animate-bounce duration:600">
                      <FaArrowTrendUp className="text-xl text-white" />
                    </div>
                  </div>
                  <div className="p-3 text-2xl group-hover:text-[--primary] font-Poppins text-[--second]">
                    <span className="">+</span> Increasing
                  </div>
                </div>
              </div>
              <div className="bg-white group shadow-lg rounded-xl p-4 ">
                <div className="flex items-center gap-x-2">
                  <div className="bg-white rounded-full group-hover:ring-[--second] p-3 inline-block ring-2 ring-[--primary]">
                    <FaEnvelopeOpen className="text-2xl group-hover:text-[--second] text-[--primary]" />
                  </div>
                  <span className="text-[--primary] group-hover:text-[--second] font-Poppins">
                    WHATSAPP READ
                  </span>
                </div>

                <div className="my-6 flex flex-row md:items-center">
                  <div className="text-5xl ml-6 font-bold mt-2 md:mt-0 md:mr-4">{newCardData.statusCounts.read}</div>
                 
                </div>

                <div className="flex items-center">
                  <div className="my-4">
                    <div className="bg-[--second] group-hover:bg-[--primary] rounded-full p-3 inline-block animate-bounce duration:600">
                      <FaArrowTrendUp className="text-xl text-white" />
                    </div>
                  </div>
                  <div className="p-3 text-2xl group-hover:text-[--primary] font-Poppins text-[--second]">
                    <span className="">+</span> Increasing
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/*<div>
        <div className="gap-x-10 grid sm:grid-cols-1 lg:grid-cols-1" style={{ overflowX: 'hidden' }}>
          <Slider {...settings}>
            {data.slice().reverse().map((item, index) => (
              <div key={index} className={`group text-lg ${open ? 'bg-[--primary]' : 'bg-[--primary]'} text-white my-4 rounded-lg p-6`}>
                <div className="m-2 flex justify-between">
                  <div className="flex items-center gap-x-3">
                    <div className="p-2 rounded-full bg-[--second]">
                      <IoIosCalendar className="text-2xl" />
                    </div>
                    <h4>LAST CAMPAIGN</h4>
                  </div>
                  <div>
                    {item.id} / {data.length}
                  </div>
                </div>
                <div className="my-6 ml-3">
                  <div className="my-4">Date : {item.date}</div>
                  <div className="text-xl">
                    <div className={`text-gray-400`}>{item.campaignName} ,</div>
                    <div className="">Created by {item.ownerName}</div>
                  </div>
                </div>
                <div className="">
                  <div className="flex items-center">
                    <div className={`rounded-full p-3 inline-block`}>
                      <div className={`bg-[--second] ${open && 'bg-[--second]'} rounded-full p-3 inline-block`}>
                        <SlLocationPin className="text-xl text-[--white]" />
                      </div>
                    </div>
                    <div className="ml-2 text-xl">
                      <div>This Campaign run for {item.contacts} Customers</div>
                      <div className={`text-gray-400`}>{item.send} messages send till now</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>*/}
   </div>
  );
};

export default DashBoard;
