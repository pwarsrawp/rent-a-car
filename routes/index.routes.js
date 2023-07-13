const express = require("express");
const router = express.Router();

const Car = require("../models/Car.model");
const Branch = require("../models/Branch.model");
const Booking = require("../models/Booking.model");

const {
  isLoggedOut,
  isLoggedIn,
} = require("../middleWares/route-protect.js");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// CAR PAGE
router.get("/cars", async (req, res, next) => {
  try {
    const allCars = await Car.find();
    res.render("cars", { allCars });
    console.log(allCars);
  } catch (error) {
    console.log("There was an error displaying all cars", error);
  }
});
//details car page
router.get("/cars/:id", isLoggedIn, async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    const branches = await Branch.find();
    res.render("car-details", { car, branches });
  } catch (error) {
    console.log("There was an error displaying all cars", error);
  }
});
//booking
router.post("/book/:id", isLoggedIn, async (req, res, next) => {
  //console.log(req.body);
  try {
    const bookInfo = req.body;
    bookInfo.userId = req.session.currentUser;
    bookInfo.car = req.params.id;
    //console.log("bookInfo::", bookInfo);
    const newBook = await Booking.create(bookInfo);
    //res.send(newBook);
    res.redirect("/profile");
  } catch (error) {
    console.log("There was an error displaying all cars", error);
  }
});

module.exports = router;
