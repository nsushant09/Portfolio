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
  <div className="relative bg-[#111] border border-zinc-800 rounded-sm overflow-hidden group hover:border-zinc-300/50 hover:shadow-[0_0_20px_rgba(212,212,216,0.05)] transition-all duration-300">
    <div className="p-8">
      <h3 className="font-heading text-3xl font-black mb-4 text-white group-hover:text-zinc-300 transition-colors">{title}</h3>
      <p className="text-zinc-400 text-sm mb-6 line-clamp-3 leading-relaxed font-medium">{excerpt}</p>
      <div className="flex justify-between items-center text-xs text-zinc-500 mb-6 font-bold">
        <span className="uppercase tracking-[0.2em]">{category}</span>
        <span className="tracking-widest">{date}</span>
      </div>
      <a
        href={`/blog/${slug}`}
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-300 transition-colors after:content-[''] after:absolute after:inset-0 group/link"
      >
        <span>Read More</span>
        <ExternalLink size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
      </a>
    </div>
  </div>
);