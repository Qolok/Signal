Implemented the remaining remote-state ingress hardening.

- Remote snapshots now preserve the trusted player count and synth layout from the current game, or validate first-state joins against the lobby roster.
- First-state snapshots reject zero-human rosters, multiple synths, and synths outside the final slot.
- Event cards now match canonical definitions by exact resolved text as well as effect fields, preventing distinct cards with identical effects from aliasing.
- Dynamic event text is serialized with the human player count, including private kept cards.
- Added unit and real `receiveRemoteState` regressions for roster replacement/shrinkage, hostile first-state layouts, lobby count mismatches, and distinct canonical event identity.

Validation: `npm test` passes all 45 tests; `node --check game-logic.js`, `node --check game.js`, and `git diff --check` pass.