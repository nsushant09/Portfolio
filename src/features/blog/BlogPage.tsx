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

function parseTableRow(line: string): string[] {
  return line.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).map(cell => cell.trim().replace(/\\\|/g, '|'));
}

function MarkdownBody({ source }: { readonly source: string }) {
  const lines = source.trim().split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index] ?? '';
    if (!line.trim()) { index += 1; continue; }

    const fence = line.match(/^```\s*([\w+-]*)\s*$/);
    if (fence) {
      const language = fence[1] || 'code';
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && !/^```\s*$/.test(lines[index] ?? '')) {
        codeLines.push(lines[index] ?? '');
        index += 1;
      }
      if (index < lines.length) index += 1;
      blocks.push(<pre className="blog-code-block" key={`code-${blocks.length}`}><span className="blog-code-language">{language}</span><code>{codeLines.join('\n')}</code></pre>);
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const depth = heading[1]?.length ?? 3;
      const content = inlineMarkdown(heading[2] ?? '');
      if (depth === 1) blocks.push(<h2 key={`heading-${blocks.length}`}>{content}</h2>);
      else if (depth === 2) blocks.push(<h3 key={`heading-${blocks.length}`}>{content}</h3>);
      else blocks.push(<h4 key={`heading-${blocks.length}`}>{content}</h4>);
      index += 1;
      continue;
    }

    const nextLine = lines[index + 1] ?? '';
    const isTableSeparator = /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(nextLine);
    if (line.includes('|') && isTableSeparator) {
      const headers = parseTableRow(line);
      const rows: string[][] = [];
      index += 2;
      while (index < lines.length && (lines[index] ?? '').trim().startsWith('|')) {
        rows.push(parseTableRow(lines[index] ?? ''));
        index += 1;
      }
      blocks.push(<div className="blog-table-wrap" key={`table-${blocks.length}`}><table>
        <thead><tr>{headers.map((cell, cellIndex) => <th key={cellIndex} scope="col">{inlineMarkdown(cell)}</th>)}</tr></thead>
        <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{headers.map((_, cellIndex) => <td key={cellIndex}>{inlineMarkdown(row[cellIndex] ?? '')}</td>)}</tr>)}</tbody>
      </table></div>);
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index] ?? '')) {
        items.push((lines[index] ?? '').replace(/^[-*]\s+/, ''));
        index += 1;
      }
      blocks.push(<ul key={`list-${blocks.length}`}>{items.map((item, itemIndex) => <li key={itemIndex}>{inlineMarkdown(item)}</li>)}</ul>);
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index] ?? '')) {
        items.push((lines[index] ?? '').replace(/^\d+\.\s+/, ''));
        index += 1;
      }
      blocks.push(<ol key={`list-${blocks.length}`}>{items.map((item, itemIndex) => <li key={itemIndex}>{inlineMarkdown(item)}</li>)}</ol>);
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quote: string[] = [];
      while (index < lines.length && /^>\s?/.test(lines[index] ?? '')) {
        quote.push((lines[index] ?? '').replace(/^>\s?/, ''));
        index += 1;
      }
      blocks.push(<blockquote key={`quote-${blocks.length}`}>{quote.join(' ')}</blockquote>);
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length) {
      const next = lines[index] ?? '';
      if (!next.trim() || /^```/.test(next) || /^#{1,3}\s+/.test(next) || /^[-*]\s+/.test(next) || /^\d+\.\s+/.test(next) || /^>\s?/.test(next)) break;
      paragraph.push(next);
      index += 1;
    }
    blocks.push(<p key={`paragraph-${blocks.length}`}>{paragraph.map((paragraphLine, lineIndex) => <span key={lineIndex}>{lineIndex > 0 && <br />}{inlineMarkdown(paragraphLine)}</span>)}</p>);
  }

  return <div className="blog-prose">{blocks}</div>;
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
