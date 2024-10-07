const Transaction = require('../models/Transaction')

const getAllPayments = async (req, res) =>{
    // This method was adapted from dev
    // https://dev.to/omacys/building-a-basic-crud-api-with-nodejs-mongodb-and-expressjs-a-beginners-tutorial-1mmh#:~:text=In%20this%20tutorial,%20we%20will%20be%20building%20a%20basic%20CRUD
    // Shamsuddeen Omacy
    // https://dev.to/omacys
    
    try {
        const {id} = req.params

        const payment = await Transaction.find({ 'userId': id });
        console.log(payment)
        res.status(200).json({
            message: "user transactions retrieved",
            transactions: payment
        });
    } catch (err) {
        console.error('Error getting posts', err);
        res.status(500).json({ message: 'Server error', error: err });
    }
}

const createTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, currency, provider, code, reciever } = req.body;

        // If provider is undefined, default to 'SWIFT'
        const transactionProvider = provider || 'SWIFT';
        console.log(`amount:${amount}, currency:${currency}, transactionProvider:${transactionProvider}, provider:${provider}, code:${code}`)
        const validationMessage = validateCode(transactionProvider, code);
        if (validationMessage) {
            return res.status(400).json({ message: validationMessage });
        }

        // Create a new transaction
        const newTransaction = new Transaction({ userId: id, amount: amount, currency: currency, provider: transactionProvider, code: code, reciever: reciever });


        // Validate the transaction before saving
        await newTransaction.validate(); // This will run the validation and throw an error if it fails
        await newTransaction.save(); // Save the transaction after validation

        res.status(201).json({ message: "Transaction registered successfully" });
    } catch (err) {
        console.log(`Something went wrong: ${err}`);
        res.status(500).json({ message: 'Server error', error: err });
    }
};


const validateCode = (provider, code) => {
    // This mesthod was adapted from plainenglish
    // https://plainenglish.io/blog/learn-to-use-regular-expressions-like-a-ninja-in-node-js-20cfb6806f26
    // Petros Koulianos
    // https://plainenglish.io/author/petros-koulianos
    
    // Define regex patterns for each provider
    const swiftPattern = /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
    const wisePattern = /^[A-Z0-9]{8,11}$/; // Example: Wise code pattern
    const paypalPattern = /^[A-Z0-9]{13}$/; // Example: PayPal code pattern

    // Validate based on provider and return appropriate messages
    if (provider === 'SWIFT') {
        if (!swiftPattern.test(code)) {
            return "SWIFT codes must be 8 to 11 characters long, beginning with 4 letters representing the bank, followed by 2 letters for the country, 2 alphanumeric characters for the location, and optionally 3 alphanumeric characters for the branch.";
        }
    } else if (provider === 'Wise') {
        if (!wisePattern.test(code)) {
            return "Wise codes must be between 8 and 11 alphanumeric characters.";
        }
    } else if (provider === 'PayPal') {
        if (!paypalPattern.test(code)) {
            return "PayPal codes must be exactly 13 alphanumeric characters.";
        }
    }
    return null; // If valid or provider is unknown
}

module.exports = { getAllPayments, createTransaction }