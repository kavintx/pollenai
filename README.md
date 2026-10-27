# Pollen — waitlist site

Next.js 16 · TypeScript · Tailwind CSS v4 · shadcn structure · lucide-react icons.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Without Supabase env vars, signups are simulated in dev so you can see the success state.

## Make the waitlist real (Supabase)

1. In your Supabase project, make sure the `waitlist` table exists. If it doesn't, run `supabase/schema.sql` in the SQL Editor.
2. Project Settings → API: copy the **Project URL** and the **publishable** key.
3. Put them in `.env.local` (copy `.env.example`) as `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.

The form inserts `{ email, name, confirmed_18: true }` straight from the browser with `@supabase/supabase-js`. Row-level security only allows inserts, so nobody can read the email list with the public key. A duplicate email returns Postgres error `23505`, which the form shows as "already on the list". To see signups, use the Supabase Table Editor.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. vercel.com → New Project → import the repo. It detects Next.js automatically.
3. Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` and `NEXT_PUBLIC_SITE_URL` under Settings → Environment Variables, then redeploy.
4. Settings → Domains to connect your domain.

## Project layout (shadcn)

```
app/
  layout.tsx            fonts (Fredoka, Nunito, JetBrains Mono — self-hosted in app/fonts), metadata
  page.tsx              the landing page
  globals.css           Tailwind v4 theme: yellow + black palette, fonts, button/hover animations, honeycomb
  carousel-demo/        the carousel's original demo (/carousel-demo)
components/
  ui/                   shadcn-style reusable primitives
    polaroid-line-carousel.tsx
  site/                 page sections (hero, waitlist form, FAQ, …)
lib/
  utils.ts              cn() helper used by shadcn components
  supabase.ts           browser Supabase client (publishable key)
public/carousel/        your photos for the carousel
supabase/schema.sql
components.json         shadcn config, so `npx shadcn add button` etc. drop into components/ui
```

**Why `components/ui`?** It's where the shadcn CLI installs components (set in `components.json`) and what the `@/components/ui/...` imports point to. Keeping reusable primitives there and page sections in `components/site` means new shadcn components slot straight in without moving anything.

## Before launch, fill in

- Pay copy (~$1.75–$1.90 per task + 10% resale royalty): `components/site/sections.tsx` (Earnings) and `components/site/faq.tsx`
- Terms draft at `app/terms/page.tsx` (`/terms`): fill `[COMPANY LEGAL NAME]`, `[COUNTY]`, the contact email, the Privacy Policy link, and get it reviewed
- A Privacy Policy page, since you're collecting emails

## Carousel photos

Drop JPGs into `public/carousel/` and list them in `components/site/on-the-line.tsx`.
