const express = require("express");
const router = express.Router();

const Images = require("../models/images");

//get photo
router.get("/", (req, res) => {
  Images.find({}).then(photo => {
    res.render("index", { photo });
  });
});

//images
router.post("/new", (req, res) => {
  Images.create({
    img: req.body.image,
    comment: req.body.comment,
    upload_date: req.body.upload_date
  }).then(photo => {
    res.redirect("gallery/photo");
  });
});

router.get("/new", (req, res) => {
  const date = new Date().toDateString();
  res.render("gallery/new", { date });
});

router.get("/edit/:id", (req, res) => {
  Images.findOne({ _id: req.params.id }).then(photo => {
    res.render("edit", photo);
  });
});

router.put("/:id", (req, res) => {
  Images.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).then(
    photo => {
      res.redirect("/photo");
    }
  );
});

router.delete("/:id", (req, res) => {
  Images.findOneAndRemove({ _id: req.params.id }).then(() => {
    res.redirect("/photo");
  });
  s;
});

router.get("/:id", (req, res) => {
  Images.findOne({ _id: req.params.id }).then(photo => {
    res.render("show", photo);
  });
});

module.exports = router;
