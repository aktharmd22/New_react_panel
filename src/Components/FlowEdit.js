import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TextField,
  TableSortLabel,
  TablePagination,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edit, Delete ,} from "@mui/icons-material";
import CancelIcon from '@mui/icons-material/Cancel';
import Cookies from 'js-cookie';

const FlowTable = () => {
  const [flows, setFlows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("flow_name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  const userData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://ci4backend.smartyuppies.com/chatbotflow/${userData.phone_number_id}`
        );
        const data = await response.json();
        setFlows(data.FlowName || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setFlows([]);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (flowId, phoneNumberId) => {
    const data = {
      chatflow_id: flowId,
      phone_number_id: phoneNumberId,
    };

    try {
      const response = await fetch(
        "https://ci4backend.smartyuppies.com/showchatflow",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const responseBody = await response.json();
      navigate("/Edit-Keyword-Automation", {
        state: { responseData: responseBody },
      });
    } catch (error) {
      console.error("Error updating flow:", error);
      toast.error("Error updating flow");
    }
  };

  const handleDeleteClick = async (flowId) => {
    if (!window.confirm("Are you sure you want to delete this flow?")) {
      return;
    }

    try {
      const response = await fetch(
        `https://ci4backend.smartyuppies.com/delete/${flowId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      setFlows((prevFlows) => prevFlows.filter((flow) => flow.id !== flowId));
      toast.success("Flow deleted successfully.");
    } catch (error) {
      console.error("Error deleting flow:", error);
      toast.error("Error deleting flow. Please try again later.");
    }
  };

  const handleFlow = () => {
    navigate("/Keyword-Automation");
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredFlows = flows.filter(
    (flow) =>
      flow.flow_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flow.flow_start_keyword.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedFlows = [...filteredFlows].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return sortDirection === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedFlows = sortedFlows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleClear = () => {
    setSearchTerm('');
  };
  return (
    <Box sx={{ margin: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      <button
        variant="contained"
        color="success" // Green color
       className="bg-green-500 p-2  text-white mb-4 rounded hover:bg-green-800"
        onClick={handleFlow}
      >
        Create Flow
      </button>
      <div style={{ position: "relative" }}>
        <input
          placeholder="Search..."
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 lg:mb-0 focus:ring-none p-2 bg-gray-100 rounded-lg border- border border-gray-200 focus:outline-gray-300"

        />
        {searchTerm && (
          <IconButton
            onClick={handleClear}
            style={{
              position: "absolute",
              top: "40%",
              right: "0.5rem",
              transform: "translateY(-50%)",
              color:'red',
    
            }}
          >
            <CancelIcon />
          </IconButton>
        )}
      </div>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: "#e8f5e9" }}>
            <TableRow>
              <TableCell sx={{ fontSize: "1rem", textAlign: "center" }}>
                S.No
              </TableCell>{" "}
              {/* Serial Number Header */}
              <TableCell sx={{ fontSize: "1rem", textAlign: "center" }}>
                <TableSortLabel
                  active={orderBy === "flow_name"}
                  direction={orderBy === "flow_name" ? sortDirection : "asc"}
                  onClick={() => handleRequestSort("flow_name")}
                  sx={{
                    fontSize: "1rem",
                    color: "#388e3c",
                    textAlign: "center",
                  }} // Green color
                >
                  Flow Name
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontSize: "1rem", textAlign: "center" }}>
                <TableSortLabel
                  active={orderBy === "flow_start_keyword"}
                  direction={
                    orderBy === "flow_start_keyword" ? sortDirection : "asc"
                  }
                  onClick={() => handleRequestSort("flow_start_keyword")}
                  sx={{
                    fontSize: "1rem",
                    
                    textAlign: "center",
                  }} // Green color
                >
                  Start Keyword
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontSize: "1rem", textAlign: "center" }}>
                <TableSortLabel
                  active={orderBy === "document_type"}
                  direction={
                    orderBy === "document_type" ? sortDirection : "asc"
                  }
                  onClick={() => handleRequestSort("document_type")}
                  sx={{
                    fontSize: "1rem",
                    
                    textAlign: "center",
                  }} // Green color
                >
                  Document type
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontSize: "1rem" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedFlows.length > 0 ? (
              paginatedFlows.map((flow, index) => (
                <TableRow key={flow.id}>
                  <TableCell sx={{ fontSize: "1rem", textAlign: "center" }}>
                    {index + 1}
                  </TableCell>{" "}
                  {/* Serial Number */}
                  <TableCell sx={{ fontSize: "1rem", textAlign: "center" }}>
                    {flow.flow_name}
                  </TableCell>
                  <TableCell sx={{ fontSize: "1rem", textAlign: "center" }}>
                    {flow.flow_start_keyword}
                  </TableCell>
                  <TableCell sx={{ fontSize: "1rem", textAlign: "center" }}>
                    {flow.document_type}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.8rem" }}>
                    <IconButton
                      onClick={() =>
                        handleUpdate(flow.id, flow.phone_number_id)
                      }
                      sx={{
                        fontSize: "0.8rem",
                        color: "#fff",
                        backgroundColor: "#388e3c",
                        "&:hover": {
                          backgroundColor: "#2c6c2f",
                        },
                        mr: 1,
                        padding: "6px",
                      }}
                    >
                      <Edit />
                    </IconButton>

                    <IconButton
                      onClick={() => handleDeleteClick(flow.id)}
                      sx={{
                        fontSize: "0.8rem",
                        backgroundColor: "#d32f2f",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#b71c1c",
                        },
                        padding: "6px",
                       
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5} // Update colSpan to account for the new S.No column
                  align="center"
                  sx={{ fontSize: "1rem" }}
                >
                  No flows available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredFlows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ fontSize: "1rem" }}
      />
      <ToastContainer />
    </Box>
  );
};

export default FlowTable;
