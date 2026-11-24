const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    position: {
      type: String,
      required: [true, 'Position/Role is required'],
      trim: true,
    },
    location: {
      type: String,
      default: 'Remote / Pakistan',
    },
    startDate: {
      type: String,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: String,
      default: 'Present',
    },
    current: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    technologies: {
      type: [String],
      default: [],
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Experience || mongoose.model('Experience', experienceSchema);
