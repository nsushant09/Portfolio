import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { BLOGS } from '../../constants/blogData';
import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react';

interface BlogPostOutputProps {
  slug: string;
  onCommandClick?: (cmd: string) => void;
}

export const BlogPostOutput: React.FC<BlogPostOutputProps> = ({ slug, onCommandClick }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const blogMetadata = BLOGS.find(b => b.slug === slug || b.slug.includes(slug));

  useEffect(() => {
    if (!blogMetadata) {
      setLoading(false);
      setError(`Article with slug "${slug}" not found.`);
      return;
    }

    setLoading(true);
    setError(null);
    fetch(blogMetadata.file)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.text();
      })
      .then(text => {
        setContent(text);
        setLoading(false);
      })
      .catch(err => {
        setError(`Failed to load article content: ${err.message}`);
        setLoading(false);
      });
  }, [slug, blogMetadata]);

  const wordCount = content.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  if (loading) {
    return (
      <div className="my-2 text-xs font-mono text-[var(--muted)] flex items-center gap-2">
        <span className="terminal-cursor" /> Loading article buffer for <code className="text-[var(--accent)]">{slug}</code>...
      </div>
    );
  }

  if (error || !blogMetadata) {
    return (
      <div className="my-2 text-xs font-mono space-y-2">
        <div className="text-[var(--error)] font-bold">❌ Error: {error}</div>
        <div className="text-[var(--muted)]">
          Run <button onClick={() => onCommandClick?.('blog')} className="text-[var(--accent)] underline cursor-pointer">blog</button> to see all available articles.
        </div>
      </div>
    );
  }

  return (
    <div className="my-2 space-y-4 font-mono text-xs max-w-4xl select-text">
      {/* Top Bar with back button */}
      <div className="flex flex-wrap justify-between items-center gap-2 pb-2 border-b border-[var(--border)]/40">
        <button
          onClick={() => onCommandClick?.('blog')}
          className="text-[var(--accent)] hover:underline inline-flex items-center gap-1 cursor-pointer font-bold"
        >
          <ArrowLeft size={12} />
          <span>← Back to Article Index (`blog`)</span>
        </button>

        <div className="flex items-center gap-3 text-[11px] text-[var(--muted)]">
          <span className="flex items-center gap-1"><Tag size={10} /> {blogMetadata.category}</span>
          <span className="flex items-center gap-1"><Calendar size={10} /> {blogMetadata.date}</span>
          <span className="flex items-center gap-1"><Clock size={10} /> {readTime} min read</span>
        </div>
      </div>

      {/* Markdown Content Viewer */}
      <div className="leading-relaxed text-[var(--fg)] pl-2">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: ({ ...props }) => <h1 className="text-xl sm:text-2xl font-black text-[var(--accent)] mt-4 mb-4 pb-2 border-b border-[var(--border)]/40" {...props} />,
            h2: ({ ...props }) => <h2 className="text-lg sm:text-xl font-bold text-[var(--accent-2)] mt-6 mb-3" {...props} />,
            h3: ({ ...props }) => <h3 className="text-sm sm:text-base font-bold text-[var(--fg)] mt-4 mb-2" {...props} />,
            p: ({ ...props }) => <p className="mb-3.5 text-xs sm:text-sm leading-relaxed text-[var(--fg)]/90" {...props} />,
            ul: ({ ...props }) => <ul className="list-disc ml-5 mb-4 space-y-1.5 text-xs sm:text-sm text-[var(--fg)]/90" {...props} />,
            ol: ({ ...props }) => <ol className="list-decimal ml-5 mb-4 space-y-1.5 text-xs sm:text-sm text-[var(--fg)]/90" {...props} />,
            li: ({ ...props }) => <li className="pl-1" {...props} />,
            blockquote: ({ ...props }) => (
              <blockquote className="border-l-4 border-[var(--accent)] pl-3 italic my-3 text-[var(--muted)] py-1.5" {...props} />
            ),
            code: ({ className, children, ...props }) => {
              const isInline = !className;
              if (isInline) {
                return (
                  <code className="px-1 py-0.5 rounded bg-black/40 text-[var(--accent)] text-[11px] border border-[var(--border)]/50 font-mono" {...props}>
                    {children}
                  </code>
                );
              }
              return (
                <div className="my-3 rounded overflow-hidden border border-[var(--border)]/40">
                  <code className={`${className} block p-3 text-xs bg-black/60 overflow-x-auto font-mono`} {...props}>
                    {children}
                  </code>
                </div>
              );
            },
            hr: () => <hr className="my-6 border-[var(--border)]/40" />,
            img: ({ ...props }) => (
              <span className="flex flex-col items-center my-4">
                <img {...props} className="rounded border border-[var(--border)]/40 max-h-96 object-contain" alt={props.alt || 'Illustration'} />
                {props.alt && <span className="text-[11px] text-[var(--muted)] mt-1 italic">{props.alt}</span>}
              </span>
            )
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {/* Footer Nav */}
      <div className="pt-2 border-t border-[var(--border)]/40">
        <button
          onClick={() => onCommandClick?.('blog')}
          className="text-xs text-[var(--accent)] hover:underline cursor-pointer"
        >
          ↑ Back to all posts (`blog`)
        </button>
      </div>
    </div>
  );
};
