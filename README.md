# Counter-UAS Executive Dashboard — 2026

**One concise, visual presentation slide per system.** The 42-scene static HTML deck covers 37 counter-UAS system families, then shows the searchable comparison and drone-class tradeoffs. Each system dashboard shows documented sensor, control and response subsystems, named ranges, capacities, manufacturer/country, acquisition and engagement-cost evidence, operational users, upgrades, pros and cons, original equipment imagery, architectural plates, and cited public sources.

Use arrow keys to navigate, **M** to open the directory, and **F** for fullscreen. Click equipment images and diagrams to enlarge; scroll the technical evidence panel inside the same slide.

**Video rights and evidence:** Publisher video files are not downloaded or rehosted where authorization is unavailable. A small number of official YouTube videos are embedded in-page (online connection needed); other verified official videos open at the publisher. Profiles without verified footage say so explicitly. Existing images remain credited in `MEDIA_CREDITS.md`. Vendor range figures must not be interpreted as independent probability-of-defeat measurements.

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
