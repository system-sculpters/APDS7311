const LoginAttempt = require('../models/loginAttempt')
const EmployLoginAttempt = require('../models/EmployLoginAttempt')

const loginAttemptLogger = async (req, res, next) => {
    // This method was adapted from medium
    // https://medium.com/@animirr/brute-force-protection-node-js-examples-cd58e8bd9b8d#:~:text=It%20implements%20fixed%20window%20algorithm%20for%20limiting%20actions%20by%20key
    // Roman Voloboev
    // https://medium.com/@animirr
    const originalJson = res.json;
    res.json = function(data) {
        const accountNumber = req.body.accountNumber;
        const ipAddress = req.id || req.connection.remoteAddress;
        const successfulLogin = !data.message || data.message !== "Invalid credentials";

        LoginAttempt.create({ accountNumber, ipAddress, successfulLogin })
        .catch(err => console.error("Error loggin login attempt:", err));

        originalJson.call(this, data); 
    };
    next();
};


const employeeLoginAttemptLogger = async (req, res, next) => {
    // This method was adapted from medium
    // https://medium.com/@animirr/brute-force-protection-node-js-examples-cd58e8bd9b8d#:~:text=It%20implements%20fixed%20window%20algorithm%20for%20limiting%20actions%20by%20key
    // Roman Voloboev
    // https://medium.com/@animirr
    const originalJson = res.json;
    res.json = function(data) {
        const email = req.body.email;
        const ipAddress = req.id || req.connection.remoteAddress;
        const successfulLogin = !data.message || data.message !== "Invalid credentials";
 
        EmployLoginAttempt.create({ email, ipAddress, successfulLogin })
        .catch(err => console.error("Error loggin login attempt:", err));

        originalJson.call(this, data); 
    };
    next();
};

module.exports = { loginAttemptLogger, employeeLoginAttemptLogger }