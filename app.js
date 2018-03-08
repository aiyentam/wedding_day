const express = require("express");
const parser = require("body-parser");
const methodOverride = require("method-override");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.use(morgan("dev"));

//view engine, bodyparser, methodOverride
app.set("view engine", "hbs");
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//static folder
app.use(express.static(path.join(__dirname, "public")));

//passport & flash
app.use(session({ secret: "hashing" }));
app.use(flash());

require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

//path
app.get("/", (req, res) => {
  res.render("index");
});

//controllers
const linkController = require("./controllers/link");
app.use("/photo", linkController);

const userController = require("./controllers/user");
app.use("/authentication", userController);

app.all("/secret", function(req, res, next) {
  console.log("Accessing the secret page ...");
  next();
});

app.set("port", process.env.PORT || 8080);
app.listen(app.get("port"), () =>
  console.log(`Server is running ${app.get("port")}`)
);
