# Newsletter directory design directions

Open `/designs/` in the local preview for the five-direction comparison gallery. Each thumbnail opens a working page. The review bar switches between directions using the same current publications, weekday data, suggestion form and publication previews.

| Direction | Preview | Approach |
| --- | --- | --- |
| 01 Soft cards | `/designs/soft/` | Open weekly columns, small padded cards and restrained depth |
| 02 Wine glass | `/designs/glass/` | Deep berry, translucent panels and mint lettering |
| 03 Weekly agenda | `/designs/agenda/` | A vertical agenda with rounded reading ribbons and a side masthead |
| 04 Bubble garden | `/designs/bubbles/` | Organic circular cards, open columns and a centered masthead |
| 05 Mint canvas | `/designs/canvas/` | One mint calendar surface, fine dividers and serif masthead typography |

These are review routes pending editorial selection. They declare `noindex,nofollow` and are excluded from the sitemap. The homepage retains its existing appearance.

`src/data/designDirections.ts` holds the review names and descriptions. `DesignCalendar.astro` renders the shared content, `DesignLayout.astro` provides review navigation, and `src/styles/designs.css` isolates all concept styling from the homepage. Embedded thumbnails use `?embed=1` to hide the review bar and retain an actual desktop layout at a scaled size.

`src/scripts/newsletterPreview.ts` supplies the existing hover, touch, keyboard and top-layer popover behavior to both the homepage and concepts. Each day's list scrolls independently when its content exceeds the available area. Smaller screens adapt the columns, agenda and bubbles to their available width.

Run `npm run check` and `npm run build` after changes. Review all five desktop layouts, narrow screens, reading links and preview dismissal. Save comparison screenshots in ignored `output/design-studies/`.
