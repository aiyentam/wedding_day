const mongoose = require('mongoose')

//connecting to mLab
// if (process.env.NODE_ENV === 'production') {
//   mongoose.connect(process.env.MLAB_URL)
// } else {
//   mongoose.connect("mongodb://localhost/wedding_day")
// }

mongoose.connect("mongodb://localhost/wedding_day")

mongoose.Promise = Promise

module.exports = mongoose