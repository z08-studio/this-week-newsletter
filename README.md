# This Week Newsletter

A curated newsletter directory by **z08 Studio**, intended for **https://thisweeknewsletter.com**.

The repository is private. The eventual website is intended to be public. This first version is a local foundation for the next UI design phase; production hosting has not been configured.

## Local development

Use Node.js 24 LTS (see `.nvmrc`) and npm.

```sh
npm ci
npm run dev
```

Astro prints the local preview address. To validate and inspect the production output:

```sh
npm run check
npm run build
npm run preview
```

The static site is generated in `dist/`.

## Initial content and behavior

- Studio newsletters: This Week in Obsidian and That Week in AI.
- Collected newsletters: 潮流周刊, 科技爱好者周刊, and This Week in Rust.
- Search across names, descriptions, topics, and languages.
- Direct links to the original publications, where readers can read and subscribe.
- Responsive layout, page metadata, canonical URLs, `robots.txt`, and a sitemap.
- A recommendation section that can link to a public Google Form when ready.

## Maintain the directory

Edit `src/data/newsletters.ts`. Each entry has a stable `id`, display name, description, URL, language, topics, and an `owned` flag. Entries appear in editorial order; `owned: true` places a publication in the studio section. Add or edit entries manually after reviewing them, then run the checks and build.

Site copy and the recommendation link live in `src/data/site.ts`. To enable submissions, replace `submissionFormUrl: null` with a public HTTPS Google Form URL. Until configured, the page displays an availability notice. Form submissions do not automatically enter the directory: review them in Google Forms, then add approved entries to the data file.

The page, card component, and styles are separate so the UI can be redesigned without rewriting directory content. No database, account system, analytics service, or external content fetch is configured.

## Hosting plan

- Domain and DNS: Cloudflare, `thisweeknewsletter.com`.
- Production server: the existing Vultr server.
- Build with `npm ci` and `npm run build`, then serve the generated `dist/` directory using the production web server.
- Server access, site routing, TLS, deployment automation, and DNS changes remain to be configured after the UI design phase. Never commit credentials or server secrets.

## Next phase

Design the UI and settle the site's visual identity, then configure the recommendation form and production deployment. Topic landing pages and traffic measurement can be added as the directory grows.
