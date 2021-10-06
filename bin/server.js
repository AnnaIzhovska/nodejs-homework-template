const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

mongoose.Promise = global.Promise

const app = require('../app')

app.use(
  session({
    secret: 'secret-word',
    key: 'session-key',
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: null,
    },
    saveUninitialized: false,
    resave: false,
  }),
)
require('./config/config-passport')
app.use(passport.initialize())
app.use(passport.session())

const {DB_HOST, PORT= 3000} = process.env

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
.then(() => app.listen(PORT))
.catch(error => {
  console.log(error.message)
  process.exit(1)

})
.then(() => app.listen(PORT))
.catch(error => {
  console.log(error.message)
  process.exit(1)
})

const {DB_HOST, PORT= 3000} = process.env
