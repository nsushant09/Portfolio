export type AboutCapabilityId = 'mobile' | 'cloud' | 'devops' | 'research';

export interface AboutCapability {
  readonly id: AboutCapabilityId;
  readonly title: string;
  readonly description: string;
}

export const ABOUT_CAPABILITIES: readonly AboutCapability[] = [
  {
    id: 'mobile',
    title: 'Mobile engineering',
    description: 'Android, Kotlin Multiplatform, and cross-platform product delivery.',
  },
  {
    id: 'cloud',
    title: 'Cloud infrastructure',
    description: 'AWS services, APIs, data layers, and the systems behind an app.',
  },
  {
    id: 'devops',
    title: 'DevOps & delivery',
    description: 'CI/CD, automated releases, and dependable routes to production.',
  },
  {
    id: 'research',
    title: 'Research & interaction',
    description: 'Immersive prototypes, usability studies, and thoughtful interfaces.',
  },
];

export const ABOUT_STORY = {
  introduction: 'I’m Sushant, a software engineer shaped by product work, research, and teaching.',
  experience: 'My path has taken me from Android engineering in Kathmandu to cloud-connected systems in Germany, and now to immersive research and UI design teaching in Melbourne. I’ve shipped mobile products, worked with AWS and CI/CD, explored virtual reality, and helped students turn ideas into usable interfaces.',
  currentFocus: 'I’m currently expanding my cloud infrastructure and DevOps practice, and looking for software engineering opportunities across Australia. I bring an enthusiastic, curious approach and a readiness to keep learning alongside a team.',
} as const;
