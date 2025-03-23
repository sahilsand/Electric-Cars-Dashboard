import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  CircularProgress,
  Button,
  Grid,
  Paper,
  Divider,
} from "@mui/material";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cars/${id}`);
        setCar(res.data);
      } catch (error) {
        console.error("Failed to fetch car details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const infoBox = (label, value) => (
    <Grid item xs={12} sm={6} md={4}>
      <Paper
        elevation={0}
        sx={{
          p: 1,
          height: "100%",
          backgroundColor: "transparent"
        }}
      >
        <Typography color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body1" fontWeight={500}>
          {value ?? "N/A"}
        </Typography>
      </Paper>
    </Grid>
  );

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;
  if (!car) return <Typography variant="h6" sx={{ mt: 4 }}>⚠️ No car found.</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Back Button */}
      <Button variant="contained" onClick={() => navigate("/")} sx={{ mb: 3 }}>
        ← Back to Table
      </Button>
      <Typography variant="h4">
        {car.Brand} {car.Model}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        {infoBox("Top Speed (km/h)", car.TopSpeed_KmH)}
        {infoBox("Range (km)", car.Range_Km)}
        {infoBox("Price (€)", `€${car.PriceEuro}`)}
        {infoBox("Body Style", car.BodyStyle)}
        {infoBox("Power Train", car.PowerTrain)}
        {infoBox("Plug Type", car.PlugType)}
        {infoBox("Rapid Charge", car.RapidCharge)}
        {infoBox("Segment", car.Segment)}
        {infoBox("Seats", car.Seats)}
        {infoBox("Date", car.Date)}
      </Grid>
    </Container>
  );
};

export default CarDetails;
