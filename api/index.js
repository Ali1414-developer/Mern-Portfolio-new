/**
 * Vercel Serverless Function API Entry Point
 * Exposes the Express app under /api routes without requiring a persistent daemon.
 */
const app = require('../server/src/app');
const connectDB = require('../server/src/config/db');

module.exports = async (req, res) => {
  try {
    // Ensure DB connection is active/reused across warm lambda invocations
    await connectDB();
  } catch (error) {
    console.error('Database connection error in serverless handler:', error);
    // Proceeding allows routes to deliver fallback data if configured
  }

  return app(req, res);
};
