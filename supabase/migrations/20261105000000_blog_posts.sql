create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null,
  excerpt text not null,
  category text not null default 'Study notes',
  published_at date not null default current_date,
  reading_minutes integer not null default 1 check (reading_minutes > 0),
  body text not null,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.blog_posts enable row level security;
drop policy if exists "Anyone can read published blog posts" on public.blog_posts;
create policy "Anyone can read published blog posts"
  on public.blog_posts for select to anon, authenticated
  using (published = true);

grant select on table public.blog_posts to anon, authenticated;
