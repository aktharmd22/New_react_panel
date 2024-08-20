import React from 'react'

const WoocommerseDetails = () => {
  return (
    <div>
         <div className="bg-white p-8 rounded-lg shadow-md max-w-fit  mx-auto mt-8">
            <h1 className='text-xl'>WoocommerseDetails</h1>
            <hr/>
            <p className="text-sm text-gray-800 mb-4">
            Website:https://birthdaychocolates.in
            </p>
            <p className="text-sm text-gray-800 mb-4">
            WooCommerce Key: ck_4b7cbcc700a20020c6adac5741586de386c89056
            </p>
            <p className="text-sm text-gray-800 mb-4">
            WooCommerce Secret: cs_39514096ae3925e713c929c5656d9546b606f015
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Update
            </button>
        </div>
    </div>
  )
}

export default WoocommerseDetails