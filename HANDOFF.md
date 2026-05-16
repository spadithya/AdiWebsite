# Phase 1 hand-off — your turn

The site is fully scaffolded and the build has been verified in a sandbox. To get it live, you need to run a few commands on your machine.

---

## Step 1 — Install Node.js (if you don't have it)

Open PowerShell and check:

```powershell
node --version
```

If you see something like `v20.x.x` or `v22.x.x`, you're good. Skip to Step 2.

If not: download the **LTS installer** from https://nodejs.org/ and install with defaults. Restart PowerShell after.

---

## Step 2 — Install project dependencies

Open PowerShell, navigate to the project folder, install:

```powershell
cd C:\Users\desig\OneDrive\Documents\Adi_Repositories\Adi_Website
npm install
```

This takes about 1–2 minutes the first time. You'll see a `node_modules/` folder appear and a `package-lock.json` file. Both are normal. `node_modules/` is gitignored — it stays on your machine only.

If `npm install` hangs or errors out, OneDrive sync may be locking files. Pause OneDrive (system tray → OneDrive icon → Pause syncing for 2 hours), re-run `npm install`, then resume sync.

---

## Step 3 — See it live, locally

```powershell
npm run dev
```

Open http://localhost:4321 in your browser. You should see the site exactly as we mocked it — CRT Phosphor green-on-black, your hero, status panel, projects, publications, off-hours, footer.

Edit any file in `src/` and the browser hot-reloads automatically. Press `Ctrl+C` in PowerShell to stop the dev server.

---

## Step 4 — Push to GitHub

```powershell
git add .
git commit -m "Phase 1: scaffold Astro site with CRT Phosphor theme"
git push
```

You should see all the new files (`package.json`, `astro.config.mjs`, `src/`, `.github/workflows/`, etc.) committed and pushed.

---

## Step 5 — Turn on GitHub Pages

This is a **one-time** setup. Done in the browser, not the command line.

1. Go to https://github.com/spadithya/AdiWebsite/settings/pages
2. Under **Build and deployment** → **Source**, select **"GitHub Actions"** from the dropdown (NOT "Deploy from a branch").
3. Save.
4. Go to https://github.com/spadithya/AdiWebsite/actions and watch the workflow run (~1–2 minutes).
5. When it shows a green checkmark, your site is live at:

   **https://spadithya.github.io/AdiWebsite/**

---

## You're done with Phase 1

From now on, every time you `git push`, the site auto-rebuilds and redeploys in ~90 seconds. No manual steps.

---

## What we'll tackle in the next phases

**Phase 2 — Real project pages**
- Move projects from the inline array in `index.astro` into separate Markdown files in `src/content/projects/`.
- Build individual project detail pages with photos, videos (YouTube Unlisted embeds), and write-ups.
- Add a `/projects` index page that lists all of them.

**Phase 3 — Real content**
- Replace placeholder copy with polished bio, full publication list, hyperlinks to DOIs and Scholar.
- Add your headshot (optional).
- Add real GitHub repo links to each project.

**Phase 4 — Custom domain + analytics**
- Point `spadida.org` at GitHub Pages (instructions in `README.md`).
- Add Cloudflare Web Analytics (free, privacy-friendly).
- Final SEO/Open Graph pass so links preview nicely on LinkedIn/Slack/Twitter.

Tell me when Step 5 is done and the site is live, and we'll start Phase 2.

---

## If anything breaks

Most common issues and fixes:

| Error | Fix |
|---|---|
| `npm install` hangs forever | Pause OneDrive sync, retry |
| `npm: command not found` | Node isn't installed — see Step 1 |
| GitHub Actions workflow fails on "npm ci" | Push the `package-lock.json` file too (run `git add package-lock.json && git commit -m "add lockfile" && git push`) |
| Site loads but no styling | Hard refresh (Ctrl+Shift+R). If still broken, check that `base: '/AdiWebsite'` matches your repo name exactly in `astro.config.mjs` |
| GitHub Pages says "There isn't a GitHub Pages site here" | Re-do Step 5 — the Source must be "GitHub Actions", not "Deploy from a branch" |

When in doubt, paste the error here and I'll help.
