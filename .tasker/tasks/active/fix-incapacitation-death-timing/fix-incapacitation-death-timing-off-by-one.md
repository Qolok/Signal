## Fix: incapacitation death timing off-by-one

**Root cause:** `game-logic.js` `incapacitationAfterSkippedTurn()` marked a player as dead when their skipped-round counter reached `>= 3`, but the in-game log/UI text and `docs/FieldGuide.md:70-72` both say death happens **after 2 consecutive rounds** at 0 Health. The displayed counter (`"INCAPACITATED (N/2 rounds)"` in `game.js`) already assumed a max of 2, so the counter/log and actual death timing were mismatched by one round.

**Fix:** changed the death condition in `game-logic.js` from `incapacitated >= 3` to `incapacitated >= 2` (one-line change). No other logic needed adjustment — the death/fragment-drop handling and the MedPack/Stretcher/Medical Bay recovery paths in `game.js` (which already reset `player.incapacitated = 0` on heal) were verified correct as-is.

**Tests added/updated in `test/game-logic.test.js`:**
- Updated the existing off-by-one test to assert death on the *second* consecutive skipped turn (was asserting death on the third).
- New pure-logic test verifying a MedPack/Stretcher-style reset (`incapacitated = 0`) makes a later relapse start the consecutive-round count over instead of resuming the old count.
- New `advanceTurn`-level tests (extracting the real `advanceTurn` function from `game.js` into a sandboxed `vm` context, following the existing `buildEventDeck` test pattern) that:
  - Drive two real turn cycles and confirm a player dies exactly on the second consecutive incapacitated round, with the correct `has DIED.` log and Radio Fragments dropped onto the tile they died on (`droppedFragments` updated, log message, and the player's `radioFragments` reset to 0).
  - Confirm that healing (Health restored + `incapacitated` reset to 0, mirroring the real MedPack/Stretcher/Medical Bay code paths) before the second incapacitated round prevents death and lets the turn proceed normally.

**Verification:** `npm test` — all 24 tests pass (20 previously existing + 4 new/updated for this fix).