const express = require('express');
const router = express.Router();

const Car = require("../models/Car.model");



/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// CAR PAGE
router.get("/cars", async (req, res, next) => {
  try {
    const allCars = await Car.find();
    res.render("cars", {allCars});
    console.log(allCars)
  } catch(error) {
    console.log("There was an error displaying all cars", error)
  }
  
});


module.exports = router;
