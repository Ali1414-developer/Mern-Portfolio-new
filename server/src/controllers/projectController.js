const Project = require('../models/Project');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { seedProjects } = require('../seed/seedData');

// @desc    Get all projects (public)
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res, next) => {
  try {
    let projects = [];
    try {
      projects = await Project.find().sort({ order: 1, createdAt: -1 });
    } catch (dbErr) {
      console.warn('DB query error on /api/projects, using fallback data:', dbErr.message);
    }

    if (!projects || projects.length === 0) {
      projects = seedProjects;
    }

    return successResponse(res, projects, 'Projects retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project by slug
// @route   GET /api/projects/:slug
// @access  Public
const getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    let project = null;

    try {
      project = await Project.findOne({ slug: slug.toLowerCase() });
    } catch (dbErr) {
      console.warn(`DB error on /api/projects/${slug}, looking in fallback:`, dbErr.message);
    }

    if (!project) {
      project = seedProjects.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
    }

    if (!project) {
      return errorResponse(res, `Project not found with slug: ${slug}`, 404);
    }

    return successResponse(res, project, 'Project details retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res, next) => {
  try {
    const existing = await Project.findOne({ slug: req.body.slug.toLowerCase() });
    if (existing) {
      return errorResponse(res, 'A project with this slug already exists', 400);
    }

    const project = await Project.create(req.body);
    return successResponse(res, project, 'Project created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return errorResponse(res, 'Project not found', 404);
    }

    return successResponse(res, project, 'Project updated successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return errorResponse(res, 'Project not found', 404);
    }

    return successResponse(res, { id: req.params.id }, 'Project deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
};
