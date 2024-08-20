import React from 'react';
// import TopBar from './TopBar';
import BreadCrumbs from './BreadCrumbs';

import { Routes, Route } from 'react-router-dom';
import RestAPI from '../Components/RestAPI';
import Orders from '../Components/Orders';
import Groups from '../Components/Groups';
import Contacts from '../Components/Contacts';
import Campaigns from '../Components/Campaigns';
import AssignAgent from '../Components/AssignAgent';
import ChatInbox from '../Components/ChatInbox';
import CrmLeads from '../Components/CrmLeads';
import Templates from '../Components/Templates';
import KeywordAutomation from '../Components/KeywordAutomation';
import DashBoard from '../Components/DashBoard'
import Reports from '../Components/Reports';

const Navbar = ({ open, setOpen, data }) => {
  return (
    //that min-h-screen is coonect witrh topbar try h-screen
     <div className="flex flex-col min-h-screen"> 
      {/* <TopBar open={open} setOpen={setOpen} /> */}
      <BreadCrumbs open={open} />
      <div className='pt-8 pl-10 pr-10 pb-14 '>
            <Routes>
              <Route path='dashboard' element={<DashBoard open={open}  data={data}/>} />
              <Route path='reports' element={<Reports open={open} data={data} />} />
              <Route path='rest_api' element={<RestAPI />} />
              <Route path='orders' element={<Orders />} />
              <Route path='contact' element={<Contacts />} />
              <Route path='groups' element={<Groups />} />
              <Route path='crm_leads' element={<CrmLeads />} />
              <Route path='templates' element={<Templates />} />
              <Route path='campaigns' element={<Campaigns />} />
              <Route path='keyword_automation' element={<KeywordAutomation />} />
              <Route path='assign_Agent' element={<AssignAgent />} />
              <Route path='chat_inbox' element={<ChatInbox />} />
            </Routes>
          </div>
          
    </div>
    
  );
}

export default Navbar;
