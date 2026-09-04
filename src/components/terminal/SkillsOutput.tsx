import React from 'react';
import { SKILLS_CATEGORIES } from '../../constants/data';

interface SkillsOutputProps {
  categoryFilter?: string;
  onCommandClick?: (cmd: string) => void;
}

export const SkillsOutput: React.FC<SkillsOutputProps> = ({ categoryFilter, onCommandClick }) => {
  const cleanFilter = categoryFilter?.toLowerCase().trim() || '';

  const filteredCategories = SKILLS_CATEGORIES.filter(cat => {
    if (!cleanFilter) return true;
    if (cat.title.toLowerCase().includes(cleanFilter)) return true;
    return cat.skills.some(s => s.toLowerCase().includes(cleanFilter));
  });

  return (
    <div className="my-2 space-y-4 font-mono text-xs max-w-4xl select-text">
      <div className="flex justify-between items-baseline pb-1 border-b border-[var(--border)]/40">
        <span className="text-[var(--accent)] font-bold">
          TECHNICAL SKILLS & COMPETENCIES
        </span>
        <span className="text-[10px] text-[var(--muted)]">Filter: skills &lt;query&gt;</span>
      </div>

      <div className="space-y-4">
        {filteredCategories.map((cat, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="text-[var(--accent-2)] font-bold uppercase tracking-wider text-[11px]">
              # {cat.title}
            </div>

            <div className="flex flex-wrap gap-x-3 gap-y-1 pl-3">
              {cat.skills.map((skill, sIdx) => {
                const isHighlighted = cleanFilter && skill.toLowerCase().includes(cleanFilter);
                return (
                  <button
                    key={sIdx}
                    onClick={() => onCommandClick?.(`projects ${skill.toLowerCase()}`)}
                    className={`cursor-pointer hover:underline text-xs ${
                      isHighlighted
                        ? 'text-[var(--warning)] font-bold underline'
                        : 'text-[var(--fg)] opacity-90 hover:text-[var(--accent)]'
                    }`}
                  >
                    • {skill}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="text-[11px] text-[var(--muted)] pt-2 border-t border-[var(--border)]/40">
        Click any skill to search related repositories and projects.
      </div>
    </div>
  );
};
