# usepollen.ai

Static site, no build step: plain HTML, one CSS file, one small JS file, self-hosted fonts.

## Pages

| URL | File | What's on it |
| --- | --- | --- |
| `/` | `index.html` | For AI teams. The **Request a dataset** form saves to Supabase table `company_requests` |
| `/contributors` | `contributors.html` | For contributors. The **Join the waitlist** form saves to Supabase table `waitlist` |
| `/terms`, `/privacy` | `terms.html`, `privacy.html` | Same text as the old site (Oct 26, 2026) |

## Deploy to Vercel

Drag this whole folder into Vercel (or run `npx vercel --prod` inside it).
Framework preset: **Other**. No build command, no output directory, no environment variables.
`vercel.json` turns on clean URLs (`/contributors` instead of `/contributors.html`), caching and security headers.

## Supabase

- Project: `pollen` (`qxuborteybmstlnylghk`). The URL and **publishable** key are at the top of `assets/js/site.js`.
  The publishable key is meant to be public: the database only lets it insert rows, never read them.
- Run `supabase/2026-11-02_site_forms.sql` once in the Supabase SQL Editor before going live. It creates
  `company_requests` and locks down `waitlist`. Without it, the company form will fail and show the email fallback.
- See submissions in Supabase → Table Editor → `company_requests` / `waitlist`.
  Mark company leads as `contacted` or `closed` in the `status` column.

## Editing

- Copy and layout: edit the HTML files directly.
- Styles: `assets/css/site.css`. Brand yellow is `--pollen` at the top.
- After changing CSS or JS, bump the `?v=` number in each page's `<head>` so browsers fetch the new file.
- Photos: `assets/img/` (WebP, about 900px on the long side).
