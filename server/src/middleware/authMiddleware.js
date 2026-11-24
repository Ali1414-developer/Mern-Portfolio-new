const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/apiResponse');

const protect = (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    return errorResponse(res, 'Not authorized. No authentication token provided.', 401);
  }

  try {
    const secret = process.env.JWT_SECRET || 'ali_raza_default_fallback_secret_32char_key';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(res, 'Session invalid or token expired. Please login again.', 401);
  }
};

module.exports = { protect };
