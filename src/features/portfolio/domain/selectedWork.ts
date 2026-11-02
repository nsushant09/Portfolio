export interface PortfolioProjectPreview {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly note: string;
  readonly image?: string;
  readonly imageAlt?: string;
  readonly tags: readonly string[];
}

export const MOBILE_PROJECTS: readonly PortfolioProjectPreview[] = [
  {
    id: 'mobile-01',
    title: 'Mobile application',
    description: 'A selected mobile project, ready for its product story, interface imagery, and build details.',
    note: 'Preview slot · project details to come',
    tags: ['Mobile apps', 'Product engineering'],
  },
  {
    id: 'mobile-02',
    title: 'Cross-platform experience',
    description: 'A second space for mobile work, from interaction design through implementation and release.',
    note: 'Preview slot · project details to come',
    tags: ['iOS + Android', 'Development'],
  },
  {
    id: 'mobile-03',
    title: 'Mobile product delivery',
    description: 'A third project slot for the systems and decisions behind an app that is ready for real use.',
    note: 'Preview slot · project details to come',
    tags: ['Release', 'Cloud services'],
  },
];

export const WEBSITE_PROJECTS: readonly PortfolioProjectPreview[] = [
  {
    id: 'website-01',
    title: 'Website experience',
    description: 'A selected website, with room for its visual direction, responsive layouts, and implementation story.',
    note: 'Preview slot · imagery to come',
    tags: ['Web design', 'Frontend'],
  },
  {
    id: 'website-02',
    title: 'Digital presence',
    description: 'A project slot for a distinctive digital presence, from first impression to useful detail.',
    note: 'Preview slot · imagery to come',
    tags: ['UI / UX', 'Web development'],
  },
  {
    id: 'website-03',
    title: 'Web product interface',
    description: 'A space for product interfaces and the design decisions that make complex workflows feel clear.',
    note: 'Preview slot · imagery to come',
    tags: ['Product design', 'Engineering'],
  },
];

export interface CaseStudyContent {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly description: string;
  readonly role: string;
  readonly organization: string;
  readonly format: string;
  readonly study: string;
  readonly tags: readonly string[];
  readonly contextTitle: string;
  readonly contextBody: string;
  readonly interactionTitle: string;
  readonly interactionBody: string;
  readonly flowLabels: readonly [string, string, string];
  readonly studyTitle: string;
  readonly studyBody: string;
}

export const LOOK_TO_PACE: CaseStudyContent = {
  id: 'look-to-pace',
  title: 'Look to Pace',
  category: 'Research / Virtual reality',
  description: 'A gaze-supported walking-in-place experience that adapts movement speed through eye gaze and body kinematics.',
  role: 'Graduate Research Assistant',
  organization: 'La Trobe University',
  format: 'Virtual reality research',
  study: '20-participant study',
  tags: ['Unity', 'Virtual reality', 'Human movement'],
  contextTitle: 'Movement, guided by more than a step.',
  contextBody: 'Look to Pace explores how eye gaze and body movement can work together in a walking-in-place experience. The prototype adapts virtual movement speed in response to those cues, connecting a person’s physical rhythm to their movement through a virtual environment.',
  interactionTitle: 'From embodied cues to virtual pace.',
  interactionBody: 'The system brings gaze and body kinematics into the locomotion loop. These inputs shape the pace of walking-in-place, making the research question tangible as an interactive VR experience.',
  flowLabels: ['Eye gaze', 'Body kinematics', 'Adaptive pace'],
  studyTitle: 'A research prototype, evaluated with people.',
  studyBody: 'The experience was examined in a 20-participant study. The work sits at the intersection of immersive systems, human movement, and interaction design.',
};

export const CASE_STUDY_PREVIEW: CaseStudyContent = {
  id: 'case-study-preview',
  title: 'Case study title',
  category: 'Project / Case study preview',
  description: 'A second full-width case study preview. Add a project image and story to turn this space into a complete project feature.',
  role: 'Role to be added',
  organization: 'Organization to be added',
  format: 'Project format to be added',
  study: 'Project details to come',
  tags: ['Context', 'Approach', 'Outcome'],
  contextTitle: 'Start with the context.',
  contextBody: 'Use this section to introduce the project, the people it served, and the problem or opportunity that shaped the work.',
  interactionTitle: 'Show how the idea took shape.',
  interactionBody: 'Describe the design and engineering decisions, the interaction model, and the systems that brought the project to life.',
  flowLabels: ['Context', 'Approach', 'Outcome'],
  studyTitle: 'Close with the result.',
  studyBody: 'Add the outcome, what changed, and any evidence that helps visitors understand the project’s impact.',
};

export const CASE_STUDIES: readonly CaseStudyContent[] = [LOOK_TO_PACE, CASE_STUDY_PREVIEW];
