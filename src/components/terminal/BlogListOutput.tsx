import React from 'react';
import { BLOGS } from '../../constants/blogData';

interface BlogListOutputProps {
  onCommandClick?: (cmd: string) => void;
}

export const BlogListOutput: React.FC<BlogListOutputProps> = ({ onCommandClick }) => {
  return (
    <div className="my-2 space-y-4 font-mono text-xs max-w-4xl select-text">
      <div className="flex justify-between items-baseline pb-1 border-b border-[var(--border)]/40">
        <span className="text-[var(--accent)] font-bold">
          ARTICLES & TECHNICAL WRITEUPS ({BLOGS.length})
        </span>
        <span className="text-[10px] text-[var(--muted)]">Read: blog &lt;slug&gt;</span>
      </div>

      <div className="space-y-4 pl-1">
        {BLOGS.map((blog, idx) => (
          <div key={idx} className="space-y-1 pl-3 border-l-2 border-[var(--accent)]/40 hover:border-[var(--accent)] transition-colors">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[var(--muted)] font-bold">[{blog.date}]</span>
              <button
                onClick={() => onCommandClick?.(`blog ${blog.slug}`)}
                className="text-[var(--accent)] font-bold text-sm hover:underline cursor-pointer text-left"
              >
                {blog.title}
              </button>
              <span className="text-[10px] text-[var(--accent-2)] opacity-80">
                ({blog.category})
              </span>
            </div>

            <p className="text-[var(--fg)] text-xs leading-relaxed opacity-90 pl-4">
              {blog.excerpt}
            </p>

            <div className="pl-4 pt-0.5">
              <button
                onClick={() => onCommandClick?.(`blog ${blog.slug}`)}
                className="text-[var(--accent)] text-[11px] underline cursor-pointer"
              >
                → Read article (`blog {blog.slug}`)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
