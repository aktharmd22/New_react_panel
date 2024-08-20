import React, { useEffect, useState } from 'react';
import { Card, CardContent, TextField, Typography, Grid, Paper, Button, Box } from '@mui/material';
import Notes from './OverDueNotes';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import CrmButtons from './CrmgButtons'

const OverDue = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showComponent, setShowComponent] = useState(false);
  const [container, setContainer] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('https://ci4backend.smartyuppies.com/ChatInbox/overdueRecords/overdue');
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Filter the data based on the search term
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNotes = (notes) => {
    setContainer(notes);
    setShowComponent(!showComponent);
    console.log('Action button clicked for item:', notes);
  };

  const handleHistory = async (id) => {
    // Handle another button click with POST request
    console.log('Add History button clicked for item:', id);

    try {
      const response = await fetch(`https://ci4backend.smartyuppies.com/ChatInbox/historyStatus/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), // Send the ID in the request body
      });

      const result = await response.json();

      if (response.ok) {
        console.log('POST request successful:', result);
        // Handle success (e.g., show a message, update the UI)
      } else {
        console.error('POST request failed:', result);
        // Handle failure (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error in POST request:', error);
    }
  };

  return (
    <>
    <CrmButtons/>
    <div className="container mx-auto p-4">
      <TextField
        label="Search by name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Grid container spacing={3}>
        {filteredData.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card component={Paper} elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Phone Number:</strong> {item.phone_number}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Remainder:</strong> {item.remainder}
                </Typography>
                <Box display="flex" flexDirection="column" mb={2}>
                  <Box display="flex" justifyContent="space-between" gap="4px" mt={2}>
                    <Button
                      onClick={() => handleNotes(item.notes)}
                      variant="contained"
                      color="primary"
                    >
                      Notes
                    </Button>
                    <Button
                      onClick={() => handleHistory(item.id)}
                      variant="outlined"
                      color="secondary"
                    >
                     Add TO Completed
                    </Button>
                    <Button
                        onClick={() => navigate(`/Team-Inbox?phone_number=${encodeURIComponent(item.phone_number)}`)} // Redirect with phone number
                        variant="outlined"
                        color="info"
                        className='font-poppins'
                      >
                        View Chat
                      </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div>
        {showComponent && (<Notes content={container} onClose={handleNotes}/>)}
      </div>
    </div>
    </>
  );
};

export default OverDue;
