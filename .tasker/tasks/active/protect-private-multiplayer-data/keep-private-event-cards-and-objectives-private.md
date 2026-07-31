Implemented owner-aware multiplayer secret handling.

- Public online snapshots now omit the future event deck, retained private event cards, and private objective/progress fields for every player.
- The active owner's event deck and private state are stored under an owner-specific sync path and merged only into that owner's client state.
- Full local saves remain unchanged, preserving hot-seat private data and deck order.
- Existing crew-tab card rendering continues to gate private event-card opening through local/online ownership rules.
- Added tests for public redaction, owner-only restoration, wrong-owner rejection, and full local hot-seat persistence.

Validation: `npm test` (11/11 passing), `node --check game.js`, `node --check sync.js`, `node --check game-logic.js`, and `git diff --check`.