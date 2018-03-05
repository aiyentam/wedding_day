const express = require('express')
const hbs = require('hbs')
const parser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const passport = require('passport')

const app = express()

const weddingController = require('./controllers/wedding')

app.set("view engine", "hbs")
app.use(parser.urlencoded({ extended: true }))
app.use(methodOverride("method"))

app.get("/", (req, res) => {
  res.render("index")
})

