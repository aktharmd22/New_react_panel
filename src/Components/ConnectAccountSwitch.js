import React from 'react'

const ConnectAccountSwitch = () => {
  return (
    <div> 
        <div className="max-w-lg rounded-lg shadow-lg bg-white border border-gray-200 hover:scale-105 transition duration-300">
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h5 className="text-xl font-bold text-gray-900">Hello</h5>
        <button 
          className="px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-600 transition duration-200 focus:ring-4 focus:ring-blue-300"
          onClick={() => setSwitch1(!switch1)}
        >
          {switch1 ? "Switch Account" : "Active"}
        </button>
      </div>
      <hr className="my-4" />
      <p className="mb-4 text-gray-700">Business Phone Number</p>
      <p className="mb-4 text-gray-700">Phone Number ID:</p>
      <p className="mb-4 text-gray-700">App ID:</p>
      <p className="mb-4 text-gray-700">Access Token:</p>
    </div>
  </div></div>
  )
}

export default ConnectAccountSwitch