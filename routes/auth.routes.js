const express = require('express');
const router = express.Router();
const User = require("../models/User.model")

/* GET home page */
router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", async (req, res) => {
    const payload = { ...req.body };
    delete payload.password;
    const salt = bcrypt.genSaltSync(13);
    payload.passwordHash = bcrypt.hashSync(req.body.password, salt);
    try {
      const newUser = await User.create(payload);
      console.log("here is your new user", newUser);
      res.redirect("/auth/login");
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;