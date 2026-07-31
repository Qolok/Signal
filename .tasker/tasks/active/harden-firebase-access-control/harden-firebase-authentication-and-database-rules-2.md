Implemented deployable Firebase access control.

- Added anonymous Firebase Auth and bound all persisted client ownership to the authenticated UID.
- Added repository-backed RTDB rules and Firebase emulator configuration covering non-enumerable rooms, connection/lobby ownership, host-only builder writes, existing-turn state authorization, monotonic revisions, private-slot reads, pending private writes, and expiry enforcement.
- Added emulator rule tests plus Firebase test/deploy scripts.
- Documented secure setup, deployment, App Check, 24-hour expiry cleanup, migration cutover, and the limits of client-authored game-state validation.
- Removed client-side deletion of expired rooms because untrusted clients no longer have room-level delete permission.

Validation:
- `npm test`: 19/19 passing.
- `npm run test:rules`: 6/6 passing against the Realtime Database emulator.
- `git diff --check`: clean.