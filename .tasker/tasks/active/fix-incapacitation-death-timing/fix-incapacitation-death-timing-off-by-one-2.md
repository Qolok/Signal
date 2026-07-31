## Result: already fixed on this branch — verified, no code changes needed

**Investigation**

`docs/FieldGuide.md:70-72` specifies: *"After 2 consecutive rounds of incapacitation, a player dies... Radio Fragments... left behind at their final location."*

I checked the current implementation against that spec:

- `game-logic.js:178-183` (`incapacitationAfterSkippedTurn`): increments `player.incapacitated` each time the player's turn comes up while still at 0 Health, and returns `died: incapacitated >= 2`. This means the player is skipped once (counter=1, alive), then dies on the *second* consecutive skipped round (counter=2) — matching the spec's "after 2 consecutive rounds," not three.
- `game.js` `advanceTurn()` (now ~line 4233-4266, was 4206-4231 in the task description before an unrelated line shift): calls this helper when the incoming player is at 0 Health, sets `player.incapacitated` from the result, kills the player and drops Radio Fragments onto their tile (`dt.droppedFragments += dying.radioFragments`, then zeroes `radioFragments`) when `died` is true, and otherwise logs `"<name> is INCAPACITATED (<n>/2 rounds). Turn skipped."` — the displayed counter matches the actual death threshold (2).
- Recovery paths (`MedPack` use at game.js:3202, `Stretcher` use at game.js:3267, and Medical Bay auto-heal at game.js:2995) all reset `player.incapacitated = 0` on heal, so a relapse to 0 Health afterward restarts the consecutive-round count from zero rather than resuming.

**Root cause of the discrepancy**: git history shows this exact bug was already fixed in commit `533087c` ("...incapacitation fix..."), which is an ancestor of this task's dispatch baseline (`10e924b`). The off-by-one no longer exists in the branch this task was dispatched against.

**Tests**: `test/game-logic.test.js` already contains full turn-sequence coverage for this behavior:
- `incapacitated crew die after two consecutive skipped turns` — unit-tests the logic helper's death threshold.
- `MedPack/Stretcher recovery resets the incapacitation counter` — verifies a relapse after recovery restarts the count instead of resuming.
- `advanceTurn: consecutive incapacitated rounds kill on the second round and drop fragments` — full `advanceTurn()` integration test: round 1 skip (alive, counter=1, log shows "INCAPACITATED (1/2 rounds)"), round 2 death with fragments dropped onto the tile and log message `"<name> has DIED."` plus the fragment-drop log.
- `advanceTurn: recovery before the second incapacitated round prevents death` — MedPack/Stretcher-style heal between rounds prevents death and resumes normal turn flow.

**Verification performed this session**:
- `node --check game.js` and `node --check game-logic.js` — both pass (no syntax errors).
- `npm test` — 25/25 tests pass, including all 4 incapacitation/death-timing tests listed above.

No source changes were required — the working tree is clean and the behavior, display text, and test coverage all already satisfy the task's requirements.