/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface IdeaSubmission {
  id: string;
  fullName: string;
  semester: 'S1' | 'S3' | 'S5' | 'S7';
  rollNumber?: string;
  phoneNumber?: string;
  email?: string;
  ideaTitle: string;
  description: string;
  estimatedDuration: string;
  volunteersNeeded: number;
  materialsRequired?: string;
  whyIncluded: string;
  willHelpConduct: 'Yes' | 'No';
  submittedAt: string;
  likesCount: number;
  isApproved?: boolean;
}

export interface IdeaCategory {
  id: string;
  title: string;
  description: string;
  iconName: string; // Dynamic rendering via lucide-react mapping
  colorTheme: string; // Tailwind class combo for gradients
  popularExample: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Submissions' | 'Team' | 'Technical';
}

export interface AppStatistic {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  description: string;
  iconName: string;
}

export interface PULSEConfig {
  googleFormUrl: string; // Real Google Form submission endpoint
  googleFormFields: {
    fullName: string;
    semester: string;
    rollNumber: string;
    phoneNumber: string;
    email: string;
    ideaTitle: string;
    description: string;
    estimatedDuration: string;
    volunteersNeeded: string;
    materialsRequired: string;
    whyIncluded: string;
    willHelpConduct: string;
  };
  contactEmail: string;
  contactPhone: string;
  socials: {
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    github?: string;
  };
}
