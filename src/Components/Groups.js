import React, { useState, useEffect,useReducer } from 'react';
import DropdownMenu from './GroupDropdownMenu';
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import Groupcreate from './GroupCreateGroup';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import { Instagram } from 'react-content-loader';


function Groups() {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [show, setShow] = useState(false);
  const [contact, setContact] = useState([]);
  const [share, setShare] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reducer, forceUpdate] = useReducer(x => x + 1,0)

  const userData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;


  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true)
      try {
        const response = await fetch('https://ci4backend.smartyuppies.com/GroupController/groups', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: userData.username }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch groups');
        }

        const data = await response.json();
        setGroups(data.distinctGroupsData || []);
        setFilteredGroups(data.distinctGroupsData || []);
        setContact(data.contacts);
        setLoading(false)

      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    if (userData) {
      fetchGroups();
    }
  }, [reducer]);

  const toggleDropdown = (id) => {
    setShare(id);
    setOpenDropdown((prevId) => (prevId === id ? null : id));
  };

  const handleShows = () => {
    setShow(!show);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term === '') {
      setFilteredGroups(groups);
    } else {
      const filtered = groups.filter(group =>
        group.groupname.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredGroups(filtered);
    }
  };

  return (
     <div className="rounded-lg shadow-xl overflow-x-scroll h-[570px]">
    
   {loading ? (
          
        <div className='text-center'>
          <Instagram className='text-gray-200' />
        </div>
      ) : (
        <>
     <div className="p-4 flex justify-between items-center">
     <h1 className="font-bold text-xl sm:text-2xl mb-2">Recent Groups</h1>
          <input
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by group name"
            size="small"
            className="mb-4 lg:mb-0 focus:ring-none p-2  bg-gray-50 rounded-sm border- border border-gray-200 focus:outline-gray-300"
          />
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: '#00a727', color: '#FFFFFFF', marginBottom: '10px' }}
            onClick={handleShows}
          >
            Create Group
          </Button>
        </div>
        <div className="w-full  px-6 bg-white h-[498px] pt-4 pb-2 h-[553px] rounded-lg shadow-lg border-solid border-gray-200 border overflow-x-auto">
        <TableContainer component={Paper}>
<Table sx={{ minWidth: 650 }} aria-label="order table">
    <TableHead>
        <TableRow className="bg-gray-100 sticky top-0">
            <TableCell align="center" className="px-4 py-2">Group Name</TableCell>
            <TableCell align="center" className="px-4 py-2">Date</TableCell>
            <TableCell align="center" className="px-4 py-2">Total Members</TableCell>
            <TableCell align="center" className="px-4 py-2">Actions</TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
        {filteredGroups.map((item,index) => (
            <TableRow key={index} className="bg-white hover:bg-gray-50">
                <TableCell align="center" className="px-4 py-2">{item.groupname}</TableCell>
                <TableCell align="center" className="px-4 py-2">{item.date}</TableCell>
                <TableCell align="center" className="px-4 py-2">{item.group_member_count}</TableCell>
               
                <TableCell align="center" className="px-4 py-2"><DropdownMenu
                      isOpen={openDropdown === item.groupname}
                      toggleDropdown={() => toggleDropdown(item.groupname)}
                      share={share}
                      datas={contact}
                      forceUpdate={forceUpdate}
                    /></TableCell>
            </TableRow>
        ))}
    </TableBody>
</Table>
</TableContainer>
{show &&( <><Groupcreate onClick={handleShows} data={contact}  forceUpdate={forceUpdate}/></>)}
        </div> </>)}
     
    </div>
  );
}

export default Groups;
