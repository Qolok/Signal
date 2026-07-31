## Resolution: Inversion Field swap is mandatory

**Decision:** The Food swap cannot be declined, matching `docs/FieldGuide.md:138` ("They cannot refuse") and the in-game guidance tooltip (`game.js` TILE_TIPS: "Resources change hands involuntarily"). The two code paths that offered a `Decline` button were the bug, not the docs — Anomalies are described in the Field Guide as having "strange and immediate effects," and Portal is the only anomaly explicitly marked optional ("You may decline"), so Inversion Field's mandatory framing is preserved.

### Changes

- **`game-logic.js`**: Added two small pure helpers shared by both resolution paths, so the rule can't drift out of sync again:
  - `inversionFieldTargets(players, actingPlayerId)` — living players excluding the actor.
  - `swapFood(playerA, playerB)` — the Food swap itself.
- **`game.js`**:
  - First-landing path (`showTileRevealModal`, ~line 2176): removed the `Decline` button; swap buttons now use the shared helpers. The "no other players" case still shows `Acknowledge` (that's a no-op fallback, not a refusal of the swap).
  - Repeat/re-landing path (`triggerAnomaly`, ~line 5170): removed the `Decline`-labeled modal button and the "declined" log message; body text updated from "...swap Food with, or decline" to "...swap Food with." The modal now only presents the mandatory swap-target buttons.
- **`docs/FieldGuide.md`**: No change needed — already states the mandatory rule correctly.

### Test coverage added (`test/game-logic.test.js`)

- Unit tests for `inversionFieldTargets` and `swapFood`.
- A DOM-stub harness that loads the real `showTileRevealModal` (first-landing path) and the real `triggerAnomaly` + `showModal` (repeat path) directly from `game.js` via `vm`, then asserts for both:
  - No button/label containing "Decline" is ever rendered.
  - Only mandatory `Swap with <name> (<food> Food)` buttons appear (or `Acknowledge` when there are no valid targets).
  - Clicking a swap button correctly exchanges Food between the two players.
- A cross-path parity test confirming the first-landing and repeat resolution paths produce the identical button set and identical resulting Food swap for the same matchup.

### Verification

- `node --check game.js game-logic.js test/game-logic.test.js` — no syntax errors.
- `npm test` — 31/31 tests passing (27 pre-existing + 4 new), no regressions.