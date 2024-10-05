const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({ 
    amount: {
        type: Number,
        required: true,
        min: [0, 'Amount must be a positive number'] 
    },
    currency: {
        type: String,
        required: true,
        enum: ['USD', 'ZAR', 'EUR', 'GBP', 'JPY'], 
        default: 'ZAR'
    },
    provider: {
        type: String,
        required: true,
        enum: ['SWIFT', 'Wise', 'PayPal'],
        default: 'SWIFT'
    },
    code: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'verified'], 
        default: 'pending'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User' 
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);
