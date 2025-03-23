import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, AppBar, Toolbar, Typography, Box } from "@mui/material";
import DataGridComponent from "./components/DataGridComponent";
import CarDetails from "./components/CarDetails";
import BMWLogo from "./Images/bmw-logo.svg";
import "./App.css";

function App() {
  return (
    <Router>
      <AppBar position="static" sx={{ bgcolor: "primary" }}>
        <Toolbar>
          {/* BMW Logo */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <Box
              component="img"
              src={BMWLogo}
              alt="BMW Logo"
              sx={{ width: 60, height: 60, mr: 2, cursor: "pointer" }}
            />
          </Link>

          {/* Title */}
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            BMW Electric Cars
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        <Routes>
          <Route path="/" element={<DataGridComponent />} />
          <Route path="/car/:id" element={<CarDetails />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
