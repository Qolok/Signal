## Validate all remote Firebase state at ingress, not just names

Extended client-side ingress validation from just identity fields (name/color/portrait) to the **entire** incoming multiplayer snapshot, so a compromised, buggy, or pre-rules-deploy peer cannot corrupt or hang another client's local state.

### What was consuming untrusted data
- **`game.js` `receiveRemoteState(data)`** is the state-apply path. It ran `normalizeSavedGame` → `normalizePlayerIdentities` → `mergePrivateGameState`, then adopted the snapshot with `G = sg` and immediately used it (`cp()`, `bfsReach(cp().q, cp().r, G.movementLeft)`, positions, `cardUid`). Only identity strings were hardened; numeric counters, positions, enums, counts, and revision fields were trusted verbatim.
- **`sync.js` `_startListening`** already validated revision numbers via `_revisionOf` (safe non-negative integer coercion), but did not guard against a non-object `state` value.

### Changes

**`game-logic.js`** (shared, unit-testable module) — added ingress validators and exported them:
- `clampInt(value, min, max, fallback)` — coerces to a finite rounded integer, else falls back; used for all numeric ranges.
- `safeRevision(value)` — safe non-negative integer or 0 (for revision/`cardUid` counters; mirrors sync.js `_revisionOf`).
- `sanitizeIncomingGameState(game, opts)` — validates/clamps a normalized remote snapshot **in place**, returning the game or **`null`** when it is too malformed to trust (empty/oversized/non-array player list, non-object root). It clamps:
  - `currentPlayer` → `[0, players.length-1]` (prevents `cp()` being `undefined` and throwing after `G` was already swapped in),
  - `turn`, `phase` (enum: roll/move/action/stasis/over), `movementLeft` (bounds the BFS reach expansion — blocks a `movementLeft: 1e9` DoS), `radioFragmentsActivated`, `cargoHold`, and the `tileActionUsed`/`signalRolled`/`jammerActive` booleans,
  - per player: `q`/`r` positions, `health` (0–3), `food`/`o2`/`battery`/`scannerCharges`, `radioFragments`, `incapacitated` (0–2), `signalArrayRounds`, the `alive`/`isSynth`/`inStasis`/`stunned`/`skipO2` booleans, and `equipment` (array of objects only — non-object entries dropped). Player `id` is **reindexed positionally** so a remote-spoofed id can't remap identity.
  - tile ids: entries whose key isn't a valid `"<int>,<int>"` pair or whose value isn't an object are dropped from the tiles Map.

**`game.js`** — `receiveRemoteState` now calls `sanitizeIncomingGameState(sg)` **before** `normalizePlayerIdentities` and **before** `G = sg`; a `null` result is rejected outright (logged, snapshot discarded, existing `G` untouched). `cardUid` is now taken through `SignalGameLogic.safeRevision(data.cardUid)` instead of `data.cardUid || 0`.

**`sync.js`** — the `state` listener now rejects a non-object / array snapshot before dispatch (revisions remain validated by `_revisionOf`).

### Tests (`test/game-logic.test.js`)
Added 5 tests feeding hostile/malformed snapshots through the validator:
- hostile fields clamped to safe types/ranges/enums (out-of-range `currentPlayer`, `movementLeft: 1e9`, `Infinity`/`NaN` positions, spoofed player `id`, poisoned tile keys, non-object equipment, non-boolean flags);
- structurally unusable snapshots (`null`, `42`, `[]`, empty/`>6` player lists) rejected with `null`;
- valid snapshots pass through unchanged;
- `safeRevision` rejects negative/NaN/non-safe-integer counters;
- a source-level assertion that the apply path sanitizes **before** adopting `G = sg` and routes `cardUid` through `safeRevision`.

### Verification
`node --test test/game-logic.test.js` → **36 tests, all passing** (31 pre-existing + 5 new). `node -c` clean on `game-logic.js`, `sync.js`, `game.js`.

### Scope note
The public snapshot — the surface one client writes for all others — is fully validated. Owner-private event-card contents (`private/<index>`, re-merged by `mergePrivateGameState`) affect only the local owner's own view and are gated by the server-side writer/owner rules; the public equipment surface is validated as objects.

### Files
- `game-logic.js` (+105) — validators + exports
- `game.js` (+9/-1) — wire sanitizer + safe `cardUid`
- `sync.js` (+3) — non-object snapshot guard
- `test/game-logic.test.js` (+128) — hostile-snapshot tests