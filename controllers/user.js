const express = require("express");
const router = express.Router();
const passport = require("passport");

//signup
router.get("/signup", (req, res) => {
  res.render("authentication/signup", { message: req.flash("signupMessage") });
});

router.post("/signup", (req, res) => {
  var signupStrategy = passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/authentication/signup",
    failureFlash: true
  });
  return signupStrategy(req, res);
});

//login
router.get("/login", (req, res) => {
  res.render("authentication/login", { message: req.flash("loginMessage") });
});

router.post("/login", (req, res) => {
  var loginStrategy = passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/authentication/login",
    failureFlash: true
  });
  return loginStrategy(req, res);
});

//logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
