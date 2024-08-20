import React from 'react';


import  { useState } from 'react';

const IframeModal = ({ isOpen, onClose, src }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex justify-end p-2">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <iframe
            src={src}
            width="100%"
            height="500"
            frameBorder="0"
            title="Form"
            className="w-full h-96"
          />
        </div>
      </div>
    </div>
  );
};

const Orders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formUrl = 'https://smartyuppies.wecrm.in/forms/wtl/4a027611f44966eb9b45f2851f27e07c';

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && (
        <IframeModal isOpen={isModalOpen} onClose={closeModal} src={formUrl} />
      )}
      <div className="flex justify-center">
        {/* <img
          src={order}
          alt="orderimage"
          className="w-full max-w-md h-auto object-cover"
        /> */}
      </div>
      <h2 id="Order_h1" className="sm:text-[20px]">
        Connect <span id="span_words">Catalogue</span> to Access Whats Commerce
        Features
      </h2>
      <div className="flex justify-center">
        <button
          onClick={openModal}
          className="bg-green-800 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg my-3"
        >
          Book a Demo
        </button>
      </div>
    </div>
  );
};

export default Orders;