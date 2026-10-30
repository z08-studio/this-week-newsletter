# Directory maintenance

## Publications and weekdays

Edit `src/data/newsletters.ts` after reviewing each submission. `publicationDay` uses Sunday = 0 through Saturday = 6. The typed weekday tuple controls the display order. Editorial order inside a weekday follows the data array. The directory displays the publication's usual schedule rather than guaranteeing a particular issue's release time.

Each entry has a stable ID, name, short description, original publication URL, language, search topics, studio ownership, weekday, icon or monogram, and a schedule source. Keep descriptions brief enough to scan in a narrow weekday column. Public links open in a new tab with `noopener noreferrer`.

AI publishes Monday, Obsidian Tuesday, HN Friday, and the editor supplied Thursday for Crypto. The first three schedules are recorded in their companion repositories. On 2026-10-30, Tw93's recent issue dates showed Mondays, Rust's recent archive dates showed Wednesdays, and Ruan Yifeng's homepage explicitly stated Friday publication. `scheduleSource` and optional `scheduleNote` preserve these distinctions; recheck them when updating the directory. Empty weekdays remain visible.

The homepage search matches names, descriptions, topic aliases and languages. It preserves the seven weekday positions on desktop, updates per-day counts and provides a resettable empty state. Smaller screens show the same groups vertically. Press `/` to focus search when not editing another field.

## Suggestion form

Public form: [Add your newsletter](https://docs.google.com/forms/d/e/1FAIpQLScNKI_gcJOtPcRBZZ4xB-IUREZraY1j6dz1tQyKn3MOBTl4Ag/viewform).

Owner/editor account: the Google account requested by the maintainer. The form's [editor URL](https://docs.google.com/forms/d/16Gh3FiYaXB-RyWY1tZ22dJakCk5OpiO0I0WPCU14MiM/edit) requires that account's access. Do not publish edit permissions or expose submitted responses.

The form contains newsletter name, public website/subscription URL, one-sentence description, publication day, languages, topics and an optional contact email. It does not automatically collect Google email addresses or require sign-in through a one-response limit. Response summaries are private. The confirmation message explains manual review. There is no automated import or publication.

Review responses in Google Forms, verify the publication and schedule, then add approved records to the directory. The public responder URL is stored in `src/data/site.ts` and used by both submission links. If the URL is temporarily set to `null`, the links show an accessible notice dialog instead of a broken URL.

## Identity and assets

- Warm paper: `#faf8f3`; primary berry: `#b72e43`; mint: `#90d6a3`.
- `public/brand-mark.svg` and `public/favicon.svg` contain the red circle and mint W mark.
- `public/newsletters/` contains optimized copies of the studio publications' existing avatars. Preserve each publication's own identity.
- Colors and responsive layouts live in `src/styles/global.css`; presentation components are in `src/components/`.

## Validation and delivery

Run `npm run check` and `npm run build` after editing. Preview search, empty-state recovery, keyboard focus, seven-column ordering, mobile overflow and public form links in a browser. Browser screenshots and temporary verification records belong in ignored `output/`.

Commit directly to `main` by default. Create a PR only when explicitly requested.

The domain is managed in Cloudflare and the intended host is the existing Vultr server. This UI change does not configure DNS, TLS or production routing. Serve the generated `dist/` only after the deployment configuration is supplied and deployment is requested. Never commit credentials.
