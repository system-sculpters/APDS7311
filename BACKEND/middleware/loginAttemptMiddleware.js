const LoginAttempt = require('../models/LoginAttempt')

const loginAttemptLogger = async (req, res, next) => {
    const originalJson = res.json;
    res.json = function(data) {
        const username = req.body.username;
        const ipAddress = req.id || req.connection.remoteAddress;
        const successfulLogin = !data.message || data.message !== "Invalid credentials";

        LoginAttempt.create({ username, ipAddress, successfulLogin })
        .catch(err => console.error("Error loggin login attempt:", err));

        originalJson.call(this, data);
    };
    next();
};

module.exports = { loginAttemptLogger }