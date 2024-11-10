const express = require('express');
const { authMiddleware, verifyEmployee } = require('../middleware/authMiddleware');
const { getAllTransactions, verifyTransaction } = require('../controller/transactionController')
const router = express.Router();

router.get('/', authMiddleware, verifyEmployee, getAllTransactions)

router.put('/:id/verify', authMiddleware, verifyEmployee, verifyTransaction )

module.exports = router;

