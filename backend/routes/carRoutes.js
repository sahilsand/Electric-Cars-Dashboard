const express = require("express");
const { getCars, getCarById, deleteCar } = require("../controllers/carController");

const router = express.Router();

router.get("/cars", getCars);
router.get("/cars/:id", getCarById);
router.delete("/cars/:id", deleteCar);

module.exports = router;
