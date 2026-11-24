const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db');
const { apiLimiter } = require('./middleware/rateLimitMiddleware');
const notFound = require('./middleware/notFoundMiddleware');
const { errorHandler } = require('./middleware/errorMiddleware');

// Route imports
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const skillRoutes = require('./routes/skillRoutes');
const educationRoutes = require('./routes/educationRoutes');
const certificationRoutes = require('./routes/certificationRoutes');
const messageRoutes = require('./routes/messageRoutes');
const siteRoutes = require('./routes/siteRoutes');

const app = express();

// Security Headers
app.use(
  helmet({
    contentSecurityPolicy: false, // Allows flexible embedding and SPA routing
    crossOriginEmbedderPolicy: false,
  })
);

// Cross-Origin Resource Sharing
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Body Parsing
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Apply rate limiting to all /api endpoints
app.use('/api', apiLimiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: 'Ali Raza MERN Portfolio API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'production',
  });
});

// API Routes Mounting
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/site', siteRoutes);

// 404 Handler for undefined API routes
app.use('/api/*', notFound);

// Centralized Error Handling Middleware
app.use(errorHandler);

// Standalone Server Startup (only when run directly, e.g. local node server)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`🚀 Ali Raza Portfolio Express Server listening on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.warn('⚠️ MongoDB connection error:', err.message);
      console.warn('⚠️ Starting Express server in resilience mode on port', PORT);
      app.listen(PORT, () => {
        console.log(`🚀 Ali Raza Portfolio Express Server listening on port ${PORT} (resilience mode)`);
      });
    });
}

module.exports = app;
