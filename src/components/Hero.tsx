import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ArrowDown } from 'lucide-react';
import resumeFile from '../assets/Sushant_Resume.pdf';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms for background squares
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 800]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [45, -90]);
  
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <section ref={containerRef} className="relative pt-20 pb-20 px-6 min-h-screen flex flex-col items-center justify-center overflow-hidden z-10 pointer-events-none">
      
      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center text-center mt-12 md:mt-0 pointer-events-auto">
        
        <motion.div
          style={{ y: contentY, opacity: contentOpacity, scale }}
          className="flex flex-col items-center w-full"
        >
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-3 px-5 py-2 border border-zinc-800 bg-[#111] mb-12 rounded-sm shadow-xl"
          >
            <span className="text-zinc-300 text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-zinc-300 opacity-75"></span>
                <span className="relative inline-flex rounded-none h-2 w-2 bg-zinc-300"></span>
              </span>
              Available for Work
            </span>
          </motion.div>

          {/* Massive Centered Typography */}
          <div className="flex flex-col items-center mb-10 w-full overflow-hidden">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-heading text-7xl md:text-[8rem] lg:text-[11rem] font-black tracking-tighter leading-[0.85] text-white w-full"
            >
              SUSHANT
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-heading text-7xl md:text-[8rem] lg:text-[11rem] font-black tracking-tighter leading-[0.85] text-zinc-600 w-full"
            >
              NEUPANE
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-zinc-400 text-lg md:text-2xl max-w-3xl mb-14 leading-relaxed font-medium"
          >
            Software Engineer crafting digital experiences with <span className="text-zinc-200 font-bold">2+ years</span> of expertise.
            Specializing in mobile development, DevOps practices, and scalable solutions that drive business growth.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 mb-16"
          >
            <a
              href={resumeFile}
              download
              className="flex items-center justify-center gap-3 bg-zinc-300 text-[#050505] px-10 py-5 font-bold tracking-[0.2em] uppercase text-sm hover:bg-zinc-200 transition-all rounded-sm shadow-[0_0_20px_rgba(212,212,216,0.1)] hover:shadow-[0_0_30px_rgba(212,212,216,0.2)]"
            >
              <Download size={18} /> Download Resume
            </a>
            <a
              href="#projects"
              className="flex items-center justify-center gap-3 bg-[#111] border border-zinc-700 text-zinc-300 px-10 py-5 font-bold tracking-[0.2em] uppercase text-sm hover:bg-zinc-800 hover:text-white transition-all rounded-sm"
            >
              View My Work
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats Section anchored to bottom */}
      <motion.div 
        style={{ opacity: contentOpacity }}
        className="absolute bottom-0 left-0 right-0 border-t border-zinc-900 bg-[#050505]/80 backdrop-blur-md z-20"
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap md:flex-nowrap items-center justify-between gap-8">
          <div className="flex justify-center md:justify-start gap-8 md:gap-16 w-full md:w-auto">
            {[
              { label: "Projects", value: "10+" },
              { label: "Years Exp", value: "2+" },
              { label: "Client Satisfaction", value: "100%" },
            ].map((stat, i) => (
              <div key={i} className="text-center md:text-left">
                <p className="font-heading text-2xl md:text-4xl font-black mb-1 text-white tracking-tighter">{stat.value}</p>
                <p className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-widest font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
          
          <div className="hidden md:flex items-center gap-4 text-zinc-600">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowDown size={16} className="text-zinc-400" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};