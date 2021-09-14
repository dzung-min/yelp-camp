const { Schema, model } = require('mongoose')

const CampSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: 'Title is required',
  },
  location: {
    type: String,
    trim: true,
    required: 'Location is required',
  },
  price: {
    type: Number,
    default: 0,
    min: [0, 'Price must be positive'],
  },
  description: {
    type: String,
    trim: true,
  },
})

module.exports = model('Camp', CampSchema)
