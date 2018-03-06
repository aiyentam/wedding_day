const express = require('express')
const hbs = require('hbs')
const parser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session')
const morgan = require('morgan')

const app = express()

//controller
const linkController = require('./controllers/link')
const userController = require('./controllers/user')

app.use(express.static('./'));

app.use(morgan('dev'))

app.set("view engine", "hbs")
app.use(parser.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

app.use(flash())

require('./config/passport')(passport)
app.use(session({secret: 'hashing'}))
app.use(passport.initialize())
app.use(passport.session())

app.use(function (req, res, next) {
  res.locals.currentUser = req.user
  next()
})

//home router
app.get("/", (req, res) => {
  res.render("index")
})

app.use('/link', linkController)
app.use('/', userController)

app.listen(8080, () => {
  console.log('testing')
})