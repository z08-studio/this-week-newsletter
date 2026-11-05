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

`WeeklyCalendar.astro` renders the complete weekly overview, all seven day lists, and the individual publication panels in HTML. `weeklyCalendar.ts` enhances the two reading states: a day overview by default, and a single publication after explicit selection. The compact profile contains a small book motif beside its title, description, usual weekday, language, up to two topics, original website, and up to three reviewed past issue links. A repeated publication-name prefix is removed from visible issue labels; the complete reviewed title remains in the accessible label and hover title. Source records and issue URLs are unchanged.

Click a weekday heading to switch to its full list. Arrow keys move between weekday buttons; Home and End select Monday and Sunday. Click a calendar card, list title, or View details action to inspect a publication. Hover and focus do not switch views. Back to the weekday returns to the list. Keyboard activation moves focus to the resulting heading. Normal browser Back and Forward restore the previous view, and a URL such as `?day=thursday&newsletter=console` opens the same details after a reload. External website, archive, and issue links open in a new tab with `noopener noreferrer`.

The page has a 2400px maximum width, a flexible calendar, and a constrained reading column. Card labels use natural wrapping, with no truncation or forced single-line ellipses. Calendar columns and reading panels have no fixed height, max-height, or internal scrolling. The document scrollbar has a stable gutter, avoiding width changes when a view becomes scrollable.

Desktop weekday headings stick to the viewport top while their calendar columns pass. `ResizeObserver` and window resizing keep the reader sticky only when its full content fits between a 24px top gap and a 24px bottom allowance. A taller reader stays in normal flow, so all content remains reachable. CSS sticky containment stops the panel before the footer. The review route accounts for its own sticky review bar. Desktop pointer selections preserve document scroll position. Compact spacing keeps all current profiles and day lists within the calendar's height at the reviewed desktop widths, so these selections do not move the footer. Future longer content may naturally increase page height.

At 1270px and below, the reader moves below the calendar and does not stick. At 1000px and below, a seven-button weekday picker replaces the small-card overview. An offscreen selected reader is revealed with normal document scrolling, respecting reduced motion. The no-JavaScript fallback exposes direct publication links grouped by day.

`src/data/recentIssues.json` is a manually reviewed snapshot of 85 real issue links for 33 publications. It is typed through `newsletterArchives.ts` and read at build time, so the page and production build make no live publisher API requests. See [issue-link maintenance](issue-links.md) for the sources, exceptions, and refresh procedure. New directory records can omit this optional metadata and still show their details and public website. Never reconstruct issue URLs from issue numbers or copy sponsored tool links from a mixed RSS feed.

## Suggestion form

Public form: [Add your newsletter](https://docs.google.com/forms/d/e/1FAIpQLScNKI_gcJOtPcRBZZ4xB-IUREZraY1j6dz1tQyKn3MOBTl4Ag/viewform).

The form's [editor URL](https://docs.google.com/forms/d/16Gh3FiYaXB-RyWY1tZ22dJakCk5OpiO0I0WPCU14MiM/edit) requires access through the maintainer's Google account. Do not expose edit permissions or submitted responses.

The form includes newsletter name, public URL, one-sentence description, publication day, languages, topics, and optional contact email. It does not automatically collect Google email addresses or require sign-in through a one-response limit. Response summaries remain private. Verify each suggestion and its schedule before adding a record. There is no automatic import or publication.

`src/data/site.ts` holds the public responder URL. If it is temporarily `null`, the header opens an accessible explanation dialog instead of a broken link.

## Design and assets

The current homepage follows the selected [scroll-reading reference](design/scroll-reading-reference.png), continuing the original [illustrated composition](design/selected-reference.png): white background, red accents, mint title slips, dark teal rules, editorial serif headings, and a reading illustration. `global.css` owns the tokens and responsive layout. Newsreader and Manrope are served locally with bundled licenses. Source PNGs and their generation prompts live under `assets/illustrations/`; optimized WebP files are served from `public/illustrations/`. This refinement reuses the existing assets. See [asset credits](../ASSETS.md).

Studio links live in `src/data/site.ts`. The footer contains the studio signature, Website, and GitHub only. The slogan and X link were removed at the editor’s request. Review routes under `/designs/` remain noindex and are excluded from the sitemap. The historical `/designs/soft/` route now previews the selected illustrated calendar; the other four early studies retain their own styles and preview code. See [design directions](design-directions.md).

The homepage retains its canonical URL, metadata, sitemap, robots policy, and an ItemList schema containing the actual 33 publications. Keep structured data in sync with the source array; never add made-up readership metrics.

## Verification and delivery

Run `npm run check`, `npm run build`, and `git diff --check`. Check weekday and publication selection, returning to a day, keyboard focus, browser history, original reading and past-issue links, the suggestion link, and phone widths in the in-app browser. Compare footer positions across the current views, then check sticky headings, the reader's footer boundary, and the too-tall-reader fallback on a short viewport. Product Design evidence is recorded in `design-qa.md`; working captures belong in ignored `output/`.

Commit directly to `main`. Create a PR only when explicitly requested. Keep GitHub source, comments, documentation, and commit metadata in English; retain original Chinese newsletter names and reader data.

The domain is managed in Cloudflare and the intended host is the existing Vultr server. This implementation does not change production DNS, TLS, or routing. Deploy the static `dist/` build when production deployment is requested and the target configuration is available. Never commit credentials.
