# Newsletter generator modules

The five private generator repositories use a common module organization while keeping their own source adapters, editorial algorithms and reader layouts. This website repository remains the newsletter directory; generation code lives in the sibling repositories.

| Publication | Generator repository | Collection | Recommendation | Format |
| --- | --- | --- | --- | --- |
| AI | `gen-newsletter-ai` | `src/collection/` | `src/recommendation/` | `src/format/` |
| Obsidian | `gen-newsletter-obsidian` | `src/collection/` | `src/recommendation/` | `src/format/` |
| Skills | `gen-newsletter-skills` | `src/collection/` | `src/recommendation/` | `src/format/` |
| Crypto | `gen-newsletter-crypto` | `src/collection/` | `src/recommendation/` | `src/format/` |
| HN | `gen-newsletter-hn` | `src/collection/` | `src/recommendation/` | `src/format/` |

Each generator's `docs/modules.md` maps its actual entrypoints, stage inputs and outputs, policies and recovery responsibilities. Shared stage names do not imply identical implementations or a common runtime package.

## Responsibilities

- **Collection** discovers and retrieves source evidence, normalizes candidates and reports coverage. It does not score, rewrite or select recommendations.
- **Recommendation** screens candidates, reads admitted evidence, applies quality judgments and descriptions, deduplicates, ranks and selects under the publication's own policy.
- **Format** prepares the reader draft from saved editorial inputs, including sections, tags, opening and subtitle. Existing publication-specific rules remain in force; Obsidian's separate subtitle step retains its model-assisted implementation.
- **Workflow** sequences stages and preserves checkpoints, partial-run diagnostics and final-file promotion. Most orchestration lives in `src/pipeline/`; HN keeps generation orchestration inside its recommendation entrypoint and CLI. `newsletter-command.ts` connects the existing generate, format and describe commands where present.
- **Models and infrastructure** provide typed contracts, configuration, HTTP, provider clients, output paths, caches and persistent cost accounting.

Optimize a single publication and stage in its own repository. Cross-publication changes should be deliberate changes in all affected implementations, with their individual offline checks. There is no new dependency on another generator's checkout.

## Compatibility and verification

The module refactor retains existing package commands, command arguments, configuration, schema versions, cache keys, issue budgets and reader-output locations. Collection and recommendation boundaries are covered by offline import tests; existing regression tests cover source handling, editorial selection, formatting and recovery. Run `pnpm check` in each changed generator. Do not run paid generation merely to verify a structural change.

Generation prepares unpublished local drafts. Publication, copying reviewed content to a public companion and archiving remain separate manual actions requiring an explicit request.
