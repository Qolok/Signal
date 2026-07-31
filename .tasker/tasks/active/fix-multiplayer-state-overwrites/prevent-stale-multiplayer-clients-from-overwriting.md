Implemented stale-state protection for multiplayer saves.

- Crew-tab viewing and remote-state rendering now use local-only UI saves; `viewedPlayer` is excluded from shared state.
- Shared writes require the existing active-player authorization check and an explicit publish request.
- Firebase state writes now use an atomic revision transaction, rejecting stale client snapshots.
- Multiplayer revision tracking resets cleanly across host/join/reconnect/leave sessions.
- Added regression coverage for stale waiting-client writes and crew-tab interactions.

Validation:
- `node --check game.js game-logic.js sync.js` (run individually): passed
- `npm test`: 8/8 passed
- `git diff --check`: passed