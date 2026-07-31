## Review Verdict: APPROVED — no defects found

### What was verified

**Rule implementation (`game.js:780-938`)**
- `buildEventDeck(humanPlayerCount)` correctly derives `solo = humanPlayerCount === 1` and the `add()` helper skips any card with `pub === false` when solo, so every Private Event card (resource, competing-objective, and psychological groups — 29 cards total) is excluded from a 1-human deck. Matches Field Guide 47-49 ("Remove all Private Event cards from the deck. All other rules apply unchanged.").
- Public cards (yield, hazard, narrative, radio fragments `rf: true`, and IRIS threat `irisCorruption: true`) are unaffected by the solo flag and remain in the deck.
- `newGame()` calls `buildEventDeck(names.length)` at `game.js:1516`, and `names` is the human-player-names array built *before* IRIS is pushed onto `players` (confirmed at `game.js:1424-1516`), so `humanPlayerCount` correctly excludes IRIS in every code path — solo, solo+IRIS, and full multiplayer.
- `buildEventDeck` is the sole production call site (`grep` confirmed) — no other caller needed updating for the new signature.
- `loadGame()`/`receiveRemoteState()` restore a previously-built `evtDeck` from saved state rather than rebuilding it, so no restore path is affected by the signature change.
- Manual arithmetic check of the `add()` counts confirms: non-solo public=51/private=29/total=80 (both `addSynth` true and false, since the yield-card counts are already balanced against the 2 IRIS threat cards); solo public=51/private=0/total=51. Matches `expectedEventDeckComposition`.

**`expectedEventDeckComposition` (`game-logic.js:171-176`)**
- New `humanPlayerCount` parameter returns `{total:51, public:51, private:0, irisThreat}` for solo and the original 80/51/29 split otherwise; `irisThreat` (2 when `addSynth`, else 0) is independent of player count, correctly reflecting that IRIS's threat cards are public and always present when IRIS is in the game, solo included.

**Tests (`test/game-logic.test.js:940-1007`)**
- `buildEventDeckFor` extraction correctly slices from the `buildEventDeck(humanPlayerCount)` declaration through its closing `}` (bounded by the following `// Note: The Event Cards` comment) — verified the slice boundary is exact, no truncation/overreach.
- Existing composition test extended to multiplayer counts (2, 3, 4) × addSynth (true/false).
- New test covers representative counts (1 solo, 2, 4) × addSynth (true/false), asserting: exact composition match, zero private cards / no `pub===false` card / deck size 51 in solo, 29 private / deck size 80 in multiplayer, both radio-fragment cards always present, and IRIS corruption cards present only with `addSynth`, always public, in both solo and multiplayer.
- This covers all four dimensions the task asked for: deck size, public/private counts, radio fragments, IRIS corruption cards, across representative player counts.

### Test run
- `node --test test/game-logic.test.js`: 25/25 pass, including both event-deck tests.
- `node --test` (full suite): 25/26 pass. The one failure (`test/database-rules.test.js`) is a pre-existing, unrelated environment issue — `Cannot find module '@firebase/rules-unit-testing'` — confirmed that dependency is simply not installed in this worktree; the file is untouched by this change.

### Other checks performed (no issues found)
- Every event card in `EVENT_CARDS`'s `buildEventDeck` has an explicit `pub: true|false` — no card silently falls through the `pub` check via `undefined`.
- Private-card-only mechanics (`trackSignalArray`/`soloRescueActive`, `rfExtraction`/`rfExtractionActive`, `keep`) have no other code path that assumes a private card will always be drawn — they're purely reactive to a card draw, so their absence in solo decks is safe and requires no additional guarding.

No changes requested.