const Skill = require('../models/Skill');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { seedSkills } = require('../seed/seedData');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
const getSkills = async (req, res, next) => {
  try {
    let skills = [];
    try {
      skills = await Skill.find().sort({ order: 1, name: 1 });
    } catch (err) {
      console.warn('DB error on /api/skills, using fallback:', err.message);
    }

    if (!skills || skills.length === 0) {
      skills = seedSkills;
    }

    return successResponse(res, skills, 'Skills retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Create new skill
// @route   POST /api/skills
// @access  Private
const createSkill = async (req, res, next) => {
  try {
    const existing = await Skill.findOne({ name: req.body.name });
    if (existing) {
      return errorResponse(res, 'A skill with this name already exists', 400);
    }

    const skill = await Skill.create(req.body);
    return successResponse(res, skill, 'Skill created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private
const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!skill) {
      return errorResponse(res, 'Skill not found', 404);
    }

    return successResponse(res, skill, 'Skill updated successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private
const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return errorResponse(res, 'Skill not found', 404);
    }

    return successResponse(res, { id: req.params.id }, 'Skill deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};
