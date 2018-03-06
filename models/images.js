const mongoose = require('../db/connection')
const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    require: true
  },
  comment: {
    type: String,
    require: true
  },
  upload_date: {
    type: Date,
    default: Date.now
  } 
})

const Image = mongoose.model('Image', imageSchema)

module.exports = Image