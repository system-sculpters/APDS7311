// This route implementation was adapted from geeksforgeeks
// https://www.geeksforgeeks.org/express-js-express-router-function/
// gouravhammad
// https://www.geeksforgeeks.org/user/gouravhammad/contributions/?itm_source=geeksforgeeks&itm_medium=article_author&itm_campaign=auth_user

const router = require('express').Router()
const { bruteForce } = require('../middleware/bruteForceProtectionMiddleware')
const { loginAttemptLogger, employeeLoginAttemptLogger } = require('../middleware/loginAttemptMiddleware')
const { register, registerEmployee, login, employeeLogin } = require('../controller/authController')

router.post('/register', register)

router.post('/employee-register', registerEmployee)

router.post('/login', bruteForce.prevent, loginAttemptLogger, login)

router.post('/employee-login', bruteForce.prevent, employeeLoginAttemptLogger, employeeLogin)

module.exports = router 