const Car = require("../models/car");

// Fetch all cars with search & filtering
exports.getCars = async (req, res) => {
  const { search, filterField, filterValue } = req.query;
  let query = {};

  if (search) {
    query["$or"] = [
      { Brand: new RegExp(search, "i") },
      { Model: new RegExp(search, "i") },
    ];
  }

  if (filterField && filterValue) {
    query[filterField] = new RegExp(filterValue, "i");
  }

  const cars = await Car.find(query);
  res.json(cars);
};

// Fetch a single car by ID
exports.getCarById = async (req, res) => {
  const car = await Car.findById(req.params.id);
  res.json(car);
};

// Delete a car
exports.deleteCar = async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.json({ message: "Car deleted" });
};
