# Counter-UAS Visual Atlas — final engineering, source and presentation QA
**Review date:** 10 November 2026
**Repository / branch:** `karimelzoser/survey` / `feat/cuas-visual-atlas-v3`
**PR:** https://github.com/karimelzoser/survey/pull/3

## Summary of verified build state
- **54 distinct system families** across **nine method categories**; related versions consolidated into family dashboards. There are **six India-origin systems**: D4, Zen ZADS, Vajra Sentinel, Indrajaal, Bhargavastra, and BEL Drone Detection Radar.
- **60 scenes**: cover, methods, 54 individual system dashboards, comparison, Top 3 shortlist, target types, and evidence notes.
- Each of the 54 system profiles has a **radar-status record** (including explicit "none"/"not applicable"/"undisclosed" for non-radar systems) and displays model/type, published radar frequency band, qualified detection range and coverage, plus sensor C2, response effect, deployment/cost and comparative strengths/limits.
- **Three editorial recommendations by use case**: Skyranger 30/35 (mobile gun-based defence); Rafael Drone Dome (fixed-site multisensor); Fortem SkyDome/DroneHunter (controlled physical capture). Not an independently verified global efficacy ranking.
- **145 HTTPS source references** are present in the data. The URL syntax and per-profile source presence were programmatically checked; *individual HTTP reachability, future redirects, paywalls, and claim-to-source verification across all 145 are NOT guaranteed*. Strong claims were spot-checked against relevant government/manufacturer PDFs and procurement notices.

## Media verification: the precise remaining limitations
- **51/54 profiles have at least one photo-tagged view**; this includes previous credited photographs, some views/crops from the same original photo, and newly sourced *publisher-hosted* exhibition/field images. Do **not** interpret this as 51 distinct manufacturer-photo sets or offline-embedded photos.
- **32 existing local equipment-photo references** remain bundled from the original asset package. At least **21 family profiles reference externally hosted images** (not verified as available offline or licensed for redistribution); some profiles may contain both local and external images.
- **Three profiles have no authenticated directly displayable equipment photo**: **BEAM 3.0**, **Sky Fortress acoustic network**, **Saab mobile modular C-UAS (FMV 2026)**. In particular, a photo of Saab's generic Trackfire technology is not evidence that it depicts the exact FMV 2026 purchased configuration. Fake renders have not been substituted.
- **20 video references across 18 profiles**. Of those, **13 references** use embedded YouTube/DVIDS player types, **seven** are publisher/video-gallery links only. "Embedded" means original publisher playback is requested in an iframe, not that the video has been downloaded, rehosted or guaranteed to play across regions or corporate networks. Remaining 36 families lack a verified dedicated video record.
- Several newly added genuine source photographs are **hot-linked** to their original publisher. Credit and source link are shown. Copyright ownership or public redistribution rights have **not** been established for all of them. No claim of offline playback for those assets.

## Programmatic functionality tests
- Fetched the exact contents of the branch's original dataset, both research extensions, `app.js`, `index.html` and `styles.css` via GitHub.
- Evaluated all three data scripts in order: **54 IDs**, **54 unique slugs**, all named profiles present; **zero missing or duplicated IDs**.
- Parsed the complete JavaScript application using V8 syntax evaluation; **PASS**.
- Ran a 60-scene navigation simulation using DOM-compatible event stubs and 59 consecutive ArrowRight transitions: **60/60 scenes rendered**, zero thrown errors; every family rendered a **RADAR MODEL / TYPE** row; shortlist appeared; final page counter **60/60**.
- Verified the HTML script load order and the CSS two-line metric clamp used to prevent long weapon/radar sentences overlapping headline cards.
- Earlier responsive QA used a representative inlined browser test at **1754×864**, **1366×768**, and **390×844**, covering method screen, multiple system layouts, Top 3, directory and comparison. Reported no app errors or document-level horizontal overflow in those test states. These were representative layout fixtures, **not a full live-site crawl against every external asset**.
- **Not verified in this connection:** real user-browser playback of every iframe video; live network response of every manufacturer photo/brochure; rendered screenshot of every one of the 54 actual production profiles; actual GitHub Pages deployment. The branch is currently open for review, not merged into `main`.

## Evidence and performance rules
1. Radar instrumented maximum is **not** target-qualified detection range. For example, Robin IRIS official April 2026 manufacturer test examples include nano 0.249 kg at **1.1 km**, small 0.9 kg at **3.1 km**, 2.9 kg at **3.7 km** and larger fixed-wing 52 kg at **7.6 km**; separate 5 km/12 km instrumented limits.
2. Radar operating RF band is not the same as the passive radio-signal receiver band, or the jammer's emission bands. No transmitter band is fabricated for a system with no standard radar.
3. Ready missiles, guns, video tracks, radar contacts and *successful simultaneous defeats* are different measurements. Product claims and operational accounts are not a common matched-trial detection/kill probability.
4. Selling prices and cost-per-action figures are not inferred from a national procurement package. CBO (9 July 2026) estimates about **US$74m** to equip and **US$5m/year** to sustain a representative layered military installation; it is **not** the price of any system on the slides.
5. Profiles distinguish prototype/demonstrator, government tender, ordered, delivered, deployed and independently witnessed combat use. Buyers marked undisclosed are not guessed.

## Review follow-ups / residual gaps
- Confirm reproduction rights for hotlinked third-party media and, where licensed, **download and bundle** high-resolution equipment photos and subsystem photos into the repository so the entire deck works offline.
- Verify individual playback and embed policies for each of the 20 video references from the intended hosting domain; provide publisher-page fallbacks (already included).
- Obtain target-calibrated detection tests, operating false-alarm rates, total track counts, independently measured interception probabilities, environmental test data, SWaP-C and cost-per-successful-defeat by exact variant. In most systems, this data is **not public**.
- The directory is *not an exhaustive global census*: the September 2026 Unmanned Airspace industry reference counts **654 companies and >1,000 products**. Coverage of 54 high-value families is curated rather than universal.

## Strong source register
- Global directory: https://www.unmannedairspace.info/counter-uas-industry-directory/
- CBO cost benchmark: https://www.cbo.gov/publication/62262
- Robin IRIS manufacturer April 2026 sheet: https://www.robinradar.com/hubfs/Iris%20Datasheet%20V15.7_Online.pdf
- SRC Silent Archer public brochure: https://www.srcinc.com/pdf/counter-uas-silent-archer.pdf
- Zen counter-drone product + 2026 version: https://www.zentechnologies.com/anti-drone-system-counter-drone-cuas.php
- Indian defence manufacturer and receiver listing: https://www.ddpmod.gov.in/hi/node/7193
- Brazilian IACIT Rio 2016 official use: https://www.iacit.com.br/en/products/defense/droneblocker
- Ukrainian acoustic study (US Army, 2026): https://api.army.mil/e2/c/downloads/2026/04/30/af450e75/no-26-1115-listening-to-the-sky-acoustic-drone-detection-in-ukraine-mar-26.pdf
- Scholarly literature review (2026), DOI 10.1049/csy2.70048: https://doi.org/10.1049/csy2.70048

**Overall QA result:** application structural/function simulation **PASS**; core scientific labeling and additional country/source audit **PASS with caveats**; complete real-browser/media/license audit **INCOMPLETE**. Do not label the full presentation 100% externally verified.
