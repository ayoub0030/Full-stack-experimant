const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log('Morgan logger enabled in development mode');
}

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoConnection = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fullstack-learning', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${mongoConnection.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
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
if (process.env.NODE_ENV === 'production') {
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
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle server errors
server.on('error', (error) => {
  console.error(`Server error: ${error.message}`);
  process.exit(1);
});
