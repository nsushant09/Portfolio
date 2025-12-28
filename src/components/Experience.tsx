import { EXPERIENCE } from '../constants/data';
import { ExperienceCard } from './ExperienceCard';

export const Experience = () => (
  <section id="experience" className="py-24 px-6 max-w-4xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold tracking-tighter mb-4">Professional Experience</h2>
      <div className="h-1 w-20 bg-white mx-auto rounded-full" />
    </div>
    
    <div className="relative">
      {/* The vertical line matching your screenshot style */}
      <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-zinc-800 to-transparent hidden md:block" />
      
      <div className="space-y-4">
        {EXPERIENCE.map((exp, i) => (
          <ExperienceCard key={i} {...exp} />
        ))}
      </div>
    </div>
  </section>
);