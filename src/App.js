import './App.css';
import { useState } from 'react';
import Sidebar from './views/Sidebar';
import Login from './LoginPage';
//import CrmTable from './Components/CrmTable';
import { SiPowervirtualagents } from "react-icons/si";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineContacts } from "react-icons/md";
import { TiFlowSwitch } from "react-icons/ti";
import { IoSettingsOutline } from "react-icons/io5";
import { FaOpencart } from "react-icons/fa";
import { HiOutlineCreditCard } from "react-icons/hi2";
import  UpdateCard  from  './Components/ReactFlow/FlowUpdate'
import { CgProfile } from "react-icons/cg";
import Complain from './Components/RaiseComplaint'
import { VscDebugDisconnect } from "react-icons/vsc";

//menu icons
import Logout from './Logout';
import ProtectedRoute from './ProtectedRoute/Index';
import { MdLeaderboard } from "react-icons/md";
import { MdGroups3 } from "react-icons/md";
import { CgTemplate } from "react-icons/cg";
import { MdOutlineCampaign } from "react-icons/md";
import { MdAssignmentInd } from "react-icons/md";
import { SiFastapi } from "react-icons/si";
import { TbReportAnalytics } from "react-icons/tb";
// import Navbar from './views/Navbar';
 import BreadCrumbs from './views/BreadCrumbs';
import { Routes, Route } from 'react-router-dom';
import RestAPI from './Components/RestAPI';
import Orders from './Components/Orders';
import Groups from './Components/Groups';
import Contacts from './Components/Contacts';
import CustomizeTeam from './Components/CustomizeTeam';
import Campaigns from './Components/Campaign/Campaigns';
import AssignAgent from './Components/AssaignAgent/AssignAgent';
import ChatInbox from './Components/Chatinbox/ChatInbox';
import CrmLeads from './Components/CrmLeads';
import Templates from './Components/Templates/Templates';
import KeywordAutomation from './Components/ReactFlow/KeywordAutomation';
import DashBoard from './Components/DashBoard'
import Reports from './Components/Reports';
import CommerceSettings from './Components/CommerceSettings';
import WooCommerce from './Components/Woocommerse/WooCommerce';
import CampaignSelect from './Components/Campaign/CampaignSelect';
import ConnectAccount from './Components/ConnectAccount';
import GenerateLicense from './Components/GenerateLicense';
import { PiMicrosoftTeamsLogoBold } from "react-icons/pi";
import { MdConnectWithoutContact } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import Signup from './SignUp';
import Validation from './Valitation';
import FlowEdit from './Components/FlowEdit'
import LicenceThisMonth from './Components/GenerateThisMonthExpire'
import  FetureCallBack  from './InboxCem/FetureCallBack';
import History from './InboxCem/History'
import TodaysCallback from './InboxCem/TodaysCallback';
import OverDue from './InboxCem/OverDue';

function App() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const shouldShowBreadcrumbs = !location.pathname.includes("Keyword-Automation") && !location.pathname.includes("login") && !location.pathname.includes("Logout") ;
 
  const menus = [
    { id: 1, title: "MENU", name: "Dashboard", link: '/', icon: LuLayoutDashboard, nav: "/Dashboard" },
    { id: 2, bre: "MENU", name: 'Reports', link: '/', icon: TbReportAnalytics, nav: '/Reports', Margin: true },
    { id: 3, title: "ONBOARD CLIENTS", name: "REST API", link: '/', icon: SiFastapi, nav: "/REST-API" },
    { id: 4, bre: "ONBOARD CLIENTS", name: "License", link: '/', icon: HiOutlineCreditCard, nav: "/Generate-License", Margin: true },
    { id: 5, title: "WABA ACCOUNTS", name: "Account", link: '/', icon: MdConnectWithoutContact, nav: "/Connect-Account" , Margin: true },
    { id: 6, title: "WHATS COMMERCE", name: "Orders", link: '/', icon: FaOpencart, nav: "/Orders" , Margin: true },
    { id: 7, title: "TEAM MANAGMENT", name: "Teams", link: '/', icon: PiMicrosoftTeamsLogoBold, nav: "/Customize-Teams" },
    { id: 8, bre: "TEAM MANAGMENT", name: "Team Inbox", link: '/', icon: SiPowervirtualagents, nav: "/Team-Inbox", Margin: true  },
    { id: 9, title: "CONTACT MANAGEMENT", name: "Contacts", link: '/', icon: MdOutlineContacts, nav: "/Contacts" },
    { id: 10, bre: "CONTACT MANAGEMENT", name: "Groups", link: '/', icon: MdGroups3, nav: "/Groups", Margin: true  },
    { id: 11, title: "TEMPLATES AND CAMPAIGNS", name: "Templates", link: '/', icon: CgTemplate, nav: "/Templates" },
    { id: 12, bre: "TEMPLATES AND CAMPAIGNS", name: "Campaigns", link: '/', icon: MdOutlineCampaign, nav: "/Campaigns", Margin: true  },
    { id: 13, title: "CHATFLOW AUTOMATION", name: "Flow", link: '/', icon: TiFlowSwitch, nav: "/FlowEdit", Margin: true  },
    { id: 14, title: "MENU", name: " Leads", link: '/', icon: MdLeaderboard, nav: "/CRM-Leads" },
    { id: 15, bre: "MENU", name: " Agent", link: '/', icon: MdAssignmentInd, nav: "/Assign-Agent", Margin: true  },
    { id: 16, bre: "MENU", name: "Commerce", link: '/', icon: IoSettingsOutline, nav: "/Commercesettings" , Margin: true  },
    { id: 17, bre: "MENU", name: "Support", link: '/', icon: VscDebugDisconnect, nav: "/Support" , Margin: true  },
   // { id: 17, bre: "WECRM INTEGRATION", name: "Woo", link: '/', icon: SiWoo, nav: "/WooCommerce" , Margin: true  },

      
  ];
  
  
  return (
    <div className={`${open ? 'bg-[--primary]' : 'bg-[--third]'}`}>
      <div className='App h-screen '>
        <Sidebar setOpen={setOpen} open={open} menus={menus} />
        <main className={`bg-[#f8f9fa]      content w-full overflow-y-auto custom-scrollbar`}>
          {shouldShowBreadcrumbs && <BreadCrumbs open={open} menus={menus} />}
          <div className='pl-10 pr-10'>
          <Routes>
  <Route path='/Dashboard' element={<ProtectedRoute><DashBoard open={open}  /></ProtectedRoute>} />
  <Route path='/Reports' element={<ProtectedRoute><Reports open={open}  /></ProtectedRoute>} />
  <Route path='/REST-API' element={<ProtectedRoute><RestAPI /></ProtectedRoute>} />
  <Route path='/Orders' element={<ProtectedRoute><Orders /></ProtectedRoute>} />
  <Route path='/Contacts' element={<ProtectedRoute><Contacts/></ProtectedRoute>} />
  <Route path='/Groups' element={<ProtectedRoute><Groups /></ProtectedRoute>} />
  <Route path='/Connect-Account' element={<ProtectedRoute><ConnectAccount /></ProtectedRoute>} />
  <Route path='/Customize-Teams' element={<ProtectedRoute><CustomizeTeam /></ProtectedRoute>} />
  <Route path='/CRM-Leads' element={<ProtectedRoute><CrmLeads /></ProtectedRoute>} />
  <Route path="/Generate-License" element={<ProtectedRoute><GenerateLicense open={open} /></ProtectedRoute>} />
  <Route path='/Templates' element={<ProtectedRoute><Templates /></ProtectedRoute>} />
  <Route path='/Campaigns' element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
  <Route path='/Keyword-Automation' element={<ProtectedRoute><KeywordAutomation /></ProtectedRoute>} />
  <Route path='/Assign-Agent' element={<ProtectedRoute><AssignAgent open={open} /></ProtectedRoute>} />
  <Route path='/Commercesettings' element={<ProtectedRoute><CommerceSettings  /></ProtectedRoute>} />
  {/*<Route path='/WooCommerce' element={<ProtectedRoute><WooCommerce  /></ProtectedRoute>} />*/}
  <Route path='/FlowEdit' element={<ProtectedRoute><FlowEdit/></ProtectedRoute>} />
  <Route path='/Edit-Keyword-Automation' element={ <ProtectedRoute><UpdateCard /> </ProtectedRoute>} />
  <Route path='/Team-Inbox' element={<ProtectedRoute><ChatInbox/></ProtectedRoute> } />
  <Route path='/Team-Inbox' element={<ProtectedRoute><ChatInbox/></ProtectedRoute> } /> 
  <Route path='/campaignSelect' element={<ProtectedRoute><CampaignSelect/></ProtectedRoute> } />
  <Route path='/Logout' element={<ProtectedRoute><Logout/></ProtectedRoute> } />
  <Route path='/LicenceThisMonth' element={<ProtectedRoute><LicenceThisMonth/></ProtectedRoute> } />

  <Route path='/OverDue' element={<ProtectedRoute><OverDue/></ProtectedRoute> } />
  <Route path='/TodaysCallback' element={<ProtectedRoute><TodaysCallback/></ProtectedRoute> } />
  <Route path='/FetureCallBack' element={<ProtectedRoute><FetureCallBack/></ProtectedRoute> } />
  <Route path='/History' element={<ProtectedRoute><History/></ProtectedRoute> } />
  <Route path='/Support' element={<ProtectedRoute><Complain/></ProtectedRoute> } />

  <Route exact path='/Login' element={<Login />} />
  <Route path='/signup' element={<Signup/>} />
  <Route path='/' element={<Validation/>} />

</Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
