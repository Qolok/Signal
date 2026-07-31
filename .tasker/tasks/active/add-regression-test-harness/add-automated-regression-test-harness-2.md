## Completed

Reviewed and corrected the automated regression harness and its production refactors.

- Added the documented `npm test` command using Node's built-in test runner; no live Firebase connection is used.
- Covered save/restore normalization, multiplayer writer eligibility, private-card ownership and persistence, event-deck composition, third-skip incapacitation death, and living-player/turn-controller selection.
- Fixed turn handoff authorization so the outgoing owner can publish the completed transition.
- Allowed the host to publish host-controlled IRIS turns and route the private event deck to the actual controller.
- Prevented empty private hands/decks from restoring stale consumed cards.
- Prevented outgoing clients from overwriting the next player's private hand; private-card and deck updates now use separate owner routing in one atomic Firebase update.
- Removed revision-based writes that could reject rapid legitimate mutations from the sole eligible writer.

Verification:

- `npm test` - 10 passed, 0 failed
- `node --check game.js`
- `node --check game-logic.js`
- `node --check sync.js`
- `node --check test/game-logic.test.js`
- `git diff --check origin/main...HEAD`
- Clean worktree

Commit: `cfd597f` (`Fix multiplayer state regression edge cases`)