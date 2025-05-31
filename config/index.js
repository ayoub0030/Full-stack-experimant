/**
 * Application configuration
 * Centralizes environment variables and configuration settings
 */

// Load environment variables
require('dotenv').config();

const config = {
  // Server configuration
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV === 'development' || !process.env.NODE_ENV
  },
  
  // Database configuration
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/fullstack-learning',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  
  // API configuration
  api: {
    prefix: '/api',
    version: '1.0.0',
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    }
  }
};

module.exports = config;
