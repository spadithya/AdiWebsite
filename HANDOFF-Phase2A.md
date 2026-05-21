# Phase 2A hand-off — content for the Photodiode Biomarker Sensor

The infrastructure is built and tested. Six new files were created:

- `src/content.config.ts` — the schema for project frontmatter (defines what fields each project has)
- `src/pages/projects/index.astro` — the `/projects` listing page with category filters
- `src/pages/projects/[slug].astro` — the project detail page template (renders any `.mdx` in `src/content/projects/`)
- `src/components/VideoEmbed.astro` — YouTube iframe wrapper, CRT-styled
- `src/components/PhotoGallery.astro` — responsive image grid
- `src/content/projects/*.mdx` — five project files (PD = full template, the other 4 = skeletons)

Push and you'll see `spadida.org/projects` and `spadida.org/projects/photodiode-biomarker-sensor` go live. They'll work even with placeholder text; we'll iterate on the real content below.

---

## What I need from you for the PD project

Open `src/content/projects/photodiode-biomarker-sensor.mdx`. You'll see a structured template with **[TODO]** prompts in each section. Fill them in directly — the file is just Markdown with frontmatter at the top. Three buckets:

### 1. Words (15–30 minutes of writing)

Replace the **[TODO]** blocks in five sections. Each prompt explains what to write.

- **Overview** — plain-language elevator pitch (2–3 sentences, no jargon)
- **Problem** — the unmet clinical/industry need
- **Approach** — the technical meat: hardware-algorithm co-design, photodiode + optics, comms, EMC hardening
- **Results** — the numbers (you already have great ones: 10 µM, 0.25 µL, 10× SNR, EMC Class B)
- **What's next** — optional forward-looking paragraph

Tone: technical but readable. Recruiters and grad-school admissions should both get it.

### 2. Photos

Put your images in this folder on your computer:

```
C:\Users\desig\OneDrive\Documents\Adi_Repositories\Adi_Website\public\images\projects\photodiode-biomarker-sensor\
```

(Create the `images`, `projects`, and `photodiode-biomarker-sensor` subfolders.)

Drop in:

- `hero.jpg` — the lead image at the top of the page. ~1600 × 900 pixels, landscape, looks great as a banner.
- `lab-1.jpg`, `lab-2.jpg` — optical bench / PCB-rework station
- `clinical-1.jpg`, `clinical-2.jpg` — device in hospital setting

If your file names are different, that's fine — edit the `images={[...]}` array inside the `<PhotoGallery>` block in the MDX to match.

**Important — confidentiality check before publishing hospital photos:**

1. **Patient privacy**: Make sure no patient faces, ID bracelets, charts, or screens with patient info are visible. Crop/blur if needed.
2. **Hospital branding**: Some institutions require approval before their logos or interior shots appear online. If Mayo Clinic or any other facility's logo/identifiable layout shows in a photo, check with whoever signed the original IRB or partnership agreement.
3. **Device IP**: If Sequitur Health hasn't publicly disclosed certain hardware details yet, redact PCB markings or revisions.

If you're unsure about any one image, skip it for now and add it later. Easier to add than to scrub.

**Sizing tip**: large JPGs slow the site down. Aim for files under ~400 KB each. Free tool: https://squoosh.app — drag a photo in, it shrinks while keeping quality.

### 3. Video

You said you have demo video. The flow:

**Step A — Upload to YouTube as Unlisted**

1. Go to https://studio.youtube.com (sign in with your Google account).
2. Click **Create → Upload videos** (top-right).
3. Drag your video file in.
4. Fill in title (e.g., "Photodiode Biomarker Sensor — Demo"), description, category.
5. Skip "Add to playlist" and most other settings.
6. **CRITICAL**: When you reach the **"Visibility"** step, select **"Unlisted"** (NOT Public, NOT Private). Unlisted means it's not searchable on YouTube and not on your channel, but the link works for embedding.
7. Click **Save**.

**Step B — Get the video ID**

Once uploaded, your video URL will look like:

```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

The video ID is the part after `v=` — in that example, `dQw4w9WgXcQ`. Copy it.

**Step C — Drop it into the MDX**

Find this line in `photodiode-biomarker-sensor.mdx`:

```mdx
<VideoEmbed
  id="REPLACE_WITH_YOUTUBE_ID"
  title="Photodiode Biomarker Sensor — demonstration"
  caption="System walk-through: sample loading, measurement, readout."
/>
```

Replace `REPLACE_WITH_YOUTUBE_ID` with your real ID. Done.

Also update the frontmatter at the top:

```yaml
videoId: ""    # change to: videoId: "dQw4w9WgXcQ"
```

(There's also a `videoId` slot in the frontmatter — if it's set, the detail page shows a featured video block at the bottom. Two ways to embed; pick one or both.)

---

## Once content is in

```powershell
git add .
git commit -m "Phase 2A: project pages + flesh out PD biomarker sensor"
git push
```

Wait ~90 seconds. Visit https://spadida.org/projects/photodiode-biomarker-sensor and admire your handiwork.

---

## What we'll build next (Phase 2B, after PD is real content)

- Fill out the other 4 project pages — they have skeleton templates; same workflow as PD.
- Build `/about` page from your CV.
- Build `/writing` page (publications, talks, patents).
- Build `/off-hours` (dancing).
- Build `/contact` (with the `adi@spadida.org` reveal).
- Build `/press` placeholder.
- Migrate homepage to pull from the projects collection so it stays consistent automatically.

But none of that is urgent. Get one project fully fleshed out and shipped first — that's the template the rest follow.

---

## If anything breaks

| Symptom | Fix |
|---|---|
| Build fails after editing MDX | Check the frontmatter — YAML is whitespace-sensitive. Tabs aren't allowed; use spaces. Strings with special characters need quotes. |
| Image doesn't load on the deployed site | Path must start with `/images/...` and the file must actually exist in `public/images/...` |
| Video shows but plays a different video | Wrong ID — re-copy from the YouTube URL `?v=` parameter |
| Photo gallery shows broken images locally but works after build | `npm run dev` and `npm run build` resolve paths slightly differently. Always test with `npm run build && npm run preview` if in doubt. |
| /projects/something-else shows old content | Astro caches builds. Run `rm -r dist .astro` then rebuild. |
