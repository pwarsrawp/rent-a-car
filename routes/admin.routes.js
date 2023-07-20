const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const Booking = require("../models/Booking.model");
const Car = require("../models/Car.model");
const Branch = require("../models/Branch.model");
const salt = bcrypt.genSaltSync(13);

const {
  isLoggedOut,
  isLoggedIn,
  isAdmin,
} = require("../middleWares/route-protect.js");

const fileUploader = require("../config/cloudinary.config");
router.get("/admin", isLoggedIn, isAdmin, async (req, res, next) => {
  const cars = await Car.find();
  const users = await User.find();
  const bookings = await Booking.find().populate("car").populate("userId");
  const branches = await Branch.find();
  bookings.forEach(async (booking) => {
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

  res.render("admin/admin-profile", {
    bookings,
    users,
    branches,
    cars,
    userid: req.session.currentUser,
  });
});

// BRANCH NEW
router.get("/branch", isLoggedIn, isAdmin, (req, res, next) => {
  res.render("admin/newBranch", { userid: req.session.currentUser });
});

router.post("/branch", (req, res, next) => {
  Branch.create(req.body);

  res.redirect("/admin");
});

// BRANCH EDIT
router.get("/branch/:id/edit", isLoggedIn, isAdmin, async (req, res, next) => {
  const branch = await Branch.findById(req.params.id);
  res.render("admin/editBranch", { branch, userid: req.session.currentUser });
});

router.post("/branch/:id/edit", async (req, res, next) => {
  await Branch.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/admin");
});

// BRANCH DELETE
router.post(
  "/branch/:id/delete",
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    await Branch.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
  }
);

// CAR NEW
router.get("/car", isLoggedIn, isAdmin, (req, res, next) => {
  res.render("admin/newCar", { userid: req.session.currentUser });
});

router.post("/car", fileUploader.single("img"), async (req, res, next) => {
  const payload = { ...req.body };
  payload.img = req.file.path;
  await Car.create(payload);
  res.redirect("/admin");
});

// CAR EDIT
router.get("/car/:id/edit", isLoggedIn, isAdmin, async (req, res, next) => {
  const car = await Car.findById(req.params.id);
  res.render("admin/editCar", { car, userid: req.session.currentUser });
});

router.post(
  "/car/:id/edit",
  fileUploader.single("img"),
  async (req, res, next) => {
    const payload = { ...req.body };
    if (typeof req.file != "undefined") {
      payload.img = req.file.path;
    } else {
      delete payload.img;
    }
    await Car.findByIdAndUpdate(req.params.id, payload);
    res.redirect("/admin");
  }
);

// CAR DELETE
router.post("/car/:id/delete", async (req, res, next) => {
  await Car.findByIdAndDelete(req.params.id);
  res.redirect("/admin");
});

// USER NEW
router.get("/user", isLoggedIn, isAdmin, (req, res, next) => {
  res.render("admin/newUser", { userid: req.session.currentUser });
});

router.post("/user", async (req, res, next) => {
  tempUser = { ...req.body };
  delete tempUser.password;
  tempUser.passwordHash = bcrypt.hashSync(req.body.password, salt);
  try {
    const newUser = await User.create(tempUser);
    res.redirect("/admin");
  } catch (error) {
    console.log("Error creating new user", error);
  }
});

// USER EDIT
router.get("/user/:id/edit", isLoggedIn, isAdmin, async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.render("admin/editUser", { user, userid: req.session.currentUser });
});

router.post("/user/:id/edit", async (req, res, next) => {
  tempUser = { ...req.body };
  if (typeof req.body.newPassword !== "undefined") {
    delete tempUser.password;
    tempUser.passwordHash = bcrypt.hashSync(req.body.newPassword, salt);
    await User.findByIdAndUpdate(req.params.id, tempUser);
  } else {
    delete tempUser.password;
    await User.findByIdAndUpdate(req.params.id, req.body);
  }
  res.redirect("/admin");
});

// USER DELETE
router.post("/user/:id/delete", async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect("/admin");
});

module.exports = router;
