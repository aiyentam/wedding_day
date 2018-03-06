const express = require("express");
const parser = require("body-parser");
const methodOverride = require("method-override");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const morgan = require("morgan");
const path = require("path");
const multer = require("multer");

//multer engine
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

//image upload
const upload = multer({
  storage: storage
}).array("img");

const app = express();

//controller
const linkController = require("./controllers/link");
const userController = require("./controllers/user");

app.use(express.static("./public"));

app.use(morgan("dev"));

app.set("view engine", "hbs");
app.use(parser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(express.static(".public"));

app.use(flash());

require("./config/passport")(passport);
app.use(
  session({
    secret: "hashing",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

//home router
app.get("/", (req, res) => {
  res.render("index");
});

app.use("/link", linkController);
app.use("/", userController);

app.post("/upload", () => (req, res) => {
  res.send("test");
});

app.listen(8080, () => {
  console.log("testing");
});
