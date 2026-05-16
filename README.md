# AdiWebsite

Personal site of Adithya Shyamala Pandian — electrical engineer & biomedical sensor researcher.

- Live (pre-domain): https://spadithya.github.io/AdiWebsite/
- Live (final): https://spadida.org _(after Phase 4 DNS setup)_

Built with [Astro](https://astro.build). Auto-deploys to GitHub Pages on every push to `main`.

---

## Run locally

Prerequisites: **Node.js 20+** ([download here](https://nodejs.org/)) and Git.

```bash
# 1. Install dependencies (one-time, ~1 minute)
npm install

# 2. Start the dev server (live-reloads as you edit)
npm run dev
# → opens http://localhost:4321

# 3. Build for production (test that everything still works)
npm run build

# 4. Preview the production build locally
npm run preview
```

If `npm install` fails or feels stuck, delete `node_modules/` and `package-lock.json` and try again.

---

## How to add a new project

Phase 1 has projects hard-coded in `src/pages/index.astro` (look for the `projects` array). To add a new one:

1. Open `src/pages/index.astro`.
2. Add a new object to the `projects` array, copying the shape of an existing one:

   ```js
   {
     year: 2025,
     title: 'My Cool New Project',
     desc: 'One-sentence description of what it does and why it matters.',
     tags: ['Hardware', 'Python'],
     href: '#',
   }
   ```

3. Save. The dev server hot-reloads.
4. Commit and push (see "Deploying" below) — the site rebuilds automatically.

**Phase 2** will move projects into individual Markdown files (`src/content/projects/*.mdx`) so each project gets its own detail page with photos and videos. For now we're keeping the homepage as the single source of truth.

---

## How to add a new publication

Same idea as projects — edit the `publications` array in `src/pages/index.astro`.

---

## How to update CV / bio / status numbers

- **Bio text**: `src/pages/index.astro` → the `<section class="about">` block.
- **Stat numbers** (PhD, Experience, Publications, Patents): same file → `<div class="status-panel">`.
- **Tagline**: same file → `<div class="tagline">`.

---

## Deploying

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes to GitHub Pages. No manual deploy step.

```bash
git add .
git commit -m "Updated bio and added new project"
git push
```

Watch the deploy at: https://github.com/spadithya/AdiWebsite/actions

The first time:
1. Push your local changes.
2. Go to the repo on GitHub → **Settings** → **Pages**.
3. Under "Build and deployment," set Source to **GitHub Actions** (not "Deploy from a branch").
4. Wait ~2 minutes for the first deploy to finish.
5. Visit `https://spadithya.github.io/AdiWebsite/`.

---

## Custom domain (Phase 4)

Once you're ready to use **spadida.org**:

1. In `astro.config.mjs`, change:

   ```js
   site: 'https://spadithya.github.io',
   base: '/AdiWebsite',
   ```

   to:

   ```js
   site: 'https://spadida.org',
   // remove the `base` line entirely
   ```

2. In your repo on GitHub → **Settings** → **Pages**, add `spadida.org` as the custom domain. GitHub will write a `CNAME` file for you.

3. In your domain registrar's DNS settings, add records pointing to GitHub Pages:
   - `A` records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `AAAA` records (IPv6): `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - Or a `CNAME` for `www.spadida.org` → `spadithya.github.io`

4. Push the config change. Wait ~30 minutes for DNS to propagate. Done.

---

## Project structure

```
.
├── .github/workflows/deploy.yml   # Auto-deploys to GitHub Pages on push
├── public/                        # Static assets (favicon, future images)
├── src/
│   ├── layouts/Base.astro         # Shared HTML shell, fonts, meta tags
│   ├── pages/index.astro          # Homepage — the whole site for now
│   └── styles/global.css          # CRT Phosphor theme tokens + layout
├── astro.config.mjs               # Astro config (site URL, base path)
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── design-mockups/                # Reference HTML mockups (not deployed)
├── PLAN.md                        # The master build plan
└── README.md                      # You are here
```

---

## OneDrive caveat

This folder lives inside OneDrive, which is fine for code but can occasionally cause file-lock conflicts when `npm install` writes thousands of files into `node_modules/`. If you see strange errors:

- **Option A (recommended):** Right-click the `Adi_Website` folder in File Explorer → "Free up space" / "Always keep on this device" doesn't matter, but you can right-click → **Pause syncing** during `npm install` and resume after.
- **Option B:** Move the project out of OneDrive entirely (e.g., to `C:\Users\desig\Adi_Repositories\AdiWebsite\`). Your git history goes with you.

`node_modules/` is gitignored — it never ends up on GitHub, only locally.

---

## Theme & aesthetic

CRT Phosphor (locked). Color tokens and notation rules live in `src/styles/global.css` at the top under `:root`. To explore other palettes, see `design-mockups/palette-live-preview.html`.

Full design rationale: `PLAN.md`.
