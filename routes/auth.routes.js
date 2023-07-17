//REQUIRED AND VARIABLES
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const Booking = require("../models/Booking.model");
const salt = bcrypt.genSaltSync(13);

const { isLoggedOut, isLoggedIn } = require("../middleWares/route-protect.js");

//SIGN UP GET
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

//SIGN UP POSTTTT
router.post("/signup", async (req, res, next) => {
  tempUser = { ...req.body };
  //console.log("body copy", tempUser);
  delete tempUser.password;
  //console.log("deleted password", tempUser);
  tempUser.passwordHash = bcrypt.hashSync(req.body.password, salt);
  //console.log("after injecting new password", tempUser);
  try {
    const newUser = await User.create(tempUser);
    res.redirect("/login");
  } catch (error) {
    console.log("Error creating new user", error);
  }
});

//LOG IN GET
router.get("/login", isLoggedOut, (req, res, next) => {
  res.render("auth/login");
});

router.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
});

//LOG IN POST
router.post("/login", async (req, res) => {
  try {
    const checkUser = await User.findOne({ username: req.body.username });
    //console.log("checkUser:", checkUser);
    if (checkUser) {
      let doesPasswordMatch = bcrypt.compareSync(
        req.body.password,
        checkUser.passwordHash
      );
      console.log("do they match", doesPasswordMatch);

      if (doesPasswordMatch) {
        checkUser.passwordHash = "****";
        //console.log(req.session)
        req.session.currentUser = checkUser;
        if (checkUser.role === "user") {
          res.redirect("/profile");
        } else {
          res.redirect("/admin");
        }
      } else {
        res.render("auth/login", { errorMessage: "Try again please" });
      }
    } else {
      res.render("auth/login", { errorMessage: "Invalid inputs" });
    }
  } catch (err) {
    console.log(err);
  }
});

//USER PROFILE GET
router.get("/profile", isLoggedIn, async (req, res, next) => {
  const bookings = await Booking.find({
    userId: req.session.currentUser,
  }).populate("car");
  const user = await User.findById(req.session.currentUser);
  //console.log(bookings)
  bookings.forEach((booking) => {
    let date1 = new Date(booking.endDate);
    let date2 = new Date(booking.startDate);
    booking.endDate =
      date1.getDate() +
      " " +
      date1.toLocaleString("en-US", { month: "short" }) +
      " " +
      date1.getFullYear();
    booking.startDate =
      date2.getDate() +
      " " +
      date2.toLocaleString("en-US", { month: "short" }) +
      " " +
      date2.getFullYear();
    booking.total = booking.total.toFixed(2);
  });
  if (req.session.currentUser.role === "admin") {
    res.redirect("/admin");
  } else {
    res.render("users/user-profile", {
      bookings,
      user,
      userid: req.session.currentUser,
    });
  }
});

module.exports = router;
