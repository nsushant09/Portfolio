import React, { useState } from 'react';
import { PROJECTS } from '../../constants/data';
import { ExternalLink, Github, Eye } from 'lucide-react';

interface ProjectsOutputProps {
  filterQuery?: string;
  onCommandClick?: (cmd: string) => void;
}

export const ProjectsOutput: React.FC<ProjectsOutputProps> = ({ filterQuery, onCommandClick }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const cleanQuery = filterQuery?.toLowerCase().trim() || '';
  const filteredProjects = PROJECTS.filter(project => {
    if (!cleanQuery || cleanQuery === '--all') return true;
    return (
      project.title.toLowerCase().includes(cleanQuery) ||
      project.tags.some(t => t.toLowerCase().includes(cleanQuery)) ||
      project.description.toLowerCase().includes(cleanQuery)
    );
  });

  return (
    <div className="my-2 space-y-4 font-mono text-xs max-w-4xl select-text">
      <div className="flex justify-between items-baseline pb-1 border-b border-[var(--border)]/40">
        <span className="text-[var(--accent)] font-bold">
          REPOSITORIES & FEATURED PROJECTS ({filteredProjects.length})
        </span>
        <span className="text-[10px] text-[var(--muted)]">Filter: projects &lt;query&gt;</span>
      </div>

      <div className="space-y-4 pl-1">
        {filteredProjects.map((project, idx) => (
          <div key={idx} className="space-y-1.5 pl-3 border-l-2 border-[var(--accent)]/40 hover:border-[var(--accent)] transition-colors">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[var(--muted)] font-bold">[{idx + 1}]</span>
              <span className="text-[var(--accent)] font-bold text-sm">
                {project.title}
              </span>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent-2)] hover:underline inline-flex items-center gap-1 text-[11px] ml-1"
                >
                  <Github size={12} /> {project.link.replace('https://github.com/', '')} <ExternalLink size={10} />
                </a>
              )}
              {project.image && (
                <button
                  onClick={() => setSelectedImage(project.image)}
                  title="Preview Screenshot"
                  className="text-[var(--muted)] hover:text-[var(--accent)] cursor-pointer inline-flex items-center gap-1 text-[10px] ml-auto"
                >
                  <Eye size={12} /> [preview image]
                </button>
              )}
            </div>

            <p className="text-[var(--fg)] text-xs leading-relaxed opacity-90 pl-4">
              {project.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 text-[11px] pl-4 text-[var(--muted)]">
              <span className="opacity-75">Tags:</span>
              {project.tags.map((tag, tIdx) => (
                <button
                  key={tIdx}
                  onClick={() => onCommandClick?.(`projects ${tag.toLowerCase()}`)}
                  className="text-[var(--accent)] hover:underline cursor-pointer"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="py-2 text-[var(--muted)] pl-2">
          No projects matched &quot;{cleanQuery}&quot;. Type <button onClick={() => onCommandClick?.('projects')} className="text-[var(--accent)] underline cursor-pointer">projects</button> to list all.
        </div>
      )}

      {/* Image Preview Lightbox */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="max-w-2xl max-h-[85vh] p-2 bg-black/90 border border-[var(--border)] rounded shadow-2xl">
            <img src={selectedImage} alt="Project Preview" className="max-h-[75vh] w-auto object-contain rounded" />
            <div className="text-center text-xs text-[var(--muted)] mt-2">Click anywhere to close</div>
          </div>
        </div>
      )}
    </div>
  );
};
