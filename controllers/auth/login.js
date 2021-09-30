const {User} = require('../../models')
const {NotFound, BadRequest} = require('http-errors')
const bCrypt = require('bcryptjs')

const login = async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email}, '_id email password')
    if(!user){
        throw new NotFound(`Email ${email} not found`)
        // res.status(404).json({
        //     status: 'error',
        //     code: 404,
        //     message: `Email ${email} not found`
        // })
        // return 
    }
    if(!user.validPassword(password)){
        throw new BadRequest('Invalid password')
    }
    // if(!bCrypt.compareSync(password, user.password)){
    //     throw new BadRequest('Invalid password')
    //     // res.status(400).json({
    //     //     status: 'error',
    //     //     code: 400,
    //     //     message: 'Invalid password'
    //     // })
    //     // return
    // }

    // if(!user || !user.validPassword(password)){
    //     throw new BadRequest('Invalid email or password')
    // }

    const token  = 'hygtrfedwsa.hygtfredws.hygtfrdesw'
    res.json({
        status: 'success'
        code: 200
        data: {
            token
        }
    })
}

module.exports = login