# Newsletter directory design directions

The homepage combines the [Daily desk composition](design/daily-desk-reference.png) with the selected [Light slips refinement](design/light-slips-reference.png). The latter is the refined version of the first displayed calendar option: softer raspberry red, botanical mint, forest green, lighter title slips, wider gutters, and a compact active-weekday tab. Tall column dividers and the full-column selection wash are removed. A single jade slip marks the selected publication; keyboard focus has its own visible outline.

The illustrated masthead, DM Sans typography, near-bottom footer on short pages, and existing reading interactions remain. Weekday overviews use one selectable row per publication, with a book motif, name, and arrow instead of repeated View details captions. The reader typography scales with desktop width. A content-derived desktop minimum reserves space for the longest day and current profiles, keeping the footer stable during selection without stretching the visible slips.

The original composition is retained at [selected-reference.png](design/selected-reference.png), and the earlier [scroll-reading concept](design/scroll-reading-reference.png) records the accepted compact-profile behavior. The current design uses the same 33 publications, 85 reviewed issue links, original illustration assets, wide calendar, and two-link studio footer. Selecting a publication opens its compact profile in the right pane. Sticky headings and a viewport-aware reader retain one document scroll. See `design-qa.md` for comparison evidence and verification status.

The earlier five-direction gallery remains available at `/designs/`:

| Direction | Preview | Status |
| --- | --- | --- |
| 01 Illustrated calendar | `/designs/soft/` | Current selected implementation; the original route is retained |
| 02 Wine glass | `/designs/glass/` | Earlier study |
| 03 Weekly agenda | `/designs/agenda/` | Earlier study |
| 04 Bubble garden | `/designs/bubbles/` | Earlier study |
| 05 Mint canvas | `/designs/canvas/` | Earlier study |

The homepage and selected review route share `BaseLayout.astro`, `WeeklyCalendar.astro`, `ReadingHero.astro`, `SiteFooter.astro`, and `global.css`. Their interaction module is `weeklyCalendar.ts`. The other four studies use `DesignLayout.astro`, `DesignCalendar.astro`, `designs.css`, and the original `newsletterPreview.ts` popovers.

Review pages declare noindex,nofollow and are excluded from the sitemap. Embedded gallery previews use `?embed=1` to hide their review bar. Adding directory entries updates all studies from the same data. Run the type check and build after changes; browser verification should prioritize the selected homepage.
