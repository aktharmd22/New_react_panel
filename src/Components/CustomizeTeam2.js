import React, { useState, useEffect,useReducer} from 'react';
import profilImage from '../assests/19021603.jpg';
import Card from './CumstomizeCard'; // Assuming this is the correct import statement
import Cookies from 'js-cookie';
import { message } from 'antd';
import CustomizeTeam1 from './CustomizeTeams1'

function CustomizeTeams() {
  
  const chat = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;

  const [data, setData] = useState([]);
  const [reducer, forceUpdate] = useReducer(x => x + 1,0);
  const[incre,setIncre]=useState("")
  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      try {
        const response = await fetch('https://ci4backend.smartyuppies.com/Teams/displayTeamMember', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone_number_id: chat.phone_number_id,
            company_name: chat.company_name,
          }), // Assuming your backend expects an object with `phone_number_id` and `company_name`
        });

        if (!response.ok) {
        
          throw new Error('Failed to fetch initial data');
        }

        // Log the raw response text
       

        const responseText = await response.text();
        const initialData = JSON.parse(responseText);
        setData(initialData.teammember);

      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchData(); // Call the function to fetch data when component mounts
  }, [reducer]); // Empty dependency array ensures this runs only once when component mounts

  const handleRemoveCard = async (id) => {
    try {
      // Remove the card from UI immediately

      // Send a POST request to your backend API
      const response = await fetch(`https://ci4backend.smartyuppies.com/Teams/deleteTeams/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(), // Assuming your backend expects an object with `id`
      });

      if (!response.ok) {
        message.error('Failed to delete');
        throw new Error('Failed to remove card');
      }
      message.success('Delete successfully');
      console.log('Card removed successfully');
    } catch (error) {
      console.error('Error removing card:', error);
      // Optionally, you might want to revert the UI state if the request fails
      setData([...data]); // Restore previous state
    }
    forceUpdate()
  };

  return (
    <>
    <div className='mb-10'>        
    <CustomizeTeam1 forceUpdate={forceUpdate} /> 
    </div>
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10">
      {data.map((user,index) => (
        <Card
          id={user.id}
          title={user.username}
          description={user.password}
          imageUrl={user.image || profilImage} // Use profilImage as fallback if user.image is null
          remove={handleRemoveCard}
          forceUpdate={forceUpdate}
        />
      ))}
    </div>
    </>
  );
}

export default CustomizeTeams;
