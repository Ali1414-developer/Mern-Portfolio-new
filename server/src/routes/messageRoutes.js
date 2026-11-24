const express = require('express');
const router = express.Router();
const {
  createMessage,
  getMessages,
  updateMessageStatus,
  deleteMessage,
} = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');
const { contactLimiter } = require('../middleware/rateLimitMiddleware');
const { validateMessage } = require('../validators/messageValidator');

router.post('/', contactLimiter, validateMessage, createMessage);

router.get('/', protect, getMessages);
router.patch('/:id/status', protect, updateMessageStatus);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
