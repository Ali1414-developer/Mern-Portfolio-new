const { errorResponse } = require('../utils/apiResponse');

const notFound = (req, res, next) => {
  return errorResponse(res, `Route not found: ${req.originalUrl}`, 404);
};

const errorHandler = (err, req, res, next) => {
  console.error('[API Error]', err.stack || err.message);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = err.message || 'An unexpected server error occurred';

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
