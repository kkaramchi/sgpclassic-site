# Deploying the New Site — Step by Step

Goal: replace the old code in your existing GitHub repo with the new Next.js
project, using GitHub Desktop. Your Vercel project and `sgpclassic.com` stay
connected — you just push once and it redeploys.

Set aside ~20 minutes. Follow in order.

---

## Part 1 — Install GitHub Desktop (one time)

1. Go to **https://desktop.github.com** and download GitHub Desktop for Windows.
2. Run the installer, open the app.
3. Click **Sign in to GitHub.com** and log in with the same GitHub account your
   `sgpclassic` repo is on. Authorize it in the browser when prompted.
4. When it asks about "Git config," just click **Continue** / **Finish**.

---

## Part 2 — Clone your existing repo to your computer

1. In GitHub Desktop: **File → Clone Repository** (top-left menu).
2. Click the **GitHub.com** tab. You'll see a list of your repos.
3. Select your SGP Classic repo (the one Vercel deploys from).
4. For **Local Path**, pick somewhere easy like your Desktop. Note the folder it
   creates — e.g. `Desktop\sgpclassic`.
5. Click **Clone**. GitHub Desktop downloads the current repo to that folder.

---

## Part 3 — Swap the old files for the new ones

You're going to empty out the cloned folder (except its hidden `.git` folder)
and drop in the new project.

1. Open the cloned folder from Part 2 (e.g. `Desktop\sgpclassic`) in File
   Explorer.
2. **Select everything in that folder and delete it** — with one exception:
   - **Do NOT delete the `.git` folder** if you can see it. On Windows it's
     hidden by default, so most likely you won't see it at all — that's fine,
     just delete everything you *can* see.
   - If you have "Hidden items" turned on (View menu) and see a `.git` folder,
     leave it alone and delete everything else.
3. Open the new project folder: **`sgp-classic-nextjs`** (inside your
   `SGP CLASSIC WEBSITE DOCS` folder).
4. Select **everything inside** `sgp-classic-nextjs` — including the folders
   `app`, `components`, `lib`, `public`, and the files `package.json`,
   `next.config.js`, `jsconfig.json`, `README.md`, `.gitignore`.
   - If you don't see `.gitignore`, turn on **View → Hidden items** and grab it
     too — it's important.
   - You do **not** need a `node_modules` or `.next` folder; if they exist,
     don't copy them.
5. **Copy** them, then **paste** into the now-empty cloned repo folder.

---

## Part 4 — Add the three course-map images

The legacy course-guide maps aren't in the project yet.

1. Find `ob-map-1.png`, `ob-map-2.png`, `ob-map-3.png` — these are in your
   *current live site's* `public` folder (the old repo you just cloned had them,
   or check where you saved them originally).
2. Copy those three files into the **`public`** folder inside your cloned repo.

If you can't find them right now, skip this — the site still works, only the
legacy out-of-bounds maps will show broken images until you add them. You can do
it in a later push.

---

## Part 5 — Commit and push (this is the "upload")

1. Switch back to **GitHub Desktop**. It now shows a long list of changed files
   on the left — this is expected (you replaced everything).
2. Bottom-left, in the **Summary** box, type:
   `Rebuild SGP Classic on Next.js`
3. Click the blue **Commit to main** button.
4. Top of the window, click **Push origin**. This uploads everything to GitHub.

That's it for GitHub.

---

## Part 6 — Let Vercel rebuild, and check the framework setting

Pushing triggers Vercel automatically. One setting may need a look because
you're switching from Create React App to Next.js.

1. Go to **https://vercel.com** and open your SGP Classic project.
2. Click the **Deployments** tab. You should see a new build running (started by
   your push). Give it 1–2 minutes.
3. If the build **succeeds** ✅ — open `sgpclassic.com`, hard-refresh
   (Ctrl+Shift+R), and click around. Try refreshing on an inner page like the
   betting page — it should stay put instead of jumping Home. **You're done.**
4. If the build **fails** ❌ with a framework/build error:
   - Go to **Settings → General → Build & Development Settings**.
   - Set **Framework Preset** to **Next.js**.
   - Leave Build Command, Output Directory, and Install Command on their
     defaults (toggle "Override" off so Vercel auto-detects).
   - Save, then go to **Deployments**, click the failed one's **⋯ menu →
     Redeploy**.

---

## From now on

No more copy-pasting. To make any change:

1. Edit files in your cloned repo folder (or tell me and I'll update them).
2. In GitHub Desktop: type a short Summary → **Commit to main** → **Push
   origin**.
3. Vercel redeploys in about a minute.

---

## If something goes wrong

- **Build fails and you're stuck** — in Vercel, open the failed deployment and
  copy the red error text. Send it to me and I'll tell you the exact fix.
- **You accidentally deleted the `.git` folder** — no harm done. Tell me and
  we'll re-link the folder to your repo, or just re-clone fresh and redo Part 3.
- **Domain shows old site** — it can cache. Hard-refresh (Ctrl+Shift+R) or wait
  a few minutes.
