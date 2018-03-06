const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/wedding_day")

mongoose.Promise = Promise

module.exports = mongoose