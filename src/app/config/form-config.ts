// Add an index signature to allow string indexing
export interface ResumeFormSchema {
  [key: string]: SectionConfig;
}

export interface FieldConfig {
  key: string;
  label: string;
  type: string;
  validators?: string[];
}

export const personalFields: FieldConfig[] = [
  { key: 'firstName', label: 'First Name', type: 'text', validators: ['required'] },
  { key: 'lastName', label: 'Last Name', type: 'text', validators: ['required'] },
  { key: 'email', label: 'Email', type: 'email', validators: ['required', 'email'] },
  { key: 'phone', label: 'Phone', type: 'text' },
  { key: 'location', label: 'Location', type: 'text' },
  { key: 'linkedin', label: 'LinkedIn', type: 'url' },
  { key: 'summary', label: 'Professional Summary', type: 'textarea' },
];

export const educationFields: FieldConfig[] = [
  { key: 'degree', label: 'Degree', type: 'text' },
  { key: 'branch', label: 'Branch/Major Subjects', type: 'text' },
  { key: 'institute', label: 'Institute Name', type: 'text' },
  { key: 'startDate', label: 'From', type: 'text' },
  { key: 'endDate', label: 'To', type: 'text' },
];

export const experienceFields: FieldConfig[] = [
  { key: 'company', label: 'Company', type: 'text' },
  { key: 'position', label: 'Position', type: 'text' },
  { key: 'from', label: 'Joined From', type: 'text' },
  { key: 'to', label: 'Till (Leave blank if ongoing)', type: 'text' },
  { key: 'skill', label: 'Skills Utilized (comma-separated)', type: 'text' },
  { key: 'summary', label: 'Summary', type: 'text' },
  { key: 'responsibilities', label: 'Responsibilities (comma-separated)', type: 'text' },
];

export const skillsFields: FieldConfig[] = [
  { key: 'skillsList', label: 'Skills (comma-separated)', type: 'text' },
];

export interface SectionConfig {
  label: string;
  fields: FieldConfig[];
  isRepeatable?: boolean; // Indicates this section uses FormArray
}

export const resumeFormSchema: ResumeFormSchema = {
  personal: {
    label: 'Personal Information',
    fields: personalFields,
  },
  education: {
    label: 'Education',
    isRepeatable: true,
    fields: educationFields,
  },
  experience: {
    label: 'Experience',
    isRepeatable: true,
    fields: experienceFields,
  },
  skills: {
    label: 'Skills',
    fields: skillsFields,
  },
};

export const resumeFormLayout = [
  { key: 'personal' },
  { key: 'skills' },
  { key: 'experience' },
  { key: 'education' },
];

export const builderTemplates = [
  { id: 'template-one', name: 'Template One' },
  { id: 'template-two', name: 'Template Two' },
];