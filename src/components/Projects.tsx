import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../constants/data';

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);

  return (
    <motion.div 
      ref={ref}
      style={{ opacity }}
      className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center min-h-[70vh] py-10 lg:py-20`}
    >
      {/* Image Side */}
      <div className="w-full lg:w-1/2 relative group">
        <div className="absolute inset-0 bg-zinc-300 transform translate-x-4 translate-y-4 opacity-20 group-hover:translate-x-8 group-hover:translate-y-8 transition-all duration-500 rounded-sm"></div>
        <div className="relative overflow-hidden rounded-sm border border-zinc-800 bg-[#111] aspect-[4/3] shadow-xl">
          <motion.img 
            style={{ scale: imageScale }}
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-700" 
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#050505]/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
             <a href={project.link} target="_blank" rel="noreferrer" className="w-24 h-24 bg-zinc-300 rounded-sm flex items-center justify-center text-[#050505] scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 shadow-2xl hover:bg-zinc-200 hover:scale-110">
                <ArrowUpRight size={40} />
             </a>
          </div>
        </div>
      </div>

      {/* Content Side */}
      <motion.div style={{ y }} className="w-full lg:w-1/2">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-zinc-300 font-bold tracking-widest text-sm uppercase">0{index + 1}</span>
          <div className="h-[2px] w-24 bg-zinc-700"></div>
        </div>
        
        <h3 className="font-heading text-5xl md:text-7xl font-black mb-6 text-white hover:text-zinc-300 transition-colors cursor-default tracking-tight">
          {project.title}
        </h3>
        
        <p className="text-zinc-400 text-lg md:text-xl mb-10 leading-relaxed font-medium">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-3 mb-12">
          {project.tags.map((tag: string) => (
            <span key={tag} className="text-xs font-bold tracking-widest bg-[#111] text-zinc-300 px-5 py-2.5 rounded-sm uppercase border border-zinc-800 shadow-sm">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <a 
            href={project.link} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-3 text-zinc-400 hover:text-zinc-300 font-bold uppercase tracking-widest text-sm transition-colors group/link"
          >
            <div className="p-3 bg-zinc-900 rounded-sm group-hover/link:bg-zinc-800 transition-colors border border-zinc-800">
              <Github size={20} className="group-hover/link:-translate-y-1 transition-transform" /> 
            </div>
            <span>Source Code</span>
          </a>
          <a 
            href={project.link} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-3 bg-zinc-300 text-[#050505] px-8 py-4 rounded-sm font-black text-sm uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-xl hover:shadow-zinc-300/30 group/btn border border-zinc-200"
          >
            <span>Live Demo</span>
            <ExternalLink size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Projects = () => {
  return (
    <section id="projects" className="py-40 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-40">
        <h2 className="font-heading text-6xl md:text-8xl font-black mb-6 text-white tracking-tighter">SELECTED WORKS</h2>
        <p className="text-zinc-500 text-xl tracking-widest uppercase font-bold">Featured Projects</p>
      </div>
      
      <div className="flex flex-col gap-20">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};