Implemented ghost-session cleanup in `sync.js`.

- Reuses a per-tab client identity across reloads so reconnects reclaim the existing record.
- Registers Firebase `onDisconnect().remove()` operations for both connection and lobby entries, and rearms them after network reconnects.
- Restores presence only when the original player slot remains available, preventing duplicate slot ownership.
- Removes presence and cancels pending disconnect handlers on graceful leave, session clearing, and room switching.
- Gives hosted rooms a 24-hour expiry and prunes expired rooms during join/reconnect.
- Added regression coverage for disconnect cleanup, reload identity reuse, graceful slot release, and expired-room pruning.

Validation: `npm test` - 19/19 passing; `git diff --check` clean.