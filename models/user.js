const mongoose = require('mongoose')
const Joi = require('joi')
const bCrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
  token: {
    type: String,
    default: null,
  },
})

userSchema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6))
}

userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password)
}

const {SECRET_KEY} = process.env

userSchema.methods.createToken = function(){
  const payload ={
    _id: this._id
  }
  return jwt.sign(payload, SECRET_KEY)
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