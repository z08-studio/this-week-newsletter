# Compact horizontal rows and reading pane

Local candidate prepared on November 5, 2026. Awaiting the editor's review; this change has not been deployed or applied to production configuration.

## Result

The page retains its left/right structure. Seven weekday rows appear on the left, with newsletters arranged horizontally and independently scrollable. A persistent right-hand pane shows the selected day or publication, including the existing reviewed issue links. The implementation follows the editor's latest direction and uses no drawer or modal overlay.

The masthead, illustration, weekday spacing, and title cards are more compact. The existing palette, variable DM Sans font, original artwork, studio links, 33 publication records, 85 reviewed issues, metadata, and analytics identifiers are preserved. The footer remains near the bottom on short pages.

## Verification

Chrome checks covered the static local build:

- All 33 publication profiles and seven day overviews selected the correct content at 1501 × 1000 CSS pixels. All 40 states retained a 580px directory and a footer document position of 910.18px. The largest reader was 532.19px high. No horizontal page overflow was observed.
- Mouse dragging an overflowing Tuesday rail moved it by more than 339px while the Thursday day overview remained selected. Releasing the pointer ended the drag, and later clicks selected normally.
- Native touch emulation at 390px moved a Monday rail by more than 291px without selecting a publication. Only that row moved. Navigation buttons also expose offscreen cards.
- Keyboard navigation reached and revealed the final card in an overflowing row. Enter selected it. Returning to a weekday, browser Back/Forward, and shared publication links preserve the established reading flow.
- The right pane stacks below the calendar on small screens. At 320 × 568 CSS pixels, the R Weekly profile retained three issue links, its archive was reachable, and the page had no horizontal overflow. The reader was correctly static.
- Reduced-motion emulation disabled CSS transitions and smooth navigation. Temporary browser overrides are cleared after review captures.
- The local build loads no Google tag. No application console errors were found in the checked tab.
- Astro check passed with 26 files and no errors, warnings, or hints. The production build and whitespace check passed. The preserved HTML includes seven rails, seven day views, 33 profiles, 85 issue links, and the root canonical and matching structured data.

The candidate preview is served locally at port 4322. Normal development remains on port 4321. Working screenshots and state measurements are in ignored `output/horizontal-rails/`, using the `compact-` filename prefix for this candidate.

## Review focus

Review the overall density, the balance between left-hand rows and the right-hand reading pane, complete newsletter labels, and independent horizontal scrolling. Production deployment awaits the editor's review.
