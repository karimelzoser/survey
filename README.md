# Latest 2026 Release — UAS & Counter-UAS Atlas

**Download the complete repository archive:** https://github.com/karimelzoser/survey/archive/refs/heads/main.zip

After extracting the ZIP, open **`atlas-2026/index.html`** in Chrome or Edge and keep its **`parts/`** folder beside it. The release contains 134 UAS and 81 Counter-UAS curated families, country and type navigation, comparison tables, flags, media links, and technical profiles.

**Engineering QA release (22 Nov 2026):** the combined atlas adds a source-derived 215-system technical matrix with search, country/domain filters and 2–3-system side-by-side comparisons; 11 public-record laser optical/thermal engineering profiles; and an evidence/media audit tab. All technical details are read from the original embedded UAS/Counter-UAS JSON, not duplicated or invented. Comparison and dossier data are paginated for presentation-sized viewports. Standalone export includes these enhancements. The official Egyptian Air Defence emblem still requires internet access; authentic OEM logos and missing UAS equipment photos are openly marked for source verification. This is a code/research presentation update, not independent weapons-performance verification.\n\n**Release directory:** https://github.com/karimelzoser/survey/tree/main/atlas-2026

**Presentation note:** Repository root `index.html` now opens the latest combined atlas. The original root presentation remains at `legacy-counter-uas.html` for comparison, and its `data/`, `app.js` and `styles.css` remain intact. The 2026 atlas opens with a four-step bilingual research briefing: formal cover, research questions, country comparison and engineering evaluation schema. `atlas-2026/download.html` includes this briefing within the exported standalone file.

**Online viewing:** Once the repository owner enables GitHub Pages under **Settings → Pages → Build and deployment → Source: GitHub Actions**, the included workflow can publish the atlas at https://karimelzoser.github.io/survey/atlas-2026/ . The Pages deployment was blocked at the site-enablement step by integration permissions, so this URL is not yet confirmed live.

---

# Counter-UAS Technology Atlas — 2026

A standalone, cinematic HTML5 technical presentation of 37 military and civilian counter-uncrewed aircraft system families. It draws on the accompanying research atlas and its cited official product documentation, government publications, papers, and media sources.

## Open the presentation

Open [`index.html`](index.html) in a modern browser, or publish the repository using **Settings → Pages → Deploy from a branch → main / root**. No build, server, package installation, account, or API key is required.

Keyboard: **Right / Left** progress through scenes (or reveal the next item); **Shift + Right / Left** skip directly between scenes; **M** or **Ctrl+K** opens the searchable 37-system directory; **F** enters fullscreen; **Home / End** jumps to the beginning or end. The sidebar searches names, countries, manufacturers and technical keywords. The comparison table can be filtered by manufacturer, country, technology or subsystem.

## Contents

- Source-based executive introduction and layered detection / track / C2 / response architecture.
- Three views for **each of 37 systems**: equipment overview, named-subsystem engineering diagram, and documented use / upgrades / prices / limitations / sources / videos.
- Source-preserving table of all 37 systems; drone-class context; comparative cost and operations trade-offs.
- 34 embedded equipment images from the source report, 37 large, annotated technical plates, and directly linked official videos, media libraries and product datasheets where verified. The other three equipment photographs were not authenticated and are not fabricated.
- Responsive cinematic navigation inspired by the user-supplied PRENEURA real-estate presentation.

## Important research limits

**Evidence standard:** manufacturer-advertised maximum range is not the same as detection probability, track accuracy or probability of successful drone defeat under independently reproduced conditions. Target-track counts, ready ammunition and simultaneous engagements are separate metrics. Hardware/software configurations can differ by version, customer and year. Unavailable/undisclosed data are not invented.

**Use restrictions:** this is a defensive, comparative research presentation, not an engagement planner, jamming configuration guide or weapon-construction manual. Procurement figures may be programme-level or bundled and must not be mistaken for sale prices or cost-per-kill quotes. Some procurement and technical specifications may have changed since the **10 Nov 2026** source-atlas cutoff; validate against linked primary sources for any real-world decisions.

**Media/credits:** images are reproduced from the user-supplied technical report for review and criticism; attribution is retained per profile in the UI and in [MEDIA_CREDITS.md](MEDIA_CREDITS.md). This does **not** assert that all equipment photographs are freely redistributable. For public/commercial publication, review each original source and rights before distributing any manufacturer image. The engineering diagrams are editorial synthesis, not proprietary schematics. Videos are linked to official publisher pages or embedded from YouTube where an official link was identified, never copied into the repository.

## File layout

- `index.html` — standalone shell.
- `styles.css` — cinematic visual system and responsive layouts.
- `app.js` — slide navigation, media viewer, filtering and comparison.
- `data/systems.js` — complete 37-record, sourced technical catalog for offline use.
- `assets/photos/` — equipment photo illustrations/photographs from the user-supplied atlas (where included).
- `assets/diagrams/` — 37 high-resolution named component and functional-path plates.
- `MEDIA_CREDITS.md` — attribution and original source pages.

No automated external download links, tracking scripts, third-party npm packages or analytics are used.
