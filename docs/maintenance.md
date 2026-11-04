# Directory maintenance

## Publications and weekdays

Edit `src/data/newsletters.ts` after reviewing each submission. `publicationDay` uses Sunday = 0 through Saturday = 6. The typed weekday tuple controls the display order. Editorial order inside a weekday follows the data array. The directory displays the publication's usual schedule rather than guaranteeing a particular issue's release time.

Each entry has a stable ID, name, short description, original publication URL, language, topics, studio ownership, weekday, optional identity assets, and a schedule source. Descriptions appear in the on-demand preview. Public reading links open in a new tab with `noopener noreferrer`.

AI publishes Monday, Obsidian Tuesday, Skills Wednesday, HN Friday, and the editor supplied Thursday for Crypto. AI, Obsidian and HN schedules are recorded in their companion repositories; Skills' Wednesday schedule is stated in its first published issue, verified on 2026-11-04. On 2026-10-30, Tw93's recent issue dates showed Mondays, Rust's recent archive dates showed Wednesdays, and Ruan Yifeng's homepage explicitly stated Friday publication. `scheduleSource` and optional `scheduleNote` preserve these distinctions; recheck them when updating the directory. Empty weekdays remain visible.

The homepage shows only the masthead, submission link, weekdays and publication names at rest. There is no search, count, legend or footer copy. Desktop preserves all seven weekday panels. Each panel has a fixed heading and its own vertical scroll area; adding entries does not increase the desktop panel height. Tablet uses two columns, and phones stack the panels with capped scroll areas. Empty mobile days collapse to their heading.

Hovering a publication opens its preview. Touch and keyboard users activate the publication button to toggle it. Native automatic popovers keep only one preview open and support Escape and outside-click dismissal. Their top-layer placement prevents clipping by the weekday scroll containers. The preview stays inside the viewport and closes when the page or a weekday list scrolls. Reading links can be hovered and focused without closing the preview.

## Suggestion form

Public form: [Add your newsletter](https://docs.google.com/forms/d/e/1FAIpQLScNKI_gcJOtPcRBZZ4xB-IUREZraY1j6dz1tQyKn3MOBTl4Ag/viewform).

Owner/editor account: the Google account requested by the maintainer. The form's [editor URL](https://docs.google.com/forms/d/16Gh3FiYaXB-RyWY1tZ22dJakCk5OpiO0I0WPCU14MiM/edit) requires that account's access. Do not publish edit permissions or expose submitted responses.

The form contains newsletter name, public website/subscription URL, one-sentence description, publication day, languages, topics and an optional contact email. It does not automatically collect Google email addresses or require sign-in through a one-response limit. Response summaries are private. The confirmation message explains manual review. There is no automated import or publication.

Review responses in Google Forms, verify the publication and schedule, then add approved records to the directory. The public responder URL is stored in `src/data/site.ts` and used by the header submission link. If the URL is temporarily set to `null`, the link shows an accessible notice dialog instead of a broken URL.

## Identity and assets

- Full-page red: `#a9253b`; mint masthead: `#9ce2ae`; dark berry on green surfaces: `#752139`. The masthead colors provide a 4.61:1 contrast ratio. Panel gradients, green highlights and inset shading create the rounded jelly treatment without warm-white surfaces.
- `public/brand-mark.svg` and `public/favicon.svg` contain the red circle and mint W mark.
- `public/newsletters/` contains optimized copies of the studio publications' existing avatars. Preserve each publication's own identity.
- Colors and responsive layouts live in `src/styles/global.css`; presentation components are in `src/components/`.

## Validation and delivery

Run `npm run check` and `npm run build` after editing. Preview hover, keyboard activation, Escape dismissal, touch toggles, independent weekday scrolling, fixed headings, seven-column ordering, mobile overflow and public form links in a browser. Browser screenshots and temporary verification records belong in ignored `output/`.

Commit directly to `main` by default. Create a PR only when explicitly requested.

The domain is managed in Cloudflare and the intended host is the existing Vultr server. This UI change does not configure DNS, TLS or production routing. Serve the generated `dist/` only after the deployment configuration is supplied and deployment is requested. Never commit credentials.
