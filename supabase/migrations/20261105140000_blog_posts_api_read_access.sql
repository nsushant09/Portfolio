-- Expose published blog posts through the Data API for public portfolio readers.
-- Row-level security still restricts the anon role to published rows.
grant select on table public.blog_posts to anon, authenticated;

drop policy if exists "Anyone can read published blog posts" on public.blog_posts;
create policy "Anyone can read published blog posts"
  on public.blog_posts for select to anon, authenticated
  using (published = true);
