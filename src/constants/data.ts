import {
  Code2,
  Settings,
  Users
} from 'lucide-react';
import kasthaImage from '../assets/Kastha_Logo.png'
import kurakaniImage from '../assets/KuraKani_Logo.png'
import freemanImage from '../assets/Freeman_Logo.png'
import zhenkalaImage from '../assets/Zhenkala_Logo.png'

export const PROFILE = {
  name: "Sushant Neupane",
  role: "Software Engineer",
  email: "nsushant09@gmail.com",
  phone: "+61 470606448",
  location: "Melbourne, VIC, Australia",
  experienceYears: "2+",
  education: "Master of Information Technology (Specialization in Artificial Intelligence)",
};

export const EDUCATION = [
  {
    institution: "La Trobe University",
    location: "Melbourne, VIC, Australia",
    degree: "Master of Information Technology (Specialization in Artificial Intelligence)",
    date: "Nov 2025 – June 2027",
    description: ""
  },
  {
    institution: "The British College (Degree awarded by Leeds Beckett University, UK)",
    location: "Kathmandu, Nepal",
    degree: "BSc (Hons) Computing",
    date: "Feb 2021 – Sept 2024",
    description: ""
  }
];

export const SKILLS_CATEGORIES = [
  {
    title: "Languages & Libraries",
    icon: Code2,
    skills: ["Kotlin", "Java", "Swift", "C#", "JavaScript", "TypeScript", "React", "Spring Boot", "Jetpack Compose", "Kotlin Multiplatform (KMP)", "Android Jetpack", "Coroutines", "Firebase", "SQL", "Unity"]
  },
  {
    title: "Tools & Platforms",
    icon: Settings,
    skills: ["Android SDK", "iOS Development", "AWS (EC2, RDS, Route53)", "Docker", "GitHub Actions", "Git", "Gradle", "Jenkins", "Dagger/Hilt", "JUnit", "Espresso", "HTC VIVE"]
  },
  {
    title: "Methods & Soft Skills",
    icon: Users,
    skills: ["UI/UX Engineering", "Design Thinking", "Figma Wireframing", "User Research", "Heuristic Usability Testing", "Clean Architecture", "MVVM", "Agile/Scrum"]
  }
];

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  date: string;
  category: "Work Experience" | "Research Experience";
  desc: string;
  bullets: string[];
  skills: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Academic Tutor (CSE2UI: User Interface Design)",
    company: "La Trobe University",
    location: "Melbourne, VIC, Australia",
    date: "June 2026 – Present",
    category: "Work Experience",
    desc: "Leading practical workshops and interactive lab sessions on UI/UX engineering, design thinking, user research synthesis, and rapid prototyping for 120+ undergraduate students.",
    bullets: [
      "Led practical workshops and interactive lab sessions on UI/UX engineering, design thinking, user research synthesis, and rapid prototyping for 120+ undergraduate students.",
      "Guided students through Figma wireframing, interactive prototyping, and heuristic usability testing to identify usability bottlenecks and validate design decisions prior to code execution."
    ],
    skills: ["UI/UX Engineering", "Design Thinking", "Figma", "User Research", "Rapid Prototyping", "Heuristic Evaluation"]
  },
  {
    role: "Graduate Research Assistant",
    company: "La Trobe University (Advisor: Dr. Huawei Tu)",
    location: "Melbourne, VIC, Australia",
    date: "March 2026 – Present",
    category: "Research Experience",
    desc: "Developing a novel Walk-in-Place (WIP) VR locomotion framework in Unity utilizing HTC VIVE headsets and Ultimate Trackers.",
    bullets: [
      "Developed a novel Walk-in-Place (WIP) VR locomotion framework in Unity utilizing HTC VIVE headsets and Ultimate Trackers.",
      "Designed real-time WIP algorithms combining eye-gaze tracking and body kinematics, computing user velocity proportional to focal distance, leg cadence, and arm swing to mitigate cybersickness."
    ],
    skills: ["VR Locomotion", "Unity", "HTC VIVE", "Ultimate Trackers", "Eye-Gaze Tracking", "Body Kinematics", "C#"]
  },
  {
    role: "Software Engineer",
    company: "I.T. Security College of Computer Studies",
    location: "Kathmandu, Nepal",
    date: "Oct 2024 – Nov 2025",
    category: "Work Experience",
    desc: "Spearheaded a full cross-platform migration from native Android and iOS codebases to Kotlin Multiplatform (KMP), using Gradle product flavors for 12+ educational institutions with 15,000+ active users.",
    bullets: [
      "Spearheaded a full cross-platform migration from native Android and iOS codebases to Kotlin Multiplatform (KMP), using Gradle product flavors to power white-label applications deployed across 12+ educational institutions for 15,000+ active students and parents.",
      "Engineered dynamic real-time data synchronization and live chat infrastructure by integrating Firebase and modern Android Jetpack libraries (ViewModel, LiveData, Navigation, Coroutines).",
      "Implemented end-to-end CI/CD pipelines utilizing Git, Docker, and GitHub Actions to automate testing and build deployments, significantly reducing manual release cycles and maintaining zero-downtime application continuity."
    ],
    skills: ["Kotlin Multiplatform (KMP)", "Android Jetpack", "Firebase", "Coroutines", "Docker", "GitHub Actions", "Gradle", "CI/CD"]
  },
  {
    role: "Research Intern",
    company: "Hochschule Zittau/Görlitz (Advisor: Prof. Dr. Knut Meissner)",
    location: "Zittau, Germany",
    date: "June 2024 – Aug 2024",
    category: "Research Experience",
    desc: "Architected a hands-free, voice-controlled Android Jetpack Compose application for the RealWear Navigator 520 smart glasses to streamline warehouse operations.",
    bullets: [
      "Architected a hands-free, voice-controlled Android Jetpack Compose application for the RealWear Navigator 520 smart glasses to streamline warehouse operations, including task assignment to robots and inventory management.",
      "Engineered the backend infrastructure using Spring Boot and SQL, deploying microservices on AWS (EC2, RDS, Route53) with Jenkins automating the CI/CD build and deployment pipelines.",
      "Built a functional 3D CAVE environment prototype in Unity for spatial research and hardware testing within university laboratories."
    ],
    skills: ["Jetpack Compose", "RealWear Navigator 520", "Spring Boot", "SQL", "AWS (EC2, RDS, Route53)", "Jenkins CI/CD", "Unity", "3D CAVE"]
  },
  {
    role: "Android Developer Intern",
    company: "F1Soft International",
    location: "Kathmandu, Nepal",
    date: "Sept 2022 – Feb 2023",
    category: "Work Experience",
    desc: "Engineered core mobile banking application features deployed across 50+ financial institutions, architecting scalable mobile layers using MVVM, Clean Architecture, and Dagger/Hilt.",
    bullets: [
      "Engineered core mobile banking application features deployed across 50+ financial institutions, architecting scalable mobile layers using MVVM, Clean Architecture, and Dagger/Hilt for dependency injection.",
      "Designed and implemented secure end-to-end payment flows to transmit data payloads seamlessly with external partner bank networks.",
      "Developed complex custom Android views using XML Layouts and authored automated unit and UI testing suites using JUnit and Espresso to ensure robust payment flow stability."
    ],
    skills: ["Android", "Kotlin", "MVVM", "Clean Architecture", "Dagger/Hilt", "JUnit", "Espresso", "XML Layouts", "Payment Flows"]
  }
];

export const PROJECTS = [
  {
    title: "ZhenKala – Authentic Himalayan Marketplace",
    description: "Full-stack e-commerce platform built with React, Node.js, Express, and MongoDB, deployed on AWS EC2 with Docker and GitHub Actions CI/CD. Designed responsive UI components with a focus on interaction design and user flow. Built an analytics dashboard with real-time net-profit visualisation and dynamic cost-per-variant tracking, integrating Stripe and PayPal payment APIs.",
    tags: ["React", "Node.js", "Express", "MongoDB", "AWS", "Docker", "GitHub Actions", "Stripe", "PayPal"],
    link: "https://github.com/nsushant09/ZhenKala",
    image: zhenkalaImage
  },
  {
    title: "Kastha – AR Furniture Platform",
    description: "Implemented ARCore-powered spatial product visualisation with responsive layouts and interaction design patterns, backed by a Spring Boot REST API and MySQL. Engineered a Firebase Realtime Database chat system enabling live interaction between store staff and customers. Built JWT-based authentication and authorization, image upload and retrieval, and automated deployments via Docker and GitHub Actions CI/CD.",
    tags: ["ARCore", "Spring Boot", "MySQL", "Firebase", "JWT", "Docker", "GitHub Actions", "Kotlin"],
    link: "https://github.com/nsushant09/kastha",
    image: kasthaImage
  },
  {
    title: "Kurakani",
    description: "A real-time chat application featuring end-to-end communication, multimedia messaging, and instant notifications.",
    tags: ["Firebase", "WebRTC", "FCM", "Android", "Cloud Storage"],
    link: "https://github.com/nsushant09/kurakani",
    image: kurakaniImage
  },
  {
    title: "Freeman Urban Store",
    description: "Full-stack e-commerce solution with dedicated Admin and User interfaces, featuring secure PayPal payment integration.",
    tags: ["PHP", "JavaScript", "SQL", "Oracle APEX", "PayPal API"],
    link: "https://github.com/freemanurbanstore/Freeman-Urban-Store",
    image: freemanImage
  }
];