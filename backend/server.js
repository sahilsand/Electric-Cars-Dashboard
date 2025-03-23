require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const carRoutes = require("./routes/carRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", carRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
