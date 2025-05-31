/**
 * Validation middleware
 * Provides request validation functions for API endpoints
 */

/**
 * Validate progress entry data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 */
const validateProgressEntry = (req, res, next) => {
  const { title, category, completionStatus, notes } = req.body;
  const errors = [];

  // Check required fields
  if (!title) {
    errors.push('Title is required');
  }
  
  if (!category) {
    errors.push('Category is required');
  }
  
  if (completionStatus === undefined) {
    errors.push('Completion status is required');
  }
  
  // Validate field formats/types
  if (title && typeof title !== 'string') {
    errors.push('Title must be a string');
  }
  
  if (category && typeof category !== 'string') {
    errors.push('Category must be a string');
  }
  
  if (completionStatus !== undefined && typeof completionStatus !== 'boolean') {
    errors.push('Completion status must be a boolean');
  }
  
  if (notes && typeof notes !== 'string') {
    errors.push('Notes must be a string');
  }
  
  // Return errors if any
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }
  
  // Proceed to next middleware if validation passes
  next();
};

module.exports = {
  validateProgressEntry
};
