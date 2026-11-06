# Reviewed publication issue links

The initial snapshot was reviewed on 2026-11-05. After the HN update on 2026-11-06, the 33-publication directory contains 86 verified past-issue destinations. Twenty-seven publications have three links, HN has two, three have one, and two have an archive entry. The site reads this editorial data at build time.

## Sources and verification

`src/data/recentIssues.json` records the source URL, checked date, optional archive URL and label, and at most three issues per publication. Every issue has its real HTTPS URL and a short original-source title or factual issue-number label. Dates are included when the publisher provides an unambiguous issue date. Titles are shortened for scanning. Do not describe these selections as necessarily the three latest issues.

Primary sources include the publishers' own RSS/Atom feeds, HTML archives, and the Mailchimp or Buttondown archive directly associated with the publication. All 85 destinations in the initial snapshot returned HTTP 200. Seventy-nine accepted HEAD requests, and six were checked with GET. This Week in HN #02 was confirmed in the public feed and checked with GET. Tw93's feed supplied trailing-slash URLs, and the snapshot stores the working canonical URLs without the final slash. The three Ruan Yifeng links were verified with GET because that site rejected HEAD requests.

Special cases handled during review:

- Console's main RSS includes sponsored tool destinations. The snapshot instead uses its real [newsletter archive](https://console.dev/newsletter) and dated issue pages.
- Data Elixir's general WordPress feed included subscription utility pages. The snapshot uses the actual issue links on the [publisher homepage](https://dataelixir.com/).
- Android's feed links can target XML documents, and iOS Dev Weekly's feed included a preview hosting domain. The snapshot uses the readable canonical issue URLs from the official archives.
- Rami's collection includes extra tutorials. Only the regular numbered digest is included here.
- SRE's feed and displayed issue dates differed, so the links retain their verified issue numbers without an ambiguous date.
- Changelog News' selected links are older archive editions. The interface calls this section Past issues, without a latest-issue claim.
- Issue titles from feeds and archives are treated as untrusted text and rendered through Astro's normal escaping. Only verified HTTPS destinations are stored.

## Publications with fewer public links

| Publication | Individual links | Treatment |
| --- | ---: | --- |
| This Week in AI | 1 | The one issue verified in the public feed, plus the archive |
| This Week in HN | 2 | Both numbered issues verified in the public feed, plus the archive |
| This Week in Skills | 1 | The first published issue, plus the archive |
| Benedict's Newsletter | 1 | The public sample linked from the subscription page; the full archive is explicitly labeled Subscriber archive |
| This Week in Crypto | 0 | No individual link verified in the public feed during this pass; provide the publication and archive |
| Dense Discovery | 0 | Automated issue retrieval was blocked; provide the official archive instead of inventing issue URLs |

## Updating the snapshot

1. Start from the publication's official archive or a feed linked by its own website.
2. Confirm that each destination is a full issue, not a feed document, sponsor page, sign-up confirmation, unrelated blog post, or preview deployment.
3. Store up to three distinct real URLs. Keep a short title and an unambiguous publication date when available. A source with only one usable public issue should keep one.
4. Recheck canonical redirects and access. Use the original publisher's domain, or its explicitly linked newsletter-platform archive.
5. Update `checkedAt`, `sourceUrl`, and any source-specific archive label. Run the type check and build, then open a publication detail panel and an issue link in the browser.

New Google Form submissions still require manual review before being added to the directory. This snapshot does not automate newsletter inclusion or publishing.
