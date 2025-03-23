const mongoose = require("mongoose");
const csvtojson = require("csvtojson");
const Car = require("./models/car");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

async function importCSV() {
  try {
    const filePath = "./BMW_Aptitude_Test_Test_Data_ElectricCarData.csv";

    console.log("📂 Reading CSV file...");
    const cars = await csvtojson().fromFile(filePath);
    
    if (cars.length === 0) {
      console.log("⚠️ No data found in the CSV file.");
      return;
    }

    // Check for duplicates before inserting
    const existingCars = await Car.countDocuments();
    if (existingCars > 0) {
      console.log(`⚠️ Skipping import. Database already contains ${existingCars} records.`);
      return;
    }

    // Insert Data
    const result = await Car.insertMany(cars);
    console.log(`✅ Imported ${result.length} cars into the database.`);

  } catch (error) {
    console.error("❌ Error importing CSV data:", error);
  } finally {
    mongoose.disconnect();
  }
}

importCSV();
