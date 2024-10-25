const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const Transaction = require('../models/Transaction')
const router = express.Router();

// Example of a transaction verification route
router.post('/verify/:transactionId', authMiddleware, async (req, res) => {
    try {
        const transactionId = req.params.transactionId;

        // Assuming you have a transaction model
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // Verify transaction logic (example: check account and SWIFT code)
        if (transaction.swiftCodeVerified) {
            return res.status(400).json({ message: 'Transaction already verified' });
        }

        transaction.swiftCodeVerified = true; // Mark as verified
        await transaction.save();

        return res.status(200).json({ message: 'Transaction verified and ready for SWIFT submission' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

