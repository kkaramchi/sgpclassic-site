# SGP Classic — Next.js Site

The SGP Classic tournament site, rebuilt on **Next.js 14 (App Router)**. Every
page is now a real URL, so refresh works, links are shareable, and photos can be
dropped in and auto-optimized.

## What changed from the old version

- **Real routing.** The old site was one big React file that faked navigation
  with state — refreshing any page bounced you to Home. Now each page is its own
  route (`/tournaments`, `/players`, `/betting`, …) and refresh/back/share all
  work.
- **Organized project.** Pages live in `app/`, shared UI and all the ported
  components live in `components/views.jsx`, data helpers in `lib/`.
- **Photo-ready.** Drop images in `public/` and use Next's `<Image>` component
  for automatic resizing, lazy-loading, and WebP conversion.

## URL map

| Page | URL |
| --- | --- |
| Home | `/` |
| Tournaments list | `/tournaments` |
| Tournament by year | `/tournaments/2024` |
| Players list | `/players` |
| Player profile | `/players/Keon%20Karamchi` |
| Parimutuel history | `/parimutuel` |
| Live betting | `/betting` |
| Live draft | `/draft` |
| Rules | `/rules` |
| Course guide | `/course-guide/legend`, `/course-guide/legacy` |
| SGP Tees | `/sgp-tees`, `/sgp-tees/spire`, `/sgp-tees/lake` |

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Images still to add

The legacy course-guide out-of-bounds maps are referenced at `/ob-map-1.png`,
`/ob-map-2.png`, `/ob-map-3.png`. Copy those three files from your current
site's `public/` folder into this project's `public/` folder. (All logos and the
18 hole photos are already included.)

## Deploy to Vercel

**One-time setup (new GitHub repo):**

1. Create a new empty repo on GitHub, e.g. `sgp-classic`.
2. In this project folder:
   ```bash
   git init
   git add .
   git commit -m "Rebuild SGP Classic on Next.js"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/sgp-classic.git
   git push -u origin main
   ```
3. In Vercel: **Add New → Project → Import** the repo. Vercel auto-detects
   Next.js — just click **Deploy**.
4. Point `sgpclassic.com` at the new project in Vercel → Settings → Domains.

**From then on:** edit files, `git commit`, `git push` — Vercel redeploys
automatically. No more copy-pasting `App.jsx`.

## Next phase

Design refresh and per-page code-splitting. The current build bundles all page
code together (fine functionally); splitting `components/views.jsx` into
per-page files will make each page lighter when we do the redesign.
