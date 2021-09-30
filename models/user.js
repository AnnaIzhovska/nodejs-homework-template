const mongoose = require('mongoose')
const Joi = require('joi')
const bCrypt = require('bcryptjs')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password required'],
  },
})

userSchema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6))
}

userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password)
}

const joiSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().require(),
    password: Joi.string().min(6).require(),
})

const User = model('user', userSchema)

module.exports = {
    User,
    joiSchema,
}