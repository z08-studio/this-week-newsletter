# Newsletter directory design directions

The homepage implements the third illustrated concept's weekly calendar and side panel, combined with the first concept's pale mint rounded title slips. The editor then selected the first [scroll-reading concept](design/scroll-reading-reference.png): compact profiles, sticky weekday headings, and a reading panel that stays in view when it fits the desktop viewport. The panel defaults to a day list and switches to publication details on click. There is only normal document scrolling, with no internal list scrollbars.

The original composition is retained at [selected-reference.png](design/selected-reference.png). The scroll-reading reference includes the real 33-publication collection. Its Chinese annotations and scrolled-state inset explain the interaction; they are presentation notes rather than website content. Existing illustrations, local fonts, publication data, reading links, the wide page, and the two-link studio footer are preserved. See `design-qa.md` for the normalized source comparison and interaction checks.

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
