# Shared Substack header

The active header contains five publication groups in weekday order: AI, Obsidian, Skills, Crypto and HN. The separate family-title block is omitted so the publication logos and names have more room.

## Files

- `series-header.png`: final 2172 × 423 five-publication upload, cropped in Substack's image editor and downloaded after saving on 2026-11-04.
- `series-header-five-master.png`: native imagegen output for the five-publication design.
- `skills-logo.png`: 1254 × 1254 raspberry folded S publication logo.
- `generation-prompts-2026-11-04.json`: exact built-in imagegen prompts and input references for the Skills logo and five-publication header.
- `series-header-before-skills.png`: previous four-publication upload, retained for rollback.
- `series-header-master.png`: previous native imagegen output for the four-publication design, created on 2026-10-30.
- `series-header-with-family-title.png`: previous five-group layout, retained for rollback.
- `series-header-before-crypto.png`: earlier three-publication layout.

Upload the final image rather than the padded native master. The account editor enforces a maximum aspect ratio of 21:4; the final dimensions leave margin for integer rounding.

## Saved placements

The same final image is used in the account profile and all five website headers:

- [Account profile branding](https://substack.com/profile/edit): Header image.
- [Obsidian website editor](https://thisweekinobsidian.substack.com/publish/website-editor/home): Header → Wordmark.
- [AI website editor](https://thatweekinai.substack.com/publish/website-editor/home): Header → Wordmark.
- [Skills website editor](https://thisweekinskills.substack.com/publish/website-editor/home): Header → Wordmark.
- [HN website editor](https://thisweekinhn.substack.com/publish/website-editor/home): Header → Wordmark.
- [Crypto website editor](https://thatweekincrypto.substack.com/publish/website-editor/home): Header → Wordmark.

The five website headers use Size **84**. Individual publication logos remain separate from the shared wordmark. Save each website editor, reopen its public page and confirm all five names and marks remain visible.

The image is also used as the email Banner image in Settings → Emails → Email header & footer for all five publications. Each publication's text header states its own topic and publication day; each footer links to the other four newsletters in weekday order. Skills publishes Wednesday, between Obsidian on Tuesday and Crypto on Thursday.

## Previous four-publication generation prompt

Generated with the built-in imagegen tool using the previous shared header as the edit target. The exact prompt follows.

```text
Use case: compositing / precise-object-edit / logo-brand.
Edit target: the supplied shared newsletter header. The user wants the left family-title block removed so each of the four newsletter identities can be larger.
Primary request: remove the entire leftmost "This Week In Newsletters" title group, its burgundy underline, and the separator immediately after it. Redistribute the remaining FOUR newsletter groups across the full banner in one equal-width row. Enlarge each logo and its publication label by approximately 25 percent compared with the supplied reference. Preserve the four existing approved identities and the refined banner style.
Final composition: exactly four equally sized horizontal groups, in this order from left to right:
1. Purple faceted round TWO emblem + the exact label "This Week" on the first line and "in Obsidian" on the second.
2. Cobalt folded A emblem + "This Week" / "in AI".
3. Orange folded H emblem + "This Week" / "in HN".
4. Emerald folded C emblem + "This Week" / "in Crypto".
Keep the logo to the left of its two-line label in each group. Use consistent logo height, bold clean dark-evergreen sans-serif type, balanced spacing, and ONLY three fine pale-sage separators between the four groups. Keep the warm ivory backdrop and subtle pastel purple, blue, peach and mint shapes from the reference. Match the logo silhouettes, folds, colors and TWO lettering exactly.
Asset: one finished flat ultra-wide Substack header, intended final size about 2032 x 400 pixels. All four groups must be completely inside the frame and legible, with modest outer margins. Keep the enlarged useful artwork within a single central horizontal band so the image can be cropped to a header without losing any logo or label.
Invariants: all FOUR publication logos and names remain; no family title block anywhere. Keep the same four publication names and order. No slogan, underline, weekdays, chart, coin, currency symbol, extra panel, duplicate logo, UI controls, watermark or mockup. Correct spelling is essential. Make the four newsletter identities the entire focus of the banner.
```
