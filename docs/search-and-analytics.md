# Search, discovery, and analytics

## Crawlable directory

Astro renders the complete calendar, day lists, publication descriptions, and reviewed issue links into HTML at build time. JavaScript switches the visible reading panel. Readers without JavaScript receive direct publication links grouped by weekday. No remote publisher API is required to render the page.

The homepage has an explicit title, description, canonical URL, locally hosted sharing image, Open Graph metadata, and Twitter card metadata. Query parameters select a panel within the same directory, so all query views retain the root canonical. Privacy has its own canonical. The error page is noindex and the production server returns a real HTTP 404. Retired design routes redirect to the homepage with HTTP 301 on the production server; Astro's static redirect documents provide a fallback on static preview hosts.

`src/data/seo.ts` derives Organization, WebSite, CollectionPage, ItemList, and Periodical records from the same editorial data as the calendar. Only studio publications identify the studio as their publisher. There are no invented audience numbers, publication dates, or availability claims. Structured data does not guarantee a special search result.

`/robots.txt` permits public crawlers and references `/sitemap.xml`, which contains the homepage and privacy page. `/llms.txt` is a generated text reference grouped by weekday, with descriptions, official publication URLs, archive links, and schedule sources. It is a convenience for readers and tools, not an access policy or a ranking guarantee. Keep schedules described as usual publisher-local weekdays, and keep reviewed issue snapshots distinct from live availability.

Google's [AI features guidance](https://developers.google.com/search/docs/appearance/ai-features) applies normal SEO practices to AI search results and does not require a special AI file or schema. The useful work here is accessible HTML, accurate source-backed records, stable URLs, and matching structured data. Continue reviewing publication schedules and refreshing real archive links as the directory grows.

## Optional GA4

Set `PUBLIC_GOOGLE_ANALYTICS_ID` in ignored `.env` before building. Use a dedicated This Week In Newsletters GA4 property, with the root HTTPS domain as its web stream and Asia/Shanghai reporting time. The public measurement identifier is compiled into the browser bundle; it is not an API secret. Local development and local or staging previews do not collect data, even with a production build, because measurement also checks HTTPS and the approved public hostname.

The small consent card uses the approved mint palette. Google Analytics loads only after Allow analytics. No thanks leaves the directory fully functional and loads no Google tag. Cookie settings in the footer reopens the choice; withdrawal disables measurement, removes analytics cookies, and reloads if necessary to remove previously loaded listeners. The first-party consent choice lasts six months. Advertising storage, advertising personalisation, and Google signals are disabled. See the public [privacy page](https://thisweeknewsletter.com/privacy/).

### Measurement plan

| Event | Meaning | Parameters |
| --- | --- | --- |
| `page_view` | A real page load after consent | Canonical path without panel query parameters |
| `select_day` | Explicit selection of a weekday overview | `publication_day` |
| `select_content` | Explicit selection of a newsletter profile | `content_type=newsletter`, `item_id`, `publication_day` |
| `newsletter_outbound` | Click to a publication, past issue, or archive | `item_id`, `destination_kind` |
| `suggestion_open` | Open the external Google suggestion form | `destination_kind=google_form` |
| `scroll`, `click` | GA4 enhanced scroll and outbound click measurement | Standard enhanced-measurement fields |

Initial panel restoration and browser Back/Forward do not emit selection events. Enhanced page views based on browser history are disabled in the stream, so changing calendar query parameters does not inflate views. The measurement URL retains standard UTM campaign parameters for attribution and omits panel state and arbitrary query fields. Site search, form, video, and download measurement are disabled because the directory has none of these flows. Opening the suggestion form is not a completed submission. No form answers or contact email are sent by this implementation.

For reporting, use traffic acquisition for discovery channels, landing pages for visits, and event exploration for weekday, newsletter, and destination selections. Event-scoped custom dimensions can expose `publication_day`, `item_id`, and `destination_kind`. Treat publication, issue, and archive clicks as traffic delivered to publishers; do not infer subscription or form completion from them.

### Verification

Run `npm run check`, `npm run build`, and `bash -n scripts/deploy.sh`. Inspect built HTML for the root canonical, parse the JSON-LD, and compare its publication count with the visible directory. Verify robots, sitemap, llms, privacy, legacy redirects, real 404 status, and HTTPS publicly after deployment.

In Chrome, verify that a fresh production visit sends no analytics before consent, refusal keeps the site usable, acceptance loads the correct tag, panel selections produce events without extra page views, and withdrawal stops collection. Confirm a consenting visit and events in the dedicated property's Realtime report. Use [GA4 event documentation](https://developers.google.com/analytics/devguides/collection/ga4/events) for event and reporting details.
