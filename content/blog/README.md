# Publishing study notes

The portfolio reads published posts from the Supabase `public.blog_posts` table. Post bodies are plain Markdown in the `body` column, so they are easy to write and revise from the Supabase dashboard. `content/blog/post-template.md` is a starter structure for drafting.

## Set up Supabase

1. Create a Supabase project and run `supabase/migrations/20261105000000_blog_posts.sql` in its SQL editor (or apply it with the Supabase CLI).
2. Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` from the project API settings. The browser key is public by design; never put a service-role key in a `VITE_` variable.
3. Restart the Vite development server and deploy with the same two variables configured in the hosting provider.

Row level security allows visitors to read published records only. Add and edit posts through the Supabase dashboard while signed in as a project owner. Do not add a public insert or update policy. To publish, create a row with a unique lowercase hyphenated `slug`, fill in the metadata and Markdown `body`, and set `published` to `true`. To prepare a draft, leave it `false`.

With Supabase variables unset or unavailable, the site uses the local `learning-in-public` starter post. That provides a working preview, not a synchronized copy of the database.
