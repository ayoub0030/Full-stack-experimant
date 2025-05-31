/**
 * Custom logger utility
 * Provides consistent logging across the application
 */

const config = require('../config');
const { formatDate } = require('./dateFormatter');

/**
 * Log levels
 */
const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG'
};

/**
 * Formats a log message with timestamp and level
 * @param {string} level - Log level
 * @param {string} message - Log message
 * @returns {string} - Formatted log message
 */
const formatLogMessage = (level, message) => {
  const timestamp = formatDate(new Date(), 'datetime');
  return `[${timestamp}] [${level}] ${message}`;
};

/**
 * Logger object with methods for different log levels
 */
const logger = {
  /**
   * Log an error message
   * @param {string} message - Error message
   * @param {Error} [error] - Optional error object
   */
  error: (message, error) => {
    const logMessage = error 
      ? `${message}: ${error.message}\n${error.stack}`
      : message;
    console.error(formatLogMessage(LOG_LEVELS.ERROR, logMessage));
  },
  
  /**
   * Log a warning message
   * @param {string} message - Warning message
   */
  warn: (message) => {
    console.warn(formatLogMessage(LOG_LEVELS.WARN, message));
  },
  
  /**
   * Log an info message
   * @param {string} message - Info message
   */
  info: (message) => {
    console.info(formatLogMessage(LOG_LEVELS.INFO, message));
  },
  
  /**
   * Log a debug message (only in development)
   * @param {string} message - Debug message
   */
  debug: (message) => {
    if (config.server.isDevelopment) {
      console.debug(formatLogMessage(LOG_LEVELS.DEBUG, message));
    }
  }
};

module.exports = logger;
