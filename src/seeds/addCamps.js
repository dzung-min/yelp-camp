require('dotenv').config()
const mongoose = require('mongoose')
const Camp = require('../models/camp.model')

const { DB_URI } = process.env

mongoose.connect(DB_URI)

mongoose.connection.on('error', () => {
  console.log('MongoDB connection error')
  process.exit(1)
})

const camps = [
  {
    title: 'My Backyard',
    location: 'Hanoi, Vietnam',
    price: 0,
    description: 'Free camp. Sexy girl only',
  },
  {
    title: 'Trang An',
    location: 'Ninh Binh, Vietnam',
    price: 79.99,
    description: 'Beautifull place near Hanoi',
  },
  {
    title: 'Ha Long Bay',
    location: 'Quang Ninh, Vietnam',
    price: 199.99,
    description: '7th wonder of the world',
  },
]

const addCamps = async () => {
  await Camp.deleteMany()
  for (const camp of camps) {
    await Camp.create(camp)
  }
}

addCamps().then(() => {
  mongoose.connection.close()
})
