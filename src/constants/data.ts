import {
  Code2,
  Settings,
  Users
} from 'lucide-react';
import kasthaImage from '../assets/Kastha_Logo.png'
import kurakaniImage from '../assets/KuraKani_Logo.png'
import freemanImage from '../assets/Freeman_Logo.png'

export const PROFILE = {
  name: "Sushant Neupane",
  role: "Software Engineer",
  email: "nsushant09@gmail.com",
  phone: "+61 470606448",
  location: "Melbourne, Australia",
  experienceYears: "2+",
  education: "Master of Information Technology",
};

export const EDUCATION = [
  {
    institution: "La Trobe University",
    location: "Melbourne, Australia",
    degree: "Master of Information Technology",
    date: "Nov 2025 - July 2027",
    description: ""
  },
  {
    institution: "The British College",
    location: "Kathmandu, Nepal",
    degree: "BSc (Hons) Computing",
    date: "Sept 2020 - Sept 2024",
    description: "Recipient of the Student Excellence Award for academic and extra-curricular leadership."
  }
];

export const SKILLS_CATEGORIES = [
  {
    title: "Languages & Libraries",
    icon: Code2,
    skills: ["Kotlin", "Java", "Swift", "JavaScript", "TypeScript", "React", "Spring Boot", "Jetpack Compose", "Kotlin Multiplatform", "PHP", "ARCore", "Firebase", "Supabase", "Scikit-learn", "TensorFlow"]
  },
  {
    title: "Tools & Platforms",
    icon: Settings,
    skills: ["Android SDK", "iOS Development", "AWS", "Docker", "Kubernetes", "GitHub Actions", "Git", "Gradle", "Jenkins", "Nginx"]
  },
  {
    title: "Soft Skills",
    icon: Users,
    skills: ["Agile/Scrum", "Team Leadership", "Technical Writing", "Problem Solving", "Cross-functional Collaboration"]
  }
];

export const EXPERIENCE = [
  {
    role: "Junior Software Engineer",
    company: "I.T. Security College of Computer Studies",
    location: "Kathmandu, Nepal",
    date: "June 2025 - Nov 2025",
    desc: "Migrated legacy Java modules to Jetpack Compose and Kotlin Multiplatform. Architected a full CI/CD pipeline using GitHub Actions to automate Docker containerization & deployment. Deployed and managed a scalable Kubernetes (K8s) cluster on AWS EC2. Configured Nginx Reverse Proxy for secure domain routing and implemented SSL (HTTPS) termination. Optimized build cycles by configuring Gradle build variants and automated release workflows.",
    skills: ["Kotlin", "Jetpack Compose", "KMP", "Docker", "Kubernetes", "AWS", "GitHub Actions", "Nginx"]
  },
  {
    role: "Freelance Android Developer",
    company: "Upwork",
    location: "Remote",
    date: "Sept 2024 - May 2025",
    desc: "Developed and scaled three Android applications to 1M+ total downloads on the Google Play Store. Engineered a file-system integration layer to manage system and application data storage. Integrated Google AdMob for monetization and monitored application health using Firebase Crashlytics, maintaining a 99% crash-free user sessions rate.",
    skills: ["Android", "Google AdMob", "Firebase Crashlytics", "File System"]
  },
  {
    role: "Research Intern",
    company: "Hochschule Zittau/Görlitz",
    location: "Zittau, Germany",
    date: "June 2024 - Aug 2024",
    desc: "Built voice-controlled wearable apps for RealWear Navigator 520 using Kotlin and Spring Boot. Optimized MySQL database schemas, achieving a 20% increase in AR data retrieval speeds. Developed a 3D prototype for a CAVE environment using Unity and spatial interaction logic.",
    skills: ["Kotlin", "Spring Boot", "MySQL", "Unity", "RealWear"]
  },
  {
    role: "Software Engineering Intern",
    company: "F1Soft International",
    location: "Kathmandu, Nepal",
    date: "Sept 2022 - Feb 2023",
    desc: "Implemented secure Biometric Authentication flows for financial transaction security. Integrated Google Maps API for location-based merchant discovery and transaction tracking.",
    skills: ["Android", "Biometric Auth", "Google Maps API"]
  }
];

export const PROJECTS = [
  {
    title: "Kastha - AR Furniture Platform",
    description: "Developed an AR marketplace using ARCore. Built a secure Spring Boot backend with JWT-based Auth and RESTful APIs. Implemented real-time customer support chat functionality using Firebase. Automated AWS deployments via GitHub Actions.",
    tags: ["ARCore", "Spring Boot", "AWS", "Firebase", "GitHub Actions", "JWT", "REST API"],
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