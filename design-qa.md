# Scroll-reading implementation QA

**Findings**

No actionable P0, P1, or P2 findings remain in the reviewed homepage states. The implementation follows the first displayed scroll-reading concept selected by the editor: compact publication profiles, weekday headings that stay visible, one document scroll, and a reader that stops before the footer.

**Visual truth and normalization**

- Selected source: `docs/design/scroll-reading-reference.png`, the exact first displayed ImageGen result, 1448 x 1086 pixels. The Chinese callouts and lower inset are presentation notes, not website content.
- Main source UI frame: x199, y111, 1046 x 661 pixels. The board does not specify a literal CSS viewport or device density. The frame was proportionally normalized to 1486 x 939 pixels; it was not stretched to match the implementation height.
- Implementation: `output/scroll-reading/desktop-final.png`, 1486 x 1001 pixels, captured in the in-app browser at a 1501 x 900 CSS viewport and devicePixelRatio 1. The browser capture excludes the reserved 15px document gutter. Full-page capture includes content below the viewport.
- Matching state: Monday selected, R Weekly open, document scroll at zero. All actual publication names, descriptions, issue titles, dates, and destinations are retained. Illustrative issue-title abbreviations in the generated mock are not substituted for reviewed source data.
- Full-view comparison, opened together in one image: `output/scroll-reading/comparison-final.png`. Both views have equal normalized widths. The mock's surrounding frame and external annotation marks are not implemented.
- Focused reader comparison: `output/scroll-reading/reader-comparison-final.png`. Source region x987, y298, 230 x 396 pixels, proportionally resized to 345px wide; actual reader region x1117, y286, 345 x 512 pixels. This makes type hierarchy, metadata, actions, issue rows, and icons readable at inspection size.
- Durable actual previews: `docs/design/publication-detail.webp`, `docs/design/desktop.webp`, `docs/design/mobile.webp`, and `docs/design/scrolled.webp`.

**Required fidelity surfaces**

- Fonts and typography: existing locally served Newsreader and Manrope remain in use, with system Chinese fallbacks. The large single-line desktop headline, smaller inline book motif, red profile title, compact metadata, and restrained issue typography match the selected hierarchy. Calendar names wrap naturally without truncation. At 3004px, all 33 names occupy a single line. Actual reviewed issue labels can wrap where the generated mock used shorter illustrative wording; complete titles remain accessible and available on hover.
- Spacing and layout: the wide seven-column calendar and constrained reading column remain. The hero is shorter, title slips have a 60px minimum target, and the reader no longer contains a large standalone illustration or a tall definition list. The current 33 profiles and seven day lists remain within the calendar height at the two tested desktop widths, keeping the footer stable within subpixel font rounding. No artificial equal-height reading surface or inner scrollbar was added.
- Colors and tokens: white, ink, teal, pale mint, and red tokens are preserved. Selected weekdays use solid red, selected cards retain mint and a thin teal outline, and external actions retain red/teal. No gradients, new surfaces, or extra shadows were introduced.
- Image quality and assets: all four existing reading illustrations, actual Phosphor arrows, and the local fonts are reused. Raster imagery keeps its aspect ratio. The hero is positioned clear of the suggestion action, and the header has its own stacking order so the decorative image cannot intercept clicks. No CSS artwork, placeholder imagery, or screenshot-as-interface substitute was used.
- Copy and content: all 33 publications and 85 reviewed issue URLs remain unchanged. The reader still defaults to the selected day's list, shows real details on selection, and exposes a return control. Repeated publication-name prefixes are omitted only from visible issue labels. Footer remains studio, Website, and GitHub; removed slogan and X stay absent.

**Interaction and viewport evidence**

- Desktop 1501 x 900: every publication and every weekday was selected through real controls. `heights-refined.json` records the 40 states. Profiles and lists stay below the calendar's measured height; the footer remains at approximately y895.3, with less than 1px font-rounding difference after reload.
- Wide desktop 3004 x 1596: the same 40 states were checked. `heights-wide.json` records the result. Calendar height is 573px, and footer y971.9375 is unchanged across all selections. No calendar name wraps. Evidence: `wide-day.png` and `wide-detail.png`.
- Desktop 1501 x 700: an ordinary mouse-wheel scroll pins weekday headings at y0 and the reader at y24. Calendar lists, day lists, and the reader have no scrollable inner container. Evidence: `scrolled-700.png`.
- Footer boundary at 1501 x 600: the reader moves up with its containing section rather than covering the footer. Its bottom is y466.8 and the footer starts at y494.8. Evidence: `footer-stop.png`.
- Direct pointer selection after scrolling: R Weekly to Console preserves document scrollY exactly at 400.5. The new profile does not move the footer. Semantic locator actions may themselves scroll a control into view, so pointer behavior was checked with ordinary mouse input rather than inferred from those locator scrolls.
- Short desktop 1501 x 480: the 574px Rami profile becomes static and all three issue links remain in normal document flow. Evidence: `short-screen.png`.
- Mobile 390 x 844 and 320 x 844: document widths are 375px and 305px respectively, with the reserved gutter. No horizontal overflow or nested scroller was found. Friday shows all seven entries. Software Lead Weekly opens with three issue links, and returning restores Friday. Keyboard activation focuses the resulting publication heading. Final mobile evidence: `mobile-final.png`; narrow-width evidence: `mobile-320.png`.
- Tablet 768 x 1024: the seven weekday buttons replace hidden card lists, Friday remains complete, and the reader is static. Evidence: `tablet-768.png`.
- Browser Back/Forward restores Console and the Thursday list. Reload restores the R Weekly deep link. Keyboard return focuses the weekday heading. Existing external URLs and form destination remain unchanged.
- Both the center and lower edge of the suggestion button resolve to the actual button after the stacking fix.
- Browser application errors/warnings: none in the reviewed log. `npm run check` reports 27 files with zero errors, warnings, or hints. `npm run build` successfully builds all eight static pages. `git diff --check` passes.

All working evidence above is under ignored `output/scroll-reading/` unless otherwise specified.

**Comparison history**

1. Initial comparison: `comparison-initial.png`, with the actual render in `detail-initial.png`. P2: excess masthead height and an undersized headline shifted the calendar down relative to the source. P2: tall slips and overview rows could let Friday move the footer. Result was blocked, recorded in `qa-initial.md`.
2. First refinement: overlapping hero placement, appropriate headline scale, tighter slips, inline profile metadata, and shorter issue labels corrected the main density drift. Re-capture: `detail-refined.png`; full and focused comparisons: `comparison-refined.png` and `reader-comparison.png`.
3. Targeted follow-up: P2: the wide Friday overview still measured 604px against a 573px calendar. Reducing desktop row padding brings all day lists within the calendar. P1: the decorative image could intercept the lower edge of the suggestion button despite its visible appearance. A header stacking context and noninteractive decoration resolve the hit area. P2: the lamp crowded the action visually; the illustration now sits lower without changing the calendar's position. The final full-view capture and pointer hit checks verify these fixes. Wrapped mobile topic metadata also starts cleanly without an orphan divider.
4. Final review: `comparison-final.png`, focused reader comparison, the final phone image, and the 40-state measurements show no actionable P0/P1/P2 issue. No further visual fixes were made after this final comparison.

**Open questions and limits**

- The selected visual is a concept board, not a pixel-specified Figma frame. Actual source text and accessible target sizes take precedence over generated text approximations.
- Future longer descriptions or a larger day list may naturally increase page height. The reader falls back to document flow when too tall; publication additions should rerun the height and responsive checks.
- Production deployment and unrelated historical design studies were outside this change. The existing review route shares the updated calendar; its review-bar offset is supported but was not separately exercised in this pass.

**Implementation checklist**

- [x] Preserve weekday discovery, publication details, issue links, studio footer, and source assets.
- [x] Compact the reader and calendar without hiding content.
- [x] Verify sticky headings, reader containment, short-screen fallback, and pointer position stability.
- [x] Verify all current desktop selection heights, mobile/tablet navigation, history, focus, and form hit areas.
- [x] Complete the normalized full-view and focused comparisons, type check, and production build.

**Follow-up polish**

The generated mock uses approximate glyph shapes and shorter illustrative issue labels; native fonts and reviewed titles produce minor residual wrapping differences. No additional polish is required before preview handoff.

final result: passed
