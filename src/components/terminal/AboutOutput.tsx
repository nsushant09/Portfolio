import React from 'react';
import { PROFILE, EDUCATION } from '../../constants/data';

export const AboutOutput: React.FC<{ onCommandClick?: (cmd: string) => void }> = ({ onCommandClick }) => {
  const startCareer = new Date('2022-09-01').getTime();
  const now = new Date().getTime();
  const diffDays = Math.floor((now - startCareer) / (1000 * 60 * 60 * 24));
  const diffYears = (diffDays / 365.25).toFixed(1);

  return (
    <div className="my-2 space-y-4 font-mono text-xs select-text leading-relaxed">
      {/* Authentic Neofetch Layout */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Left: ASCII Art & Color Palette */}
        <div className="flex-shrink-0 select-none">
          <pre className="text-[var(--accent)] text-[10px] sm:text-xs font-bold leading-tight">
{`   _____ _    _  _____ _    _         _   _ _______ 
  / ____| |  | |/ ____| |  | |  /\\   | \\ | |__   __|
 | (___ | |  | | (___ | |__| | /  \\  |  \\| |  | |   
  \\___ \\| |  | |\\___ \\|  __  |/ /\\ \\ | . \` |  | |   
  ____) | |__| |____) | |  | / ____ \\| |\\  |  | |   
 |_____/ \\____/|_____/|_|  |/_/    \\_\\_| \\_|  |_|   `}
          </pre>
          <div className="flex gap-1.5 mt-3 pl-1">
            {['#ff5f56', '#ffbd2e', '#27c93f', '#58a6ff', '#bd93f9', '#50fa7b', '#f8f8f2'].map((color, idx) => (
              <span key={idx} className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>

        {/* Right: System Information Specs */}
        <div className="space-y-1 text-xs">
          <div className="pb-1 mb-1 border-b border-[var(--border)]/40 flex items-center gap-2">
            <span className="font-bold text-[var(--accent)] text-sm">{PROFILE.name}</span>
            <span className="text-[var(--muted)]">@ nsushant.com.np</span>
          </div>

          <div className="space-y-0.5">
            <div><span className="text-[var(--accent-2)] font-bold">OS:</span> <span className="text-[var(--fg)]">macOS / Linux Darwin x86_64</span></div>
            <div><span className="text-[var(--accent-2)] font-bold">Role:</span> <span className="text-[var(--fg)]">{PROFILE.role}</span></div>
            <div><span className="text-[var(--accent-2)] font-bold">Uptime:</span> <span className="text-[var(--fg)]">{diffYears} years ({diffDays} days active)</span></div>
            <div><span className="text-[var(--accent-2)] font-bold">Location:</span> <span className="text-[var(--fg)]">{PROFILE.location}</span></div>
            <div><span className="text-[var(--accent-2)] font-bold">Degree:</span> <span className="text-[var(--fg)]">Master of Information Technology (AI Specialization)</span></div>
            <div><span className="text-[var(--accent-2)] font-bold">University:</span> <span className="text-[var(--fg)]">La Trobe University, Melbourne</span></div>
            <div><span className="text-[var(--accent-2)] font-bold">Core Stack:</span> <span className="text-[var(--fg)]">Kotlin Multiplatform (KMP), Jetpack Compose, React, TypeScript, Spring Boot, AI</span></div>
            <div><span className="text-[var(--accent-2)] font-bold">Shell:</span> <span className="text-[var(--fg)]">zsh 5.9 (nsushant-term-v2.6)</span></div>
          </div>
        </div>
      </div>

      {/* Bio Statement */}
      <div className="space-y-1 pt-1">
        <div className="text-[var(--accent-2)] font-bold"># BIO:</div>
        <p className="text-[var(--fg)] pl-2 opacity-90">
          Hi! I am <strong className="text-[var(--accent)]">{PROFILE.name}</strong>, a Software Engineer based in Melbourne, Australia. 
          Specialising in Android systems (Jetpack Compose, Kotlin Multiplatform, MVI/MVVM), full-stack web platforms, spatial VR/AR locomotion, and AI models.
        </p>
      </div>

      {/* Education Timeline */}
      <div className="space-y-1.5 pt-1">
        <div className="text-[var(--warning)] font-bold"># EDUCATION & DEGREES:</div>
        <div className="space-y-1 pl-2">
          {EDUCATION.map((edu, idx) => (
            <div key={idx}>
              <div className="font-bold text-[var(--fg)]">• {edu.degree}</div>
              <div className="text-[var(--muted)] text-[11px] pl-3">{edu.institution} — {edu.location} ({edu.date})</div>
            </div>
          ))}
        </div>
      </div>

      {/* Action shortcuts */}
      <div className="pt-2 text-[11px] text-[var(--muted)] border-t border-[var(--border)]/40 flex flex-wrap gap-4">
        <span>Run: <button onClick={() => onCommandClick?.('projects')} className="text-[var(--accent)] underline cursor-pointer font-bold">projects</button></span>
        <span>Run: <button onClick={() => onCommandClick?.('experience')} className="text-[var(--accent)] underline cursor-pointer font-bold">experience</button></span>
        <span>Run: <button onClick={() => onCommandClick?.('skills')} className="text-[var(--accent)] underline cursor-pointer font-bold">skills</button></span>
        <span>Run: <button onClick={() => onCommandClick?.('blog')} className="text-[var(--accent)] underline cursor-pointer font-bold">blog</button></span>
      </div>
    </div>
  );
};
