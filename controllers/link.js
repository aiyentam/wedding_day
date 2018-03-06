const express = require('express')
const router = express.Router()

const Images = require('../models/images')

//get photo
router.get('/', (req, res) => {
  Images.find({}).then(photo => {
    res.render('photo/index', { photo })
  })
})

//add photo
router.post('/', (req, res) => {
  Images.create({
    img: req.body.image,
    comment: req.body.comment,
    upload_date: req.body.upload_date
  }).then(photo => {
    res.direct('/photo')
  })
})

router.get('/new', (req, res) => {
  const date = new Date().toDateString()
  res.render('photo/new', { date })
})

//remove photo
router.get('/:id', (req, res) => {
  Images.findOneAndRemove({ _id: req.params.id }).then(() => {
    res.redirect('/photo')
  })
})

router.get('/:id', (req, res) => {
  Images.findOne({ _id: req.params.id }).then(photo => {
    res.render('photo/show', photo)
  })
})

module.exports = router