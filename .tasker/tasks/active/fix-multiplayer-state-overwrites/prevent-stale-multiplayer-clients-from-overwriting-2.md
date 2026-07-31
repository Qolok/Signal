## Review outcome

Corrected one high-severity defect in the submitted implementation:

- **High — stale writes were still unconditional.** `sync.js` used an atomic multi-location `update`, but atomicity alone did not compare the client's snapshot revision with the server revision. Replaced it with a room-level Firebase transaction that commits public and private state only when revisions match, increments the revision on success, serializes legitimate local writes, ignores out-of-order reads, and resets tracking safely between sessions.

Also tightened the publish boundary:

- `updateUI` is now local-only by default; all gameplay publishing callsites explicitly pass `true`.
- Crew-tab viewing, remote-state rendering, private-card dismissal, and save restoration explicitly remain local-only.
- The existing active-player authorization check remains required before `Sync.pushState` is reached.

Regression coverage now exercises a waiting client at revision 3 attempting to replace an advanced revision 4 snapshot, verifies the transaction aborts without changing shared state, then verifies a current client and queued legitimate mutations can commit revisions 5 through 7. Static coverage also prevents implicit `updateUI()` publishing from being reintroduced.

No remaining confirmed defects in the task scope.

## Validation

- `node --check game.js`
- `node --check game-logic.js`
- `node --check sync.js`
- `node --check test/game-logic.test.js`
- `npm test` — 11/11 passed
- `git diff --check` — passed