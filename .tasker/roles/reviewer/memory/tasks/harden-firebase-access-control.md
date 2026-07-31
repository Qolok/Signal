<!-- [task-doc-auto:harden-firebase-access-control] -->
# Harden Firebase authentication and database rules
_Auto-recorded on completion (2026-07-28T23:36:49.127Z)._

## Review result

No unresolved task-scoped defects remain.

### Fixed findings

- **Critical - slot 0 privilege escalation:** `connections/{uid}` allowed any authenticated user to assign itself slot 0, which granted builder and host-for-synth state writes. Replaced it with atomically cross-validated `connections/bySlot` and `connections/byUid` claims. Claims are unique, a UID cannot claim multiple slots, both indexes must be created/removed together, and only `meta.hostId` may claim slot 0 (`database.rules.json:15-28`, `sync.js:369-515`).
- **High - asynchronous authentication restore race:** the reload path treated `Sync.init()` as a boolean and called `reconnect()` before anonymous authentication and the database handle were ready. The DOM-ready handler now awaits initialization and handles auth failure before reconnecting (`game.js:8766`, `game.js:8815-8868`).
- **High - over-broad private-state writes:** any authorized turn writer could overwrite every private slot during a pending commit. The pending state envelope now identifies the outgoing and incoming controller slots; rules validate both against old/new public state and limit private writes to those paths (`database.rules.json:41-50`, `sync.js:524-573`).
- **Medium - partial commit exposure:** private paths and pending-marker clearing were separate writes. Completion is now one atomic multi-location update, so a partially written private commit cannot become visible (`sync.js:550-573`).
- **Medium - expiry enforcement gaps:** participant data remained readable forever after room expiry, and client-supplied timestamps could extend room life. Rules now deny participant reads/writes after expiry and cap creation against server `now`; metadata remains readable only to distinguish expired codes (`database.rules.json:7-49`).
- **Medium - broken host failure state:** a failed room creation left `Sync` active and could poison subsequent host attempts. Failure now clears local room/session state and disconnect registrations (`sync.js:85-119`).
- **Low - cross-platform test failure:** two unit tests assumed LF line endings and failed on this Windows checkout. The source extraction now accepts CRLF and LF (`test/game-logic.test.js:10-14`).

### Validation

- `npm test`: **21/21 passed**.
- `npm run test:rules`: **9/9 passed** against the Realtime Database emulator, including non-host slot-0 escalation, duplicate/mismatched claims, turn ownership, synth-host writes, private-slot targeting, atomic commit completion, room enumeration, and expiry.
- `node --check sync.js` and `node --check game.js`: passed.
- `git diff --check`: passed.

The documented boundary remains explicit: rules authorize the turn writer and validate the state envelope, but a malicious authorized turn owner can still submit an illegal in-turn game move without a trusted game server (`docs/FirebaseSetup.md:39-43`).
