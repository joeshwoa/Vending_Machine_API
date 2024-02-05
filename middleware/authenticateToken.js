// Middleware for JWT authentication
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, 'your-secret-key', (err, decodedToken) => {
      if (err) return res.sendStatus(403); // Forbidden
      console.log(decodedToken);
      req.user = { userId: decodedToken._id }; // Attach userId to the request object
      next();
  });
};

module.exports = authenticateToken;
