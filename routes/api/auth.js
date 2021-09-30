const express = require('express')

const {controllerWrape, validation} = require('../../middlewares')
const {auth:ctrl} = require('../../controllers')
const router = express.Router()
const {joiSchema} = require('../../models/user')

router.post('/users/signup', validation(joiSchema), controllerWrape(ctrl.singup))

router.post('/users/login', validation(joiSchema), controllerWrape(ctrl.login))

router.get('/logout', controllerWrape(ctrl.logout))


module.exports = router;