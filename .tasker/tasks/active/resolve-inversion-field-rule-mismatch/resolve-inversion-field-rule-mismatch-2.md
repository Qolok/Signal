## Inversion Field rule mismatch — already resolved, verified

Investigated the reported mismatch and found the codebase in this worktree (dispatch baseline) already contains a consistent, tested implementation of the rule as **mandatory, non-refusable**. No further edits were needed; I verified correctness and coverage rather than re-doing the fix.

### Decision confirmed
Inversion Field Food swap is **mandatory** — the acting player must choose a target and swap; neither side may decline. This matches `docs/FieldGuide.md`'s existing wording ("They cannot refuse").

### State of each location
- **`docs/FieldGuide.md:138`** — "Choose any other player. Swap your Food tokens with theirs. They cannot refuse." Correct, no changes needed.
- **`game.js` first-landing path (`showTileRevealModal`, Inversion Field branch, ~line 2176-2209)** — Offers only per-target "Swap with X" buttons (or "Acknowledge" when no valid targets exist). No Decline button. Comment explicitly documents the mandatory rule and cites the Field Guide.
- **`game.js` repeat/anomaly path (`triggerAnomaly`, Inversion Field case, ~line 5170-5203)** — Same: only "Swap with X" buttons, no Decline. Same explanatory comment.
- **`game-logic.js`** — Both paths call shared helpers `inversionFieldTargets(players, actingPlayerId)` (excludes the actor and dead players) and `swapFood(playerA, playerB)`, so the eligibility and swap logic can't drift out of sync between the two resolution paths again.

### Test coverage (`test/game-logic.test.js`)
Existing tests explicitly cover this rule and pass:
- `inversionFieldTargets excludes the acting player and the dead`
- `swapFood exchanges Food between exactly the two given players`
- `Inversion Field: first-landing resolution offers no Decline, only mandatory swaps`
- `Inversion Field: with no other living players, first landing only offers Acknowledge`
- `Inversion Field: repeat/re-landing resolution offers no Decline, only mandatory swaps`
- `Inversion Field: repeat and first-landing resolution behave identically for the same matchup` (asserts both paths produce the same button set and the same resulting Food swap for an identical scenario)

### Verification performed
Ran `node --test test/game-logic.test.js`: **31/31 tests pass**, including all 6 Inversion Field tests above.

### Outcome
No code or doc changes were required — the rule mismatch described in the task was already fixed and covered by tests in the current branch state. Confirmed consistency across the Field Guide, both game.js resolution paths, and the shared game-logic.js helpers, and confirmed the full suite is green.