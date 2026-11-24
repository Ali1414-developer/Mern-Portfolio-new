const { errorResponse } = require('../utils/apiResponse');

const validateProject = (req, res, next) => {
  const { title, slug, description, category } = req.body;
  const errors = [];

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    errors.push('Project title is required.');
  }

  if (!slug || typeof slug !== 'string' || slug.trim().length === 0) {
    errors.push('Project slug is required for SEO routing.');
  }

  if (!description || typeof description !== 'string') {
    errors.push('Project description is required.');
  }

  if (!category || typeof category !== 'string') {
    errors.push('Project category is required.');
  }

  if (errors.length > 0) {
    return errorResponse(res, 'Validation failed for project payload', 400, errors);
  }

  next();
};

module.exports = { validateProject };
