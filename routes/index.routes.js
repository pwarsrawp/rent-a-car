const express = require("express");
const router = express.Router();

const Car = require("../models/Car.model");
const Branch = require("../models/Branch.model");
const Booking = require("../models/Booking.model");
const User = require("../models/User.model");
const {
  isLoggedOut,
  isLoggedIn,
} = require("../middleWares/route-protect.js");

// HOME PAGE
router.get("/", (req, res, next) => {
  res.render("index",   { userid:req.session.currentUser});
});

// ALL CARS PAGE
router.get("/cars", async (req, res, next) => {
  try {
    const allCars = await Car.find();
    res.render("cars", { allCars , userid:req.session.currentUser});
  } catch (error) {
    console.log("There was an error displaying all cars", error);
  }
});

// CAR DETAILS PAGE
router.get("/cars/:id", isLoggedIn, async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    const branches = await Branch.find();
    res.render("car-details", { car, branches, userid:req.session.currentUser });
  } catch (error) {
    console.log("There was an error displaying all cars", error);
  }
});

// SINGLE BOOKING
router.post("/book/:id", isLoggedIn, async (req, res, next) => {
  try {
    const {startDate, endDate, branch } =req.body
    if(startDate>=endDate) {
        const car=await Car.findById(req.params.id)
        const branches = await Branch.find();
        res.render('car-details', {car, branches, errorMsg: 'incorrect date'})
    }
    else{
    const notAvailable= await Booking.findOne({car: req.params.id}) 
                              .where('startDate').lt(endDate)
                              .where('endDate').gt(startDate) 
                              .where('branch').equals(branch)

    if(notAvailable) {
      const car=await Car.findById(req.params.id)
      const branches = await Branch.find();
      res.render('car-details', {car, branches, errorMsg: 'not available'})
    } else {
      const bookInfo = req.body;
      bookInfo.userId = req.session.currentUser;
      bookInfo.car = req.params.id;
      const car=await Car.findById(req.params.id)
      
      let date1=new Date(endDate)
      let date2=new Date(startDate)
     let differenceBetweenTwoDates=date1.getTime() - date2.getTime()
      
      bookInfo.total= (differenceBetweenTwoDates/ (1000 * 3600 * 24)) *car.ppd 
      const newBook = await Booking.create(bookInfo);
      res.redirect("/profile");
    }
  }} catch (error) {
    console.log("An error ocurred displaying the list of cars", error);
  }
});


// BOOKING DELETE
router.get('/book/:id/delete', async(req,res)=>{
  await Booking.findByIdAndDelete(req.params.id);
  res.redirect("/profile");
})
router.get("/book/:id", isLoggedIn, async (req, res, next) => {
  const booking= await Booking.findById(req.params.id).populate("car")
  const user=await User.findById(req.session.currentUser) 
    let date1=new Date(booking.endDate)
    let date2=new Date(booking.startDate)
    booking.endDate= date1.getDate() + ' ' + date1.toLocaleString("en-US",{month: 'short'}) + ' ' + date1.getFullYear()
    booking.startDate= date2.getDate() + ' ' + date2.toLocaleString("en-US",{month: 'short'}) + ' ' + date2.getFullYear()
    booking.total=booking.total.toFixed(2) 
  res.render("booking-details", {booking, user,  userid: req.session.currentUser});
});

module.exports = router;
