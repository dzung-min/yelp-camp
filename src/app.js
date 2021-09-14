require('dotenv').config()
const express = require('express')
const layout = require('express-ejs-layouts')
const methodOverride = require('method-override')
const path = require('path')

const connectDb = require('./db.cfg')
const campRouter = require('./routers/camp.router')

const ENV = process.env.NODE_ENV || 'development'
const PORT = process.env.PORT || 5000
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('layout', 'layouts/main')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(layout)
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.render('pages/home')
})

app.use('/camps', campRouter)

connectDb(app, PORT)
