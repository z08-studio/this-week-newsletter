# Directory maintenance

## Local development

Use Node.js 24 LTS and npm:

```sh
npm ci
npm run dev
npm run check
npm run build
```

The existing Astro project builds a static site into `dist/`. The development server listens on loopback at port 4321. Keep this project and its production build; there is no new hosting runtime or backend.

## Publications and weekdays

`src/data/newsletters.ts` defines the shared record type, the five studio publications, the original collected publications, and the assembled directory. `src/data/collectedNewsletters.ts` contains 25 additional manually researched entries. `publicationDay` uses Sunday = 0 through Saturday = 6; `calendarOrder` explicitly renders Monday first. Editorial order inside each day follows the assembled array, with studio titles first.

Required fields include the stable ID, public name, short original description, publication URL, language, topics, ownership, usual weekday, and source URL. New collected records also store `scheduleCheckedAt`, `scheduleBasis`, and a source note. See [schedule research](newsletter-sources.md) for the current evidence and editorial policy. The calendar describes the publisher's usual local weekday, not an issue-level promise or a conversion to the reader's time zone. Do not silently move the free edition to a premium release day.

AI publishes Monday, Obsidian Tuesday, Skills Wednesday, Crypto Thursday, and HN Friday. Existing studio schedules remain editorially controlled. The original external publications are Tw93's Monday digest, the Wednesday Rust digest, and Ruan Yifeng's Friday digest. Recheck public schedules before changing them. Never invent a fixed day for a daily, paused, monthly, or irregular publication simply to fill the calendar.

## Reading interactions

The current checkout contains a compact horizontal-row candidate awaiting the editor's local review. Production remains on the previously approved layout. See [the candidate review](horizontal-rails-review.md).

`WeeklyCalendar.astro` renders seven weekday rows beside a persistent reading pane. Each row has a weekday button and one horizontal rail of name-only mint cards. Complete labels remain on one line; overflow stays within that row. Native touch and trackpad scrolling, mouse dragging, and previous/next controls expose additional titles. Controls and subtle edge fades appear only when needed, and visible rail scrollbars are omitted.

`horizontalRails.ts` handles overflow, navigation, and pointer intent. Only horizontal mouse movement past a threshold captures the pointer. A drag suppresses the resulting pointer click so it cannot select a publication. Touch keeps native scrolling and pinch zoom. Left/Right and Home/End navigate cards; Up/Down and Home/End navigate and select weekdays. Enter or Space activates a focused control.

`NewsletterReader.astro` renders all seven day overviews and 33 publication profiles in the right-hand pane. A day overview is shown by default; clicking a card or a day-list entry shows that publication's description, usual day, language, topics, official website, and up to three reviewed issues. Back to the weekday returns to the list. There is no drawer, modal overlay, background scroll lock, or close button.

The denser composition uses a compact masthead, 48px title cards, 8px card gaps, short weekday rows, and a 580px desktop directory minimum. At a 1501 × 1000 CSS viewport, all 40 checked reading states retain that directory height and the same footer position. Content can grow naturally when longer future records require it. The page retains its flex shell, keeping the footer near the bottom of short pages without fixing it over content.

The right pane is 300–380px wide with a thin green divider. A resize observer keeps it sticky only above 1000px when the whole reader fits between two 20px viewport allowances. Taller content remains in normal document flow. At 1000px and below, the reader stacks beneath the seven rows. At 680px and below, weekday labels and navigation sit above each full-width rail. Phone selection reveals the reader when it is offscreen and respects reduced motion. The no-JavaScript fallback exposes direct publication links grouped by day.

`weeklyCalendar.ts` preserves shared day/publication URLs, browser Back/Forward, accessible selection announcements, and keyboard focus. External links retain `noopener noreferrer`. The existing consent-gated selection and outbound analytics identifiers remain unchanged; dragging does not select a publication or emit a selection event. All descriptions and reviewed issue links remain rendered in HTML.

`src/data/recentIssues.json` is a manually reviewed snapshot of 86 real issue links for 33 publications. It is typed through `newsletterArchives.ts` and read at build time, so the page and production build make no live publisher API requests. See [issue-link maintenance](issue-links.md) for the sources, exceptions, and refresh procedure. New directory records can omit this optional metadata and still show their details and public website. Never reconstruct issue URLs from issue numbers or copy sponsored tool links from a mixed RSS feed.

## Suggestion form

Public form: [Add your newsletter](https://docs.google.com/forms/d/e/1FAIpQLScNKI_gcJOtPcRBZZ4xB-IUREZraY1j6dz1tQyKn3MOBTl4Ag/viewform).

The form's [editor URL](https://docs.google.com/forms/d/16Gh3FiYaXB-RyWY1tZ22dJakCk5OpiO0I0WPCU14MiM/edit) requires access through the maintainer's Google account. Do not expose edit permissions or submitted responses.

The form includes newsletter name, public URL, one-sentence description, publication day, languages, topics, and optional contact email. It does not automatically collect Google email addresses or require sign-in through a one-response limit. Response summaries remain private. Verify each suggestion and its schedule before adding a record. There is no automatic import or publication.

`src/data/site.ts` holds the public responder URL. If it is temporarily `null`, the header opens an accessible explanation dialog instead of a broken link.

## Design and assets

The homepage retains the [Daily desk composition](design/daily-desk-reference.png) and implements the selected [Light slips calendar](design/light-slips-reference.png). `global.css` owns the palette: white `#ffffff`, ink `#1c2c24`, forest green `#285f4c`, sage rules `#b3cdbe`, mint `#e8f3ec`, selected jade `#cfe6d8`, selection edge `#4b8169`, raspberry `#c94050`, and smaller red links `#be3546`. DM Sans is served locally as a variable WOFF2 with its SIL Open Font License. Chinese labels use a compatible system sans fallback. Source illustrations and prompts remain under `assets/illustrations/`; optimized WebP files are served from `public/illustrations/`. See [asset credits](../ASSETS.md).

Studio links live in `src/data/site.ts`. The footer contains the studio signature, Website, and GitHub. Production analytics adds a quiet Cookie settings control. The slogan and X link were removed at the editor’s request. The old design gallery and its alternate renderers were retired after approval. Six legacy preview addresses redirect to the homepage through `astro.config.mjs`; they are excluded from the sitemap. Git history retains the retired studies. See [the maintained design](design-directions.md).

The homepage retains its canonical URL, metadata, sitemap, robots policy, and structured data derived from the actual publication records. See [search and analytics](search-and-analytics.md) for canonical query views, sharing metadata, the machine-readable reference, and optional measurement. Never add made-up readership metrics.

## Verification and delivery

Run `npm run check`, `npm run build`, and `git diff --check`. Check weekday and publication selection, returning to a day, keyboard focus, browser history, original reading and past-issue links, the suggestion link, and phone widths in Chrome. Check independent rails, drag-versus-click intent, arrows at both ends, day/profile switching, keyboard navigation, history, deep links, footer stability, and the short-viewport sticky-reader fallback. Product Design evidence is recorded in `design-qa.md`; working captures belong in ignored `output/`.

Commit directly to `main`. Create a PR only when explicitly requested. Keep GitHub source, comments, documentation, and commit metadata in English; retain original Chinese newsletter names and reader data.

The domain is managed in Cloudflare and hosted on the existing Vultr server behind its Caddy gateway. See [deployment and rollback](../deploy/README.md). Use ignored `.env` and `.deploy.env` files for operator settings. Only the static build and public container configuration are uploaded; source code, credentials, and operator files stay outside the public artifact.

See the dated [production launch verification](launch-verification.md) for the initial public response checks, Analytics verification, and Search Console setup.
