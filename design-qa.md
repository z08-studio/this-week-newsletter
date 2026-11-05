# Light slips design QA

**Findings**

No actionable P0/P1/P2 findings remain. The implementation follows the selected first calendar concept and its accepted color refinement: lighter mint slips, wider day gutters, a compact raspberry weekday tab, forest-green accents, and one jade publication selection. The approved masthead and footer composition remain in place.

**Source, viewport, and comparisons**

- Exact accepted source: `docs/design/light-slips-reference.png`, 2048 x 768 pixels. This is the refined image displayed after the editor selected Light slips, not either alternative from the initial set.
- Implementation state: Friday with Software Lead Weekly selected, all 33 publications, and reviewed issues 727, 726, and 725. Local route: `/?day=friday&newsletter=software-lead-weekly`.
- Primary browser viewport: 2027 x 1600 CSS pixels, devicePixelRatio 1, in the in-app browser. The full-page screenshot is `output/light-slips/desktop-final.jpg`, 2012 x 1600 pixels; the export omits the stable scrollbar gutter.
- The visual target contains only the directory component. Its content crop is x56, y68, width1948, height630. The matching implementation capture starts at x32, y676.86 with the same 1948 x 630 dimensions. Both are unscaled, with no device frame or browser chrome. Header/footer remain governed by the previously accepted Daily desk composition.
- Full component comparison: `output/light-slips/comparison-final.png`, source above implementation. Both images were opened in this combined input.
- Focused reader comparison: `output/light-slips/reader-comparison-final.png`, source left, implementation right, equal 432 x 630 crops beginning at x1516 in each normalized component. This comparison was also opened and inspected.
- Durable evidence: `docs/design/calendar-detail.webp`, `desktop.webp`, `publication-detail.webp`, `mobile.webp`, and `scrolled.webp`. Working captures and measurements are under ignored `output/light-slips/`.

**Required fidelity surfaces**

- Fonts and typography: real, locally served variable DM Sans remains active, with system Chinese fallbacks. Calendar labels use 18–22px medium weight and natural wrapping; profile auxiliary text scales from practical mobile minima to 17–20px desktop values. The refined description fits two lines at the target width. A native typeface and complete names take precedence over inconsistent generated glyphs and line breaks.
- Spacing and layout rhythm: seven equal day tracks, 14–28px gutters, 56px minimum slips, 11px radii, and consistent 16px item gaps reproduce the lighter treatment. The selected weekday uses a compact rounded tab inside a full-width button. Tall vertical calendar rules and the whole-column selection wash are removed. A quiet horizontal rule spans the heading gutters. Original page scrolling, masthead spacing, and the near-bottom footer are retained.
- Colors and tokens: white, ink `#1c2c24`, forest green `#285f4c`, sage rules `#b3cdbe`, mint `#e8f3ec`, jade `#cfe6d8`, selection edge `#4b8169`, raspberry `#c94050`, and smaller red links `#be3546`. Browser-computed normal, selected, and weekday backgrounds match the intended tokens. No gradients, shadows, or new surfaces were added. Calculated contrast is 12.86:1 for ordinary slip text, 5.64:1 for selected text, 4.85:1 for white weekday-tab text, 5.55:1 for small red links, and 7.42:1 for the green focus outline against white. These checks do not imply a full accessibility certification.
- Image quality and assets: original raster reading illustrations and the real Phosphor arrows are reused, at natural aspect ratios. The book motif is the original artwork rather than a generated reinterpretation. No custom SVG/CSS illustration, placeholder, or screenshot-as-interface replacement was introduced. Original brighter red/seafoam artwork remains a deliberate identity choice alongside the softer interface colors.
- Copy and content: the 33 publication records, weekdays, descriptions, external links, and 85 reviewed issue URLs are unchanged. Calendar slips contain names only. The day overview, compact profile, original issues, suggestion form, Website, and GitHub retain their existing behavior and labels. There is no search, added microcopy, new metadata, or invented readership metric.

**Interaction, height, and responsive checks**

- `heights-final.json` records all 33 profiles and seven day overviews at each of two widths: 80 states in total. At 2027 x 1600 the directory stays 768px high, maximum reader height is 639px, footer top is 1463.52px, and footer bottom is 1600px. At 1501 x 1596 the directory remains 768px, maximum reader height is 690px, footer top is 1462.45px, and footer bottom is 1596px. All recorded selections preserve scrollY 0.
- The desktop minimum derives from the maximum number of publications on a day. It reserves sufficient reader space without stretching visible slips or painting tall empty column backgrounds. Longer future content may increase document height normally; stacked layouts remove the minimum.
- Tab focuses a real calendar button with a 2px outline and transparent border, avoiding a doubled selection ring. Enter on This Week in HN opens the correct profile and focuses its heading. Keyboard return focuses Friday. Home/End move the weekday picker to Monday/Sunday. Browser Back/Forward restores the day and publication.
- At 390 x 844, Friday exposes all seven reading rows. Software Lead Weekly opens with the three exact reviewed issue URLs. Keyboard focus and pointer activation were checked independently. The pointer preview has no unintended focus rectangle.
- At 320 x 844, the layout has a 305px content width, three reachable issue links, and no horizontal overflow. At 390px the corresponding content width is 375px. The reader is static and no calendar/reader element has an internal auto/scroll overflow.
- At 768 x 1024, seven compact weekday buttons replace the card lists. Friday and its list agree in the saved tablet capture. At 1100 x 900 the full calendar remains visible and the static reader stacks beneath it; at 1366 x 900 the side reader remains readable, with a 678px Rami profile inside the 768px directory. Neither width produces horizontal content overflow.
- At 3004 x 1596, every calendar name fits on one line and no horizontal content overflow is present.
- At 1501 x 760 and scrollY575, all seven weekday headings sit at y0. The contained reader ends at y586.44 and the footer begins at y626.44, leaving the intended gap. At 1501 x 480, the 685px Rami profile becomes static so all content is reachable through the document. The first native scroll attempt did not move the page; only the later verified End-key capture is accepted as scrolled evidence.
- Suggestion and studio link URLs remain intact. Application console errors/warnings in the reviewed log: none. Astro check: 27 files, zero errors/warnings/hints. Production build: eight static pages, successful. Diff whitespace check: passed.

**Comparison history**

1. `comparison-initial.png` identified P2 auxiliary reader text below the selected scale and a weekday tab narrower than the source. The blocked findings are retained in `output/light-slips/qa-initial.md`.
2. Increased responsive reader typography, title spacing, tab padding, and arrow size. `comparison-refined.png` then exposed a three-line description where the source used two lines, shifting the issue section downward. Calibrated description text to 19px with slight negative tracking and adjusted slip padding to prevent avoidable name wrapping.
3. Opened the final full and focused comparisons. Type hierarchy, two-line description, selected states, overall spacing, and palette now follow the target. Height verification identified a small reader-driven directory increase at a narrower desktop width; increasing the data-derived minimum by 8px removes it. Rechecked all 80 states with the final 768px minimum and inspected final desktop, mobile, tablet, and scrolled evidence.

**Open questions and intentional differences**

- The bitmap has slightly unequal column widths and inconsistent repeated row heights. The responsive implementation uses equal tracks and consistent spacing rather than encoding those generated irregularities.
- Dense Discovery and other names can wrap differently at intermediate widths. Complete text, comfortable padding, and natural wrapping take precedence over forced line breaks from a raster image.
- The selected source is desktop-only. Phone and tablet behavior follows the established responsive flow and was verified directly; no unavailable mobile reference is claimed.

**Implementation checklist**

- [x] Preserve the exact refined image and the existing page composition.
- [x] Apply the softer palette, lighter slips, compact weekday tab, and distinct focus/selection treatment.
- [x] Keep all data, real illustrations, icons, and reading interactions.
- [x] Compare full and focused normalized evidence, resolve P2 drift, and verify stable heights.
- [x] Check keyboard/history, phones/tablets/laptops, wide and short screens, console output, and the production build.

**Follow-up polish**

Only expected P3 differences remain: rasterized reference glyphs, original-art colors/proportions, and generated irregularities in repeated spacing. Recheck heights when adding longer real content.

final result: passed
