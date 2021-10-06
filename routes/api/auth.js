const express = require('express')

const {controllerWrape, validation, authenticate} = require('../../middlewares')
const {auth:ctrl} = require('../../controllers')
const {joiSchema} = require('../../models/user')

const router = express.Router()

router.post('/users/signup', validation(joiSchema), controllerWrape(ctrl.singup))

router.post('/users/login', validation(joiSchema), controllerWrape(ctrl.login))

router.get('/users/logout', authenticate, controllerWrape(ctrl.logout))

router.get("/users/current", authenticate, controllerWrapper(ctrl.current));

module.exports = router;