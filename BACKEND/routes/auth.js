const router = require('express').Router()
const { bruteForce } = require('../middleware/bruteForceProtectionMiddleware')
const { loginAttemptLogger } = require('../middleware/loginAttemptMiddleware')
const { register, login } = require('../controller/authController')

router.post('/register', register)

router.post('/login', bruteForce.prevent, loginAttemptLogger, login)

module.exports = router 