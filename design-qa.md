# Daily desk design QA

**Findings**

No actionable P0/P1/P2 findings remain. The implementation follows the second displayed footer/typography concept selected by the editor: DM Sans, a stronger masthead, whole-row publication controls, and a footer at the bottom of short pages without covering long content.

**Source, viewport, and comparisons**

- Exact selected source: `docs/design/daily-desk-reference.png`, 1214 x 1295 pixels, the second displayed image from the latest typography exploration.
- Matching state: Thursday day overview, white theme, all 33 publications, no selected publication.
- Final browser capture: `output/daily-desk/desktop-final.png`, 1501 x 1596 pixels at a 1501 x 1596 CSS viewport and devicePixelRatio 1, captured in the in-app browser.
- Source normalization: proportional containment in a 1501 x 1596 white frame, with approximately 2px horizontal padding. No stretching or device chrome. The generated source is a visual concept, not a literal CSS specification.
- Full-view evidence, opened together: `output/daily-desk/comparison-final.png`.
- Focused reader evidence: `output/daily-desk/reader-comparison.png`, equal 380 x 550 regions at x1090, y575 in the normalized source and implementation. Type, rows, motifs, arrows, and separators are readable at this size.
- Responsive evidence: `mobile-day.png`, `mobile-detail.png`, `mobile-320.png`, `mobile-comparison.png`, and `tablet-final.png` under `output/daily-desk/`.
- Other evidence: `desktop-detail-final.png`, `scroll-desktop.png`, `short-screen.png`, and `wide.png` in the same folder.
- Durable previews: `docs/design/desktop.webp`, `publication-detail.webp`, `mobile.webp`, and `scrolled.webp`.

**Required fidelity surfaces**

- Typography: the stylesheet and preload use the official local variable DM Sans WOFF2, weights 400–800. The asset responds successfully as `font/woff2`; browser-computed styles specify DM Sans. Display, weekday, label, profile, and footer type now share this sans family, with system Chinese fallbacks. The desktop headline is two lines. Actual glyphs and reviewed names take precedence over generated text approximations.
- Layout rhythm: header, hero, separator, calendar, lower breathing space, and footer follow the selected composition. A 100svh minimum-height body and flex-column shell place the footer at the bottom of short pages. Bounded masthead gaps shrink on shorter screens. Long content grows the document normally; cards and calendar rules are not stretched to fill spare height.
- Colors: existing white, ink, teal, mint, and red tokens remain. Selection stays red/white; title slips remain mint. No new section panels, gradients, badges, metrics, search, or filters were introduced.
- Assets: original reading illustrations and actual Phosphor arrows are reused at their natural aspect ratios. The original hero asset is flatter than its generated reinterpretation; retaining it preserves the established identity. Decorative imagery cannot intercept the suggestion link. No placeholder, CSS art, or screenshot-as-interface substitute was introduced.
- Content: all 33 publication records and 85 reviewed issue URLs are unchanged. Each overview row is one accessible button with the original name, motif, and arrow. Repeated visible View details captions are removed; their accessible action labels remain. Compact profiles and up to three real past issues remain available. Footer still contains only studio, Website, and GitHub.

**Completed checks**

- All 33 profiles and seven day overviews were selected. `heights-desktop.json` records 40 completed states: calendar height 752px, maximum reader height 706px, and absolute footer bottom exactly 1596px in every state.
- Whole-row Console activation opens the correct profile and three original issue URLs. Keyboard activation focuses the resulting heading; return focuses the weekday heading. Browser Back/Forward restores the profile and overview. Data Elixir was also checked independently.
- At 390 x 844 and 320 x 844, Friday retains seven entries, Software Lead Weekly opens with three issue links, and return restores Friday. Document widths are 375px and 305px with the stable gutter; no horizontal overflow or nested list scrolling was found. The focused heading outline in the mobile evidence is intentional keyboard feedback.
- At 768 x 1024, the seven weekday buttons replace the hidden calendar-card lists. Home selects Monday. The final tablet capture was taken after the color transition settled; selected Thursday, its label, and its content agree.
- At 1501 x 760, normal scrolling pins weekday headings at y0 and contains the reader before the footer: reader bottom y586.98, footer top y626.98. The roughly 1392px document scrolls naturally.
- At 1501 x 480, the 597px Rami profile becomes static, keeping its content reachable through the document.
- At 3004 x 1596, no horizontal overflow or wrapped calendar name was found. The approximately 1614px composition ends with the footer at the document bottom.
- The suggestion action's lower edge resolves to the actual link; its existing form URL is preserved. Application console errors/warnings: none in the reviewed log.
- Astro check: 27 files, zero errors/warnings/hints. Build: eight static pages, successful. Diff whitespace check: passed.

The initial preview tab stopped responding during an early batch. The completed checks above ran in a fresh tab in the same in-app browser. No separate Playwright CLI browser was needed.

**Comparison history**

1. `comparison-initial.png` versus `desktop-initial.png`: P2 display and utility text were visibly undersized. Footer placement and grid alignment already matched. Initial result was blocked, recorded in `qa-initial.md`.
2. Increased the actual DM Sans display, wordmark, suggestion action, labels, and footer sizes. Re-captured `desktop-refined.png`; reviewed `comparison-refined.png` and the focused reader comparison.
3. Reviewed the final full-view comparison, completed desktop states, mobile detail comparison, and stable tablet capture. The hierarchy and footer composition now match the intended direction, with no remaining P0/P1/P2 finding. No additional visual changes followed this final comparison.

**Open questions and intentional differences**

- The generated source outlines Console while showing a day overview. The implementation keeps those states consistent: no publication outline in a day overview, and an outline only for an open publication profile.
- Native DM Sans, the original artwork, full reviewed text, natural wrapping, and accessible controls take precedence over inconsistent generated glyphs or illustration proportions.
- The selected image is desktop-only. Phone/tablet behavior was verified using the established responsive flow, not compared to an unavailable mobile mock.

**Implementation checklist**

- [x] Resolve the exact second displayed target and retain its source.
- [x] Bundle the real font/license, update preload/credits, and reuse original imagery.
- [x] Implement the footer shell and spacing without overlays or internal scrolling.
- [x] Verify day/profile selection, links, history, keyboard focus, and responsive flow.
- [x] Inspect full and focused comparisons, check the completed height states, and build.

**Follow-up polish**

Minor glyph and original-art proportions differ from the generated bitmap as expected P3 differences. No additional polish is required for handoff. Recheck heights and responsive behavior when adding longer content.

final result: passed
