const express = require("express");
const router = express.Router();
const Images = require("../models/images");
const path = require("path");
const multer = require("multer");

//multer engine
const storage = multer.diskStorage({
  destination: "public/uploads",
  filename: function(req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function(req, file, callback) {
    checkFileType(file, callback);
  }
}).single("uploadedImages");

function checkFileType(file, callback) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return callback(null, true);
  } else {
    callback("This is not an Image file.");
  }
}

//gallery
router.post("/upload", (req, res) => {
  upload(req, res, err => {
    if (err) {
      console.log("There was an error saving your picture: " + err);
      res.redirect("/photo/new");
    } else {
      if (req.file == undefined) {
        console.log("Your picture has not been saved!");
        res.redirect("/photo/new");
      } else {
        console.log(req.file.filename);
        Images.create({
          imageUrl: req.file.filename,
          upload_date: new Date()
        }).then(photo => {
          console.log("Your picture has been saved!");
          res.redirect("/photo/show");
        });
      }
    }
  });
});

router.get("/new", (req, res) => {
  res.render("gallery/new");
});

router.get("/show", (req, res) => {
  Images.find({}).then(photos => {
    console.log(photos);
    res.render("gallery/show", { photos: photos });
  });
});

router.get("/edit/:id", (req, res) => {
  Images.findOne({ _id: req.params.id }).then(comment => {
    console.log(comment);
    res.render("gallery/edit", { results: comment });
  });
});

router.post("/:id", (req, res) => {
  console.log(req.params);
  Images.findOneAndUpdate(
    { _id: req.params.id },
    { comment: req.body.comment }
  ).then(photo => {
    res.redirect("/photo/show");
  });
});

router.delete("/:id", (req, res) => {
  Images.findOneAndRemove({ _id: req.params.id }).then(photo => {
    res.redirect("/photo/show");
  });
});

module.exports = router;
