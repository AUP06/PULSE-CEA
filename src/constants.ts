/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { IdeaCategory, FAQItem, AppStatistic, PULSEConfig } from './types';

export const WHY_CONTRIBUTE_CARDS = [
  {
    id: 'impact',
    title: 'Make an Impact',
    description: 'Set the tone for the entire college journey of incoming first-year students and spark their passion for engineering.',
    iconName: 'Sparkles',
    gradient: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20 hover:border-blue-500/40'
  },
  {
    id: 'creativity',
    title: 'Showcase Creativity',
    description: 'Unleash your unique ideas, theatrical scripts, technical demos, or campus-wide event ideas before a massive audience.',
    iconName: 'Lightbulb',
    gradient: 'from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-500/40'
  },
  {
    id: 'leadership',
    title: 'Improve Leadership Skills',
    description: 'Plan, design, and take ownership of a major activity. Coordinate groups, manage resources, and lead teams.',
    iconName: 'Compass',
    gradient: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20 hover:border-emerald-500/40'
  },
  {
    id: 'collaboration',
    title: 'Collaborate with Seniors',
    description: 'Work closely with PULSE executive committee members, advisors, and faculty to execute top-tier stage shows and activities.',
    iconName: 'Users',
    gradient: 'from-amber-500/10 to-orange-500/10 border-amber-500/20 hover:border-amber-500/40'
  },
  {
    id: 'team',
    title: 'Join the Organizing Team',
    description: 'Outstanding contributors will be directly inducted into the core Orientation Organizing Team with certificates.',
    iconName: 'Award',
    gradient: 'from-red-500/10 to-rose-500/10 border-red-500/20 hover:border-red-500/40'
  },
  {
    id: 'memories',
    title: 'Help Create Unforgettable Memories',
    description: 'Make friendships that last a lifetime. Ensure the juniors remember their first week of college as their absolute best week.',
    iconName: 'Heart',
    gradient: 'from-indigo-500/10 to-violet-500/10 border-indigo-500/20 hover:border-indigo-500/40'
  }
];

export const IDEA_CATEGORIES: IdeaCategory[] = [
  {
    id: 'ice-breakers',
    title: 'Ice Breakers',
    description: 'Quick, high-energy activities to help students get comfortable, laugh, and introduce themselves to peers.',
    iconName: 'Flame',
    colorTheme: 'from-orange-500/20 to-amber-500/20 text-orange-400 border-orange-500/30',
    popularExample: 'Speed Networking, Giant Two Truths & A Lie'
  },
  {
    id: 'fun-games',
    title: 'Fun Games',
    description: 'Lighthearted, highly interactive games that can be conducted in large classrooms or halls to spark pure joy.',
    iconName: 'Gamepad2',
    colorTheme: 'from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30',
    popularExample: 'Crowd Trivia, Guess the Sound, Human Bingo'
  },
  {
    id: 'team-building',
    title: 'Team Building',
    description: 'Challenges where groups must coordinate, think together, and communicate to solve complex, fun puzzles.',
    iconName: 'Share2',
    colorTheme: 'from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30',
    popularExample: 'The Marshmallow Tower Challenge, Escape Room Puzzles'
  },
  {
    id: 'creative-activities',
    title: 'Creative Activities',
    description: 'Artsy, musical, design, or conceptual collaborative projects that result in collective expressions.',
    iconName: 'Palette',
    colorTheme: 'from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/30',
    popularExample: 'Mass Handprint Banner, Collage of Future Hopes'
  },
  {
    id: 'stage-events',
    title: 'Stage Events',
    description: 'Auditorium-wide performances, skits, flash mobs, or visual acts that command the main spotlight.',
    iconName: 'Tv',
    colorTheme: 'from-red-500/20 to-orange-500/20 text-red-400 border-red-500/30',
    popularExample: 'Live Band, Senior Satire Skit, Light-Up Dance'
  },
  {
    id: 'tech-demonstrations',
    title: 'Tech Demonstrations',
    description: 'Inspiring live-action engineering displays — robotics, smart appliances, or interactive drone shows.',
    iconName: 'Cpu',
    colorTheme: 'from-cyan-500/20 to-emerald-500/20 text-cyan-400 border-cyan-500/30',
    popularExample: 'Robo-Soccer Exhibition, AI Interactive Mirror'
  },
  {
    id: 'mini-competitions',
    title: 'Mini Competitions',
    description: 'Quick-fire contests with instant rewards, testing speed, lateral thinking, or manual dexterity.',
    iconName: 'Trophy',
    colorTheme: 'from-yellow-500/20 to-amber-500/20 text-yellow-400 border-yellow-500/30',
    popularExample: '60-Second Tower Build, Speed Typing Showdown'
  },
  {
    id: 'treasure-hunt',
    title: 'Treasure Hunt',
    description: 'Campus-wide clue deciphering, navigation, and riddle solving to explore college facilities.',
    iconName: 'Map',
    colorTheme: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
    popularExample: 'QR-Code Decryption Hunt, Retro Map Exploration'
  },
  {
    id: 'talent-showcase',
    title: 'Talent Showcase',
    description: 'Open-mic platforms for incoming freshmen to exhibit their musical, poetic, comedic, or athletic skills.',
    iconName: 'Mic',
    colorTheme: 'from-fuchsia-500/20 to-purple-500/20 text-fuchsia-400 border-fuchsia-500/30',
    popularExample: 'Acoustic Jam, 90-Second Standup Trial'
  },
  {
    id: 'campus-activities',
    title: 'Campus Activities',
    description: 'Interactive campus-map tours, photography scavenger hunts, or meetups designed around specific spots.',
    iconName: 'Building',
    colorTheme: 'from-teal-500/20 to-cyan-500/20 text-teal-400 border-teal-500/30',
    popularExample: 'Insta-Grid Photo Safari, Signature Gathering'
  },
  {
    id: 'interactive-sessions',
    title: 'Interactive Sessions',
    description: 'Q&A panels, story circles, or myth-busting dialogs about engineering life with young, approachable seniors.',
    iconName: 'MessagesSquare',
    colorTheme: 'from-sky-500/20 to-indigo-500/20 text-sky-400 border-sky-500/30',
    popularExample: 'Unwritten Rules of Engineering: panel discussion'
  }
];

export const DEFAULT_STATS: AppStatistic[] = [
  {
    id: 'total-submitted',
    label: 'Total Ideas Submitted',
    value: 124,
    suffix: '+',
    description: 'Creative entries from senior CEA student batches',
    iconName: 'Lightbulb'
  },
  {
    id: 'contributors',
    label: 'Student Contributors',
    value: 86,
    suffix: '',
    description: 'Active visionary thinkers across S1 to S7',
    iconName: 'Users'
  },
  {
    id: 'volunteers',
    label: 'Volunteers Interested',
    value: 48,
    suffix: '',
    description: 'Ready to run the activities on day one',
    iconName: 'HandMetal'
  },
  {
    id: 'shortlisted',
    label: 'Ideas Shortlisted',
    value: 18,
    suffix: '',
    description: 'Premium ideas currently in production review',
    iconName: 'FileCheck'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Who is eligible to submit ideas to the PULSE CEA Hub?',
    answer: 'All senior College of Engineering Adoor (CEA) students from semesters S1, S3, S5, and S7 are highly encouraged to submit their creative concepts. The hub is open to all students across all branches and departments.',
    category: 'General'
  },
  {
    id: 'faq-2',
    question: 'Does the activity have to be ECE or tech-focused?',
    answer: 'No! The orientation program is designed for incoming students from ALL engineering branches (CS, ME, CE, EEE, ECE, etc.). Your ideas should focus on welcoming them, fostering friendships, engineering innovation, campus life, teamwork, and leadership, rather than being ECE-only.',
    category: 'General'
  },
  {
    id: 'faq-3',
    question: 'Can I submit multiple ideas?',
    answer: 'Absolutely! You can submit as many unique, detailed ideas as you have. Simply submit a separate form for each idea so they can be logged and reviewed individually.',
    category: 'Submissions'
  },
  {
    id: 'faq-4',
    question: 'How do I know if my idea is shortlisted?',
    answer: 'PULSE CEA executives will review all submissions. Shortlisted idea authors will be contacted via email or phone. You will be invited to pitch the event or join the official Orientation Organizing Team.',
    category: 'Team'
  },
  {
    id: 'faq-5',
    question: 'Does this form connect to a real system? How are submissions saved?',
    answer: 'Yes! The form is configured to POST securely to a Google Form endpoint which populates a linked Google Sheet in real-time. Submissions are also kept in local storage on this browser so you can visually inspect your entries instantly on the dashboard.',
    category: 'Technical'
  },
  {
    id: 'faq-6',
    question: 'Can I choose to conduct my proposed event?',
    answer: 'Yes! The form includes a specific question: "Would you like to help conduct it?". If you answer "Yes" and your idea is approved, you will have first priority to lead the event.',
    category: 'Team'
  }
];

// Configuration for easy replacement with user's actual Google Form entries
export const DEFAULT_PULSE_CONFIG: PULSEConfig = {
  // Real Google Form action url mapped from user's pre-filled form link
  googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSf-rdeQt-YNa6VaRv1j4SOMCCnvuBRYyWA5FqHvE8Gyox6Few/formResponse',
  googleFormFields: {
    fullName: 'entry.778557451',
    semester: 'entry.443327132',
    rollNumber: 'entry.1289258581',
    phoneNumber: 'entry.779487917',
    email: 'entry.728715884',
    ideaTitle: 'entry.526079191',
    description: 'entry.966622844',
    estimatedDuration: 'entry.434614430',
    volunteersNeeded: 'entry.1368616142',
    materialsRequired: 'entry.1129720386',
    whyIncluded: 'entry.1078187181',
    willHelpConduct: 'entry.190297468'
  },
  contactEmail: 'pulse.ece@cea.ac.in',
  contactPhone: '+91 9447 654321',
  socials: {
    instagram: 'https://instagram.com/pulse.cea',
    linkedin: 'https://linkedin.com/company/pulse-cea',
    youtube: 'https://youtube.com/pulse-cea-forum',
    github: 'https://github.com/pulse-cea'
  }
};
