import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ArrowRight } from 'lucide-react';
import resumeFile from '../assets/Sushant_Resume.pdf';
import heroImage from '../assets/sushant.jpg'

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 mb-8">
            <span className="text-zinc-400 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 bg-zinc-500 rounded-full animate-pulse" />
              Available for Work
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-6">
            Hello, I'm <br />
            <span className="text-white">Sushant Neupane</span>
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            Software Engineer crafting digital experiences with <span className="text-white font-bold">2+ years</span> of expertise.
            Specializing in mobile development, DevOps practices, and scalable solutions that drive business growth.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href={resumeFile}
              download
              className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-zinc-200 transition-all text-sm"
            >
              <Download size={18} /> Download Resume
            </a>
            <a
              href="#projects"
              className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-white px-8 py-4 rounded-xl font-bold hover:bg-zinc-800 transition-all text-sm"
            >
              View My Work
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {[
              { Icon: Github, href: "https://github.com/nsushant09" },
              { Icon: Linkedin, href: "https://linkedin.com/in/nsushant09" },
              { Icon: Mail, href: "mailto:nsushant09@gmail.com" }
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 transition-all bg-zinc-900/50"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right Content: Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-zinc-800 rounded-full overflow-hidden border-4 border-zinc-900 shadow-2xl">
              {/* Replace with your actual image path */}
              <img
                src={heroImage}
                alt="Sushant Neupane"
                className="w-full h-full grayscale-20 object-cover transition-all duration-500 hover:grayscale-0 hover:duration-200"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-32 pt-12 border-t border-zinc-900">
        {[
          { label: "Projects", value: "10+" },
          { label: "Years Exp", value: "2+" },
          { label: "Client Satisfaction", value: "100%" },
        ].map((stat, i) => (
          <div key={i} className="text-center md:text-left">
            <p className="text-3xl md:text-4xl font-bold mb-1 tracking-tighter">{stat.value}</p>
            <p className="text-zinc-500 text-sm uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
        {/* Scroll Indicator */}
        <div className="hidden md:flex flex-col items-center justify-center gap-2 text-zinc-600">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowRight size={16} className="rotate-90" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};