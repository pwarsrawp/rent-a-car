const express = require('express');
const router = express.Router();

const Car = require("../models/Car.model");
const Branch = require("../models/Branch.model");


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
//details car page
router.get("/cars/:id", async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    const branches = await Branch.find();
    res.render("car-details", {car, branches});
  } catch(error) {
    console.log("There was an error displaying all cars", error)
  }
  
});
//booking
router.post("/book/:id", async (req, res, next) => {

  console.log(req.params)
  try {

    const car = await Car.findById(req.params.id);
   // res.render("car-details", {car});
   res.send(req.body)
  } catch(error) {
    console.log("There was an error displaying all cars", error)
  }
  
});

module.exports = router;
