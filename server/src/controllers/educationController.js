const Education = require('../models/Education');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { seedEducation } = require('../seed/seedData');

// @desc    Get education background
// @route   GET /api/education
// @access  Public
const getEducation = async (req, res, next) => {
  try {
    let education = [];
    try {
      education = await Education.find().sort({ order: 1, createdAt: -1 });
    } catch (err) {
      console.warn('DB error on /api/education, using fallback:', err.message);
    }

    if (!education || education.length === 0) {
      education = seedEducation;
    }

    return successResponse(res, education, 'Education records retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Create education record
// @route   POST /api/education
// @access  Private
const createEducation = async (req, res, next) => {
  try {
    const education = await Education.create(req.body);
    return successResponse(res, education, 'Education record created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Update education record
// @route   PUT /api/education/:id
// @access  Private
const updateEducation = async (req, res, next) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!education) {
      return errorResponse(res, 'Education record not found', 404);
    }

    return successResponse(res, education, 'Education updated successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Delete education record
// @route   DELETE /api/education/:id
// @access  Private
const deleteEducation = async (req, res, next) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) {
      return errorResponse(res, 'Education record not found', 404);
    }

    return successResponse(res, { id: req.params.id }, 'Education deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
};
