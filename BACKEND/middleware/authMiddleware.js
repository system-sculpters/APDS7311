const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    // This method was adapted from dev
    // https://dev.to/cyberwolves/node-js-api-authentication-with-jwt-json-web-token-auth-middleware-ggm#:~:text=Hi,%20Today%20we%20are%20going%20to%20implement%20API%20authentication%20with
    // cyberwolves
    // https://dev.to/cyberwolves

    console.log('Request Headers:', req.headers);

    const authHeader = req.header('Authorization');
    console.log('Authorization Header:', authHeader);

    if (!authHeader) {
        return res.status(401).json({ message: 'No authorization header, access denied' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Authorization header format must be "Bearer [token]"' });
    }

    const token = parts[1];
    console.log('Token:', token);

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SEC);
        console.log('Decoded Token:', decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Token Verification Error:', err);
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        } else if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        res.status(500).json({ message: 'Server error during authentication' });
    }
};

const verifyEmployee = (req, res, next) => {
    // Ensure the user is authenticated using the verifyToken middleware
    if (req.user.role !== 'employee') {
        return res.status(403).json({ error: 'Access denied: User is not an employee' });
    }

    // Proceed to the next middleware or route handler
    next();
};


module.exports = { authMiddleware, verifyEmployee }

