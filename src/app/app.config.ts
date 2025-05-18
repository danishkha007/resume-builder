import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    // RouterModule,
    provideRouter(routes)]
};

export const ResumeFormConfig = {
  personal: {
    firstName: { label: 'First Name', required: true },
    lastName: { label: 'Last Name', required: true },
    email: { label: 'Email', required: true, type: 'email' },
    phone: { label: 'Phone', required: true },
    address: { label: 'Address' },
    linkedin: { label: 'LinkedIn' },
    github: { label: 'GitHub' },
    portfolio: { label: 'Portfolio' },
    summary: { label: 'Professional Summary', required: true, type: 'textarea', maxLength: 1000 }
  },
  education: [
    {
      school: { label: 'School/College', required: true },
      degree: { label: 'Degree', required: true },
      fieldOfStudy: { label: 'Field of Study' },
      startDate: { label: 'Start Date' },
      endDate: { label: 'End Date' },
      grade: { label: 'Grade/Score' },
      description: { label: 'Description', type: 'textarea' }
    }
  ],
  experience: [
    {
      company: { label: 'Company', required: true },
      position: { label: 'Position', required: true },
      startDate: { label: 'Start Date', required: true },
      endDate: { label: 'End Date' },
      location: { label: 'Location' },
      responsibilities: { label: 'Responsibilities', type: 'textarea' }
    }
  ],
  certifications: [
    {
      title: { label: 'Certification Title' },
      issuer: { label: 'Issuer' },
      issueDate: { label: 'Issue Date' },
      expiryDate: { label: 'Expiry Date' },
      credentialId: { label: 'Credential ID' },
      credentialUrl: { label: 'Credential URL' }
    }
  ],
  projects: [
    {
      name: { label: 'Project Name' },
      description: { label: 'Description', type: 'textarea' },
      technologies: { label: 'Technologies Used' },
      link: { label: 'Project Link' }
    }
  ],
  skills: {
    technical: { label: 'Technical Skills' },
    soft: { label: 'Soft Skills' },
    languages: { label: 'Languages Known' }
  },
  achievements: [
    {
      title: { label: 'Achievement Title' },
      date: { label: 'Date' },
      description: { label: 'Description', type: 'textarea' }
    }
  ]
};
