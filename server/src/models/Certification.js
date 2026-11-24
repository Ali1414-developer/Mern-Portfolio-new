const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Certification title is required'],
      trim: true,
    },
    issuer: {
      type: String,
      required: [true, 'Issuer is required'],
      trim: true,
    },
    issueDate: {
      type: String,
      default: '',
    },
    credentialId: {
      type: String,
      default: '',
    },
    credentialUrl: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Certification || mongoose.model('Certification', certificationSchema);
