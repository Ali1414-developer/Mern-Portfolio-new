const Experience = require('../models/Experience');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { seedExperiences } = require('../seed/seedData');

// @desc    Get all experience records
// @route   GET /api/experience
// @access  Public
const getExperience = async (req, res, next) => {
  try {
    let experiences = [];
    try {
      experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
    } catch (err) {
      console.warn('DB error on /api/experience, using fallback:', err.message);
    }

    if (!experiences || experiences.length === 0) {
      experiences = seedExperiences;
    }

    return successResponse(res, experiences, 'Experience history retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Create experience record
// @route   POST /api/experience
// @access  Private
const createExperience = async (req, res, next) => {
  try {
    const experience = await Experience.create(req.body);
    return successResponse(res, experience, 'Experience created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Update experience record
// @route   PUT /api/experience/:id
// @access  Private
const updateExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!experience) {
      return errorResponse(res, 'Experience record not found', 404);
    }

    return successResponse(res, experience, 'Experience updated successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Delete experience record
// @route   DELETE /api/experience/:id
// @access  Private
const deleteExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return errorResponse(res, 'Experience record not found', 404);
    }

    return successResponse(res, { id: req.params.id }, 'Experience deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
};
