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

`WeeklyCalendar.astro` renders the title-only weekly overview and all seven daily reading panels in HTML. `weeklyCalendar.ts` progressively enhances weekday selection, local-day initialization, `?day=wednesday` links, keyboard navigation, and mouse/focus previews. The URL records explicit day selection. A hover preview does not add browser-history entries.

Click a weekday heading to switch the right panel. Arrow keys move between weekday buttons; Home and End select Monday and Sunday. Hover or focus a publication card to reveal that day and bring its matching introduction into view. The code adjusts the detail container's scroll position instead of scrolling the document. Each title and reading link opens the original publication in a new tab with `noopener noreferrer`. There is no intermediate detail route and no Open full day button.

At desktop widths, weekday headings remain fixed above independently scrolling lists, and the detail heading stays above its own scrollable list. The real Friday collection currently has seven entries, providing an overflow example. Tablet places the detail panel below the full weekly overview. At widths up to 680px, the overview becomes a seven-button weekday picker and the full list appears below. The no-JavaScript mobile fallback exposes all newsletter links as weekday lists. Keep heading selection visible, focus outlines clear, and original publication names untruncated.

## Suggestion form

Public form: [Add your newsletter](https://docs.google.com/forms/d/e/1FAIpQLScNKI_gcJOtPcRBZZ4xB-IUREZraY1j6dz1tQyKn3MOBTl4Ag/viewform).

The form's [editor URL](https://docs.google.com/forms/d/16Gh3FiYaXB-RyWY1tZ22dJakCk5OpiO0I0WPCU14MiM/edit) requires access through the maintainer's Google account. Do not expose edit permissions or submitted responses.

The form includes newsletter name, public URL, one-sentence description, publication day, languages, topics, and optional contact email. It does not automatically collect Google email addresses or require sign-in through a one-response limit. Response summaries remain private. Verify each suggestion and its schedule before adding a record. There is no automatic import or publication.

`src/data/site.ts` holds the public responder URL. If it is temporarily `null`, the header opens an accessible explanation dialog instead of a broken link.

## Design and assets

The current homepage follows the selected [illustrated reference](design/selected-reference.png): white background, red accents, mint title slips, dark teal rules, editorial serif headings, and a reading illustration. `global.css` owns the tokens and responsive layout. Newsreader and Manrope are served locally with bundled licenses. Source PNGs and their generation prompts live under `assets/illustrations/`; optimized WebP files are served from `public/illustrations/`. See [asset credits](../ASSETS.md).

Studio links live in `src/data/site.ts`. The footer carries the exact slogan, make good weekly reading easier to find. Review routes under `/designs/` remain noindex and are excluded from the sitemap. The historical `/designs/soft/` route now previews the selected illustrated calendar; the other four early studies retain their own styles and preview code. See [design directions](design-directions.md).

The homepage retains its canonical URL, metadata, sitemap, robots policy, and an ItemList schema containing the actual 33 publications. Keep structured data in sync with the source array; never add made-up readership metrics.

## Verification and delivery

Run `npm run check`, `npm run build`, and `git diff --check`. Check weekday selection, keyboard navigation, original reading links, the suggestion link, overflow in both list areas, and phone widths in the in-app browser. The Product Design comparison and evidence are recorded in `design-qa.md`; working captures belong in ignored `output/design-qa/`.

Commit directly to `main`. Create a PR only when explicitly requested. Keep GitHub source, comments, documentation, and commit metadata in English; retain original Chinese newsletter names and reader data.

The domain is managed in Cloudflare and the intended host is the existing Vultr server. This implementation does not change production DNS, TLS, or routing. Deploy the static `dist/` build when production deployment is requested and the target configuration is available. Never commit credentials.
