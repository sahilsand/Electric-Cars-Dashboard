import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Link } from "react-router-dom";
import {
  CircularProgress,
  Container,
  TextField,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

const DataGridComponent = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const gridRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, [search]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/cars", {
        params: { search },
      });
      setRowData(res.data);
    } catch (error) {
      console.error("❌ API Request Failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setCarToDelete(id);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/cars/${carToDelete}`);
      setRowData((prevData) => prevData.filter((car) => car._id !== carToDelete));
      setSnackbar({ open: true, message: "Car deleted successfully.", severity: "success" });
    } catch (error) {
      console.error("Failed to delete car:", error);
      setSnackbar({ open: true, message: "Failed to delete car.", severity: "error" });
    } finally {
      setOpenConfirm(false);
      setCarToDelete(null);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const clearFilters = () => {
    if (gridRef.current) {
      gridRef.current.api.setFilterModel(null);
    }
  };

  const columns = [
    {
      headerName: "Brand",
      field: "Brand",
      sortable: true,
      filter: true,
      flex: 1,
      cellRenderer: (params) => (
        <Link
          to={`/car/${params.data._id}`}
          style={{ color: "#1976d2", textDecoration: "none", fontWeight: 500 }}
        >
          {params.value}
        </Link>
      ),
    },
    {
      headerName: "Model",
      field: "Model",
      sortable: true,
      filter: true,
      flex: 1,
      cellStyle: {
        whiteSpace: "normal",
        wordBreak: "break-word",
        lineHeight: "1.4",
      },
      autoHeight: true,
    },
    { headerName: "Top Speed (km/h)", field: "TopSpeed_KmH", sortable: true, flex: 1 },
    { headerName: "Range (km)", field: "Range_Km", sortable: true, flex: 1 },
    { headerName: "Price (€)", field: "PriceEuro", sortable: true, flex: 1 },
    {
      headerName: "Action",
      field: "_id",
      flex: 1,
      cellRenderer: (params) => {
        const id = params.data._id;
        return (
          <Box display="flex" gap={1} justifyContent="center">
            <Tooltip title="View">
              <Link to={`/car/${id}`}>
                <IconButton
                  sx={{
                    bgcolor: "#1976d2",
                    color: "white",
                    width: "30px",
                    height: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    "&:hover": { bgcolor: "#1565c0" },
                  }}
                >
                  <VisibilityIcon fontSize="medium" />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => handleDeleteClick(id)}
                sx={{
                  bgcolor: "#d32f2f",
                  color: "white",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  "&:hover": { bgcolor: "#b71c1c" },
                }}
              >
                <DeleteIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Search"
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button
          onClick={clearFilters}
          variant="contained"
          sx={{ ml: 2, height: "100%" }}
        >
          Clear Filters
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : rowData.length > 0 ? (
        <div style={{ width: "100%" }}>
          <AgGridReact
            className="ag-theme-quartz"
            ref={gridRef}
            rowData={rowData}
            columnDefs={columns}
            domLayout="autoHeight"
            pagination={true}
            defaultColDef={{
              cellStyle: {
                display: "flex",
                alignItems: "center",
                textAlign: "left",
              },
            }}
            paginationPageSize={10}
            paginationPageSizeSelector={false}
          />
        </div>
      ) : (
        <p>⚠️ No data available</p>
      )}

      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this car?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>No</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default DataGridComponent;