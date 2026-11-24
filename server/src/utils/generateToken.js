const jwt = require('jsonwebtoken');

const generateToken = (id, role = 'admin') => {
  const secret = process.env.JWT_SECRET || 'ali_raza_default_fallback_secret_32char_key';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign({ id, role }, secret, { expiresIn });
};

module.exports = generateToken;
