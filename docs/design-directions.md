# Maintained newsletter directory design

The homepage combines the [Daily desk composition](design/daily-desk-reference.png) with the approved [Light slips calendar](design/light-slips-reference.png): DM Sans, a white surface, raspberry red, botanical mint, forest-green accents, and original reading illustrations.

The current local candidate retains the left/right structure and turns the left-hand weekday columns into seven horizontal rows. The right-hand pane stays visible for day lists and publication details. Typography, palette, original artwork, and footer identity are retained, with a smaller masthead and tighter row spacing to increase information density. This candidate is awaiting local review and has not been deployed. See [compact horizontal rows](horizontal-rails-review.md).

Each row has a weekday label and draggable name-only mint cards. Complete names remain on one line as the rail scrolls. Navigation controls and edge fades appear only for overflowing rows. The right pane changes content without overlaying or hiding the calendar. Short desktop readers may stick; smaller screens use a stacked layout and ordinary document scrolling.

## Source map

| File | Responsibility |
| --- | --- |
| `src/layouts/BaseLayout.astro` | Shared document, metadata, header, and footer |
| `src/components/WeeklyCalendar.astro` | Weekday rows and horizontal publication rails |
| `src/components/NewsletterReader.astro` | Persistent day lists and publication profiles |
| `src/components/ReadingHero.astro` | Approved masthead and illustration |
| `src/components/SiteFooter.astro` | Studio signature and links |
| `src/scripts/weeklyCalendar.ts` | Reader selection, keyboard navigation, history, and sticky sizing |
| `src/scripts/horizontalRails.ts` | Independent scrolling, pointer intent, keyboard navigation, and overflow controls |
| `src/styles/global.css` | Design tokens, states, and responsive layout |

The early five-direction gallery, alternate layouts, and popover implementation were retired after design approval. Legacy addresses at `/designs/` and its five named studies redirect to `/`. Retired implementations and visual references remain recoverable in Git history.

Publication records and reviewed issue links remain separate from presentation. The approved references, current screenshots, asset originals/prompts, and latest QA evidence are retained. See [design QA](../design-qa.md) and [maintenance](maintenance.md) for verification and update instructions.
