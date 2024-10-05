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