const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Project slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Detailed description is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Full Stack', 'Frontend', 'ERP', 'UI/UX', 'Other'],
      index: true,
    },
    technologies: {
      type: [String],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: '',
    },
    gallery: {
      type: [String],
      default: [],
    },
    liveUrl: {
      type: String,
      default: '',
    },
    githubUrl: {
      type: String,
      default: '',
    },
    additionalLinks: [
      {
        label: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
    role: {
      type: String,
      default: 'Full Stack Developer',
    },
    status: {
      type: String,
      enum: ['Completed', 'In Progress', 'Prototype', 'Production'],
      default: 'Completed',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Project || mongoose.model('Project', projectSchema);
