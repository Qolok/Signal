## Completed

Hardened the remote Firebase state boundary so malformed public or owner-private state is rejected before `G` is adopted.

### Changes
- Reconstruct equipment and event cards from canonical game definitions; reject unknown IDs/effects, unsafe or duplicate UIDs, forged deck entries, and oversized collections.
- Reconstruct terrain, anomaly, ship, crash-site, and frontier tiles from canonical definitions; validate coordinate keys, POIs, types, known image assets, mutable counters/flags, trap owners, and collection bounds.
- Validate and bound every consumed game/player field, derive player locations from sanitized tiles, derive equipment counts, preserve bounded public event counts, sanitize pending logs, and discard unknown snapshot properties.
- Validate the public snapshot before private merge, then validate the merged private deck/inventory again before assignment.
- Clamp `cardUid` to at least the highest validated inventory UID to prevent future collisions.
- Added end-to-end tests through the real `receiveRemoteState` apply function using the real canonical card/tile builders. Hostile image overrides, forged decks, malformed logs, and forged private events leave the prior game untouched; forged metadata on known cards is replaced canonically.

### Verification
- `npm test`: 39/39 passing.
- `node -c game-logic.js`, `node -c game.js`, `node -c sync.js`: passing.
- Canonical ingress smoke test using the real 43-tile and 16-card builders: passing.
- `git diff --check`: clean.
- The unrelated database-rules emulator test could not load `@firebase/rules-unit-testing`, which is absent from this worktree; no rules files changed.