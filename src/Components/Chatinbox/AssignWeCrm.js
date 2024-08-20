import React, { useState } from 'react';

const ChatweCrm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white w-1/5 h-80vh p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Table Example</h2>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Select Option</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">
                   
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="text-center mt-4">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 mr-2"
                onClick={closeModal}
              >
                Cancel
              </button>
              
            </div>
          </div>
        </div>
    </div>
  );
};

export default ChatweCrm;
