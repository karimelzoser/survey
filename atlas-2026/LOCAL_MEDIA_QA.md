# Local media & accessibility improvements — review branch

This branch preserves the existing 215-family UAS / Counter-UAS atlas while improving navigation, table behaviour, Arabic technical labels and media provenance.

## What is included
- New back-navigation control and searchable media library, with explicit `study image` vs `editorial icon` labeling.
- 17 distinct, original **technology-type icons** in `atlas-2026/assets/icons/types/`. These are not official manufacturer logos.
- `scripts/generate_local_media.py`, which extracts **existing images already embedded in the 21 atlas source parts** into `atlas-2026/assets/media/`, generates 215 unique editorial system pictograms, and creates `assets/media-manifest.json` / `assets/media-manifest.js`.
- `.github/workflows/local-media.yml`, configured to build those files and push them back to the review branch when Actions has permission. A browser-side fallback manifest is present until extraction has completed.
- UAS six-row engineering preview with the same table-based treatment as Counter-UAS.
- Scroll-first technical comparison with an optional pagination switch; country/type matrices retain their native scroll container.
- Suppression of unsupported and not-disclosed values from the dossier interface, without inventing figures.
- Arabic UI terminology and right-to-left improvements. Manufacturer, aircraft and system proper names remain in their documented form.
- Egyptian Air Defence Forces emblem path is local after generation. If downloading before the workflow has run, use the original flag fallback.

## Verification and rights
The baseline contains **134 UAS + 81 Counter-UAS families**. Approximately 219 embedded media items can be extracted from the prior source catalog. These include both photos and editorial engineering plates: extraction is not independent authenticity verification. Original photos, publisher videos and logos may have third-party rights. **Do not download or redistribute third-party streaming videos or OEM logos without permission.** Original video references remain source links. Original editorial system icons are explicitly identified as illustrations.

### Run local media extraction
From the GitHub repository's Actions page, choose **Build existing local media inventory → Run workflow** on this branch. If Actions cannot push because repository workflow permissions are restricted, use `python3 scripts/generate_local_media.py` in a checked-out repository and push the resulting `atlas-2026/assets/` directory. Running the generator is idempotent.

The full offline media package can also be supplied as a ZIP. It is not equivalent to the single-file HTML-only export: the ZIP retains the images as separate files and the media manifest.

## Outstanding verification
- Complete rights-reviewed equipment photos for currently unillustrated UAS and Counter-UAS entries.
- Publisher-authorized local video masters, where available.
- Individually authenticated company logos, where supplied with reuse permission.
- Engineering evidence audit: missing fields remain blank, not zero, and unverified manufacturer figures remain clearly attributed.

**Do not merge as a fully validated media-completeness release until this audit is completed.**