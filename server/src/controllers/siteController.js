const SiteSettings = require('../models/SiteSettings');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { seedSiteSettings } = require('../seed/seedData');

// @desc    Get site settings & public profile
// @route   GET /api/site
// @access  Public
const getSiteSettings = async (req, res, next) => {
  try {
    let settings = null;
    try {
      settings = await SiteSettings.findOne();
    } catch (err) {
      console.warn('DB error on /api/site, using fallback:', err.message);
    }

    if (!settings) {
      settings = seedSiteSettings;
    }

    return successResponse(res, settings, 'Site settings retrieved');
  } catch (error) {
    next(error);
  }
};

// @desc    Update site settings
// @route   PUT /api/site
// @access  Private
const updateSiteSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = await SiteSettings.create(req.body);
    } else {
      Object.assign(settings, req.body);
      await settings.save();
    }

    return successResponse(res, settings, 'Site settings updated successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSiteSettings,
  updateSiteSettings,
};
