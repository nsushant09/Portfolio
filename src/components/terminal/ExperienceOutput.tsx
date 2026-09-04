import React from 'react';
import { EXPERIENCE } from '../../constants/data';

interface ExperienceOutputProps {
  onCommandClick?: (cmd: string) => void;
}

export const ExperienceOutput: React.FC<ExperienceOutputProps> = ({ onCommandClick }) => {
  return (
    <div className="my-2 space-y-4 font-mono text-xs select-text leading-relaxed">
      <div className="text-[var(--accent)] font-bold">
        WORK & RESEARCH EXPERIENCE TIMELINE ({EXPERIENCE.length} positions)
      </div>

      <div className="space-y-4">
        {EXPERIENCE.map((exp, idx) => (
          <div key={idx} className="space-y-1 pl-2 border-l-2 border-[var(--accent)]/40 ml-1">
            {/* Role Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <span className="font-bold text-sm text-[var(--accent)]">{exp.role}</span>
                <span className="text-[var(--muted)] text-[11px] ml-2">[{exp.category}]</span>
              </div>
              <span className="text-[var(--muted)] text-[11px]">{exp.date}</span>
            </div>

            {/* Company & Location */}
            <div className="text-[var(--accent-2)] font-semibold text-xs">
              {exp.company} &mdash; {exp.location}
            </div>

            {/* Bullets */}
            <ul className="space-y-1 text-[var(--fg)] opacity-90 text-xs py-1">
              {exp.bullets.map((bullet, bIdx) => (
                <li key={bIdx} className="flex items-start gap-2">
                  <span className="text-[var(--accent)] flex-shrink-0 select-none">&bull;</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Skills */}
            <div className="text-[11px] text-[var(--muted)] pt-0.5">
              <span className="text-[var(--muted)] font-bold">Tech:</span>{' '}
              {exp.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  onClick={() => onCommandClick?.(`skills`)}
                  className="hover:text-[var(--accent)] hover:underline cursor-pointer"
                >
                  {skill}{sIdx < exp.skills.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
