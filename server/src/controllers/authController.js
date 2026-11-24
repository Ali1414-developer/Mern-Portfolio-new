const Admin = require('../models/Admin');
const generateToken = require('../utils/generateToken');
const { successResponse, errorResponse } = require('../utils/apiResponse');

// @desc    Admin Login
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, 'Please provide both email and password', 400);
    }

    // Find admin and explicitly select password
    const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+password');

    if (!admin) {
      // Fallback check: if no admin in DB yet, check against env vars for initial bootstrap
      const envEmail = (process.env.ADMIN_EMAIL || '').toLowerCase();
      const envPass = process.env.ADMIN_PASSWORD;

      if (envEmail && envPass && email.toLowerCase() === envEmail && password === envPass) {
        // Auto-bootstrap admin account into database
        const newAdmin = await Admin.create({
          name: 'Ali Raza',
          email: envEmail,
          password: envPass,
        });

        const token = generateToken(newAdmin._id, newAdmin.role);
        return successResponse(res, {
          token,
          user: {
            id: newAdmin._id,
            name: newAdmin.name,
            email: newAdmin.email,
            role: newAdmin.role,
          },
        }, 'Admin authenticated successfully');
      }

      return errorResponse(res, 'Invalid credentials', 401);
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return errorResponse(res, 'Invalid credentials', 401);
    }

    const token = generateToken(admin._id, admin.role);

    return successResponse(res, {
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    }, 'Admin authenticated successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Get Current Logged In Admin Profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return errorResponse(res, 'Admin account not found', 404);
    }

    return successResponse(res, {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  getMe,
};
