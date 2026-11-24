const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Ali Raza',
    },
    email: {
      type: String,
      required: [true, 'Admin email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Admin password is required'],
      minlength: 6,
      select: false, // Do not expose password hashes by default
    },
    role: {
      type: String,
      default: 'admin',
      enum: ['admin'],
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password before saving if modified
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare incoming password with hash
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
