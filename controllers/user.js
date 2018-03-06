const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
  res.render("index");
});

//signup
router.get("/signup", (req, res) => {
  res.render("authentication/signup", { message: req.flash("signupMessage") });
});

router.post("/signup", (req, res) => {
  var signupStrategy = passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/signup",
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
    failureRedirect: "/login",
    failureFlash: true
  });
  return loginStrategy(req, res);
});

//logout
router.get("/logout", (req, res) => {
  res.logout();
  res.redirect("/");
});

module.exports = router;
