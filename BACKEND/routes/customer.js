// This route implementation was adapted from geeksforgeeks
// https://www.geeksforgeeks.org/express-js-express-router-function/
// gouravhammad
// https://www.geeksforgeeks.org/user/gouravhammad/contributions/?itm_source=geeksforgeeks&itm_medium=article_author&itm_campaign=auth_user

const router = require('express').Router()
const { authMiddleware } = require('../middleware/authMiddleware')
const { getAllUserPayments, createTransaction } = require('../controller/customerController')

router.get('/:id', authMiddleware, getAllUserPayments)

router.post('/:id', authMiddleware, createTransaction)

module.exports = router 