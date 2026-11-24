const Certification = require('../models/Certification');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { seedCertifications } = require('../seed/seedData');

// @desc    Get all certifications
// @route   GET /api/certifications
// @access  Public
const getCertifications = async (req, res, next) => {
  try {
    let certifications = [];
    try {
      certifications = await Certification.find().sort({ createdAt: -1 });
    } catch (err) {
      console.warn('DB error on /api/certifications, using fallback:', err.message);
    }

    if (!certifications || certifications.length === 0) {
      certifications = seedCertifications;
    }

    return successResponse(res, certifications, 'Certifications retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Create certification
// @route   POST /api/certifications
// @access  Private
const createCertification = async (req, res, next) => {
  try {
    const certification = await Certification.create(req.body);
    return successResponse(res, certification, 'Certification created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Update certification
// @route   PUT /api/certifications/:id
// @access  Private
const updateCertification = async (req, res, next) => {
  try {
    const certification = await Certification.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!certification) {
      return errorResponse(res, 'Certification not found', 404);
    }

    return successResponse(res, certification, 'Certification updated successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Delete certification
// @route   DELETE /api/certifications/:id
// @access  Private
const deleteCertification = async (req, res, next) => {
  try {
    const certification = await Certification.findByIdAndDelete(req.params.id);
    if (!certification) {
      return errorResponse(res, 'Certification not found', 404);
    }

    return successResponse(res, { id: req.params.id }, 'Certification deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
};
