const Transaction = require('../models/Transaction')


const getAllTransactions = async (req, res) =>{
        
    try {
        const transactions = await Transaction.find({ status: 'pending' })
        .populate('userId', 'fullName idNumber');
        
        console.log(transactions)
        res.status(200).json({
            message: "user transactions retrieved",
            transactions: transactions
        });
    } catch (err) {
        console.error('Error getting posts', err);
        res.status(500).json({ message: 'Server error', error: err });
    }
}

const verifyTransaction = async (req, res) =>{
    try {
        const { id } = req.params;

        // Assuming you have a transaction model
        const transaction = await Transaction.findById({_id: id});
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // Verify transaction logic (example: check account and SWIFT code)
        if (transaction.status == 'verified') {
            return res.status(400).json({ message: 'Transaction already verified' });
        }

        transaction.status = 'verified'; // Mark as verified
        await transaction.save();

        return res.status(200).json({ message: 'Transaction verified and ready for SWIFT submission' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Server error' });
    }
}



module.exports = { getAllTransactions, verifyTransaction }