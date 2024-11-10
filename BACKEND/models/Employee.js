const mongoose = require('mongoose');

// Define the employee schema
const employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\S+@\S+\.\S+$/.test(v);  // Simple email regex
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['employee', 'user'],  // Restrict to specific roles
        default: 'employee'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Employee', employeeSchema);

