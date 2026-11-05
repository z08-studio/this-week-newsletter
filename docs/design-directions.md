# Newsletter directory design directions

The homepage follows the second displayed [Daily desk concept](design/daily-desk-reference.png) from the footer and typography exploration. It retains the illustrated calendar and mint title slips, uses DM Sans throughout, gives the masthead a clearer type hierarchy, and places the footer near the viewport bottom when content is short. Weekday overviews use a single selectable row per publication, with a book motif, name, and arrow instead of repeated View details captions.

The original composition is retained at [selected-reference.png](design/selected-reference.png), and the earlier [scroll-reading concept](design/scroll-reading-reference.png) records the accepted compact-profile behavior. Both remain historical references. The current design uses the same 33 publications, 85 reviewed issue links, original illustration assets, wide calendar, and two-link studio footer. Selecting a publication opens its compact profile in the right pane. Sticky headings and a viewport-aware reader retain one document scroll. See `design-qa.md` for comparison evidence and verification status.

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
