import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { getPublishedPosts } from './infrastructure/blogRepository';
import type { BlogPost } from './domain/posts';
import type { ColorPalette } from '../portfolio/domain/colorPalettes';
import { CustomCursor } from '../portfolio/presentation/CustomCursor';

type BlogStyle = CSSProperties & { '--page': string; '--surface': string; '--primary': string; '--button-text': string; '--secondary': string; '--text': string; '--muted': string };

function inlineMarkdown(text: string): ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  return text.split(pattern).filter(Boolean).map((part, index) => {
    if (part.startsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('*')) return <em key={index}>{part.slice(1, -1)}</em>;
    if (part.startsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    const label = link?.[1];
    const href = link?.[2];
    if (label && href) {
      const safeHref = href.startsWith('https://') || href.startsWith('mailto:') ? href : '#';
      return <a href={safeHref} key={index} rel="noreferrer" target="_blank">{label}</a>;
    }
    return part;
  });
}

function MarkdownBody({ source }: { readonly source: string }) {
  const blocks = source.trim().split(/\n\s*\n/);
  return <div className="blog-prose">{blocks.map((block, index) => {
    const lines = block.split('\n');
    const heading = (lines[0] ?? '').match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const depth = heading[1]?.length ?? 3;
      const content = inlineMarkdown(heading[2] ?? '');
      if (depth === 1) return <h2 key={index}>{content}</h2>;
      if (depth === 2) return <h3 key={index}>{content}</h3>;
      return <h4 key={index}>{content}</h4>;
    }
    if (lines.every(line => /^[-*]\s+/.test(line))) return <ul key={index}>{lines.map((line, lineIndex) => <li key={lineIndex}>{inlineMarkdown(line.replace(/^[-*]\s+/, ''))}</li>)}</ul>;
    if (lines.every(line => /^\d+\.\s+/.test(line))) return <ol key={index}>{lines.map((line, lineIndex) => <li key={lineIndex}>{inlineMarkdown(line.replace(/^\d+\.\s+/, ''))}</li>)}</ol>;
    if (lines.every(line => /^>\s?/.test(line))) return <blockquote key={index}>{lines.map(line => line.replace(/^>\s?/, '')).join(' ')}</blockquote>;
    if (lines.every(line => /^`{3}/.test(line))) return <pre key={index}><code>{lines.slice(1, -1).join('\n')}</code></pre>;
    return <p key={index}>{lines.map((line, lineIndex) => <span key={lineIndex}>{lineIndex > 0 && <br />}{inlineMarkdown(line)}</span>)}</p>;
  })}</div>;
}

function dateLabel(date: string) {
  return new Intl.DateTimeFormat('en-AU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
}

export function BlogPage({ path, palette }: { readonly path: string; readonly palette: ColorPalette }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  useEffect(() => {
    let active = true;
    getPublishedPosts()
      .then(result => { if (active) setPosts(result); })
      .catch(error => {
        console.error('Could not load published blog posts.', error);
        if (active) setLoadError(true);
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  const slug = path.startsWith('/blog/') ? decodeURIComponent(path.slice('/blog/'.length)) : '';
  const post = useMemo(() => posts.find(item => item.slug === slug), [posts, slug]);
  const style: BlogStyle = {
    '--page': palette.colors.page, '--surface': palette.colors.surface, '--primary': palette.colors.primary,
    '--button-text': palette.colors.primaryForeground, '--secondary': palette.colors.secondary,
    '--text': palette.colors.text, '--muted': palette.colors.muted,
  };

  return <main className="retro-page blog-page" style={style}>
    <header className="blog-topbar"><a href="/" className="blog-wordmark">SN <span>/</span> Notes from the study</a><a className="blog-home-link" href="/">Portfolio <span aria-hidden="true">↗</span></a></header>
    {slug ? <>
      <a className="blog-back-link" href="/blog">← All writing</a>
      {loading ? <p className="blog-state">Loading article…</p> : loadError ? <p className="blog-state">The study notes could not be loaded. Please try again shortly.</p> : post ? <article className="blog-article">
        <p className="blog-kicker">{post.category} <span>/</span> {dateLabel(post.published_at)}</p>
        <h1 className="font-cinzel">{post.title}</h1>
        <p className="blog-article-deck">{post.excerpt}</p>
        <p className="blog-reading-time">{post.reading_minutes} min read</p>
        <MarkdownBody source={post.body} />
        <footer className="blog-article-footer"><a href="/blog">← More study notes</a><a href="/">Back to portfolio ↗</a></footer>
      </article> : <p className="blog-state">That article could not be found. <a href="/blog">Browse all writing.</a></p>}
    </> : <>
      <section className="blog-index-intro"><p className="blog-kicker">A field journal <span>/</span> Study, practice, reflect</p><h1 className="font-cinzel">Notes along<br /><em>the way.</em></h1><p>Ideas I’m studying, questions I’m following, and lessons from putting them into practice.</p></section>
      <section className="blog-list" aria-label="Published study notes"><div className="blog-list-heading"><span>Writing &amp; research</span><span>{loading ? '…' : loadError ? 'Unavailable' : `${posts.length.toString().padStart(2, '0')} posts`}</span></div>
        {loading ? <p className="blog-state">Gathering the latest notes…</p> : posts.map((item, index) => <article className="blog-card" key={item.slug}><span className="blog-card-number">{String(index + 1).padStart(2, '0')}</span><div className="blog-card-copy"><p className="blog-kicker">{item.category} <span>/</span> {dateLabel(item.published_at)}</p><h2 className="font-cinzel"><a href={`/blog/${item.slug}`}>{item.title}</a></h2><p>{item.excerpt}</p><span className="blog-reading-time">{item.reading_minutes} min read</span></div><a aria-label={`Read ${item.title}`} className="blog-card-arrow" href={`/blog/${item.slug}`}>↗</a></article>)}
        {!loading && loadError && <p className="blog-state">Could not load posts from Supabase. Check that <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> are set in your hosting environment, then redeploy.</p>}
        {!loading && !loadError && posts.length === 0 && <p className="blog-state">No published notes yet. In Supabase, set the post’s <code>published</code> field to <code>true</code>.</p>}
      </section>
    </>}
    <footer className="blog-site-footer"><a href="/">Sushant Neupane</a><span>Melbourne, Australia · {new Date().getFullYear()}</span></footer>
    <CustomCursor />
  </main>;
}
