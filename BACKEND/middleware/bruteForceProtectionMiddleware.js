// This brute force prevention implementation was adapted from medium
// https://medium.com/@animirr/brute-force-protection-node-js-examples-cd58e8bd9b8d#:~:text=It%20implements%20fixed%20window%20algorithm%20for%20limiting%20actions%20by%20key
// Roman Voloboev
// https://medium.com/@animirr

const ExpressBrute = require('express-brute')
const MongooseStore = require('express-brute-mongoose')
const mongoose = require('mongoose')

const bruteForceSchema = new mongoose.Schema({
    _id: String,
    data: {
        count: Number,
        lastRequest: Date,
        firstRequest: Date
    },
    expires: { type: Date, index: { expires: '1d' }}
});

const BruteForceModel = mongoose.model("bruteforce", bruteForceSchema);

const store = new MongooseStore(BruteForceModel);

const bruteForce = new ExpressBrute(store, {
    freeRetries: 2,
    minWait: 1 * 60 * 1000, // 5 minutes
    maxWait: 2 * 60 * 1000, // 1 hour
    failCallback: function (req, res, next, nextValidRequestDate) {
        res.status(429).json({
            message: 'Too many failed attempts. Please try again later.',
            nextValidRequestDate
        });
    }
});

module.exports = { bruteForce };