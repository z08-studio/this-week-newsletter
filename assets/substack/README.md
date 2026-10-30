# Shared Substack header

The shared header represents This Week In Newsletters and its four publications: Obsidian, AI, HN and Crypto. It is used by the account profile and all four newsletter website headers.

- `series-header-before-crypto.png`: the previous three-publication image, retained for rollback.
- `series-header-master.png`: native imagegen output created on 2026-10-30, using the previous header and the approved Crypto C as references.
- `series-header.png`: the final header cropped in Substack's image editor, downloaded after saving and reused across the five destinations.

The website editor is the authority for each saved placement. Check the profile and all four public sites after replacing the header; all four publication names and marks must remain visible.

## Uploads and dimensions

Upload `series-header.png` (2032 × 400), not the padded imagegen master. The account editor enforces a maximum aspect ratio of 21:4; the final image leaves enough margin to avoid a one-pixel rounding failure. Cropping was performed in Substack's image editor.

The same final image is used in these locations:

- [Account profile branding](https://substack.com/profile/edit): Header image.
- [Obsidian website editor](https://thisweekinobsidian.substack.com/publish/website-editor/home): Header → Wordmark.
- [AI website editor](https://thatweekinai.substack.com/publish/website-editor/home): Header → Wordmark.
- [HN website editor](https://thisweekinhn.substack.com/publish/website-editor/home): Header → Wordmark.
- [Crypto website editor](https://thatweekincrypto.substack.com/publish/website-editor/home): Header → Wordmark.

Keep the individual publication logos separate from the shared wordmark. Website headers use the existing size setting of 67 for consistent presentation. Save each website editor and verify the live header after navigation.

## Generation prompt

Generated with the built-in imagegen tool. The exact prompt follows.

```text
Use case: compositing / logo-brand.
Asset type: the final ultra-wide shared Substack header banner for the account "This Week In Newsletters" and its four newsletter websites.
Primary request: edit the existing three-newsletter banner to include This Week in Crypto. Produce a clean finished flat banner, NOT a screenshot or mockup. Preserve its established visual identity.
Input image 1 is the existing 2100 x 400 shared header: use it as the design and identity reference. Input image 2 is the exact approved emerald folded C logo to insert for Crypto.
Canvas: ultra-wide 5.25:1 horizontal aspect ratio, ideally 2100 x 400 pixels. Rebalance the existing layout to fit FIVE horizontal groups in ONE row: the family title, then Obsidian, AI, HN, Crypto. Do not omit or crop any group. Keep all meaningful artwork inside the canvas with comfortable outer margins.
Group 1: the exact dark-evergreen family name on two lines, "This Week In" then "Newsletters", with the existing small burgundy underline.
Group 2: preserve the purple faceted round TWO logo and label on two lines, "This Week" then "in Obsidian".
Group 3: preserve the cobalt blue folded A logo and label on two lines, "This Week" then "in AI".
Group 4: preserve the orange folded H logo and label on two lines, "This Week" then "in HN".
Group 5: use the exact emerald folded C silhouette, shading and proportions from input image 2, with label on two lines, "This Week" then "in Crypto".
Style: match input image 1 closely: warm ivory background, soft restrained translucent pastel organic shapes behind each newsletter group, fine pale sage vertical separators, bold clean dark-evergreen humanist sans-serif lettering, balanced spacing, consistent logo scale. Add a subtle light mint shape behind Crypto. Keep all logos sharp and recognizable at small header size.
Invariants: retain all three original publication identities; do not replace the TWO emblem, do not distort or add letters inside A, H or C. Spell every word exactly. The new banner must visibly include all FOUR publication names and all FOUR marks, alongside the family title.
Avoid: new slogans, weekday labels, currency symbols, coins, price charts, borders, UI controls, watermarks, extra lettering, extra panels, repeated logos, unrelated decoration. One finished ultra-wide banner.
```
