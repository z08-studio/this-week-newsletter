# Newsletter browsing: annotation revision QA

Reviewed on 2026-11-05. Scope: the five browser comments on the existing illustrated homepage. The approved illustration, palette, masthead, directory content, and unrelated review studies remain intact.

## Visual target and evidence

The source for this scoped revision is the editor's annotated current page, captured before edits as `output/annotation-review/before.png`. The final day overview is `after-day.png`, and the publication detail state is `after-detail.png` in the same folder. Before and after were captured with Thursday selected at a 1501 × 1596 CSS viewport. Both emitted screenshots are exactly 1501 × 1596 pixels. The browser initially reported DPR 2, but the screenshot API emitted CSS-size captures; the comparison uses those equal-pixel images without density scaling.

The before/after captures were placed together in `output/annotation-review/comparison.png` and visually reviewed in one input. The expanded calendar and footer changes are intentional differences requested by the editor, rather than drift from the original eight-publication mock. The before capture retains the user's old independent-list scroll positions; the after view exposes all entries because those scroll regions were removed.

Additional evidence:

- `wide-day.png` and `wide-detail.png`: 3004 × 1596 viewport, DPR 1, 2400px content width.
- `mobile-detail.png`: 390 × 844 viewport, publication detail and all three issue links.
- `mobile-320.png`: long publication name and its issue links at 320 × 844.
- `tablet-day.png`: weekday picker and natural reading list at 768 × 1024.
- Durable previews: `docs/design/desktop.webp`, `docs/design/publication-detail.webp`, and `docs/design/mobile.webp`.

## Requested changes and results

| Browser comment | Implemented and checked |
| --- | --- |
| Remove the footer slogan | `.footer-slogan` is absent from the page. The footer has only the studio signature and navigation. |
| Remove X | The footer navigation contains exactly Website and GitHub. The unused studio X configuration was removed. |
| Default to the day list; select a publication for details | Calendar cards, list titles, and View details actions select a publication inside the reading panel. Details include the description, usual day, language, topics, original website, verified past issues, and archive where available. A clear Back to weekday action restores the day list. |
| Give names more room | Maximum page width increased from 1536px to 2400px. The calendar gets flexible remaining width beside a 340–480px reading column. All 33 calendar names were measured as one line at the reviewed 3004px viewport. At smaller widths, complete names wrap naturally without truncation. |
| Remove the nested scrolling | Calendar columns and reading lists have natural height and visible overflow. Every Friday entry is rendered in full. No internal vertical or horizontal scroll region remains in the main directory; the document itself scrolls. |

## Required fidelity surfaces

- **Fonts and typography:** Newsreader and Manrope remain locally served. Calendar title sizes were tuned to 19–23px for fuller names. Headline and masthead hierarchy remain unchanged. Detail titles and short facts remain readable at phone widths; issue dates are separated from their titles in both layout and accessible text.
- **Spacing and layout:** The same three-part illustrated composition is retained. The wider calendar, natural row growth, two-column footer, and reading-panel state are the requested changes. At 1501px and 3004px there is no document-level horizontal overflow. At 1000px and below the compact weekday picker avoids compressed seven-column titles.
- **Colors and tokens:** White, mint, dark teal, and red tokens remain unchanged. Selected cards receive the existing teal border and mint hover treatment. Existing measured text contrast remains valid; no low-contrast new palette was introduced.
- **Image quality and assets:** The original four optimized WebP reading illustrations are reused without stretching or substitute art. The Back action uses an unmodified Phosphor arrow-left icon with the bundled license.
- **Copy and content:** The slogan and X link are removed only from the requested footer. All 33 publication records remain. Descriptions and publication facts appear in the selected publication view. The day overview stays concise. Issue links are titled Past issues, avoiding a claim that each selection is the newest edition.
- **Icons:** Existing external-link arrows are retained. The real library back arrow matches their stroke family. Decorative book images remain hidden from assistive technology.

## Interaction verification

- Clicking Console in the Thursday calendar showed only its publication panel and selected its mint card; no new browser tab was opened by this selection.
- The Console panel contained three real dated issue links and its archive link. Clicking the first issue opened the real Console newsletter for October 29, 2026 in a new tab; its article title and content were visibly verified. The temporary tab was closed without affecting the user's other tab.
- Back to Thursday restored the day overview, cleared the selected publication, and removed the `newsletter` query parameter.
- Browser Back restored Console and Forward restored the Thursday list. Reloading a detail URL also restored the same Console panel with all three links.
- Hovering a Monday card left Thursday selected. Hover and focus do not change the reading view.
- Enter on This Week in Skills opened its details and focused its heading. Enter on Back to Wednesday restored the list and focused that day's heading. The publication correctly showed its single verified issue rather than fabricated additional entries.
- The Dense Discovery panel exposed its official archive without invented individual issue links.
- At 320px, Software Lead Weekly and its three links fit without horizontal document overflow. At 390px, Console's complete detail view and archive fit the page naturally. At 768px, the weekday picker and five Thursday entries remained usable without nested scrolling.
- At 3004px, all seven calendar lists had `overflow-y: visible` and equal client/content heights. All 33 card labels were measured as single-line text.
- Current browser error/warning log: empty.

## Issue-link verification

The reviewed snapshot has 85 distinct HTTPS issue destinations with correct publication ownership or the publisher's explicit Mailchimp/Buttondown archive. All 85 returned HTTP 200: 79 accepted HEAD checks; six required GET. Generic RSS utility pages, sponsored tool destinations, XML issue documents, and a preview hosting domain were replaced with true reader-facing issue URLs. See `docs/issue-links.md` for sources and exceptions.

No runtime fetches, scraping service, authentication flow, automatic directory import, or production deployment was added. The no-JavaScript fallback provides the complete set of original publication links grouped by weekday.

## Validation

- `npm run check`: 27 files, no errors, warnings, or hints.
- `npm run build`: eight static pages built successfully.
- `git diff --check`: passed.
- Content invariants: 33 publication mappings, 85 unique HTTPS issue pages, no more than three per publication, no XML destinations, and verified owner-domain/platform associations.
- No unresolved P0/P1/P2 findings. Smaller viewports may still wrap long titles; this is an intentional responsive fallback that preserves the full name.

final result: passed
