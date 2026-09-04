import React from 'react';
import { PROFILE, EDUCATION, EXPERIENCE } from '../../constants/data';
import { Download, ExternalLink } from 'lucide-react';

export const ResumeOutput: React.FC = () => {
  const resumeUrl = '/Sushant_Resume.pdf';

  return (
    <div className="my-2 space-y-4 font-mono text-xs max-w-3xl select-text">
      <div className="flex justify-between items-baseline pb-1 border-b border-[var(--border)]/40">
        <span className="text-[var(--accent)] font-bold">
          CURRICULUM VITAE & SUMMARY
        </span>
        <span className="text-[10px] text-[var(--muted)]">PDF Format</span>
      </div>

      <div className="space-y-3 pl-1">
        <div className="space-y-1">
          <div className="text-sm font-bold text-[var(--fg)]">
            {PROFILE.name} &mdash; <span className="text-[var(--accent)]">{PROFILE.role}</span>
          </div>
          <div className="text-[var(--muted)] text-[11px]">
            {PROFILE.location} | {PROFILE.email} | {PROFILE.phone}
          </div>
        </div>

        <div className="flex gap-4 pt-1">
          <a
            href={resumeUrl}
            download="Sushant_Neupane_Resume.pdf"
            className="text-[var(--accent)] hover:underline font-bold inline-flex items-center gap-1"
          >
            <Download size={13} /> [Download PDF]
          </a>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent-2)] hover:underline inline-flex items-center gap-1"
          >
            <ExternalLink size={13} /> [Open in Browser]
          </a>
        </div>

        <div className="space-y-2 pt-2 text-xs">
          <div>
            <span className="text-[var(--accent)] font-bold">EDUCATION: </span>
            <span className="text-[var(--fg)]">{EDUCATION[0].degree}</span>
            <span className="text-[var(--muted)] text-[11px]"> &mdash; {EDUCATION[0].institution} ({EDUCATION[0].date})</span>
          </div>
          <div>
            <span className="text-[var(--accent-2)] font-bold">EXPERIENCE: </span>
            <span className="text-[var(--fg)]">{EXPERIENCE.length}+ Software Engineering & Development Roles</span>
          </div>
          <div>
            <span className="text-[var(--warning)] font-bold">PRIMARY STACK: </span>
            <span className="text-[var(--fg)]">Kotlin, Jetpack Compose, React, TypeScript, Python, Tailwind, Docker, CI/CD</span>
          </div>
        </div>
      </div>
    </div>
  );
};
