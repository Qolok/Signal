## Summary

Implemented the Field Guide Solo Play rule (docs/FieldGuide.md:47-49): "Remove all Private Event cards from the deck."

### Changes

**game.js**
- `buildEventDeck()` now takes a `humanPlayerCount` parameter. When it equals `1` (solo), the internal `add()` helper skips every card with `pub === false`, so no Private Event card ever enters the deck. Public cards (yields, hazards, narrative, IRIS threat) are unaffected, and radio-fragment cards (`rf: true`) are always public so they still appear.
- The deck-composition sanity check (`console.warn` guard) now compares against `SignalGameLogic.expectedEventDeckComposition(addSynth, humanPlayerCount)` so it validates correctly in both solo and multiplayer modes.
- `newGame()` now calls `buildEventDeck(names.length)` — `names` is the human player list built before IRIS is appended, so this correctly derives the human player count regardless of whether IRIS is added.

**game-logic.js**
- `expectedEventDeckComposition(withSynth, humanPlayerCount)` gained a second parameter. When `humanPlayerCount === 1` it returns `{ total: 51, public: 51, private: 0, irisThreat }` (no private cards); otherwise it returns the original `{ total: 80, public: 51, private: 29, irisThreat }`. `irisThreat` is unaffected by player count — IRIS's 2 threat cards are public and appear whenever `addSynth` is true, in both solo and multiplayer.

### Tests (test/game-logic.test.js)
- Updated the existing composition test to extract `buildEventDeck(humanPlayerCount)` (new signature) and exercise multiplayer counts (2, 3, 4 humans) with and without IRIS.
- Added a new test `solo play (1 human) removes all private event cards, multiplayer keeps them` covering representative player counts (1 solo, 2, 4) crossed with `addSynth` true/false, asserting:
  - deck composition matches `expectedEventDeckComposition` exactly
  - solo decks have zero private cards and no `pub === false` card ever appears (deck size 51)
  - multiplayer decks retain all 29 private cards (deck size 80)
  - both Radio Fragment cards (`rf: true`) survive in every mode, including solo
  - IRIS corruption cards appear only when `addSynth` is true (2 cards), are always public, and are present in solo as well as multiplayer

### Verification
- `node --test test/game-logic.test.js` — all 25 tests pass, including the 2 new/updated event-deck tests.
- `node --test` (full suite) — 25/26 pass; the sole failure (`test/database-rules.test.js`) is pre-existing and unrelated: it fails with `Cannot find module '@firebase/rules-unit-testing'` because that dependency isn't installed in this environment (confirmed via `git status`/`git diff` — that file was not touched).
