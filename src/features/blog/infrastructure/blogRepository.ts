import { LOCAL_POSTS, type BlogPost } from '../domain/posts';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '');
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (!supabaseUrl || !supabaseKey) {
    if (import.meta.env.DEV) return [...LOCAL_POSTS];
    throw new Error('Supabase environment variables are missing from the production build.');
  }
  const response = await fetch(`${supabaseUrl}/rest/v1/blog_posts?select=slug,title,excerpt,category,published_at,reading_minutes,body&published=true&order=published_at.desc`, {
    headers: { apikey: supabaseKey },
  });
  if (!response.ok) throw new Error(`Supabase returned ${response.status}`);
  return await response.json() as BlogPost[];
}
