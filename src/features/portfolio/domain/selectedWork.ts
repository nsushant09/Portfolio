export type ProjectDestination =
  | { readonly kind: 'play-store'; readonly url: string }
  | { readonly kind: 'app-store'; readonly url: string }
  | { readonly kind: 'github'; readonly url: string }
  | { readonly kind: 'website'; readonly url: string };

export function destinationLabel(destination: ProjectDestination): string {
  switch (destination.kind) {
    case 'play-store': return 'Google Play';
    case 'app-store': return 'App Store';
    case 'github': return 'GitHub';
    case 'website': return 'Visit website';
  }
}

export interface PortfolioProjectPreview {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly note: string;
  readonly image?: string;
  readonly imageAlt?: string;
  readonly screenshots?: readonly { readonly src: string; readonly alt: string }[];
  readonly tags: readonly string[];
  readonly destinations: readonly ProjectDestination[];
}

export const MOBILE_PROJECTS: readonly PortfolioProjectPreview[] = [
  {
    id: 'kastha',
    title: 'Kastha',
    description: 'An Android furniture shopping app for browsing products, managing a cart, and previewing 3D furniture in your space with augmented reality.',
    note: 'Solo project · 2023—2026',
    screenshots: [
      { src: '/projects/kastha-sign-in.jpg', alt: 'Kastha sign-in screen introducing furniture visualization' },
      { src: '/projects/kastha-sign-up.jpg', alt: 'Kastha account registration form' },
      { src: '/projects/kastha-verification.jpg', alt: 'Kastha one-time password verification screen' },
      { src: '/projects/kastha-home.jpg', alt: 'Kastha product catalogue with furniture listings and augmented reality labels' },
      { src: '/projects/kastha-product-detail.jpg', alt: 'Kastha furniture product details with an AR view option' },
      { src: '/projects/kastha-cart.jpg', alt: 'Kastha shopping cart with furniture products and quantities' },
      { src: '/projects/kastha-profile.jpg', alt: 'Kastha user profile and account services screen' },
    ],
    tags: ['Kotlin', 'ARCore + Sceneform', 'Spring Boot', 'Room', 'Firebase', 'Retrofit', 'Koin'],
    destinations: [
      { kind: 'play-store', url: 'https://play.google.com/store/apps/details?id=com.neupanesushant.kastha&hl=en_AU' },
    ],
  },
  {
    id: 'bhagavad-geeta',
    title: 'Bhagavad Geeta',
    description: 'An offline scripture reader for exploring the Gita, with chapter and verse study, bundled recitations, reading preferences, bookmarks, and daily reminders.',
    note: 'Repository activity · Sep—Oct 2026',
    screenshots: [
      { src: '/projects/bhagavad-geeta-home.jpg', alt: 'Bhagavad Geeta home screen with the daily verse and reading progress' },
      { src: '/projects/bhagavad-geeta-chapters.jpg', alt: 'Chapter browser listing the eighteen chapters of the Bhagavad Gita' },
      { src: '/projects/bhagavad-geeta-reader.jpg', alt: 'Verse reader showing Sanskrit, transliteration, and word-by-word meaning' },
      { src: '/projects/bhagavad-geeta-preferences.jpg', alt: 'Reading preferences for appearance, translation language, font size, and reminders' },
    ],
    tags: ['Kotlin Multiplatform', 'Compose', 'Offline audio', 'Notifications'],
    destinations: [
      { kind: 'github', url: 'https://github.com/nsushant09/BhagavadGeeta' },
    ],
  },
  {
    id: 'taskflow',
    title: 'TaskFlow',
    description: 'An Android productivity app bringing notes, task lists, quotes, and note translation together, with notes and task data stored locally.',
    note: 'Repository activity · Jun 2022—Oct 2026',
    screenshots: [
      { src: '/projects/taskflow-groups.jpg', alt: 'TaskFlow task groups with completion progress and today’s task list' },
      { src: '/projects/taskflow-notes.jpg', alt: 'TaskFlow notes list with a highlighted note preview' },
      { src: '/projects/taskflow-note-editor.jpg', alt: 'TaskFlow note editor with an example note and editing tools' },
      { src: '/projects/taskflow-quotes.jpg', alt: 'TaskFlow quote collection with colorful quote cards' },
      { src: '/projects/taskflow-translation.jpg', alt: 'TaskFlow note translation controls for choosing source and target languages' },
      { src: '/projects/taskflow-translated-note.jpg', alt: 'TaskFlow note content after translation into Spanish' },
      { src: '/projects/taskflow-share.jpg', alt: 'Android share sheet opened for translated TaskFlow note text' },
    ],
    tags: ['Kotlin', 'Android Views', 'Room', 'Coroutines', 'Google ML Kit'],
    destinations: [
      { kind: 'github', url: 'https://github.com/nsushant09/NoteApplication' },
    ],
  },
];

export const WEBSITE_PROJECTS: readonly PortfolioProjectPreview[] = [
  {
    id: 'website-01',
    title: 'Saanvi Services',
    description: 'A warm, service-led website helping people and families explore disability support, home care, cleaning, and yard services.',
    note: 'Solo design & development',
    image: '/projects/saanvi-services-desktop.jpg',
    imageAlt: 'Saanvi Services homepage with its pink service-focused design',
    tags: ['React', 'TypeScript', 'Accessible UX'],
    destinations: [{ kind: 'website', url: 'https://www.saanviservices.com.au/' }],
  },
  {
    id: 'website-02',
    title: 'Tiffin Home & Restaurant',
    description: 'A booking-focused digital experience for a family-run lodge and restaurant in Sauraha, with rooms, dining, tours, and local information.',
    note: 'Solo design & development',
    image: '/projects/tiffin-home-desktop.jpg',
    imageAlt: 'Tiffin Home & Restaurant homepage showing the lodge welcome and booking options',
    tags: ['Next.js', 'Room bookings', 'MongoDB'],
    destinations: [{ kind: 'website', url: 'https://tiffinhomeandrestaurant.netlify.app/' }],
  },
  {
    id: 'website-03',
    title: 'G.S. Motors',
    description: 'A digital showroom for browsing used vehicles, exploring detailed listings, and requesting a quote to sell a car.',
    note: 'Solo design & development',
    image: '/projects/gs-motors-desktop.jpg',
    imageAlt: 'G.S. Motors homepage with its dark green used-car showroom design',
    tags: ['React', 'Vehicle listings', 'Express'],
    destinations: [{ kind: 'website', url: 'https://gsmotors.com.np/' }],
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
  readonly destinations: readonly ProjectDestination[];
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
  destinations: [],
  contextTitle: 'Movement, guided by more than a step.',
  contextBody: 'Look to Pace explores how eye gaze and body movement can work together in a walking-in-place experience. The prototype adapts virtual movement speed in response to those cues, connecting a person’s physical rhythm to their movement through a virtual environment.',
  interactionTitle: 'From embodied cues to virtual pace.',
  interactionBody: 'The system brings gaze and body kinematics into the locomotion loop. These inputs shape the pace of walking-in-place, making the research question tangible as an interactive VR experience.',
  flowLabels: ['Eye gaze', 'Body kinematics', 'Adaptive pace'],
  studyTitle: 'A research prototype, evaluated with people.',
  studyBody: 'The experience was examined in a 20-participant study. The work sits at the intersection of immersive systems, human movement, and interaction design.',
};

export const CASE_STUDIES: readonly CaseStudyContent[] = [LOOK_TO_PACE];
