const express = require('express');
const router = express.Router();
const { getSiteSettings, updateSiteSettings } = require('../controllers/siteController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getSiteSettings);
router.put('/', protect, updateSiteSettings);

module.exports = router;
