# Illustrated newsletter calendar: design QA

Reviewed on 2026-11-05 using Product Design image-to-code and design-qa.

## Target and evidence

- Source: `docs/design/selected-reference.png`, the approved merged ImageGen prototype. The source is 1568 × 1003 pixels, with Wednesday selected.
- Implementation: `http://127.0.0.1:4321/?day=wednesday`, captured at 1568 × 1003 CSS pixels and devicePixelRatio 1. Final screenshot is also 1568 × 1003 pixels.
- Full comparison: `output/design-qa/comparison-final.png`. Source and implementation were placed together in one input at the same scale and reviewed visually.
- Focused comparison: `output/design-qa/detail-comparison.png`. Wednesday slips, selected-day typography, illustrations, reading links, and dividers were compared at readable size.
- Durable previews: `docs/design/desktop.webp` and `docs/design/mobile.webp`.
- Additional captures: `mobile-320.png`, `mobile-390.png`, `mobile-friday.png`, and `tablet-768.png` under ignored `output/design-qa/`.

The source showed eight publications and two Wednesday entries. The implemented directory intentionally contains 33 publications, including a third Wednesday entry. This user-requested content expansion changes the density and creates real scrolling; it is not missing visual fidelity. No numerical publication dates or invented subscription metrics were added to the page.

## Findings and fixes

### P2-01: Initial hero displaced the calendar and footer

The initial 1568px CSS viewport produced a 1553 × 1080 full-page capture because the taller hero introduced a vertical page scrollbar. The top calendar rule and footer were visibly below their positions in the source. Evidence: `comparison-before.png` and `desktop-before.png`.

The masthead and hero rhythm were adjusted, the headline received the source's inset alignment, and the board height was normalized. The final same-size capture fits the intended desktop frame and preserves the three horizontal sections. The final source/implementation comparison confirms the fix. Status: resolved.

### P2-02: Reading motifs and body text were undersized

The first implementation's book motifs were visibly smaller than the source, and the detail description cap was 18px. The final desktop motif slot is 112px and description typography scales between 17px and 20px. The title and hero tracking were also adjusted to preserve the editorial hierarchy. The focused final comparison confirms clear titles, readable descriptions, and coherent illustration scale. Status: resolved.

### P2-03: Narrow calendar columns needed a responsive constraint

Seven narrow columns at tablet widths could split long publication names awkwardly. Below 1270px, the detail panel moves below the calendar. Between 681px and 900px, the calendar retains a 900px internal width inside its own horizontal viewport. At 680px and below, the seven-button weekday picker replaces the small-card overview. This preserves complete titles in the reading list and prevents document-level overflow. Status: resolved.

### P2-04: Explicit day selection retained a previous preview state

After mouse or focus previews, clicking a weekday could retain a highlighted entry or an old reading position. Explicit day selection now clears preview highlighting and returns that day's list to its start. Mouse/focus previews still bring the relevant entry into view without moving the document. The final Wednesday capture has no stale highlight. Status: resolved.

## Required fidelity surfaces

| Surface | Result |
| --- | --- |
| Fonts and typography | Locally served Newsreader provides the editorial serif hierarchy; Manrope is used for short descriptions and utility actions. Font loading was verified in the browser. All original publication names remain complete, with natural two- or three-line wraps. Chinese names use system CJK fonts. |
| Spacing and layout rhythm | The masthead, split hero, teal rule, Monday-first seven-column board, selected-day panel, and footer follow the selected composition. Final source and implementation captures have identical dimensions. Fixed headings and contained scrolling preserve the frame as content grows. |
| Colors and tokens | White base, mint slips, seafoam reading art, dark teal rules, and red actions are preserved. Measured contrast: ink on mint 15.25:1; action red on white 5.39:1; white on selected red 4.58:1; teal on white 8.26:1. |
| Image quality and fidelity | All four motifs use generated raster assets sharing the reference's flat reading illustration direction. The hero retains the reader, plant, books, envelope, lamp, mug, and shelf. The assets are sharp optimized WebP images, with originals and exact prompts retained. No CSS illustration or placeholder art is used. |
| Copy and content | Brand, headline, studio signature, and exact footer slogan match the intended screen. The redundant Open full day button is absent. The 25 new descriptions are original summaries, and schedule evidence is retained separately. |
| Icons | The same unmodified Phosphor arrow-up-right icon is used for utility, reading, and footer links; CSS masks inherit the action color. Decorative illustrations have empty alternative text. |

## Interaction and responsive verification

- All seven weekday selections were checked. Daily counts are Monday 6, Tuesday 6, Wednesday 3, Thursday 5, Friday 7, Saturday 2, Sunday 4.
- ArrowRight advanced Monday to Tuesday; End selected Sunday. Buttons expose their pressed state and associated panel.
- A real mouse move over Import AI selected Monday and brought its introduction into the detail viewport. The document remained at scrollY 0.
- Both Friday areas were independently scrollable. The detail region reached a scrollTop of 1101px with a 1483px content height in the tested desktop state. The Friday calendar list also scrolled while its heading remained fixed.
- Phone selection and Friday overflow were checked at 390 × 844 and 320 × 844. All seven entries remain reachable, and no horizontal document overflow occurred.
- At 768 × 1024, Sunday was reachable inside the calendar's horizontal viewport; its scrollLeft reached 195px while the page stayed within the CSS viewport. The full daily list appeared below the overview.
- At 1320 × 1000, the side panel remained beside the calendar, with no document-level horizontal overflow.
- The Console reading action opened the real publication in a new tab. Its destination rendered the expected developer-tools newsletter.
- The suggestion action opened the existing Google Form, with the expected title and submission fields. No response was submitted.
- The current browser error/warning log was empty at final verification.
- Source invariants confirmed 33 unique publication IDs, 33 unique HTTPS destinations, a nonempty collection on every weekday, and 33 corresponding ItemList entries.

## Accessibility and acceptable differences

Controls use native links and buttons, meaningful labels, selected states, visible keyboard focus, live announcements for explicit day selection, and reduced-motion styling. Scroll regions are keyboard-focusable. The no-JavaScript mobile fallback exposes all publication links.

P3 follow-up only: the source is a generated image rather than a supplied font/vector system, so free-font glyph shapes and illustration strokes differ slightly. Some titles wrap into three lines in busy columns with visible scrollbars. They remain fully readable and untruncated. A future larger directory can revisit preview density without changing the weekday model. These are acceptable differences and do not block this implementation.

## Validation and delivery checklist

- [x] Selected reference opened and visually compared with actual browser captures
- [x] Full composition and focused reading-area comparisons reviewed
- [x] P0/P1/P2 findings resolved and recaptured
- [x] Desktop, tablet, phone, keyboard, pointer, and overflow states checked
- [x] Primary reading and suggestion destinations verified
- [x] `npm run check`: 26 files, zero errors, warnings, or hints
- [x] `npm run build`: eight static pages built successfully
- [x] `git diff --check`: passed
- [x] Preview retained locally; no production deployment performed

final result: passed
