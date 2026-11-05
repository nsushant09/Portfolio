import { LOCAL_POSTS, type BlogPost } from '../domain/posts';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '');
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (!supabaseUrl || !supabaseKey) return [...LOCAL_POSTS];
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/blog_posts?select=slug,title,excerpt,category,published_at,reading_minutes,body&published=true&order=published_at.desc`, {
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
    });
    if (!response.ok) throw new Error(`Supabase returned ${response.status}`);
    const posts = await response.json() as BlogPost[];
    return posts.length ? posts : [...LOCAL_POSTS];
  } catch (error) {
    console.error('Could not load published blog posts; showing local posts.', error);
    return [...LOCAL_POSTS];
  }
}
