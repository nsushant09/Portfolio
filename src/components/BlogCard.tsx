import { ExternalLink } from "lucide-react";

interface Props {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  slug: string;
}

export const BlogCard = ({ title, excerpt, category, date, slug }: Props) => (
  // 1. Added 'relative'
  <div className="relative bg-[#111] border border-zinc-800 rounded-2xl overflow-hidden group hover:border-zinc-700 transition-colors">
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm mb-4 line-clamp-3">{excerpt}</p>
      <div className="flex justify-between items-center text-xs text-zinc-500 mb-4">
        <span className="uppercase tracking-wide">{category}</span>
        <span>{date}</span>
      </div>
      <a
        href={`/blog/${slug}`}
        // 2. Added the 'after' pseudo-classes to stretch the link
        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors after:content-[''] after:absolute after:inset-0"
      >
        <ExternalLink size={16} /> Read More
      </a>
    </div>
  </div>
);