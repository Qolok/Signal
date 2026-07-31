Implemented the host reload turn-guard fix.

- Removed the duplicate `_isOnlineMode` state and made `Sync.isActive()` the single source of truth for multiplayer UI, writes, private state, setup, and action guards.
- Host reconnect now activates sync synchronously before the restored game renders, so `isMyTurn()` correctly rejects slot 0 when another slot owns the saved turn.
- Added a regression test for a restored host at slot 0 with `currentPlayer` at slot 2, including reconnect-before-render ordering.

Validation:
- `npm test` - 13/13 passing
- `node --check game.js` - passing
- `git diff --check` - passing