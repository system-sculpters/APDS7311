// This file/schema was adapted from mongoose
// https://mongoosejs.com/docs/guide.html#:~:text=Everything%20in%20Mongoose%20starts%20with%20a%20Schema.%20Each%20schema%20maps

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({ 
    fullName: {
        type: String,
        required: true,
        trim: true,
        match: [/^[A-Za-z\s]+$/, 'Full name can only contain letters and spaces'] 
    },
    idNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\d{13}$/, 'ID number must be a 13-digit number']
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\d{10}$/, 'Account number must be a 10-digit number'] 
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('User', userSchema) 