import { Briefcase, Calendar, MapPin, Code } from 'lucide-react';

interface Props { 
  role: string; 
  company: string; 
  location: string; 
  date: string; 
  desc: string; 
  skills: string[]; 
}

export const ExperienceCard = ({ role, company, location, date, desc, skills }: Props) => (
  <div className="bg-[#111] border border-zinc-800 p-8 rounded-2xl mb-8 hover:border-zinc-500 transition-all group relative overflow-hidden">
    {/* Background Hover Effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

    <div className="relative z-10">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
        {/* Left Side: Role and Company */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
            <Briefcase size={22} className="text-zinc-500 group-hover:text-white transition-colors" /> 
            {role}
          </h3>
          <p className="text-zinc-400 font-medium text-lg mt-1">{company}</p>
        </div>
        
        {/* Right Side: Date (Pill) and Location (Stacked Below) */}
        <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
          <div className="bg-zinc-900/80 border border-zinc-800 px-4 py-1.5 rounded-full">
            <span className="text-zinc-300 text-xs font-mono flex items-center gap-2">
              <Calendar size={14} /> {date}
            </span>
          </div>
          <span className="text-zinc-500 text-sm font-medium flex items-center gap-1.5 md:pr-2">
            <MapPin size={14} className="text-zinc-600" /> {location}
          </span>
        </div>
      </div>

      {/* Description: Professional Past Tense Paragraph */}
      <p className="text-zinc-400 leading-relaxed mb-8 text-base text-justify md:text-left">
        {desc}
      </p>

      {/* Tech Stack Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Code size={14} className="text-zinc-600" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold">
            Technologies Used
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span 
              key={skill} 
              className="px-3 py-1 bg-zinc-900/50 border border-zinc-800 rounded-lg text-[11px] font-medium text-zinc-400 group-hover:text-zinc-200 group-hover:border-zinc-600 transition-all"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);