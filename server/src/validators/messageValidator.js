const { errorResponse } = require('../utils/apiResponse');

const validateMessage = (req, res, next) => {
  const { name, email, subject, message } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('A valid name with at least 2 characters is required.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    errors.push('A valid email address is required.');
  }

  if (!message || typeof message !== 'string' || message.trim().length < 5) {
    errors.push('Message must be at least 5 characters long.');
  }

  if (errors.length > 0) {
    return errorResponse(res, 'Validation failed for contact message', 400, errors);
  }

  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();
  req.body.subject = (subject || 'General Inquiry').trim();
  req.body.message = message.trim();

  next();
};

module.exports = { validateMessage };
