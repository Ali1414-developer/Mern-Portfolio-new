const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const { validateProject } = require('../validators/projectValidator');

router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);

router.post('/', protect, validateProject, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
