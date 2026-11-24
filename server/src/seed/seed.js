require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');

const Admin = require('../models/Admin');
const Project = require('../models/Project');
const Experience = require('../models/Experience');
const Skill = require('../models/Skill');
const Education = require('../models/Education');
const Certification = require('../models/Certification');
const SiteSettings = require('../models/SiteSettings');

const {
  seedProjects,
  seedExperiences,
  seedSkills,
  seedEducation,
  seedCertifications,
  seedSiteSettings
} = require('./seedData');

async function runSeed() {
  console.log('🌱 Starting database seeding process...');

  try {
    await connectDB();

    // 1. Seed or update SiteSettings
    const existingSettings = await SiteSettings.findOne();
    if (!existingSettings) {
      await SiteSettings.create(seedSiteSettings);
      console.log('✅ Site settings initialized.');
    } else {
      console.log('ℹ️ Site settings already exist, skipping rewrite.');
    }

    // 2. Seed Projects
    for (const project of seedProjects) {
      await Project.findOneAndUpdate(
        { slug: project.slug },
        { $set: project },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    console.log(`✅ Seeded ${seedProjects.length} projects.`);

    // 3. Seed Experience
    for (const exp of seedExperiences) {
      await Experience.findOneAndUpdate(
        { company: exp.company, position: exp.position },
        { $set: exp },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    console.log(`✅ Seeded ${seedExperiences.length} experiences.`);

    // 4. Seed Skills
    for (const skill of seedSkills) {
      await Skill.findOneAndUpdate(
        { name: skill.name },
        { $set: skill },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    console.log(`✅ Seeded ${seedSkills.length} skills.`);

    // 5. Seed Education
    for (const edu of seedEducation) {
      await Education.findOneAndUpdate(
        { institution: edu.institution, degree: edu.degree },
        { $set: edu },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    console.log(`✅ Seeded education records.`);

    // 6. Seed Certifications
    for (const cert of seedCertifications) {
      await Certification.findOneAndUpdate(
        { title: cert.title, issuer: cert.issuer },
        { $set: cert },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    console.log(`✅ Seeded certifications.`);

    // 7. Seed Admin User if defined in environment
    const adminEmail = process.env.ADMIN_EMAIL || 'aliraza777212@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (adminPassword) {
      const existingAdmin = await Admin.findOne({ email: adminEmail });
      if (!existingAdmin) {
        await Admin.create({
          name: 'Ali Raza',
          email: adminEmail,
          password: adminPassword,
        });
        console.log(`✅ Admin account created for ${adminEmail}`);
      } else {
        console.log(`ℹ️ Admin account ${adminEmail} already exists.`);
      }
    } else {
      console.log('ℹ️ ADMIN_PASSWORD not specified in env; skipping admin auto-creation.');
    }

    console.log('🎉 Seeding successfully finished!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  runSeed();
}

module.exports = runSeed;
