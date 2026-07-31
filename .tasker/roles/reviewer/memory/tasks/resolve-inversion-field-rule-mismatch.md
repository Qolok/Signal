<!-- [task-doc-auto:resolve-inversion-field-rule-mismatch] -->
# Resolve Inversion Field rule mismatch
_Auto-recorded on completion (2026-07-29T02:34:00.074Z)._

## Resolved: Inversion Field Food-swap rule

**Decision:** the Food swap is **mandatory** — the Field Guide wording ("They cannot refuse.") is the rule of record; no Decline option exists in either resolution path.

### Findings
Audited the worktree state against the task description (docs/FieldGuide.md:138, game.js first-landing path ~2176-2209, and repeat/anomaly path ~5170-5203). The dispatch baseline for this task already contains the full fix:

- docs/FieldGuide.md:138 — "Choose any other player. Swap your Food tokens with theirs. They cannot refuse."
- game.js first-landing resolution (showTileRevealModal, Inversion Field branch) — offers only per-target 'Swap with <name>' buttons (or 'Acknowledge' when no valid target exists); no Decline button is rendered.
- game.js repeat/anomaly resolution (triggerAnomaly, Inversion Field case) — same: only swap buttons via showModal(..., onOk = noop, okLbl = "", onCancel = undefined, cancelLbl = undefined, ...), so no Decline/Cancel button is created; the tile-tip text ('Choose any other player. Swap your Food with theirs.') matches too.
- game-logic.js — shared inversionFieldTargets(players, actingPlayerId) (excludes the actor and the dead) and swapFood(a, b) are used by both code paths, so the eligible-target and swap logic can't drift between the two entry points. Comments in both call sites and in game-logic.js explicitly document the mandatory rule and point back to the Field Guide.

### Test coverage verified
test/game-logic.test.js already includes the requested repeat/anomaly parity coverage:
- inversionFieldTargets excludes the acting player and the dead
- swapFood exchanges Food between exactly the two given players
- Inversion Field: first-landing resolution offers no Decline, only mandatory swaps
- Inversion Field: with no other living players, first landing only offers Acknowledge
- Inversion Field: repeat/re-landing resolution offers no Decline, only mandatory swaps
- Inversion Field: repeat and first-landing resolution behave identically for the same matchup (asserts identical button sets and identical resulting Food swap between the first-landing and repeat/anomaly paths for the same matchup)

### Verification performed this session
- `node --test test/game-logic.test.js` — 31/31 tests pass, including all six Inversion Field tests above.
- `node -c game.js` and `node -c game-logic.js` — syntax OK.
- Manual review of every other 'Inversion Field' / 'decline' reference in game.js, game-logic.js, and docs/ — no remaining contradiction (the unrelated Portal anomaly and the general corruption-flavor text in FieldGuide.md legitimately mention decline/optionality and are correctly untouched).

### Outcome
No further code changes were needed — the rule (mandatory, no Decline) is already implemented identically in both resolution paths, documented consistently in the Field Guide and in-game tile tips, and covered by tests asserting first-landing/repeat parity. Working tree is clean (no diff produced by this session).
