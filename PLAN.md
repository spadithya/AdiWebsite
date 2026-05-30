# Adi's Personal Website — Build Plan

_Last updated: May 14, 2026_

## 0. Project identity (locked in)

| Item 			| Value 												|
|----------------------	|------------------------------------------------------------------------------------------------------	|
| Name 			| Adithya Shyamala Pandian 										|
| Custom domain 	| **spadida.org** (registered) 										|
| GitHub username 	| **spadithya** 											|
| Repo 			| **AdiWebsite** → `https://github.com/spadithya/AdiWebsite` 						|
| Pre-domain URL 	| `https://spadithya.github.io/AdiWebsite/` 								|
| Final URL 		| `https://spadida.org` (after DNS in Phase 4) 								|
| Video host 		| **YouTube Unlisted** (escape hatch to Vimeo later if needed) 						|
| Template base 	| **Astro Cactus** (locked) — reskinned heavily 							|
| Aesthetic direction 	| **Future Nostalgia / retro-gaming-modern** (locked) 							|
| Palette 		| **CRT Phosphor** (locked) — bg `#0A0F0A`, primary `#5BFF85`, secondary `#FFB347`, text `#C8E6C8` 	|
| Notation 		| **Light terminal vibe** — numbered sections (01 · Work), monospace tags, no `LVL_XX`, no `$` symbols 	|
| Phase 1 status 	| ✅ **LIVE** — https://spadida.org — custom domain wired, HTTPS enforced, auto-deploys on push. 	|
| Phase 2A status 	| ✅ **SCAFFOLDED** — /projects + /projects/[slug] + content collection + VideoEmbed + PhotoGallery components. PD project template ready for real content. 	|
| Phase 2B status 	| ✅ **CONTENT** — PD, Camera, and Aerosol Mitigation projects fully fleshed out with images and video. 	|
| Phase 2C status 	| ✅ **RESTRUCTURED** — Four-category architecture (Lab / Side Quests / Hub / Off-hours). Homepage shows category preview blocks with "Coming soon" for empty ones. Old /projects URLs 301-redirect to new /{category}/[slug] URLs. Featured Build callout kept standalone. 	|

## 0.5 Section plan (locked May 2026, revised May 29 2026)

Four-category restructure replacing the single `/projects` page:

```
spadida.org/
├── /                       Home — snapshot CV + 4 category previews (3 highlights each)
├── /lab                    Work Projects — research, funded engineering, FDA-pathway work
│   └── /lab/[slug]         Individual project detail (was /projects/[slug])
├── /side-quests            Hobby Projects — ML, cybersec, weekend code
│   └── /side-quests/[slug] Individual side-quest detail
├── /hub                    Community Activities — outreach, NES/Game Boy for kids, ASU Open Door
│   └── /hub/[slug]         Individual community-activity detail
├── /off-hours              Fun Hobbies — dancing, hiking
├── /writing                Publications, talks, patents, thesis
├── /about                  Full bio, experience, education, skills, teaching, honors
├── /press                  Media coverage (footer-only until it grows)
└── /contact                Masked email + socials
```

**Category labels (locked):**
- `lab` for Work Projects
- `side-quests` for Hobby Projects
- `hub` for Community Activities
- `off-hours` for Fun Hobbies

**Top nav:** Lab · Side Quests · Hub · Off-hours · Contact
**Secondary nav (footer):** Writing · About · Press · RSS

**Email:** `adi@spadida.org` (Cloudflare Email Routing → `adithya.sp.ee@gmail.com`).

## 1. Goals (locked in)

A free-to-host, easy-to-maintain personal site that doubles as a **modern portfolio for recruiters** and a **lightweight academic profile**. Highlights:

- Homepage acts as a CV / resume with quick links to projects, GitHub, and journals.
- Each project gets its own page with text, photos, and embedded video.
- Hobbies section (starting with country swing dancing).
- Videos should be embeddable on the site only — not searchable on YouTube.
- Built to grow over time with minimal coding effort.

## 2. Tech stack (recommendation)

| Layer 		| Choice 								| Why 														|
|----------------------	|----------------------------------------------------------------------	|--------------------------------------------------------------------------------------------------------------	|
| Framework 		| **Astro** (static site generator) 					| Modern, fast, content authored in Markdown/MDX. Great portfolio templates. Lowest maintenance once set up. 	|
| Styling 		| **Tailwind CSS** (bundled with most Astro templates) 			| Easy to tweak look without writing CSS files. 								|
| Content format 	| **Markdown (`.mdx`)** 						| Add a new project = add one new file. No HTML required. 							|
| Hosting (site) 	| **GitHub Pages** 							| Free. Auto-deploys when you push to GitHub. Standard for academics + portfolios. 				|
| Domain 		| Optional: **Cloudflare Registrar** (~$10/yr, e.g. `adidesign.com`) 	| Nice professional touch, can be added anytime. 								|
| Photos 		| Stored in repo `/public/images/`, compressed (~100–300 KB each) 	| Fast, free, version-controlled. 										|
| **Video** 		| See section 3 below — this needs its own decision. 			| — 														|
| Analytics (optional) 	| **Plausible** (free tier) or **Cloudflare Web Analytics** (free) 	| Privacy-friendly, no cookie banner needed. 									|

### Template candidates to evaluate before building

I'll show you 2–3 of these before we pick:

- **Astro Portfolio** (https://github.com/RATIU5/medusa-astro) — clean modern portfolio.
- **Astrofy** (https://github.com/manuelernestog/astrofy) — designer/developer portfolio, sleek.
- **Astro Academia / al-folio-inspired** — if we lean academic.
- **AstroPaper** — minimalist, great for blog-style hobby posts.

## 3. Video hosting — three real options

GitHub Pages is not the right place for video. Here are the realistic paths to "embedded on my site, not on YouTube":

### Option A — Vimeo Plus (easiest, ~$7/mo)
- Set videos to **"Hide from Vimeo + domain-level privacy"** so they only play on `yoursite.com`.
- Truly hidden from search engines and from anyone going to vimeo.com.
- Player is polished. Captions, chapters, basic analytics included.
- **Best if you value time over money.**

### Option B — Cloudflare R2 + Plyr player (cheapest, <$1/mo for moderate use)
- Store MP4 files in Cloudflare R2 (object storage — free egress to anyone on the web).
- Embed via the open-source [Plyr](https://plyr.io) HTML5 video player.
- Restrict by HTTP Referer or signed URLs so the file can't easily be hot-linked.
- Disable the "download" button in the player.
- Not bulletproof DRM, but stops casual reuse and avoids YouTube entirely.
- **Best if you want full control + minimal cost.**

### Option C — Bunny.net Stream (middle ground, ~$1–3/mo for light use)
- Real adaptive streaming (HLS), like Vimeo.
- Token-based embed restriction to your domain.
- Pay-as-you-go: ~$0.005/GB storage + ~$0.005/GB delivery.
- **Best if you anticipate lots of viewers.**

**My recommendation:** Start with **Option B (Cloudflare R2 + Plyr)** because it's nearly free and Cloudflare is already a great fit if we use them for the domain. We can migrate to Vimeo later if it gets annoying.

## 4. Site information architecture

```
/                       Home — CV/resume + quick links + featured projects
/projects               All projects (filterable by tag: research, design, code, etc.)
/projects/[slug]        Individual project page (text + photos + video)
/publications           Journal articles / papers (optional separate page)
/hobbies                Country swing dancing, others later
/hobbies/[slug]         Detail pages if a hobby grows (e.g. dance videos)
/cv.pdf                 Downloadable resume
/contact                Email, LinkedIn, GitHub, Scholar, ORCID
```

### Homepage layout (modern-portfolio leaning)

1. **Hero** — Name, one-line tagline ("Engineer / Researcher / Designer at Sequitur Health"), photo, social links.
2. **About / Bio** — 2–3 paragraphs.
3. **Featured projects** — 3 large cards with hero images linking to project pages.
4. **Experience** — Timeline of roles (from your CV).
5. **Education** — Degrees.
6. **Publications** — List with DOI/journal links (or link to `/publications`).
7. **Skills / Tools** — Pill tags.
8. **Hobbies preview** — A small block linking to `/hobbies`.
9. **Footer** — Email, social, "View CV" button.

### Project page template

Every project page is generated from one Markdown file with this structure:

```yaml
---
title: "Project Name"
date: 2025-08-01
hero_image: "/images/projects/project-1/hero.jpg"
tags: [research, ml, healthcare]
github: "https://github.com/adi/project-1"
publication: "https://doi.org/..."
video: "https://r2.adidesign.com/project-1.mp4"   # or vimeo ID
---

## Overview
...

## Problem
...

## Approach
...

## Results
[gallery of photos]
[embedded video]

## Links
- GitHub
- Paper
- Demo
```

## 5. Repository layout

```
Adi_Website/
├── src/
│   ├── pages/                  Astro pages (routes)
│   ├── content/
│   │   ├── projects/           One .mdx per project
│   │   ├── publications/
│   │   └── experience/
│   ├── components/
│   │   ├── VideoEmbed.astro    Wrapper around Plyr/Vimeo
│   │   ├── Gallery.astro
│   │   ├── ProjectCard.astro
│   │   └── Timeline.astro
│   ├── layouts/
│   └── styles/
├── public/
│   ├── images/
│   ├── cv.pdf
│   └── favicon.ico
├── .github/workflows/deploy.yml   Auto-deploy to GitHub Pages
├── astro.config.mjs
├── package.json
└── README.md                      "How to add a project" cheatsheet
```

## 6. Step-by-step build phases

### Phase 1 — Setup (Day 1)
1. Decide final template (I'll show 2–3 live options).
2. Initialize Astro project locally in `Adi_Website/`.
3. Create a new **public GitHub repo** named `adi-website` (or `adi-username.github.io` for a vanity URL).
4. Wire up the GitHub Actions deploy workflow to GitHub Pages.
5. Confirm the bare site is live at `https://<your-username>.github.io/adi-website/`.

### Phase 2 — Skeleton (Day 2–3)
1. Build homepage structure with **placeholder content**.
2. Build the project listing page and one project detail template.
3. Build the hobbies page.
4. Add nav bar, footer, dark/light mode toggle.
5. Drop in your CV PDF for download.

### Phase 3 — Real content (Day 3–7)
1. Pull bio, education, experience, and publications from your CV file.
2. Add real GitHub / Google Scholar / ORCID / LinkedIn links.
3. Pick **2 flagship projects** and build them out fully — these become templates for the rest.
4. Set up the chosen video host (Vimeo or Cloudflare R2).
5. Compress and add photos.
6. Write the dancing hobby page (and we can add an embedded dance video as the first video test).

### Phase 4 — Polish (Day 7+)
1. Buy + connect custom domain (optional).
2. Add Plausible or Cloudflare Web Analytics.
3. SEO meta tags + Open Graph cards (so links preview nicely in Slack/Twitter/LinkedIn).
4. Lighthouse audit for speed + accessibility.
5. Backfill remaining projects on your own schedule.

### Phase 5 — Maintenance workflow (ongoing)
- **To add a project:** Create a new `.mdx` in `src/content/projects/`, drop photos in `public/images/projects/<slug>/`, upload video to chosen host, commit + push. Site auto-rebuilds in ~1 minute.
- **To update CV:** Replace `public/cv.pdf` and edit `experience.mdx` / `education.mdx`. Push.
- **Quarterly review:** Update hero copy, refresh featured projects, prune outdated content.
- A README in the repo will document the exact commands.

## 7. Time + cost summary

| Item 						| One-time	| Recurring 	|
|----------------------------------------------	|--------------	|--------------	|
| Astro + GitHub Pages 				| $0 		| $0 		|
| Domain (optional) 				| ~$10 		| ~$10/yr 	|
| Video hosting (Option B: Cloudflare R2) 	| $0 		| ~$0–1/mo 	|
| Video hosting (Option A: Vimeo Plus alt) 	| $0 		| ~$7/mo 	|
| Analytics (Plausible free or Cloudflare) 	| $0 		| $0 		|

Total realistic cost: **$0–$10/year** for the cheap path, **~$85/year** if we go with Vimeo Plus + custom domain.

Estimated build time with my help: **8–12 focused hours** spread across a week.

## 8. Open decisions before we start coding

1. **Template:** I'll show you 2–3 live demos and you pick.
2. **Video host:** Cloudflare R2 + Plyr (cheap) vs. Vimeo Plus (easy).
3. **Domain:** Do you want a custom one now, later, or never?
4. **Repo name:** `adi-website` vs. `<username>.github.io` (the latter gives you the prettier `username.github.io` URL).
5. **CV file:** Drop your current PDF/DOCX into this folder so I can pull from it during Phase 3.

## 9. Next step

Once you've reacted to this plan and answered the open questions in section 8, I'll proceed to **Phase 1** — initialize the Astro project, scaffold the repo, and stand up a barebones live site by end of day 1.
