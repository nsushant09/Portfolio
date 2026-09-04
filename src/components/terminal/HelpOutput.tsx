import React from 'react';
import { COMMANDS } from '../../utils/commandParser';
import type { CommandDef } from '../../utils/commandParser';

interface HelpOutputProps {
  onCommandClick?: (cmd: string) => void;
}

export const HelpOutput: React.FC<HelpOutputProps> = ({ onCommandClick }) => {
  const categories: Array<{ name: CommandDef['category']; label: string }> = [
    { name: 'Navigation', label: 'PORTFOLIO NAVIGATION' },
    { name: 'Fun', label: 'ARCADE GAMES & EXTRAS' },
    { name: 'System', label: 'SYSTEM & THEME CONTROLS' },
    { name: 'General', label: 'GENERAL UTILITIES' }
  ];

  return (
    <div className="my-2 space-y-4 font-mono text-xs max-w-4xl select-text">
      <div className="text-[var(--accent)] font-bold">
        SUSHANT NEUPANE CLI — AVAILABLE COMMANDS
      </div>

      <div className="space-y-4">
        {categories.map((cat, idx) => {
          const cmds = COMMANDS.filter(c => c.category === cat.name);
          return (
            <div key={idx} className="space-y-1.5">
              <div className="text-[var(--muted)] font-bold uppercase tracking-wider text-[11px]">
                # {cat.label}
              </div>

              <div className="space-y-1 pl-2">
                {cmds.map((cmd, cIdx) => (
                  <div key={cIdx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-0.5">
                    <div className="w-44 flex-shrink-0">
                      <button
                        onClick={() => onCommandClick?.(cmd.name)}
                        className="text-[var(--accent)] font-bold hover:underline cursor-pointer text-left inline-block"
                      >
                        {cmd.name}
                      </button>
                      {cmd.aliases.length > 0 && (
                        <span className="text-[10px] text-[var(--muted)] ml-1.5 opacity-80">
                          ({cmd.aliases.join(', ')})
                        </span>
                      )}
                    </div>
                    <div className="text-[var(--fg)] opacity-90 text-[11px]">
                      {cmd.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-[11px] text-[var(--muted)] pt-2 border-t border-[var(--border)]/40">
        Tip: Press <kbd className="px-1 bg-black/40 border border-[var(--border)] rounded text-[var(--fg)]">Tab</kbd> to autocomplete commands, or click any command name to run it.
      </div>
    </div>
  );
};
