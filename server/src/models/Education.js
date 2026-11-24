const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema(
  {
    institution: {
      type: String,
      required: [true, 'Institution name is required'],
      trim: true,
    },
    degree: {
      type: String,
      required: [true, 'Degree name is required'],
      trim: true,
    },
    field: {
      type: String,
      required: [true, 'Field of study is required'],
      trim: true,
    },
    startDate: {
      type: String,
      default: '',
    },
    endDate: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: 'Multan, Pakistan',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Education || mongoose.model('Education', educationSchema);
