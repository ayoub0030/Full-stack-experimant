const mongoose = require('mongoose');

/**
 * Progress Schema - Tracks learning progress for different technologies
 */
const ProgressSchema = new mongoose.Schema({
  technology: {
    type: String,
    required: [true, 'Technology name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['frontend', 'backend', 'database', 'devops', 'other'],
    default: 'other'
  },
  percentComplete: {
    type: Number,
    required: [true, 'Progress percentage is required'],
    min: [0, 'Progress cannot be less than 0%'],
    max: [100, 'Progress cannot exceed 100%'],
    default: 0
  },
  notes: {
    type: String,
    trim: true
  },
  resources: [{
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    }
  }],
  startDate: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Pre-save middleware to update the lastUpdated field
ProgressSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

// Virtual for calculating days since start
ProgressSchema.virtual('daysSinceStart').get(function() {
  const now = new Date();
  const diffTime = Math.abs(now - this.startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

module.exports = mongoose.model('Progress', ProgressSchema);
