const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const Booking = require("../models/Booking.model");
const Car = require("../models/Car.model");
const Branch = require("../models/Branch.model");
const salt = bcrypt.genSaltSync(13);

const { isLoggedOut, isLoggedIn, isAdmin } = require("../middleWares/route-protect.js");


router.get("/admin", isLoggedIn, isAdmin, async (req, res, next) => {
    const cars = await Car.find()
    const users = await User.find()
    const bookings = await Booking.find().populate('car')
    const branches = await Branch.find()
    bookings.forEach(booking => {
      let date1=new Date(booking.endDate)
      let date2=new Date(booking.startDate)
      booking.endDate= date1.getDate() + ' ' + date1.toLocaleString("en-US",{month: 'short'}) + ' ' + date1.getFullYear()
      booking.startDate= date2.getDate() + ' ' + date2.toLocaleString("en-US",{month: 'short'}) + ' ' + date2.getFullYear()
      booking.total=booking.total.toFixed(2)
      booking.user = User.findById( booking.userId );
      currentUser = User.findById(booking.userId)
      console.log(booking.user)
    });
    
    
   
   
    res.render("admin/admin-profile", {bookings, users, branches, cars, userid: req.session.currentUser});
  });

  module.exports = router;