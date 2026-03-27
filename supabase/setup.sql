create table if not exists public.portfolio_configs (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz not null default timezone('utc', now())
);

insert into public.portfolio_configs (key, data)
values ('primary', '{}'::jsonb)
on conflict (key) do nothing;

insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do update set public = excluded.public;
