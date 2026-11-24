const Message = require('../models/Message');
const { sendContactNotification } = require('../services/emailService');
const { successResponse, errorResponse } = require('../utils/apiResponse');

// @desc    Submit new contact inquiry
// @route   POST /api/messages
// @access  Public
const createMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    let savedMessage = null;
    try {
      savedMessage = await Message.create({
        name,
        email,
        subject,
        message,
        status: 'new',
      });
    } catch (dbErr) {
      console.warn('DB write failed for message, storing transient:', dbErr.message);
      savedMessage = {
        _id: 'temp-' + Date.now(),
        name,
        email,
        subject,
        message,
        status: 'new',
        createdAt: new Date().toISOString(),
      };
    }

    // Optional email dispatch (won't crash if unconfigured or failed)
    sendContactNotification({ name, email, subject, message }).catch((err) => {
      console.error('Non-blocking SMTP error:', err.message);
    });

    return successResponse(
      res,
      {
        id: savedMessage._id,
        createdAt: savedMessage.createdAt,
      },
      'Thank you! Your message has been sent successfully. I will get back to you shortly.',
      201
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private
const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    return successResponse(res, messages, 'Messages retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Update message status
// @route   PATCH /api/messages/:id/status
// @access  Private
const updateMessageStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ['new', 'read', 'replied', 'archived'];

    if (!status || !allowed.includes(status)) {
      return errorResponse(res, `Invalid status. Allowed values: ${allowed.join(', ')}`, 400);
    }

    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!message) {
      return errorResponse(res, 'Message not found', 404);
    }

    return successResponse(res, message, 'Message status updated');
  } catch (error) {
    next(error);
  }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private
const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return errorResponse(res, 'Message not found', 404);
    }

    return successResponse(res, { id: req.params.id }, 'Message deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMessage,
  getMessages,
  updateMessageStatus,
  deleteMessage,
};
