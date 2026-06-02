# Content rules

Style guide for project pages on spadida.org. Apply these by default whenever Adi pastes a README/markdown from a personal repo and asks for it to be turned into a project page.

---

## Typography

1. **No em-dashes (`—`) anywhere in user-visible content.** Replace with:
   - `:` for titles, captions, and label/value separators ("Calibration curve: polynomial fit")
   - `,` for parenthetical asides in prose ("seven PCB designs, from a single LED to four, systematically...")
   - `.` for punchlines or where it reads cleaner as a new sentence
   - `at` for location callouts ("EMC testing at Salt Lake City facility")
2. **En-dashes (`–`) for compound proper nouns are fine** (`Wells–Riley`, date ranges like `2018–2026`).
3. **No `<digit` patterns in MDX prose.** MDX parses `<` as the start of a JSX tag, so `<10 µm` breaks the build. Use `under 10 µm`, `less than 10 µm`, or `&lt;10 µm`.

## Voice and framing

4. **Describe the project, don't list its file structure.** If the README has:
   - Numbered Python files (`01_get_data.py`, `02_clean_features.py`, ...)
   - Folder layout trees (`models/`, `notebooks/`, `src/`)
   - Internal paths like `data/processed/something.parquet`

   Replace with a narrative paragraph explaining what the pipeline *does* (ingestion → cleanup → baselines → tree models → deploy), not what the files are called. Visitors don't need implementation paths; they need the story.

5. **Drop the "Quick start" / "Run locally" sections from the portfolio page.** Visitors who want to run the project will visit the GitHub repo. The portfolio page is for the *story* of what you built and why.

6. **Drop deployment/install instructions** for the same reason. Mention deployment platform briefly if relevant (e.g., "Hosted on Streamlit Community Cloud"); skip the step-by-step.

## Frontmatter defaults

7. **For Side-quests projects:** `role: "Solo build"` unless the user specifies otherwise.
8. **Tags should describe the work, not list tech in detail.** 5 to 8 tags maximum. Mix domains (e.g., `Machine Learning`, `Real Estate`) with tech (e.g., `Streamlit`, `XGBoost`) with method (`Data Pipeline`).
9. **`featured: true`** for the most recent / strongest project in each category. **`order`** is fine but the listing page sorts by year first.
10. **Hero image** should be the most representative single shot of the project (a dashboard screenshot, a hardware photo, a system in context). When in doubt, use the most "alive" image (a working app, deployed hardware, etc.) over the most aesthetic one.

## Structure for project pages

Default flow when adapting a README:

1. **Overview** (1 short paragraph, plain language). What it is and what it does.
2. **Problem** or **Why** (1-2 paragraphs). What gap or curiosity drove this. Skip if obvious from Overview.
3. **Approach** (1-2 paragraphs + an inline gallery if there's a relevant photo). How you tackled it. Narrative, not implementation steps.
4. **Results** (bulleted list of metrics + an inline gallery for performance charts or data viz). Quantified outcomes win here.
5. **Live demo / In action** section if the project has a deployed app or video. Embed it directly.
6. **Notes on the data / Stack / Caveats** (optional, short). Worthwhile gotchas a fellow engineer would appreciate.
7. **License / Credits** (one line, only if relevant).

## Image placement

11. **Match images to narrative beats, not a single dump.** A "hardware iterations" photo goes near the Approach section, a "calibration curve" near Results, a "deployed in the field" photo near In the field. Avoid one big trailing gallery.
12. **Use `natural={true}` on the PhotoGallery component when images have varying aspect ratios** (preserves natural shapes).
13. **Use `columns={1}` for single-image showcases**, `columns={2}` for side-by-side comparisons.

## Video

14. **YouTube Unlisted only.** Never default to Public. Tell the user once at upload time.
15. **`<VideoEmbed id="YT_ID_ONLY" />`** — pass just the 11-character video ID, not the full URL.

## Things to flag back to the user when adapting a README

When the README hints at something that needs the user's call:

- **IP/confidentiality concerns:** unreleased commercial products, system architecture diagrams, patient-facing photos.
- **Live demo URLs that aren't yours:** placeholders like `predictor.yourdomain.com` that need the real URL.
- **Performance numbers that feel sensitive** (revenue, accuracy on private data, etc.).
- **Anything where the README is a future plan vs. a shipped fact.**

If in doubt, draft both versions and ask the user which framing they prefer.
