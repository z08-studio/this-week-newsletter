# Maintained newsletter directory design

The homepage combines the [Daily desk composition](design/daily-desk-reference.png) with the approved [Light slips calendar](design/light-slips-reference.png): DM Sans, a white surface, raspberry red, botanical mint, forest-green accents, and original reading illustrations.

The calendar contains seven equal weekday tracks, lightweight rounded title slips, wider gutters, and a compact active-day tab. One jade slip identifies an open publication; keyboard focus has an independent visible outline. The reading pane defaults to a day list and switches to a compact publication profile with up to three reviewed issue links. Both areas use normal document scrolling, with sticky behavior only when the available viewport permits it. The footer sits near the bottom of short pages and follows longer content naturally.

## Source map

| File | Responsibility |
| --- | --- |
| `src/layouts/BaseLayout.astro` | Shared document, metadata, header, and footer |
| `src/components/WeeklyCalendar.astro` | Calendar, day lists, and publication profiles |
| `src/components/ReadingHero.astro` | Approved masthead and illustration |
| `src/components/SiteFooter.astro` | Studio signature and links |
| `src/scripts/weeklyCalendar.ts` | Selection, keyboard navigation, history, and sticky-reader sizing |
| `src/styles/global.css` | Design tokens, states, and responsive layout |

The early five-direction gallery, alternate layouts, and popover implementation were retired after design approval. Legacy addresses at `/designs/` and its five named studies redirect to `/`. Retired implementations and visual references remain recoverable in Git history.

Publication records and reviewed issue links remain separate from presentation. The approved references, current screenshots, asset originals/prompts, and latest QA evidence are retained. See [design QA](../design-qa.md) and [maintenance](maintenance.md) for verification and update instructions.
