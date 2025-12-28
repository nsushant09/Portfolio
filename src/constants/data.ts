import { 
  Code2, 
  Layers, 
  Database, 
  Settings, 
  Users, 
  Smartphone 
} from 'lucide-react';
import kasthaImage from '../assets/Kastha_Logo.png'
import kurakaniImage from '../assets/KuraKani_Logo.png'
import freemanImage from '../assets/Freeman_Logo.png'

export const PROFILE = {
  name: "Sushant Neupane", // [cite: 1]
  role: "Software Engineer", // [cite: 15]
  email: "nsushant09@gmail.com", // [cite: 2]
  phone: "+61 470606448", // [cite: 2]
  location: "Melbourne, Australia", // [cite: 8]
  experienceYears: "2+",
  education: "Master of Information Technology", // [cite: 5]
};

export const SKILLS_CATEGORIES = [
  {
    title: "Programming Languages",
    icon: Code2,
    skills: ["Kotlin", "Java", "Swift", "JavaScript", "TypeScript", "PHP", "SQL"] // [cite: 43]
  },
  {
    title: "Frameworks & Libraries",
    icon: Layers,
    skills: ["Jetpack Compose", "React", "Spring Boot", "Spring", "Node.js", "Express.js", "Next.js"] // [cite: 43]
  },
  {
    title: "Backend & Services",
    icon: Database,
    skills: ["Firebase", "AWS", "MySQL", "PostgreSQL", "Nginx", "MongoDB", "Redis"] // [cite: 25, 44]
  },
  {
    title: "DevOps & Tools",
    icon: Settings,
    skills: ["Docker", "Kubernetes", "GitHub Actions", "CI/CD", "Gradle", "Git", "Linux"] // [cite: 19, 38, 44]
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    skills: ["Android SDK", "iOS Development", "ARCore", "KMP", "Biometric Auth", "Material Design"] // [cite: 18, 31, 32, 40, 43, 44]
  },
  {
    title: "Soft Skills",
    icon: Users,
    skills: ["Agile/Scrum", "Team Leadership", "Technical Writing", "Problem Solving", "Cross-functional Collaboration"] // [cite: 11, 12, 26]
  }
];

export const EXPERIENCE = [
  {
    role: "Junior Mobile Developer",
    company: "I.T. Security College of Computer Studies",
    location: "Kathmandu, Nepal",
    date: "June 2025 - Nov 2025",
    desc: "Migrated key application modules from legacy Android Views to Jetpack Compose to enhance UI maintainability. Developed and integrated cross-platform features using Kotlin Multiplatform while managing complex release cycles through Gradle build variants. Ensured high feature stability by writing and executing automated test suites with JUnit and Espresso.",
    skills: ["Kotlin", "Jetpack Compose", "KMP", "Gradle", "JUnit", "Espresso"]
  },
  {
    role: "Research Intern",
    company: "Hochschule Zittau/Görlitz",
    location: "Zittau, Germany", 
    date: "June 2024 - Aug 2024",
    desc: "Engineered a hands-free wearable application for the RealWear Navigator 520, enabling voice-controlled workflows for laboratory environments. Architected a scalable back-end system using Spring Boot and MySQL that optimized data retrieval for AR-based tasks. Conducted full-cycle testing and produced comprehensive technical documentation for AR/VR workflow integration.",
    skills: ["Android", "Kotlin", "Java", "Spring Boot", "MySQL", "ARCore"]
  },
  {
    role: "Software Engineering Intern",
    company: "F1Soft International",
    location: "Kathmandu, Nepal",
    date: "Sept 2022 - Feb 2023",
    desc: "Implemented secure Biometric Authentication for financial transaction verification and integrated Google Maps API for real-time geolocation services. Designed custom Android views and high-performance in-app animations using MotionLayout while strictly adhering to Google Material Design components.",
    skills: ["Android", "MotionLayout", "Material Design", "Google Maps API", "Biometric Auth"]
  }
];

export const PROJECTS = [
  {
    title: "Kastha",
    description: "An AR E-commerce platform integrating ARCore for 3D product visualization and a real-time chat system.",
    tags: ["Android", "Spring Boot", "ARCore", "Firebase", "AWS", "Docker", "Github Actions"],
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