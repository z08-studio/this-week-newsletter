# This Week In Newsletters

Make good weekly reading easier to find. A handpicked newsletter calendar by **z08 Studio**, built for [thisweeknewsletter.com](https://thisweeknewsletter.com).

The homepage organizes newsletters from Sunday through Saturday. Browse the week, search by name, topic, or language, and open a publication to read or subscribe. Studio newsletters sit alongside independently collected favorites.

[Suggest a newsletter](https://docs.google.com/forms/d/e/1FAIpQLScNKI_gcJOtPcRBZZ4xB-IUREZraY1j6dz1tQyKn3MOBTl4Ag/viewform). Each submission is reviewed manually before it is added.

## Development

Use Node.js 24 LTS and npm.

```sh
npm ci
npm run dev
npm run check
npm run build
```

The development server listens on loopback. The static production build is written to `dist/`. Desktop displays seven columns; smaller screens show the same weekday groups vertically.

The red and mint identity follows the studio's current brand. Publication avatars retain their individual identities. Local optimized assets keep card images small without third-party image requests.

See [maintenance](docs/maintenance.md) for adding publications, publication-day sources, form ownership and the deployment boundary. The repository is private; the website is intended for public readers.
