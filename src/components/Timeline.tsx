import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TIMELINE_DATA = [
  {
    year: 'Present',
    title: 'Research Assistant',
    company: 'Prof. Huawei Tu',
    description: 'Currently working on cutting-edge research focused on Walking in Place Locomotion Techniques for spatial AR/VR environments.'
  },
  {
    year: '2025 - Jul 2027',
    title: 'Master of Information Technology',
    company: 'La Trobe University',
    description: 'Specialising in Artificial Intelligence. Melbourne, Australia.'
  },
  {
    year: 'Oct 2024 - Nov 2025',
    title: 'Junior Software Engineer',
    company: 'I.T. Security College of Computer Studies',
    description: 'Built Android apps for college management using Kotlin and Jetpack Compose. Implemented MVVM/MVI architecture, set up CI/CD pipelines with Docker and Jenkins, and configured Gradle build variants.'
  },
  {
    year: 'June 2024 - Aug 2024',
    title: 'Research Intern',
    company: 'Hochschule Zittau/Görlitz',
    description: 'Developed voice-controlled Android apps for RealWear wearable hardware. Prototyped a 3D CAVE environment in Unity for spatial AR/VR interaction research. Authored technical reports on AR/VR frameworks.'
  },
  {
    year: '2020 - 2024',
    title: 'BSc (Hons) Computing',
    company: 'The British College',
    description: 'Graduated with First Class Honours. Kathmandu, Nepal.'
  },
  {
    year: 'Sept 2022 - Feb 2023',
    title: 'Software Engineering Intern',
    company: 'F1Soft International',
    description: 'Built Android and iOS features using MVVM architecture. Integrated biometric authentication and Google Maps SDK. Applied Dagger 2 and RxJava design patterns.'
  }
];

const TimelineItem = ({ item, index }: { item: any, index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [0, 0.5, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -100 : 100, 0]);

  return (
    <div className={`flex flex-col md:flex-row items-center justify-between w-full mb-20 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
      <div className="hidden md:block w-5/12"></div>
      
      <div className="z-20 flex items-center justify-center w-6 h-6 bg-[#111] border-2 border-zinc-300 rounded-sm shadow-[0_0_20px_rgba(212,212,216,0.2)] relative">
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 bg-zinc-300/20 rounded-sm -z-10"
        />
      </div>

      <motion.div 
        ref={ref}
        style={{ opacity, scale, x }}
        className="w-full md:w-5/12 mt-8 md:mt-0"
      >
        <div className="p-8 bg-[#111] border border-zinc-800 rounded-sm shadow-xl hover:shadow-zinc-300/10 hover:border-zinc-300/50 transition-all group">
          <span className="text-zinc-300 font-bold tracking-widest text-sm mb-2 block uppercase">{item.year}</span>
          <h3 className="font-heading text-2xl font-black text-white mb-1 group-hover:text-zinc-300 transition-colors">{item.title}</h3>
          <h4 className="text-lg font-bold text-zinc-400 mb-4">{item.company}</h4>
          <p className="text-zinc-500 leading-relaxed font-medium">{item.description}</p>
        </div>
      </motion.div>
    </div>
  );
};

export const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto relative" id="experience" ref={containerRef}>
      <div className="text-center mb-24">
        <h2 className="font-heading text-5xl md:text-7xl font-black mb-6 text-white tracking-tighter">JOURNEY</h2>
        <p className="text-zinc-500 text-xl tracking-widest uppercase font-bold">Experience & Education</p>
      </div>

      <div className="relative wrap overflow-hidden p-4 md:p-10 h-full">
        {/* The center line */}
        <div className="absolute border-opacity-20 border-zinc-800 h-full border-l-2 left-1/2 -translate-x-1/2 hidden md:block"></div>
        {/* Animated progressive line */}
        <motion.div 
          style={{ height }}
          className="absolute bg-zinc-300 w-1 left-1/2 -translate-x-1/2 hidden md:block z-0 origin-top shadow-[0_0_10px_rgba(212,212,216,0.5)]"
        ></motion.div>

        {TIMELINE_DATA.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};
