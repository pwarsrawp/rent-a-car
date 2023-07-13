//REQUIRED AND VARIABLES
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const salt = bcrypt.genSaltSync(13);

const { isLoggedOut, isLoggedIn } = require("../middleWares/route-protect.js");



//SIGN UP GET
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

//SIGN UP POST
router.post("/signup", async (req, res, next) => {
  tempUser = { ...req.body };
  console.log("body copy", tempUser);
  delete tempUser.password;
  console.log("deleted password", tempUser);
  tempUser.passwordHash = bcrypt.hashSync(req.body.password, salt);
  console.log("after injecting new password", tempUser);
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

//LOG IN POST
router.post("/login", async (req, res) => {
    try {
      const checkUser = await User.findOne({ username: req.body.username });
       console.log("checkUser:", checkUser);
      if (checkUser) {
        let doesPasswordMatch = bcrypt.compareSync(
          req.body.password,
          checkUser.passwordHash
        );
        console.log("do they match", doesPasswordMatch);
        
        if (doesPasswordMatch) {
          checkUser.passwordHash = "****";
          console.log(req.session)
          req.session.currentUser = checkUser;
          res.render("users/user-profile", {checkUser});
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
router.get("/profile", isLoggedIn, (req, res, next) => {
    res.render("users/user-profile");
  });

module.exports = router;
