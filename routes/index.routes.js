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
  res.render("index",   { userid:req.session.currentUser});
});

// CAR PAGE
router.get("/cars", async (req, res, next) => {
  try {
    const allCars = await Car.find();
    res.render("cars", { allCars , userid:req.session.currentUser});

  } catch (error) {
    console.log("There was an error displaying all cars", error);
  }
});
//details car page
router.get("/cars/:id", isLoggedIn, async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    const branches = await Branch.find();
    res.render("car-details", { car, branches, userid:req.session.currentUser });
  } catch (error) {
    console.log("There was an error displaying all cars", error);
  }
});
//booking
router.post("/book/:id", isLoggedIn, async (req, res, next) => {
  //console.log(req.body);
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
    }
    else{

      const bookInfo = req.body;
      bookInfo.userId = req.session.currentUser;
      bookInfo.car = req.params.id;
      const car=await Car.findById(req.params.id)
      
      let date1=new Date(endDate)
      let date2=new Date(startDate)
     let differenceBetweenTwoDates=date1.getTime() - date2.getTime()
      
      bookInfo.total= (differenceBetweenTwoDates/ (1000 * 3600 * 24)) *car.ppd 
      //console.log("bookInfo::", bookInfo);
      const newBook = await Booking.create(bookInfo);
      //res.send(newBook);
      res.redirect("/profile");
    }

    }
  } catch (error) {
    console.log("There was an error displaying all cars", error);
  }
});
//delete booking 
router.get('/book/:id/delete', async(req,res)=>{

  await Booking.findByIdAndDelete(req.params.id);
  res.redirect("/profile");
})


module.exports = router;
