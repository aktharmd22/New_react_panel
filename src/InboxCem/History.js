import React, { useEffect, useState } from 'react';
import { Card, CardContent, TextField, Typography, Grid, Paper, Button, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Notes from './OverDueNotes';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import CrmButtons from './CrmgButtons'

const History = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showComponent, setShowComponent] = useState(false);
  const [container, setContainer] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('https://ci4backend.smartyuppies.com/ChatInbox/historyRecords/closed');
        const result = await response.json();
        setData(result.data); // Adjust according to your data structure
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
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button
                      onClick={() => handleNotes(item.notes)}
                      variant="contained"
                      color="primary"
                    >
                      Action
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

export default History;
