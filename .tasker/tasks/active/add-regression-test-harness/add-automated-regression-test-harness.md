Implemented an automated Node regression harness with `npm test`.

- Added `game-logic.js`, a browser/CommonJS-compatible pure-logic module.
- Refactored persistence normalization, turn ownership, multiplayer writer eligibility, private-card ownership, event-deck composition checks, incapacitation timing, and living-player turn selection to use deterministic helpers.
- Added six regression tests, including execution of the production event-deck builder in an isolated VM for both standard and IRIS games.
- Prevented online players from opening another player's private event cards and prevented non-turn owners from broadcasting state.
- Documented the single local command in `README.md`; tests do not load or connect to Firebase.

Verification:
- `npm test` - 6 passed, 0 failed
- `node --check game.js`
- `node --check game-logic.js`
- `node --check test/game-logic.test.js`
- `git diff --check`