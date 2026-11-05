# Production launch verification

Verified on November 5, 2026. Deployed source revision: `e140bb38f578`. This is a dated launch record, not continuous monitoring.

## Deployment

- The static site is live at `https://thisweeknewsletter.com/` on the existing Vultr Docker/Caddy stack.
- The isolated static service is healthy and exposes no host ports. The existing HTTPS gateway retains its other site blocks.
- Cloudflare has a root A record, a www CNAME, and a Search Console verification TXT record. Caddy serves valid HTTPS certificates and handles renewal.
- The release archive checksum was verified before activation. The source revision, configuration backup, and deployment receipt are retained on the server. The gateway configuration was backed up before its two newsletter routes were added.
- Public checks of the existing studio and Zdraft homepages returned HTTP 200 before and after the gateway change.

## Public responses and search

| Check | Observed result |
| --- | --- |
| Root HTTPS homepage | 200 |
| Privacy, robots, sitemap, llms reference | 200 |
| Root HTTP URL | 308 to HTTPS |
| www HTTPS URL | 301 to canonical root |
| Retired design preview URL | 301 to homepage |
| Missing page | 404 with the designed error page |
| Fingerprinted stylesheet | 200 with immutable caching |
| JSON-LD and HTML records | 33 publications, matching the calendar |
| Reviewed past-issue links | 85, unchanged |
| Error-page metadata | noindex; no canonical |
| Search Console domain ownership | Verified through DNS |
| Search Console sitemap | Success; two pages discovered |

Search Console's sitemap success is not a claim that the pages are already indexed or ranked. The initial performance and indexing reports were still processing at verification time.

## Analytics

The dedicated This Week In Newsletters GA4 property and HTTPS web stream are active, using Asia/Shanghai reporting time. The site's compiled public measurement ID matches that stream. The unrelated Zdraft property is not used by this site.

Chrome network inspection and the property's Realtime report confirmed:

- A fresh visit loads no Google Analytics tag before consent.
- No thanks persists across reload and makes no Google Analytics requests.
- Allow analytics loads the correct tag. Collection requests received HTTP 204 acknowledgements.
- One page view was recorded while weekday selection, newsletter selection, and a publication outbound click produced separate events. Panel changes did not create extra page views.
- The Realtime report showed the verification visit, `select_content`, and `newsletter_outbound`. `select_day` was also observed in the acknowledged event batch.
- Publication day, Newsletter, and Destination kind custom dimensions are registered with event scope.
- Withdrawing consent reloaded the page, removed the loaded tag, and produced no further Google Analytics requests in the checked window.
- The local development page loads no Google tag.

These are launch verification visits and clicks, not evidence of organic readership or subscriptions. No completed Google Form submission is inferred from an outbound click.

## Interface and build

- The approved Light slips design and its source assets are retained. Retired design renderers, unused fonts, and obsolete reference images are removed; legacy routes redirect.
- Chrome verified day and publication selection, returning to a day, external publication navigation, and browser Back/Forward restoration.
- Publication and day views retained the same document-relative footer position in the checked desktop state.
- Responsive emulation at 390px and 320px showed no horizontal page overflow. The reader correctly used normal document flow, and cookie controls remained usable.
- The checked production tab had no console errors. Temporary viewport emulation and network inspection were cleared after verification.
- `npm run check`: 24 files, no errors, warnings, or hints. `npm run build`, `bash -n scripts/deploy.sh`, and `git diff --check` passed.
- Built and public HTML checks verified canonical metadata, JSON-LD, publication and issue counts, the sitemap, the error-page policy, and the text reference's 33 schedule sources.

Private working screenshots are retained in ignored `output/launch/`: production desktop, mobile, narrow-screen profile, consent controls, Analytics Realtime, Cloudflare DNS, and Search Console sitemap success. Account screenshots and operator settings are not committed.
