const {User} = require('../../models')
const {Conflict} = require('http-errors')
const bCrypt = require('bcryptjs')

const singup = async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(user){
        throw new Conflict('Already singup')
        /
        // res.status(409).json({
        //     status: 'error',
        //     code: 409,
        //     message: 'Already singup'
        // })
        // return
    }
    
    const hashPassword = bCrypt.hashSync(password, bCrypt.genSaltSync(6))
    console.log(hashPassword)

    const newUser = {email, password: hashPassword}

    await User.create(newUser)
    res.status(201).json({
        status: 'succes',
        code: 201,
        message: 'Sucess register',
    })
}

module.exports = singup
