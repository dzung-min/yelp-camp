require('dotenv').config()
const mongoose = require('mongoose')

const { DB_URI } = process.env

mongoose.connect(DB_URI)

module.exports = (app, port) => {
  mongoose.connection
    .on('error', () => {
      console.log('MongoDB connection error')
      process.exit(1)
    })
    .once('open', () => {
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
      })
    })
}
