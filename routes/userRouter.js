const router = require('express').Router()
const UserController = require('../controllers/user')

router.post('/login', UserController.handleUserLogin)
router.post('/register', UserController.handleUserRegister)

module.exports = router
