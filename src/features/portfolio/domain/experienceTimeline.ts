export interface WorkExperience {
  readonly id: string;
  readonly role: string;
  readonly organization: string;
  readonly location: string;
  readonly period: string;
  readonly field: string;
  readonly achievements: readonly string[];
  readonly tools: readonly string[];
}

export const WORK_EXPERIENCE: readonly WorkExperience[] = [
  {
    id: 'academic-tutor',
    role: 'Academic Tutor · User Interface Design',
    organization: 'La Trobe University',
    location: 'Melbourne, Australia',
    period: 'June 2026 — Present',
    field: 'Teaching / UI & UX',
    achievements: [
      'Led practical workshops for 120+ undergraduate students across UI/UX engineering, design thinking, and rapid prototyping.',
      'Guided Figma wireframing, interactive prototyping, and heuristic usability testing.',
      'Redesigned and extended four lab exercises to address common student challenges in UI/UX.',
    ],
    tools: ['Figma', 'Prototyping', 'Usability testing'],
  },
  {
    id: 'graduate-research-assistant',
    role: 'Graduate Research Assistant',
    organization: 'La Trobe University',
    location: 'Melbourne, Australia',
    period: 'March 2026 — Present',
    field: 'Research / Virtual reality',
    achievements: [
      'Designed real-time walking-in-place algorithms combining eye-gaze tracking with body kinematics, including focal distance, leg cadence, and arm swing.',
      'Built a Unity VR prototype and evaluated usability and comfort with 20 participants.',
      'Co-authored “Look to Pace: Gaze-Supported Speed Adjustment for Walking-in-Place Techniques in Virtual Reality,” submitted to IEEE VR 2027.',
    ],
    tools: ['Unity', 'Eye-gaze tracking', 'Human movement'],
  },
  {
    id: 'software-engineer',
    role: 'Software Engineer',
    organization: 'I.T. Security College of Computer Studies',
    location: 'Kathmandu, Nepal',
    period: 'October 2024 — November 2025',
    field: 'Product engineering / Mobile',
    achievements: [
      'Migrated native Android and iOS codebases to Kotlin Multiplatform, supporting white-label deployments across 12+ educational institutions.',
      'Managed testing and releases to Google Play and the App Store; code obfuscation reduced production app size by approximately 25%.',
      'Integrated Firebase push notifications and analytics to support user engagement and application health monitoring.',
    ],
    tools: ['Kotlin Multiplatform', 'Firebase', 'App Store releases'],
  },
  {
    id: 'research-intern',
    role: 'Research Intern',
    organization: 'Hochschule Zittau/Görlitz',
    location: 'Zittau, Germany',
    period: 'June 2024 — August 2024',
    field: 'Research / Cloud & immersive systems',
    achievements: [
      'Developed a Spring Boot REST API backed by SQL and deployed as AWS microservices with a Jenkins CI/CD pipeline.',
      'Built a hands-free React Native application for RealWear Navigator 520 smart glasses to support warehouse task assignment and robot inventory workflows.',
      'Created a 3D CAVE environment prototype in Unity and C#.',
    ],
    tools: ['Spring Boot', 'AWS', 'React Native', 'Unity'],
  },
  {
    id: 'android-developer-intern',
    role: 'Android Developer Intern',
    organization: 'F1Soft International',
    location: 'Kathmandu, Nepal',
    period: 'September 2022 — February 2023',
    field: 'Product engineering / Android',
    achievements: [
      'Built Android interfaces used across 50+ financial institutions with Kotlin, Java, XML, and Jetpack Compose.',
      'Applied MVVM and Clean Architecture with dependency injection using Dagger/Hilt.',
      'Worked in an Agile team with JUnit, Espresso, and test-driven development, reaching approximately 70% test coverage.',
    ],
    tools: ['Kotlin', 'Jetpack Compose', 'MVVM', 'JUnit / Espresso'],
  },
];
