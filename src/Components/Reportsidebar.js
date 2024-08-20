import React from 'react';
import { MdOutlineCancel } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import { PiChecksBold } from "react-icons/pi";
import { utils, writeFile } from 'xlsx';

const ReportSidebars = ({ onClick, data }) => {
  const exportToExcel = () => {
    if (!data) return;

    const reportData = [
      ['Metric', 'Value'],
      ['Total Sents', data.sent_count],
      ['Total Delivery', data.delivered_count],
      ['Total Read', data.read_count],
      ['Total Fails', data.failed_count],
      ['Owner Name', data.owner_name],
      ['Status', 'Delivered'],
      ['Channel', 'Official']
    ];

    const ws = utils.aoa_to_sheet(reportData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Report');
    writeFile(wb, 'CampaignReport.xlsx');
  };

  return (
    <div className='relative'>
      {/* Black overlay */}
      <div className="fixed inset-0 bg-black opacity-50 z-10"></div>

      {/* Sidebar */}
      {data && (
        <div className="fixed right-0 top-0 h-full bg-white w-full lg:w-1/3 md:w-1/2 sm:w-3/4 p-4 duration-700 z-20 overflow-y-auto">
          <div className='flex justify-between items-center'>
            <h2 className="text-lg font-bold mb-4">Campaign Report</h2>
            <button onClick={onClick} className='text-red-600'><MdOutlineCancel size={24} /></button>
          </div>
          <button
            onClick={exportToExcel}
            className='mt-4 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700'
          >
            Export to Excel
          </button>
          <hr className="mb-4" />
          <div className="space-y-4">
            {/* Inputs */}
            <div className='grid grid-cols-2 gap-5'>
              <div className='bg-white border-solid border-gray border p-4 rounded-xl shadow-xl relative'>
                <p className='text-sm'>Total Sents</p>
                <p className='absolute right-5 top-2'><GiCheckMark /></p>
                <p className='text-lg font-bold'>{data.sent_count}</p>
              </div>
              <div className='bg-white border-solid border-gray border p-4 rounded-xl shadow-xl relative'>
                <p className='text-sm'>Total Delivery</p>
                <p className='absolute right-5 top-2'><PiChecksBold /></p>
                <p className='text-lg font-bold'>{data.delivered_count}</p>
              </div>
              <div className='bg-white border-solid border-gray border p-4 rounded-xl shadow-xl relative'>
                <p className='text-sm'>Total Read</p>
                <p className='absolute right-5 top-2'><GiCheckMark /></p>
                <p className='text-lg font-bold'>{data.read_count}</p>
              </div>
              <div className='bg-white border-solid border-gray border p-4 rounded-xl shadow-xl relative'>
                <p className='text-sm'>Total Fails</p>
                <p className='absolute right-5 top-2'><GiCheckMark /></p>
                <p className='text-lg font-bold'>{data.failed_count}</p>
              </div>
            </div>
            <div className='space-y-4'>
              <div className='bg-white border-solid border-gray border p-4 rounded-xl shadow-xl'>
                <p>Owner Name: <span className='font-bold'>{data.owner_name}</span></p>
              </div>
              <div className='bg-white border-solid border-gray border p-4 rounded-xl shadow-xl'>
                <p>Status: <span className='font-bold'>Delivered</span></p>
              </div>
              <div className='bg-white border-solid border-gray border p-4 rounded-xl shadow-xl'>
                <p>Channel: <span className='font-bold'>Official</span></p>
              </div>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default ReportSidebars;
