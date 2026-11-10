# Global Counter-UAS atlas — evidence expansion (10 November 2026)

This register documents the public-source update added to the 35-family presentation on branch `feat/cuas-visual-atlas-v3`. The current dataset is a **curated, non-exhaustive 45-family comparison**, including 6 India-origin families. Do **not** advertise it as covering every system in the world. The September 2026 *Unmanned Airspace Global Counter-UAS Systems Directory* reports **654 company entries** and **more than 1,000 system/product descriptions**; an evidence-checked complete global index would be a separate research product.

## Reading the system dashboards
- **Radar model/type/band**: for example AESA, FMCW, pulse-Doppler, electronically scanned, or rotating. "Not disclosed" means the public source has not established the variant-specific value. A receiver's RF monitoring band is **not** the radar transmitting band.
- **Detection range**: show target/RCS, configuration and manufacturer-vs-independent evidence whenever possible; **instrumented range** means the radar's measurement limit, not reliable small-drone detection reach.
- **Defeat reach**: gun, guided missile, laser, jammer, net drone or HPM must remain separate from sensor reach. Different target categories, terrain and atmospheric conditions can change results.
- **Capacity**: launched munitions, tracked targets and simultaneously defeated targets are separate claims.
- **Cost**: procurement/programme contract value is not an individual unit sale price. Nominal firing energy is not the lifecycle cost per successful engagement.
- **Maturity**: distinguish marketing demonstrations, field tests, orders, delivered systems and verified operations.

## Indian families — audit completed for current curated set

| Family | Origin / evidence | Sensor facts worth distinguishing |
|---|---|---|
| BEL/DRDO D4 | BEL product page and Indian MoD | Integrated radar, EO/IR and passive RF with laser and EW options; avoid confusing D4 with BEL's separate compact DDR |
| Zen ZADS | Zen product, listed-company 5 May 2026 disclosure, Janes | X-band 3D radar; official company pages cite 1–10 km for RCS-dependent targets and an upgraded **up to 20 km** configuration. Passive RF reported 70 MHz–12 GHz on current manufacturer page. Different variants must not be combined as one tested result |
| BBBS Vajra Sentinel | BBBS product; Janes procurement reporting | RF fingerprint/DF, not necessarily an onboard active radar; a 400 MHz–6 GHz receiver is reported for Scan-X in a specific generation |
| Grene Robotics Indrajaal | Manufacturer architecture and product modules | Distributed radar + EO/IR + acoustic + RF; company "4,000 km²" is a theoretical network footprint, **not** a single-radar detection radius |
| Bhargavastra | DRDO-collected press reporting, ANI July 2026 | Radar and EO/IR; reported radar up to 10 km and observed 2025 rocket tests. 6 km future missile statements are development targets, **not** confirmed deployed reach |
| BEL Drone Detection Radar | BEL official announcement | Separate low-power FMCW 360° sensor: vendor mini/micro/small classes 2/1/3 km respectively; not intrinsically a hard-kill system |

## Other additions
- **Sweden:** Saab mobile modular C-UAS, FMV award **SEK 2.6 billion** dated **2 April 2026**, delivery planned 2027–2028. Neither final radar fit nor per-unit price is disclosed.
- **Netherlands:** Robin IRIS 3D X-band FMCW radar, 360° / 60°, 29 kg, 5 km standard instrumented; optional LRM mode 12 km instrumented. A special-purpose **detect-only sensor**, not a weapon.
- **Spain:** Indra CROW with modular radar, RF/ESM, EO and AI-assisted C4; participation in Spanish ATLAS25 exercises documented October 2025.
- **Czech Republic:** RETIA ReGUARD X-band AESA 3D radar. The manufacturer brochure distinguishes **5 km rotating / 6 km sector** detection for Raven/Mavic3 from the 18 km instrumented range. Company also offers a broader ReCAS integrated C-UAS package; do not conflate the components.
- **United Kingdom:** Blighter A400 Ku-band FMCW e-scan radar, manufacturer's Phantom example over 3 km; larger target claimed up to 20 km. Detection only.

## Radar comparison: representative source-qualified examples

| System | Radar type | Published band | Published reach and meaning |
|---|---|---|---|
| Raytheon LIDS / KuRFS | AESA, 360° | Ku-band | No comparable public micro-UAV-specific range in linked RTX sheet |
| Rafael Drone Dome / RPS-42 / RPS-82 | AESA pulse-Doppler | RPS-42 S-band in radar technical reference; verify exact radar variant | Rafael brochure nominal 5 / 10 km (family-specific) |
| ASELSAN iHTAR 100 | Ku-band pulsed-Doppler, TWS | Ku-band | Radar target-qualified reach not in cited brochure; 360° / 30 rpm / 40° instant elevation |
| APS FIELDctrl Range | 3D MIMO FMCW | 9.7–10.0 GHz | 5 km at 0.01 m² RCS; 9 km at 0.1 m² RCS, vendor |
| RETIA ReGUARD | AESA 3D with rotating head | X-band | 5 km rotating / 6 km sector for Raven/Mavic3; 18 km instrumented, vendor |
| Robin IRIS | 3D FMCW micro-Doppler | X-band | 5 km standard/12 km LRM instrumented; drone detection depends on size and conditions |
| Zen ZADS | X-band 3D radar, mechanical scan in some configurations | X-band | Vendor generations differ: RCS-dependent 1–10 km and 2026 up to 20 km |
| BEL DDR | Low-power FMCW, 360° | Band undisclosed | Micro 1 km, mini 2 km, small 3 km, manufacturer |
| Blighter A400 | Ku-band FMCW electronic scan | Ku-band | DJI Phantom over 3 km in vendor example; larger targets up to 20 km |
| Systems without standard radar | RF monitoring, EO/IR, acoustic or externally cued | Not applicable | Do not invent a radar reach |

## Evidence-based top-three editorial shortlist

**This is not an objective ranking by interception probability.** No head-to-head matched data validates a universal winner. Selections differ by mission:
1. **Rheinmetall Skyranger 30/35 — military mobile close defence.** Integrated sensor/EO architecture; vendor 30 mm effective gun reach 3 km and 35 mm 4 km; optional missile integration; ammunition and collateral concerns.
2. **Rafael Drone Dome — integrated fixed-site layered security.** Public RPS-42/82 AESA radar and EO/RF architecture. Nominal 5/10 km radar-family claims. Non-kinetic limitations against RF-silent drones and restricted-spectrum civilian use.
3. **Fortem SkyDome / DroneHunter — controlled-site physical capture.** TrueView AESA tracking and autonomous net/drogue interception offer a non-broadcast alternative; constrained by weather, flight endurance, consumables and per-capture logistics.

## Verified videos added to the dataset
- Zen Technologies official Salwas ADS trial, 23 Oct 2025: https://www.youtube.com/watch?v=nEwX7VYUz9k
- ThePrint coverage of Bhargavastra reported May 2025 trials (independent editorial footage, not manufacturer): https://www.youtube.com/watch?v=Drw4YudSJfs
- Grene Robotics official demonstrations channel: https://www.youtube.com/channel/UCoWXg-wpEYJ0WE3xQ5cDgeA
- RETIA official ReGUARD product/video gallery: https://www.retia.eu/products/radars/reguard/

Videos are linked or embedded through official player URLs. They have **not been copied or rehosted** without media reuse rights. Not every family has a verified dedicated video or downloadable subsystem photographs.

## Primary and strong secondary sources

1. [BEL D4](https://bel-india.in/product/anti-drone-system/)
2. [BEL DDR](https://bel-india.in/news-bel/bel-develops-customisable-drone-detection-radar-with-360-degree-coverage/)
3. [Zen ADS](https://www.zentechnologies.com/anti-drone-system-counter-drone-cuas.php)
4. [Zen 5 May 2026 stock-exchange disclosure](https://nsearchives.nseindia.com/corporate/ZENTEC_05052026233418_PR_CL_signed.pdf)
5. [BBBS product catalogue](https://www.bigbangboom.com/products)
6. [Janes BBBS procurement](https://www.janes.com/defence-intelligence-insights/defence-news/defence/indian-army-iaf-to-procure-c-uas-with-soft-kill-capabilities)
7. [Indrajaal manufacturer](https://grenerobotics.com/indrajaal/)
8. [Bhargavastra July 2026 trial status](https://economictimes.indiatimes.com/news/defence/indigenous-bhargavastra-counter-drone-system-to-complete-internal-trials-in-2-3-months-says-sdal-chairman-satyanarayan-nuwal/articleshow/132605358.cms)
9. [Saab 2026 FMV award](https://www.saab.com/newsroom/press-releases/2026/saab-receives-order-for-counter-unmanned-aerial-system-from-sweden)
10. [Robin IRIS radar](https://www.robinradar.com/products/iris-radar)
11. [RETIA ReGUARD detailed datasheet](https://www.retia.eu/wp-content/uploads/2025/05/ReGuard.pdf)
12. [Indra CROW](https://defence.indragroup.com/en/systems-services/c-uas-system)
13. [Indra ATLAS25 test](https://www.indragroup.com/en/news/indra-showcases-counter-uas-system-capabilities-spanish-armys-atlas25-exercises)
14. [Blighter A400 datasheet](https://blighter.com/wp-content/uploads/2025/10/blighter-a400-series-radars-datasheet-bss-1311-MR.pdf)
15. [RTX KuRFS](https://www.rtx.com/raytheon/what-we-do/integrated-air-and-missile-defense/kurfs)
16. [Rafael Drone Dome brochure](https://www.rafael.co.il/wp-content/uploads/2024/09/drone-dome-counter-unmanned-aerial-system.pdf)
17. [Rheinmetall Skyranger](https://www.rheinmetall.com/en/products/air-defence-systems/mobile-air-defence-skyranger)
18. [ASELSAN iHTAR 100 brochure](https://wwwcdn.aselsan.com/api/file/SST_IHTAR_100_ENG.pdf)
19. [APS FIELDctrl Range](https://apsystems.tech/en/products/fieldctrl-range/)
20. [Fortem TrueView R20](https://fortemtech.com/products/trueview-r20/)
21. [Sept 2026 industry directory coverage statement](https://www.unmannedairspace.info/counter-uas-industry-directory/)
