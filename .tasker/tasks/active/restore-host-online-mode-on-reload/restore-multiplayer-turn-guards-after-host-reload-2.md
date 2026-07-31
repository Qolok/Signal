## Review result

Fixed a confirmed turn-guard bypass left in the implementation.

- `Sync.isActive()` remains the single multiplayer-mode source of truth and reconnect activation occurs before the host restore path renders.
- Added handler-level ownership checks for equipment use and both stasis actions, preventing a reloaded slot-0 host from mutating another player's turn.
- Disabled the stasis controls when the local client does not own the turn, and hid equipment-use controls from non-owners.
- Strengthened the regression test so it fails if any host restore render precedes reconnect, while retaining the slot-0 host/currentPlayer-2 case.

## Validation

- Focused restored-host regression: 1/1 passing
- `npm test`: 16/16 passing
- `node --check game.js`: passing
- `node --check sync.js`: passing
- `git diff --check`: passing