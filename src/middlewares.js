const jwt = require('jsonwebtoken');
const { verifyToken } = require('./jwt');

exports.authMiddleware = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ message: 'Missing authorization header' });
    }

    const token = authorizationHeader.split(' ')[1];

    // Verify token
    const userId = verifyToken(token);

    // Set the userId in the request object
    req.userId = userId;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};
