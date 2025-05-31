const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const { validateProgressEntry } = require('../middleware/validator');

/**
 * @route   GET /api/progress
 * @desc    Get all learning progress entries
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const progressItems = await Progress.find().sort({ lastUpdated: -1 });
    
    res.status(200).json({
      success: true,
      count: progressItems.length,
      data: progressItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

/**
 * @route   GET /api/progress/:id
 * @desc    Get single progress entry
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);
    
    if (!progress) {
      return res.status(404).json({
        success: false,
        error: 'Progress entry not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

/**
 * @route   POST /api/progress
 * @desc    Create a new progress entry
 * @access  Public
 */
router.post('/', validateProgressEntry, async (req, res) => {
  try {
    const progress = await Progress.create(req.body);
    
    res.status(201).json({
      success: true,
      data: progress
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
});

/**
 * @route   PUT /api/progress/:id
 * @desc    Update a progress entry
 * @access  Public
 */
router.put('/:id', validateProgressEntry, async (req, res) => {
  try {
    const progress = await Progress.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!progress) {
      return res.status(404).json({
        success: false,
        error: 'Progress entry not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
});

/**
 * @route   DELETE /api/progress/:id
 * @desc    Delete a progress entry
 * @access  Public
 */
router.delete('/:id', async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);
    
    if (!progress) {
      return res.status(404).json({
        success: false,
        error: 'Progress entry not found'
      });
    }
    
    await progress.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

module.exports = router;
