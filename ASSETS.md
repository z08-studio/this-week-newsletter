# Asset credits

## Typefaces

- `public/fonts/dm-sans-latin.woff2` is the official variable [DM Sans](https://fonts.google.com/specimen/DM+Sans) Latin font, served locally at weights 400–800 for the current design. It was obtained from the Google Fonts CSS endpoint; its source family is maintained in [google/fonts](https://github.com/google/fonts/tree/main/ofl/dmsans). The complete SIL Open Font License is bundled as `public/fonts/DMSans-OFL.txt`. The layout preloads this local file and makes no runtime Google Fonts request. Chinese text uses system sans fallbacks.

Fonts are served locally, without runtime requests to Google Fonts.

## Illustrations

The four reading assets were generated using the built-in ImageGen tool from the selected design reference. The exact prompts and high-resolution originals are retained for future iteration:

| Served asset | Original | Exact prompt |
| --- | --- | --- |
| `public/illustrations/reading-shelf.webp` | `assets/illustrations/reading-shelf.png` | `assets/illustrations/reading-shelf.prompt.txt` |
| `public/illustrations/open-book.webp` | `assets/illustrations/open-book.png` | `assets/illustrations/open-book.prompt.txt` |
| `public/illustrations/book-stack.webp` | `assets/illustrations/book-stack.png` | `assets/illustrations/book-stack.prompt.txt` |
| `public/illustrations/standing-books.webp` | `assets/illustrations/standing-books.png` | `assets/illustrations/standing-books.prompt.txt` |

WebP files are resized and compressed copies of the generated originals. No UI text is baked into images. The hero, reading motifs, and header book motif share the red, seafoam, and dark teal direction; none is a substitute screenshot of the page.

## Icons and existing identities

`public/icons/arrow-up-right.svg` and `public/icons/arrow-left.svg` are unmodified regular [Phosphor](https://github.com/phosphor-icons/core) arrow icons. Its MIT license is bundled at `public/icons/Phosphor-LICENSE.txt`. CSS masks apply the surrounding text color to this real library asset.

`public/favicon.svg` retains the portfolio's existing W identity. The header uses the generated standing-books asset, and the footer uses a DM Sans text signature linking to [z08 Studio](https://z08studio.com). Avatars under `public/newsletters/` belong to their respective publications and remain referenced by the editorial records.

The current calendar and palette reference is `docs/design/light-slips-reference.png`, the refined version of the first displayed calendar concept. It was generated with the built-in ImageGen tool from the selected image, itself grounded in the user's screenshot and a live page capture. The full-page composition remains grounded in `docs/design/daily-desk-reference.png`. Retired experiments, fonts, and references remain recoverable in Git history. This design reuses all original illustrations and Phosphor icons; the existing artwork retains its original red/seafoam colors while interface tokens use the selected softer palette. Newsletter titles and external websites retain their original ownership; editorial book illustrations do not impersonate publication logos.
