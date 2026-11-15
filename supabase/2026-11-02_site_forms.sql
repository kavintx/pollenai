-- Pollen site forms — run once in Supabase (SQL Editor) for project "pollen" (qxuborteybmstlnylghk).
-- 1. Locks the existing `waitlist` table so the public key can only insert the 3 form fields.
-- 2. Adds `company_requests` for the "Request a dataset" form on the home page.
-- Read submissions in Table Editor. Nobody can read them with the public (publishable) key.

begin;

-- Waitlist (contributors) -------------------------------------------------
revoke all on table public.waitlist from anon, authenticated;
grant insert (email, name, confirmed_18) on table public.waitlist to anon;

alter table public.waitlist
  add constraint waitlist_name_length check (name is null or char_length(name) between 1 and 80),
  add constraint waitlist_email_length check (char_length(email) <= 254);

-- Company dataset requests -------------------------------------------------
create table public.company_requests (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 1 and 120),
  work_email  text not null check (char_length(work_email) <= 254 and work_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  company     text not null check (char_length(company) between 1 and 160),
  brief       text not null check (char_length(brief) between 1 and 4000),
  status      text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at  timestamptz not null default now()
);

comment on table public.company_requests is 'Dataset requests from AI companies, submitted on usepollen.ai. Insert-only from the browser.';

create index company_requests_created_at_idx on public.company_requests (created_at desc);

alter table public.company_requests enable row level security;

revoke all on table public.company_requests from anon, authenticated;
grant insert (name, work_email, company, brief) on table public.company_requests to anon;

create policy "anyone can send a dataset request"
  on public.company_requests
  for insert
  to anon
  with check (status = 'new');

commit;
