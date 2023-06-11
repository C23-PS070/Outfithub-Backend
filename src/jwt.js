const jwt = require('jsonwebtoken');
const jwtSecret = 'C5_2e@0utf1thuB!'; // Ganti dengan secret yang Anda inginkan untuk JWT

exports.generateToken = (userId) => {
  return jwt.sign({ userId }, secretKey);
};

exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded.userId;
  } catch (error) {
    throw new Error('Invalid token');
  }
};
