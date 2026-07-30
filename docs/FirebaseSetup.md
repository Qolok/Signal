# Firebase multiplayer setup

Signal uses Firebase Anonymous Authentication and Realtime Database rules stored
in this repository. The web configuration is public by design; access control is
provided by authentication and `database.rules.json`.

## Setup and deployment

1. Create a Firebase web app and Realtime Database, then put its web configuration
   in `FIREBASE_CONFIG` in `sync.js`.
2. In Firebase Authentication, enable the **Anonymous** sign-in provider.
3. Install dependencies with `npm install`.
4. Select the intended Firebase project (`firebase use <project-id>`) and deploy
   the checked-in rules with `npm run deploy:rules`.
5. Optionally enable App Check with reCAPTCHA for abuse protection.

Do not use Realtime Database test mode or maintain a separate console-only
ruleset. Run `npm run test:rules` before deploying rule changes. The database
emulator requires Java.

## Security model

Knowing a six-character room code permits an authenticated client to read the
room's public metadata, lobby, connections, builder, and public game state.
There is no read permission on `/games`, so rooms cannot be listed. Treat room
codes as short-lived capabilities, not passwords.

Slot claims are stored as matching `connections/bySlot/{slot}` and
`connections/byUid/{uid}` entries. They must be created or removed together,
which prevents duplicate slots, duplicate claims, and non-host users from
claiming slot 0. Lobby entries are keyed by the authenticated user's UID and
must reference that user's claimed slot. Builder writes are host-only.
Public state writes require the existing turn's slot owner (or the host for a
synth-controlled turn), a server-verified author UID, and a revision increment
of exactly one. Private state is readable only by its slot owner and can be
written only as part of the authorized public-state commit, for the validated
outgoing and incoming controller slots.

These rules authorize the writer and validate the state envelope; they are not
an authoritative game engine. A malicious current player can still submit an
illegal move during their own turn. Full move legality requires a trusted
server that executes the game rules.

## Expiry and migration

Rooms expire 24 hours after creation. Rules reject writes after `expiresAt`, and
deny participant-data reads after expiry; clients also reject joins and
reconnects. Metadata remains readable so clients can distinguish an expired
code from a missing room. Realtime Database rules cannot delete data on a timer,
so production deployments should use a scheduled trusted cleanup (for example,
an Admin SDK Cloud Function) to delete expired `/games` children.

Authentication changes connection keys from legacy random session IDs to
Firebase UIDs. Deploy the client and rules together. Existing rooms will no
longer be writable after the cutover; players must create new rooms. No durable
game data migration is required because rooms are ephemeral.
