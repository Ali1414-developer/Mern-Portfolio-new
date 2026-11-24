const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Ali Raza',
    },
    title: {
      type: String,
      default: 'MERN Full Stack Developer | ERP Developer',
    },
    tagline: {
      type: String,
      default: 'Building modern full-stack web applications, ERP systems, and user-focused digital experiences.',
    },
    about: {
      type: String,
      default: 'Software Engineering professional focused on MERN, ERP, Full Stack Development, REST APIs, Databases, and DevOps.',
    },
    email: {
      type: String,
      default: 'aliraza777212@gmail.com',
    },
    location: {
      type: String,
      default: 'Layyah, Punjab, Pakistan',
    },
    resumeUrl: {
      type: String,
      default: '/resume.pdf',
    },
    linkedinUrl: {
      type: String,
      default: 'https://www.linkedin.com/in/ali-raza-baloch/',
    },
    githubUrl: {
      type: String,
      default: 'https://github.com/Ali1414-developer',
    },
    profileImage: {
      type: String,
      default: '',
    },
    seoTitle: {
      type: String,
      default: 'Ali Raza | MERN Full Stack Developer & ERP Developer',
    },
    seoDescription: {
      type: String,
      default: 'Personal portfolio of Ali Raza - Software Engineer specializing in MERN stack, ERP systems, and modern web applications.',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.SiteSettings || mongoose.model('SiteSettings', siteSettingsSchema);
