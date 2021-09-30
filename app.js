const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const AuthRouter = require('./routes/api/auth')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/auth', AuthRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const {status = 500, message = 'Server error'} = err
  res.status(status).json({ message })
})

const {DB_HOST, PORT = 3000} = process.env

mongoose.conect(DB_HOST,{
  useNewUrlParses: true,
  useUnifiedTopology: true,
}).then(() => app.listen(PORT))
.catch( error => {
  console.log(error.message)
  process.exit(1)
})

module.exports = app

// AnnaIz
// anna091195