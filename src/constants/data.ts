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
  location: "Melbourne, Australia",
  experienceYears: "2+",
  education: "Master of Information Technology",
};

export const EDUCATION = [
  {
    institution: "La Trobe University",
    location: "Melbourne, Australia",
    degree: "Master of Information Technology (Specialising in Artificial Intelligence)",
    date: "2025 – Jul 2027",
    description: ""
  },
  {
    institution: "The British College",
    location: "Kathmandu, Nepal",
    degree: "BSc (Hons) Computing — First Class Honours",
    date: "2021 – 2024",
    description: ""
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
    date: "Oct 2024 – Nov 2025",
    desc: "Implemented Figma designs into pixel-perfect Jetpack Compose UIs for school and college management apps, delivering responsive layouts across phones, tablets, and various screen densities. Applied Google Material Design guidelines and design tokens to build consistent UI components for student-facing features including timetables, attendance, and results. Implemented MVVM/MVI architecture with Dagger/Hilt across multiple educational apps, ensuring clean separation of UI state and business logic. Set up CI/CD pipelines using Docker and Jenkins with automated test gates, streamlining build and release processes for the team.",
    skills: ["Kotlin", "Jetpack Compose", "MVVM", "MVI", "Dagger/Hilt", "Docker", "Jenkins", "Material Design"]
  },
  {
    role: "Research Intern",
    company: "Hochschule Zittau/Görlitz",
    location: "Zittau, Germany",
    date: "Jun 2024 – Aug 2024",
    desc: "Conducted heuristic evaluations and user research to enhance interaction design of wearable interfaces, documenting findings to improve spatial UX for departmental research use. Developed voice-controlled Android apps in Java and Kotlin for RealWear Navigator 520 wearable hardware, integrating REST APIs for real-time data retrieval. Prototyped a 3D CAVE environment in Unity for spatial AR/VR interaction research, applying multi-threaded rendering and structured concurrency patterns.",
    skills: ["Kotlin", "Java", "Unity", "REST API", "RealWear", "AR/VR", "UX Research"]
  },
  {
    role: "Teaching Assistant – Developing Mobile Applications",
    company: "The British College",
    location: "Kathmandu, Nepal",
    date: "Feb 2024 – May 2024",
    desc: "Worked under the mentorship and guidance of Miss Anita Gurung Rana, Assistant Programme Leader, supporting the delivery of the Developing Mobile Applications module. Facilitated weekly lab sessions on UI principles, design thinking, and heuristic evaluation for a cohort of undergraduate students. Guided students through Android app development using Jetpack Compose, providing design feedback aligned with Material Design and usability best practices. Supported students in applying human-centered design methods, from user research and wireframing through to high-fidelity prototyping and usability testing.",
    skills: ["Jetpack Compose", "Material Design", "UX Design", "Design Thinking", "Teaching"]
  },
  {
    role: "Software Engineering Intern",
    company: "F1Soft International",
    location: "Kathmandu, Nepal",
    date: "Sept 2022 – Feb 2023",
    desc: "Implemented Google Material Design guidelines to faithfully translate Figma designs into production UI, ensuring visual consistency across components and interaction states. Built and maintained Android (Kotlin/Java) and iOS (Swift/SwiftUI) features using MVVM architecture, Retrofit for REST API integration, and Room for local persistence. Integrated biometric authentication (BiometricPrompt / LocalAuthentication) and Google Maps SDK across both Android and iOS platforms.",
    skills: ["Kotlin", "Java", "Swift", "SwiftUI", "MVVM", "Retrofit", "Room", "Biometric Auth", "Google Maps"]
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