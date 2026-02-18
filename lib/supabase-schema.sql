-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Leads table (strategy assistant submissions)
create table leads (
  id uuid default uuid_generate_v4() primary key,
  name text,
  email text,
  company_size text not null,
  bottleneck text not null,
  tech_stack text[] default '{}',
  ai_response text,
  estimated_hours_saved text,
  recommended_system text,
  created_at timestamp with time zone default timezone('utc', now()),
  status text default 'new' check (status in ('new', 'contacted', 'qualified', 'closed'))
);

-- RLS: only service role can insert/read
alter table leads enable row level security;

create policy "Service role full access" on leads
  for all using (true) with check (true);

-- Blog posts table (for future CMS use)
create table blog_posts (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,
  category text,
  read_time integer,
  published_at timestamp with time zone default timezone('utc', now()),
  published boolean default false
);
