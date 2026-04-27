create table if not exists public.portfolio_state (
  id integer primary key,
  profile jsonb not null default '{}'::jsonb,
  contact jsonb not null default '{}'::jsonb,
  social jsonb not null default '{}'::jsonb,
  projects jsonb not null default '[]'::jsonb,
  certificates jsonb not null default '[]'::jsonb,
  experiences jsonb not null default '[]'::jsonb,
  messages jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.portfolio_state enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'portfolio_state' and policyname = 'service role full access'
  ) then
    create policy "service role full access"
      on public.portfolio_state
      for all
      using (true)
      with check (true);
  end if;
end $$;