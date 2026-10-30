# This Week In Newsletters

Make good weekly reading easier to find. A handpicked newsletter calendar by **z08 Studio**, built for [thisweeknewsletter.com](https://thisweeknewsletter.com).

The homepage organizes newsletters from Sunday through Saturday. Browse publication names, hover or select one to see a short introduction, then open a publication to read or subscribe. On touchscreens, tap a name to reveal its details. Studio newsletters sit alongside independently collected favorites.

[Suggest a newsletter](https://docs.google.com/forms/d/e/1FAIpQLScNKI_gcJOtPcRBZZ4xB-IUREZraY1j6dz1tQyKn3MOBTl4Ag/viewform). Each submission is reviewed manually before it is added.

## Development

Use Node.js 24 LTS and npm.

```sh
npm ci
npm run dev
npm run check
npm run build
```

The development server listens on loopback. The static production build is written to `dist/`. Desktop displays seven independently scrolling columns with fixed weekday headings. Smaller screens arrange the same panels in two columns or a vertical list, with a capped reading area for busy days.

The page uses a red background, soft green panels, rounded typography and gently raised jelly-like publication buttons. Only publication names appear at rest; introductions and reading links appear on demand.

See [maintenance](docs/maintenance.md) for adding publications, publication-day sources, form ownership and the deployment boundary. The repository is private; the website is intended for public readers.
