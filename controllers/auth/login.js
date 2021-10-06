const {User} = require('../../models')
const {NotFound, BadRequest} = require('http-errors')
const bCrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {SECRET_KEY} = process.env

const { sendSuccessRes } = require('../../helpers');

const login = async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email}, '_id email password')
    if(!user){
        throw new NotFound(`Email ${email} not found`)
    }
    if(!user.validPassword(password)){
        throw new BadRequest('Invalid password')
    }

    const {_id} = user
    const payload = {
        _id
      }

      const token = jwt.sign(payload, SECRET_KEY)
      await User.findByIdAndUpdate(user._id, {token})
    res.json({
        status: 'success'
        code: 200
        data: {
            token
        }
    })
}

module.exports = login