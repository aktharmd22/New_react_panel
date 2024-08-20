// BackgroundWithButtons.jsx
import {useState} from 'react';
import Message from './WoocommerceMessage';
import OnHold from './OnHoldNotification';
import CompleteNotification from './CompleteNotification';
import CancelledNotification from './CacelledNotification';
import RefundNotification from './RefundNotification';
import FailtedNotification from './FailedNotification';
import DraftNotification  from './DraftNotification';


const BackgroundWithButtons = () => {
  const [show, setShow] = useState(false);

  const handleshow=()=>{setShow(!show)};
  return (
    <div className="relative min-h-screen   shadow-lg bg-cover bg-center bg-white border-solid border-gray-200 border rounded-xl   mt-2 mb-5">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-75"></div>

      {/* Content */}
      <div className="relative z-10  p-3 text-black ">
        <h1 className="text-4xl font-bold  text-center mb-6">Woocomerce Notification</h1>
        <div className=" flex space-x-4">
          <button onClick={handleshow} className="bg-green-500  w-6/12 hover:bg-blue-600  text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Button 1
          </button>

          <button className="bg-green-500 hover:bg-green-600 w-6/12  text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
            Button 2
          </button>
          
        </div>
        <div className='mt-5'>
       {show &&(<>
        <div>
          <Message/>
          </div>
          <div><OnHold/></div> 
          <div><CompleteNotification/></div>
          <div><CancelledNotification/></div>
          <div><RefundNotification/></div>
          <div><FailtedNotification/></div>
          <div><DraftNotification/></div>


          </>)}
       </div> 
      </div>
    </div>
  );
};

export default BackgroundWithButtons;
