-- Pollen waitlist — the table the site writes to straight from the browser:
--   supabase.from('waitlist').insert({ email, name, confirmed_18: true })
-- If your project already has this table, you don't need to run this; just make sure the
-- RLS setup matches (insert-only for anon, nobody can read emails back with the public key).

create table if not exists public.waitlist (
  id            bigint generated always as identity primary key,
  email         text not null unique,                       -- duplicate → error code 23505 ("already on the list")
  name          text not null check (char_length(name) between 1 and 80),
  confirmed_18  boolean not null check (confirmed_18),       -- must be true
  created_at    timestamptz not null default now(),
  constraint waitlist_email_format check (email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' and char_length(email) <= 254)
);

alter table public.waitlist enable row level security;

-- The publishable key may only INSERT. No select/update/delete policies, so the list stays private.
grant insert on table public.waitlist to anon, authenticated;
revoke select, update, delete on table public.waitlist from anon, authenticated;

drop policy if exists "Anyone can join the waitlist" on public.waitlist;
create policy "Anyone can join the waitlist"
  on public.waitlist
  for insert
  to anon, authenticated
  with check (confirmed_18 = true);
