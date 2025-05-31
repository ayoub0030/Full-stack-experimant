const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/errorHandler');
const config = require('./config');
const logger = require('./utils/logger');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
if (config.server.isDevelopment) {
  app.use(morgan('dev'));
  logger.info('Morgan logger enabled in development mode');
}

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoConnection = await mongoose.connect(config.db.uri, config.db.options);
    logger.info(`MongoDB Connected: ${mongoConnection.connection.host}`);
  } catch (error) {
    logger.error('Error connecting to MongoDB', error);
    process.exit(1); // Exit with failure code
  }
};

// Connect to database
connectDB();

// Import routes
const progressRoutes = require('./routes/progress');

// API Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'success', 
    message: 'API is running', 
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Welcome route
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Welcome to Full-Stack Learning Journey API',
    version: '1.0.0',
    documentation: '/api/docs',
    endpoints: [
      { path: '/api/health', method: 'GET', description: 'Check API health status' },
      { path: '/api/progress', method: 'GET', description: 'Get all learning progress entries' },
      { path: '/api/progress/:id', method: 'GET', description: 'Get a specific learning progress entry' },
      { path: '/api/progress', method: 'POST', description: 'Create a new learning progress entry' },
      { path: '/api/progress/:id', method: 'PUT', description: 'Update a learning progress entry' },
      { path: '/api/progress/:id', method: 'DELETE', description: 'Delete a learning progress entry' }
    ]
  });
});

// Mount routes
app.use('/api/progress', progressRoutes);

// Serve static assets in production
if (config.server.isProduction) {
  // Set static folder
  app.use(express.static('client/build'));

  // Any route that's not an API route will be redirected to the React app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Custom error handling middleware
app.use(errorHandler);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...', err);
  process.exit(1);
});

// Start server
const PORT = config.server.port;
const server = app.listen(PORT, () => {
  logger.info(`Server running in ${config.server.nodeEnv} mode on port ${PORT}`);
});

// Handle server errors
server.on('error', (error) => {
  logger.error('Server error', error);
  process.exit(1);
});
