import { ExternalLink, Github } from 'lucide-react';
import { PROJECTS } from '../constants/data';

export const Projects = () => (
  <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
      <p className="text-zinc-400">Demonstrating expertise in mobile development and AR integration.</p>
    </div>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {PROJECTS.map((project, index) => (
        <div key={index} className="bg-[#111] border border-zinc-800 rounded-2xl overflow-hidden group hover:border-zinc-700 transition-colors">
          {/* Image Container */}
          <div className="h-48 overflow-hidden bg-zinc-900">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-500 group-hover:grayscale-0 group-hover:duration-200 group-hover:scale-105" 
            />
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-zinc-500 text-sm mb-4 line-clamp-2">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(tag => (
                <span key={tag} className="text-[10px] bg-zinc-800 px-2 py-1 rounded text-zinc-300 uppercase">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                <Github size={16} /> Code
              </a>
              <button className="flex items-center gap-2 text-sm bg-white text-black px-4 py-1 rounded-md font-medium hover:bg-zinc-200 transition-colors">
                <ExternalLink size={14} /> Demo
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);