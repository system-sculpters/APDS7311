const router = require('express').Router()
const { authMiddleware } = require('../middleware/authMiddleware')
const { getAllPayments, createTransaction } = require('../controller/customerController')

router.get('/:id', authMiddleware, getAllPayments)

router.post('/:id', authMiddleware, createTransaction)

module.exports = router 