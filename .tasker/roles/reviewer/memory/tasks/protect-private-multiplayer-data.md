<!-- [task-doc-auto:protect-private-multiplayer-data] -->
# Keep private event cards and objectives private
_Auto-recorded on completion (2026-07-28T22:40:38.120Z)._

## Review result

No remaining confirmed defects in the task scope.

Fixed two high-severity privacy defects found during review:

- Public snapshots still exposed `soloRescueActive`, `rfExtractionActive`, and `signalArrayRounds`; these fields now serialize into owner-only state and restore only for that owner.
- Sync read and transaction operations downloaded the full room, including every owner's private subtree; transactions now operate only on public `state`, listeners read only `private/<currentOwner>`, and pending public revisions are released only after matching private writes complete.

Also cleared the future event deck from the previous owner's server record and local online state after a successful turn handoff, while preserving full local hot-seat saves. Added coverage for local and online card ownership, public objective redaction, owner-only restoration/defaults, restricted private-path reads, deck handoff, and preservation of another owner's stored secrets.

Validation:

- `npm test` - 12/12 passing
- `node --check game.js`
- `node --check sync.js`
- `node --check game-logic.js`
- `git diff --check`
