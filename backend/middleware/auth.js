const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    // Get token from the headers
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    
    // Check if token is provided
    if (!token) {
        return res.status(403).json({ message: 'No token provided!' });
    }
    
    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }
        
        // If everything is good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;