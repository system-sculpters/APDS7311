const mongoose = require('mongoose')

const loginAttemptSchema = new mongoose.Schema({ 
    username: {
     type: String,
     required: true,
     immutable: true,
     trim: true,
     match: [/^[a-zA-Z0-9_]+$/, 'Only alphanumeric characters and underscores'] 
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