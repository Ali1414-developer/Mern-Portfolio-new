const rateLimit = require('express-rate-limit');

// General API Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150, // limit each IP to 150 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  },
});

// Stricter limiter for contact submission to deter spam
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // max 10 messages per hour per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Message rate limit exceeded. Please wait a bit before sending another message.',
  },
});

// Strict limiter for authentication attempts
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // max 20 login attempts per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. Please try again later.',
  },
});

module.exports = {
  apiLimiter,
  contactLimiter,
  authLimiter,
};
