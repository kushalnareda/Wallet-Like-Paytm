// Import the JWT_SECRET from the config file
const { JWT_SECRET } = require("./config");

// Import the jsonwebtoken library
const jwt = require("jsonwebtoken");

// Middleware function to authenticate requests
const authMiddleware = (req, res, next) => {
    // Get the Authorization header from the request
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is missing or doesn't start with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // If missing or incorrect, return a 403 (Forbidden) response
        return res.status(403).json({});
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];
    // This line extracts the JWT from the Authorization header.
    // The Authorization header typically has the format Bearer <token>, 
    // so splitting the header string by spaces and taking the second element ([1]) 
    // retrieves the token part after Bearer.

    try {
        // Verify the JWT using the secret key
        const decoded = jwt.verify(token, JWT_SECRET);

        // Check if the decoded JWT contains a userId
        if (decoded.userId) {
            // Attach the userId to the request object for future use
            req.userId = decoded.userId;
            // Continue to the next middleware
            next();
        } else {
            // If userId is missing in the decoded JWT, return a 403 (Forbidden) response
            return res.status(403).json({});
        }
    } catch (err) {
        // If an error occurs during JWT verification, return a 403 (Forbidden) response
        return res.status(403).json({});
    }
};

// Export the authMiddleware function for use in other parts of the application
module.exports = {
    authMiddleware
};
