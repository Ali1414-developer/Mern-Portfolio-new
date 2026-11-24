import React from 'react';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import SkillsSection from '../sections/SkillsSection';
import ExperienceSection from '../sections/ExperienceSection';
import ProjectsSection from '../sections/ProjectsSection';
import EducationSection from '../sections/EducationSection';
import CertificationsSection from '../sections/CertificationsSection';
import ContactSection from '../sections/ContactSection';

import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import {
  fallbackProjects,
  fallbackExperiences,
  fallbackSkills,
  fallbackEducation,
  fallbackCertifications,
  fallbackSiteSettings
} from '../data/fallbackData';

export default function HomePage() {
  const { data: projects } = useFetch(api.getProjects, fallbackProjects);
  const { data: experiences } = useFetch(api.getExperience, fallbackExperiences);
  const { data: skills } = useFetch(api.getSkills, fallbackSkills);
  const { data: education } = useFetch(api.getEducation, fallbackEducation);
  const { data: certifications } = useFetch(api.getCertifications, fallbackCertifications);
  const { data: siteSettings } = useFetch(api.getSiteSettings, fallbackSiteSettings);

  return (
    <div className="space-y-0">
      <HeroSection siteSettings={siteSettings} />
      <AboutSection siteSettings={siteSettings} />
      <SkillsSection skills={skills} />
      <ExperienceSection experiences={experiences} />
      <ProjectsSection projects={projects} />
      <EducationSection education={education} />
      <CertificationsSection certifications={certifications} />
      <ContactSection siteSettings={siteSettings} />
    </div>
  );
}
