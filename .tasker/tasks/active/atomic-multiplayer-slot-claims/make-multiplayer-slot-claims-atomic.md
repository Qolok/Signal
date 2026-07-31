Implemented atomic multiplayer slot claims.

- Replaced the read/choose/write join flow with a Firebase transaction on the shared `connections` node. Firebase retries the transaction on contention, and each successful join derives its slot from the committed snapshot.
- Full rooms now abort the transaction with the existing user-facing capacity error, while failed joins remain inactive and clear stale join state.
- Existing `leaveLobby()` cleanup releases the per-client connection claim; coverage verifies that the released slot is reusable.
- Added a deterministic shared Firebase mock that overlaps two joiners and verifies they receive distinct slots.
- Added full-room and slot-release regression tests.

Validation: `npm test` passes all 16 tests; `git diff --check` passes.