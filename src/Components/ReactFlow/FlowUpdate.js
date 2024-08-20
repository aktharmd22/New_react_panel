import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Tabs,
  Tab,
  TextField,
  Fade,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CardGrid = () => {
  const [cards, setCards] = useState([]);
  const [lists, setLists] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editMode2, setEditMode2] = useState(null);
  const [tempValues, setTempValues] = useState({});
  const [tempValues2, setTempValues2] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const [tabIndex, setTabIndex] = useState(0);

  const location = useLocation();
  const responseData = location.state?.responseData;

  useEffect(() => {
    if (responseData) {
      setCards(responseData.Automation || []);
    }
  }, [responseData]);

  console.log(responseData);

  useEffect(() => {
    if (responseData) {
      setLists(responseData.List || []);
    }
  }, [responseData]);

  const handleEditClick = (id) => {
    setEditMode(id);
    const card = cards.find((card) => card.id === id);
    setTempValues({ ...card });
    setSelectedFile(null); // Reset selected file on edit
  };

  const handleSaveClick = async (id) => {
    const updatedCard = { ...tempValues };
    const formData2 = new FormData();

    // Update local state
    setCards(cards.map((card) => (card.id === id ? updatedCard : card)));

    // Optionally reset edit mode
    setEditMode(null);

    // Append card data to FormData
    Object.entries(updatedCard).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        formData2.append(key, value);
      }
    });

    // Append the selected file if it exists
    if (selectedFile) {
      formData2.append("uploaded_file_url", selectedFile);
    }

    // Logging for debugging
    formData2.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    try {
      const response = await fetch(
        `https://ci4backend.smartyuppies.com/updateflow/${id}`,
        {
          method: "POST",
          body: formData2,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const result = await response.json();
      console.log("Server response:", result);

      // Show success toast notification
      toast.success("Flow successfully updated!", {
        autoClose: 2000, // Duration in milliseconds
      });
    } catch (error) {
      console.error("Error sending request:", error);

      // Show error toast notification
      toast.error(`Error updating card: ${error.message}`);
    }
  };

  // useEffect(() => {
  //   console.log('Cards state has been updated:', cards);
  // }, [cards]);

  const handleInputChange = (e) => {
    setTempValues({
      ...tempValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    // Clear the file input if you need to reset it
    event.target.value = "";
  };

  const handleCancelClick = () => {
    setEditMode(null);
    setSelectedFile(null); // Reset selected file on cancel
  };

  const handleSaveClick2 = async (id) => {
    const updatedCard2 = { ...tempValues2 };
    const formData = new FormData();

    // Update the local state
    setLists(lists.map((list) => (list.id === id ? updatedCard2 : list)));

    setEditMode2(null); // Optionally reset edit mode

    // Append each key-value pair to FormData
    // Append card data to FormData
    Object.entries(updatedCard2).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        formData.append(key, value);
      }
    });

    // Logging FormData content (debugging purpose)
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    try {
      const response = await fetch(
        `https://ci4backend.smartyuppies.com/updatelist/${id}`,
        {
          method: "POST", // Consider 'PUT' for updates
          body: formData, // Send the FormData object
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.text(); // Use .text() to handle plain text response
      console.log("Server response:", result);

      toast.success("Flow successfully updated!", {
        autoClose: 2000, // Duration in milliseconds
      });

      // Optionally, handle the response result here
      // For example, show a success message to the user
    } catch (error) {
      console.error("Error sending POST request:", error);
      toast.error(`Error updating card: ${error.message}`);
      // Optionally, handle the error here
      // For example, show an error message to the user
    }
  };

  const handleEditClick2 = (id) => {
    setEditMode2(id);
    const list = lists.find((list) => list.id === id);
    setTempValues2({ ...list });
  };

  const handleCancelClick2 = () => {
    setEditMode2(null);
    // Reset selected file on cancel
  };

  const handleInputChange2 = (e) => {
    setTempValues2({
      ...tempValues2,
      [e.target.name]: e.target.value,
    });
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div className="my-16">
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        aria-label="tabs example"
        sx={{
          // Customize the Tabs component
          "& .MuiTabs-indicator": {
            backgroundColor: "green", // Color of the indicator
          },
        }}
      >
        <Tab
          label="Chart Flow"
          sx={{
            fontSize: "0.9rem", // Adjust font size
            color: "dark",
            fontWeight: "bold",
            "&.Mui-selected": {
              color: "darkgreen", // Color when selected
              fontWeight: "bold",
            },
          }}
        />
        <Tab
          label="List Flow"
          sx={{
            fontSize: "0.9rem", // Adjust font size
            color: "dark", // Change font color
            fontWeight: "bold",
            "&.Mui-selected": {
              color: "darkgreen", // Color when selected
              fontWeight: "bold",
            },
          }}
        />
      </Tabs>

      <Fade in={tabIndex === 0} timeout={500}>
        <div role="tabpanel" hidden={tabIndex !== 0}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-1  md:grid-cols-2 p-2 my-8">
            {cards.map((card) => (
              <Card
                key={card.id}
                sx={{
                  position: "relative",
                  background: "#f8f9fa",
                  borderRadius: "12px",
                  border: `3px solid ${
                    editMode === card.id ? "#00a727" : "transparent"
                  }`,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition:
                    "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
                  "&:hover": {
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  },
                  borderColor: "#00a727",
                  p: 2,
                  m: 1,
                }}
              >
                <CardContent sx={{ position: "relative", p: 2 }}>
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: "#00a727",
                    }}
                    onClick={() =>
                      editMode === card.id
                        ? handleSaveClick(card.id)
                        : handleEditClick(card.id)
                    }
                  >
                    {editMode === card.id ? (
                      <SaveIcon fontSize="medium" />
                    ) : (
                      <EditIcon fontSize="medium" />
                    )}
                  </IconButton>
                  {editMode === card.id && (
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 48,
                        color: "error.main",
                      }}
                      onClick={handleCancelClick}
                    >
                      <CancelIcon fontSize="medium" />
                    </IconButton>
                  )}

                  {editMode === card.id ? (
                    <>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                          lineHeight: "1.5",
                          letterSpacing: "0.5px",
                          mb: 2,
                        }}
                      >
                        Flow Type : {card.document_type}
                      </Typography>
                      {card.document_type && (
                        <TextField
                          label="Document Type"
                          name="document_type"
                          value={tempValues.document_type}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                          style={{ display: "none" }}
                        />
                      )}
                      {card.button_1 && (
                        <TextField
                          label="Button 1"
                          name="button_1"
                          value={tempValues.button_1}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                        />
                      )}

                      {card.button_2 && (
                        <TextField
                          label="Button 2"
                          name="button_2"
                          value={tempValues.button_2}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                        />
                      )}

                      {card.button_3 && (
                        <TextField
                          label="Button 3"
                          name="button_3"
                          value={tempValues.button_3}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                        />
                      )}
                      {card.button_value && (
                        <TextField
                          label="button Value"
                          name="button_value"
                          value={tempValues.button_value}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                        />
                      )}
                      {<card className="button_type"></card> && (
                        <TextField
                          label="button Type"
                          name="button_type"
                          value={tempValues.button_type}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                        />
                      )}
                      {card.button_id_1 && (
                        <TextField
                          label="Button id 1"
                          name="button_id_1"
                          value={tempValues.button_id_1}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                          style={{ display: "none" }}
                        />
                      )}

                      {card.button_id_2 && (
                        <TextField
                          label="Button id 2"
                          name="button_id_2"
                          value={tempValues.button_id_2}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                          style={{ display: "none" }}
                        />
                      )}

                      {card.button_id_3 && (
                        <TextField
                          label="Button id 3"
                          name="button_id_3"
                          value={tempValues.button_id_3}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                          style={{ display: "none" }}
                        />
                      )}

                      {card.document_name && (
                        <TextField
                          label="Document Name"
                          name="document_name"
                          value={tempValues.document_name}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                        />
                      )}

                      {card.document_caption && (
                        <TextField
                          label="Document Caption"
                          name="document_caption"
                          value={tempValues.document_caption}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                        />
                      )}

                      {card.message && (
                        <TextField
                          label="Message"
                          name="message"
                          value={tempValues.message}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                        />
                      )}

                      {card.node_value && (
                        <TextField
                          label="Node Value"
                          name="node_value"
                          value={tempValues.node_value}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                          style={{ display: "none" }}
                        />
                      )}

                      {card.phone_number_id && (
                        <TextField
                          label="Phone Number ID"
                          name="phone_number_id"
                          value={tempValues.phone_number_id}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                          style={{ display: "none" }}
                        />
                      )}

                      {card.username && (
                        <TextField
                          label="Username"
                          name="username"
                          value={tempValues.username}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                          style={{ display: "none" }}
                        />
                      )}

                      {card.type && (
                        <TextField
                          label="Type"
                          name="type"
                          value={tempValues.type}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                          style={{ display: "none" }}
                        />
                      )}

                      {card.latitude && (
                        <TextField
                          label="Latitude"
                          name="latitude"
                          value={tempValues.latitude}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                        />
                      )}

                      {card.longitude && (
                        <TextField
                          label="Longitude"
                          name="longitude"
                          value={tempValues.longitude}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                        />
                      )}

                      {card.location_address && (
                        <TextField
                          label="Location Address"
                          name="location_address"
                          value={tempValues.location_address}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                        />
                      )}

                      {card.location_link && (
                        <TextField
                          label="Location Link"
                          name="location_link"
                          value={tempValues.location_link}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                        />
                      )}

                      {card.location_name && (
                        <TextField
                          label="Location Name"
                          name="location_name"
                          value={tempValues.location_name}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                        />
                      )}

                      {card.chatflow_id && (
                        <TextField
                          label="Chatflow Id"
                          name="chatflow_id"
                          value={tempValues.chatflow_id}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                          style={{ display: "none" }}
                        />
                      )}

                      {card.id && (
                        <TextField
                          label="Id"
                          name="id"
                          value={tempValues.id}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                          style={{ display: "none" }}
                        />
                      )}

                      {card.file_name && (
                        <TextField
                          label="File Name"
                          name="file_name"
                          value={tempValues.file_name}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                        />
                      )}

                      {card.header_parameter && (
                        <TextField
                          label="Header Parameter"
                          name="header_parameter"
                          value={tempValues.header_parameter}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                        />
                      )}

                      {card.is_start && (
                        <TextField
                          label="Is Start"
                          name="is_start"
                          value={tempValues.is_start}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                          style={{ display: "none" }}
                        />
                      )}

                      {card.document_type === "Document" && (
                        <Button
                          variant="contained"
                          component="label"
                          startIcon={<UploadFileIcon />}
                        >
                          Upload File
                          <input
                            type="file"
                            hidden
                            onChange={handleFileChange}
                          />
                        </Button>
                      )}
                      {selectedFile && (
                        <Typography variant="body2" sx={{ mt: 2 }}>
                          Selected File: {selectedFile.name}
                        </Typography>
                      )}
                    </>
                  ) : (
                    <>
                      {card.document_type && (
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{
                            fontWeight: "bold",
                            fontSize: "1.2rem",
                            lineHeight: "1.5",
                            letterSpacing: "0.5px",
                            mb: 2,
                          }}
                        >
                          Flow Type : {card.document_type}
                        </Typography>
                      )}

                      {card.button_1 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Button 1: {card.button_1}
                        </Typography>
                      )}

                      {card.button_2 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Button 2: {card.button_2}
                        </Typography>
                      )}

                      {card.button_3 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Button 3: {card.button_3}
                        </Typography>
                      )}

                      {card.button_type && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Button Type: {card.button_type}
                        </Typography>
                      )}
                       {card.button_value && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Button Value: {card.button_value}
                        </Typography>
                      )}

                      {/* {card.button_id_1 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Button Id 1: {card.button_id_1}
                        </Typography>
                      )} */}

                      {/* {card.button_id_2 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Button Id 2: {card.button_id_2}
                        </Typography>
                      )} */}

                      {/* {card.button_id_3 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Button Id 3: {card.button_id_3}
                        </Typography>
                      )} */}

                      {card.document_name && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Document Name: {card.document_name}
                        </Typography>
                      )}

                      {card.document_caption && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Document Caption: {card.document_caption}
                        </Typography>
                      )}

                      {card.document_type && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Document Type: {card.document_type}
                        </Typography>
                      )}

                      {card.message && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Message: {card.message}
                        </Typography>
                      )}

                      {/* {card.node_value && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Node Value: {card.node_value}
                        </Typography>
                      )} */}

                      {/* {card.phone_number_id && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Phone Number ID: {card.phone_number_id}
                        </Typography>
                      )} */}

                      {/* {card.username && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Username: {card.username}
                        </Typography>
                      )} */}

                      {card.type && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Type: {card.type}
                        </Typography>
                      )}

                      {card.latitude && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Latitude: {card.latitude}
                        </Typography>
                      )}

                      {card.longitude && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Longitude: {card.longitude}
                        </Typography>
                      )}

                      {card.location_address && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Location Address: {card.location_address}
                        </Typography>
                      )}

                      {card.location_link && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Location Link: {card.location_link}
                        </Typography>
                      )}

                      {card.location_name && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Location Name: {card.location_name}
                        </Typography>
                      )}

                      {card.file_name && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          File Name: {card.file_name}
                        </Typography>
                      )}

                      {/* {card.header_parameter && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Header Parameter: {card.header_parameter}
                        </Typography>
                      )} */}

                      {/* {card.chatflow_id && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Chatflow Id: {card.chatflow_id}
                        </Typography>
                      )} */}

                      {card.is_start && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Is Start: {card.is_start}
                        </Typography>
                      )}

                      {/* {card.id && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          ID: {card.id}
                        </Typography>
                      )} */}

                      {card.uploaded_file_url && (
                        <div
                          style={{
                            marginTop: "1rem",
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          <img
                            src={`${card.uploaded_file_url}`} // Construct the full URL
                            alt="Uploaded file" // Descriptive alt text
                            style={{
                              maxWidth: "350px",
                              height: "350px",
                              borderRadius: "8px",
                              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            }} // Optional styling
                          />
                        </div>
                      )}
                      <ToastContainer />
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Fade>
      <Fade in={tabIndex === 1} timeout={500}>
        <div role="tabpanel" hidden={tabIndex !== 1}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 p-2 my-8">
            {lists.map((list) => (
              <Card
                key={list.id}
                sx={{
                  position: "relative",
                  background: "#f8f9fa",
                  border: `3px solid ${
                    editMode2 === list.id ? "#00a727" : "#00a727"
                  }`,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  borderRadius: "12px",
                  transition:
                    "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
                  "&:hover": {
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  },
                  p: 2,
                  m: 1,
                }}
              >
                <CardContent sx={{ position: "relative", p: 2 }}>
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: "#00a727",
                    }}
                    onClick={() =>
                      editMode2 === list.id
                        ? handleSaveClick2(list.id)
                        : handleEditClick2(list.id)
                    }
                  >
                    {editMode2 === list.id ? (
                      <SaveIcon fontSize="medium" />
                    ) : (
                      <EditIcon fontSize="medium" />
                    )}
                  </IconButton>
                  {editMode2 === list.id && (
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 48,
                        color: "error.main",
                      }}
                      onClick={handleCancelClick2}
                    >
                      <CancelIcon fontSize="medium" />
                    </IconButton>
                  )}

                  {editMode2 === list.id ? (
                    <>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                          lineHeight: "1.5",
                          letterSpacing: "0.5px",
                          mb: 2,
                        }}
                      >
                        Flow Type : {list.document_type} {list.node_value}
                      </Typography>

                      {list.header && (
                        <TextField
                          label="Header"
                          name="header"
                          value={tempValues2.header}
                          onChange={handleInputChange2}
                          fullWidth
                          margin="normal"
                        />
                      )}
                      {tempValues2.body && (
                        <TextField
                          label="Body"
                          name="body"
                          value={tempValues2.body}
                          onChange={handleInputChange2}
                          fullWidth
                          multiline
                          rows={3} // Adjust the number of rows as needed
                          margin="normal"
                        />
                      )}
                      {tempValues2.footer && (
                        <TextField
                          label="Footer"
                          name="footer"
                          value={tempValues2.footer}
                          onChange={handleInputChange2}
                          fullWidth
                          margin="normal"
                        />
                      )}
                      {tempValues2.list_title_1 && (
                        <>
                          <TextField
                            label="List Title 1"
                            name="list_title_1"
                            value={tempValues2.list_title_1}
                            onChange={handleInputChange2}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="List Description 1"
                            name="list_description_1"
                            value={tempValues2.list_description_1}
                            onChange={handleInputChange2}
                            fullWidth
                            multiline
                            rows={3} // Adjust the number of rows as needed
                            margin="normal"
                          />
                        </>
                      )}
                      {tempValues2.list_title_2 && (
                        <>
                          <TextField
                            label="List Title 2"
                            name="list_title_2"
                            value={tempValues2.list_title_2}
                            onChange={handleInputChange2}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="List Description 2"
                            name="list_description_2"
                            value={tempValues2.list_description_2}
                            onChange={handleInputChange2}
                            fullWidth
                            multiline
                            rows={3} // Adjust the number of rows as needed
                            margin="normal"
                          />
                        </>
                      )}
                      {tempValues2.list_title_3 && (
                        <>
                          <TextField
                            label="List Title 3"
                            name="list_title_3"
                            value={tempValues2.list_title_3}
                            onChange={handleInputChange2}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="List Description 3"
                            name="list_description_3"
                            value={tempValues2.list_description_3}
                            onChange={handleInputChange2}
                            fullWidth
                            multiline
                            rows={3} // Adjust the number of rows as needed
                            margin="normal"
                          />
                        </>
                      )}
                      {tempValues2.list_title_4 && (
                        <>
                          <TextField
                            label="List Title 4"
                            name="list_title_4"
                            value={tempValues2.list_title_4}
                            onChange={handleInputChange2}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="List Description 4"
                            name="list_description_4"
                            value={tempValues2.list_description_4}
                            onChange={handleInputChange2}
                            fullWidth
                            multiline
                            rows={3} // Adjust the number of rows as needed
                            margin="normal"
                          />
                        </>
                      )}
                      {tempValues2.list_title_5 && (
                        <>
                          <TextField
                            label="List Title 5"
                            name="list_title_5"
                            value={tempValues2.list_title_5}
                            onChange={handleInputChange2}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="List Description 5"
                            name="list_description_5"
                            value={tempValues2.list_description_5}
                            onChange={handleInputChange2}
                            fullWidth
                            multiline
                            rows={3} // Adjust the number of rows as needed
                            margin="normal"
                          />
                        </>
                      )}
                      {tempValues2.list_title_6 && (
                        <>
                          <TextField
                            label="List Title 6"
                            name="list_title_6"
                            value={tempValues2.list_title_6}
                            onChange={handleInputChange2}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="List Description 6"
                            name="list_description_6"
                            value={tempValues2.list_description_6}
                            onChange={handleInputChange2}
                            fullWidth
                            multiline
                            rows={3} // Adjust the number of rows as needed
                            margin="normal"
                          />
                        </>
                      )}
                      {tempValues2.list_title_7 && (
                        <>
                          <TextField
                            label="List Title 7"
                            name="list_title_7"
                            value={tempValues2.list_title_7}
                            onChange={handleInputChange2}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="List Description 7"
                            name="list_description_7"
                            value={tempValues2.list_description_7}
                            onChange={handleInputChange2}
                            fullWidth
                            multiline
                            rows={3} // Adjust the number of rows as needed
                            margin="normal"
                          />
                        </>
                      )}
                      {tempValues2.list_title_8 && (
                        <>
                          <TextField
                            label="List Title 8"
                            name="list_title_8"
                            value={tempValues2.list_title_8}
                            onChange={handleInputChange2}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="List Description 8"
                            name="list_description_8"
                            value={tempValues2.list_description_8}
                            onChange={handleInputChange2}
                            fullWidth
                            multiline
                            rows={3} // Adjust the number of rows as needed
                            margin="normal"
                          />
                        </>
                      )}
                      {tempValues2.list_title_9 && (
                        <>
                          <TextField
                            label="List Title 9"
                            name="list_title_9"
                            value={tempValues2.list_title_9}
                            onChange={handleInputChange2}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="List Description 9"
                            name="list_description_9"
                            value={tempValues2.list_description_9}
                            onChange={handleInputChange2}
                            fullWidth
                            multiline
                            rows={3} // Adjust the number of rows as needed
                            margin="normal"
                          />
                        </>
                      )}
                      {tempValues2.list_title_10 && (
                        <>
                          <TextField
                            label="List Title 10"
                            name="list_title_10"
                            value={tempValues2.list_title_10}
                            onChange={handleInputChange2}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="List Description 10"
                            name="list_description_10"
                            value={tempValues2.list_description_10}
                            onChange={handleInputChange2}
                            fullWidth
                            multiline
                            rows={3} // Adjust the number of rows as needed
                            margin="normal"
                          />
                        </>
                      )}

                      {tempValues2.button_id_1 && (
                        <TextField
                          label="Button Id 1"
                          name="button_id_1"
                          value={tempValues2.button_id_1}
                          onChange={handleInputChange2}
                          fullWidth
                          margin="normal"
                          style={{ display: "none" }}
                        />
                      )}
                      {tempValues2.button_id_2 && (
                        <TextField
                          label="Button Id 2"
                          name="button_id_2"
                          value={tempValues2.button_id_2}
                          onChange={handleInputChange2}
                          fullWidth
                          margin="normal"
                          style={{ display: "none" }}
                        />
                      )}
                      {tempValues2.button_id_3 && (
                        <TextField
                          label="Button Id 3"
                          name="button_id_3"
                          value={tempValues2.button_id_3}
                          onChange={handleInputChange2}
                          fullWidth
                          margin="normal"
                          style={{ display: "none" }}
                        />
                      )}
                      {tempValues2.button_id_4 && (
                        <TextField
                          label="Button Id 4"
                          name="button_id_4"
                          value={tempValues2.button_id_4}
                          onChange={handleInputChange2}
                          fullWidth
                          margin="normal"
                          style={{ display: "none" }}
                        />
                      )}
                      {tempValues2.button_id_5 && (
                        <TextField
                          label="Button Id 5"
                          name="button_id_5"
                          value={tempValues2.button_id_5}
                          onChange={handleInputChange2}
                          fullWidth
                          margin="normal"
                          style={{ display: "none" }}
                        />
                      )}
                      {tempValues2.button_id_6 && (
                        <TextField
                          label="Button Id 6"
                          name="button_id_6"
                          value={tempValues2.button_id_6}
                          onChange={handleInputChange2}
                          fullWidth
                          margin="normal"
                          style={{ display: "none" }}
                        />
                      )}
                      {tempValues2.button_id_7 && (
                        <TextField
                          label="Button Id 7"
                          name="button_id_7"
                          value={tempValues2.button_id_7}
                          onChange={handleInputChange2}
                          fullWidth
                          margin="normal"
                          style={{ display: "none" }}
                        />
                      )}
                      {tempValues2.button_id_8 && (
                        <TextField
                          label="Button Id 8"
                          name="button_id_8"
                          value={tempValues2.button_id_8}
                          onChange={handleInputChange2}
                          fullWidth
                          margin="normal"
                          style={{ display: "none" }}
                        />
                      )}
                      {tempValues2.button_id_9 && (
                        <TextField
                          label="Button Id 9"
                          name="button_id_9"
                          value={tempValues2.button_id_9}
                          onChange={handleInputChange2}
                          fullWidth
                          margin="normal"
                          style={{ display: "none" }}
                        />
                      )}
                      {tempValues2.button_id_10 && (
                        <TextField
                          label="Button Id 10"
                          name="button_id_10"
                          value={tempValues2.button_id_10}
                          onChange={handleInputChange2}
                          fullWidth
                          margin="normal"
                          style={{ display: "none" }}
                        />
                      )}
                      {tempValues2.id && (
                        <TextField
                          label="Id"
                          name="id"
                          value={tempValues2.id}
                          onChange={handleInputChange2}
                          fullWidth
                          margin="normal"
                          style={{ display: "none" }}
                        />
                      )}
                      {tempValues2.chatflow_id && (
                        <TextField
                          label="Chatflow Id"
                          name="chatflow_id"
                          value={tempValues2.chatflow_id}
                          onChange={handleInputChange2}
                          fullWidth
                          margin="normal"
                          style={{ display: "none" }}
                        />
                      )}
                      {tempValues2.node_value && (
                        <TextField
                          label="Node Value"
                          name="node_value"
                          value={tempValues2.node_value}
                          onChange={handleInputChange2}
                          fullWidth
                          margin="normal"
                          style={{ display: "none" }}
                        />
                      )}
                      {tempValues2.username && (
                        <TextField
                          label="User Name"
                          name="username"
                          value={tempValues2.username}
                          onChange={handleInputChange2}
                          fullWidth
                          margin="normal"
                          style={{ display: "none" }}
                        />
                      )}
                      {tempValues2.phone_number_id && (
                        <TextField
                          label="Phone Number Id"
                          name="phone_number_id"
                          value={tempValues2.phone_number_id}
                          onChange={handleInputChange2}
                          fullWidth
                          margin="normal"
                          style={{ display: "none" }}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                          lineHeight: "1.5",
                          letterSpacing: "0.5px",
                          mb: 2,
                        }}
                      >
                        Flow Type : {list.document_type} {list.node_value}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.black",
                          mt: 1,
                          fontSize: "1rem",
                          lineHeight: "1.6",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Header: {list.header}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.black",
                          mt: 1,
                          fontSize: "1rem",
                          lineHeight: "1.6",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Body: {list.body}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.black",
                          mt: 1,
                          fontSize: "1rem",
                          lineHeight: "1.6",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Footer: {list.footer}
                      </Typography>
                      {list.list_title_1 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          List Title 1: {list.list_title_1}
                        </Typography>
                      )}

                      {list.list_title_2 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          List Title 2: {list.list_title_2}
                        </Typography>
                      )}

                      {list.list_title_3 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          List Title 3: {list.list_title_3}
                        </Typography>
                      )}

                      {list.list_title_4 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          List Title 4: {list.list_title_4}
                        </Typography>
                      )}

                      {list.list_title_5 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          List Title 5: {list.list_title_5}
                        </Typography>
                      )}

                      {list.list_title_6 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          List Title 6: {list.list_title_6}
                        </Typography>
                      )}

                      {list.list_title_7 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          List Title 7: {list.list_title_7}
                        </Typography>
                      )}

                      {list.list_title_8 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          List Title 8: {list.list_title_8}
                        </Typography>
                      )}

                      {list.list_title_9 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          List Title 9: {list.list_title_9}
                        </Typography>
                      )}

                      {list.list_title_10 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          List Title 10: {list.list_title_10}
                        </Typography>
                      )}

                      {list.list_description_1 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Description 1: {list.list_description_1}
                        </Typography>
                      )}

                      {list.list_description_2 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Description 2: {list.list_description_2}
                        </Typography>
                      )}

                      {list.list_description_3 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Description 3: {list.list_description_3}
                        </Typography>
                      )}

                      {list.list_description_4 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Description 4: {list.list_description_4}
                        </Typography>
                      )}

                      {list.list_description_5 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Description 5: {list.list_description_5}
                        </Typography>
                      )}

                      {list.list_description_6 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Description 6: {list.list_description_6}
                        </Typography>
                      )}

                      {list.list_description_7 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Description 7: {list.list_description_7}
                        </Typography>
                      )}

                      {list.list_description_8 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Description 8: {list.list_description_8}
                        </Typography>
                      )}

                      {list.list_description_9 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Description 9: {list.list_description_9}
                        </Typography>
                      )}

                      {list.list_description_10 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Description 10: {list.list_description_10}
                        </Typography>
                      )}

                      {/* {list.button_id_1 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Button Id 1: {list.button_id_1}
                        </Typography>
                      )}

                      {list.button_id_2 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Button Id 2: {list.button_id_2}
                        </Typography>
                      )}

                      {list.button_id_3 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Button Id 3: {list.button_id_3}
                        </Typography>
                      )}

                      {list.button_id_4 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Button Id 4: {list.button_id_4}
                        </Typography>
                      )}

                      {list.button_id_5 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Button Id 5: {list.button_id_5}
                        </Typography>
                      )}

                      {list.button_id_6 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Button Id 6: {list.button_id_6}
                        </Typography>
                      )}

                      {list.button_id_7 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Button Id 7: {list.button_id_7}
                        </Typography>
                      )}

                      {list.button_id_8 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Button Id 8: {list.button_id_8}
                        </Typography>
                      )}

                      {list.button_id_9 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Button Id 9: {list.button_id_9}
                        </Typography>
                      )}

                      {list.button_id_10 && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.black",
                            mt: 1,
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Button Id 10: {list.button_id_10}
                        </Typography>
                      )} */}

                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.black",
                          mt: 1,
                          fontSize: "1rem",
                          lineHeight: "1.6",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Document Type: {list.document_type || "Unknown type"}
                      </Typography>

                      {/* <Typography
                        variant="body2"
                        sx={{
                          color: "text.black",
                          mt: 1,
                          fontSize: "1rem",
                          lineHeight: "1.6",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Phone Number ID: {list.phone_number_id || "N/A"}
                      </Typography> */}

                      {/* <Typography
                        variant="body2"
                        sx={{
                          color: "text.black",
                          mt: 1,
                          fontSize: "1rem",
                          lineHeight: "1.6",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Node Value: {list.node_value || "N/A"}
                      </Typography> */}

                      {/* <Typography
                        variant="body2"
                        sx={{
                          color: "text.black",
                          mt: 1,
                          fontSize: "1rem",
                          lineHeight: "1.6",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Username: {list.username || "N/A"}
                      </Typography> */}

                      {/* <Typography
                        variant="body2"
                        sx={{
                          color: "text.black",
                          mt: 1,
                          fontSize: "1rem",
                          lineHeight: "1.6",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Chatflow Id: {list.chatflow_id}
                      </Typography> */}

                      {/* <Typography
                        variant="body2"
                        sx={{
                          color: "text.black",
                          mt: 1,
                          fontSize: "1rem",
                          lineHeight: "1.6",
                          letterSpacing: "0.5px",
                        }}
                      >
                        ID: {list.id}
                      </Typography> */}

                      <ToastContainer />
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default CardGrid;
