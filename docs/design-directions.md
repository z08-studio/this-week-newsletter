# Newsletter directory design directions

The homepage implements the selected Product Design reference: the third illustrated concept's weekly calendar and side panel, combined with the first concept's pale mint rounded title slips. The redundant Open full day link was removed after discussion. Following the editor’s browser annotations, the reading panel defaults to the day list and switches to a publication detail view on click. Both the calendar and reading panel grow naturally with the document; there is no internal scrolling.

The source is [selected-reference.png](design/selected-reference.png). The latest implementation adds the real expanded collection, so more titles and a third Wednesday publication appear compared with the original eight-title mock. The illustrations and editorial visual language are preserved. The page is wider, card labels wrap less, and the footer contains only the studio signature and two studio links. See `design-qa.md` for the comparison and interaction checks.

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
