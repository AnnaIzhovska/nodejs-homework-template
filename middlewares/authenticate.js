const {User} = require("../models")
const jwt = require('jsonwebtoken')

const {SECRET_KEY} = process.env 

 const authenticate = async(req, res, next ) => {
     const {autorization} = req.headers
     const [bearer, token] =autorization.sptir(" ")
     if(bearer !== "Bearer"){
         res.status(401).json({
             status: "error",
             code: 401,
             message: "Not autorized",
         })
         return
     }

     try{
         const {_id}} = jwt.verify(token, SECRET_KEY)
         const user = await User.findById(_id)
         if(!user.token){
            res.status(401).json({
                status: "error",
                code: 401,
                message: "Not autorized",
            })
            return
         }
         req.user = user
         next()
     }
     catch(error){
        res.status(401).json({
            status: "error",
            code: 401,
            message: "Not autorized",
        })
        return
    }

 module.exports = authenticate