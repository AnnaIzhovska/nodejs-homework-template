const {User} = require('../../models')

const logout = async(req, res) => {
    const {_id} = req.User
    await User.findByIdAndUpdate(_id, {token: null})
    res.json({
        status: 'succes',
        coe: 200,
        message: 'Succes logout'
    })
}

module.exports = logout