const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const Booking = require("../models/Booking.model");
const Car = require("../models/Car.model");
const Branch = require("../models/Branch.model");
const salt = bcrypt.genSaltSync(13);

const { isLoggedOut, isLoggedIn, isAdmin } = require("../middleWares/route-protect.js");

const fileUploader = require('../config/cloudinary.config');
router.get("/admin", isLoggedIn, isAdmin, async (req, res, next) => {
    const cars = await Car.find()
    const users = await User.find()
    const bookings = await Booking.find().populate('car').populate('userId')
    const branches = await Branch.find()
    bookings.forEach(async booking => {
      let date1=new Date(booking.endDate)
      let date2=new Date(booking.startDate)
      booking.endDate= date1.getDate() + ' ' + date1.toLocaleString("en-US",{month: 'short'}) + ' ' + date1.getFullYear()
      booking.startDate= date2.getDate() + ' ' + date2.toLocaleString("en-US",{month: 'short'}) + ' ' + date2.getFullYear()
      booking.total=booking.total.toFixed(2)

    });
    
    
   
   
    res.render("admin/admin-profile", {bookings, users, branches, cars, userid: req.session.currentUser});
  });
//new branch form
  router.get("/branch", isLoggedIn, isAdmin, async (req, res, next) => {
    
    res.render('admin/newBranch')
  
  })
  router.post("/branch", async (req, res, next) => {
    

    Branch.create(req.body)

    res.redirect('/admin')
  
  })
  router.get("/branch/:id/edit", isLoggedIn, isAdmin, async (req, res, next) => {

    const branch=await Branch.findById(req.params.id)  
    
    res.render('admin/editBranch', {branch})
  
  })
  router.post("/branch/:id/edit", async (req, res, next) => {

    await Branch.findByIdAndUpdate(req.params.id, req.body)  
    
    res.redirect('/admin')
  
  })
  router.post("/branch/:id/delete", isLoggedIn, isAdmin, async (req, res, next) => {
    
   await Branch.findByIdAndDelete(req.params.id)  

    res.redirect('/admin')
  
  })

  /* make a new car */
  router.get("/car", isLoggedIn, isAdmin, async (req, res, next) => {
    
    res.render('admin/newCar', {userid: req.session.currentUser})
  
  })
  router.post("/car", fileUploader.single('img'), async (req, res, next) => {
    
    const payload={...req.body}
    payload.img=req.file.path 
    Car.create(payload)

    res.redirect('/admin')
  
  })
  router.get("/car/:id/edit", isLoggedIn, isAdmin, async (req, res, next) => {

    const car=await Car.findById(req.params.id)  
    
    res.render('admin/editCar', {car})
  
  })
  router.post("/car/:id/edit", fileUploader.single('img'), async (req, res, next) => {

    const payload={...req.body}
    if(typeof req.file != 'undefined') {
      payload.img=req.file.path 
    } else{
    delete payload.img
    }
      
    await Car.findByIdAndUpdate(req.params.id, payload)
    
   
    res.redirect('/admin')
  
  })

  router.post("/car/:id/delete",  async (req, res, next) => {
    
    await Car.findByIdAndDelete(req.params.id)  
 
     res.redirect('/admin')
   
   })
  module.exports = router;