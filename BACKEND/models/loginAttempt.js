// This file/schema was adapted from mongoose
// https://mongoosejs.com/docs/guide.html#:~:text=Everything%20in%20Mongoose%20starts%20with%20a%20Schema.%20Each%20schema%20maps

const mongoose = require('mongoose')

const loginAttemptSchema = new mongoose.Schema({ 
    accountNumber: {
      type: String,
      required: true,
      immutable: true,
      unique: true,
      trim: true, 
      match: [/^\d{10}$/, 'Account number must be a 10-digit number'] 
    },
    ipAddress: {
      type: String,
      required: true,
      immutable: true,
     },
    successfulLogin: {
      type: Boolean,
      required: true,
      immutable: true,
     },
    timestamp: { 
      type: Date, 
      default: Date.now,
      immutable: true 
    } 
  })
  
  module.exports = mongoose.model("LoginAttempt", loginAttemptSchema);