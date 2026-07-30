# Firebase multiplayer setup

Signal uses Firebase Anonymous Authentication and Realtime Database rules stored
in this repository. The web configuration is public by design; access control is
provided by authentication and `database.rules.json`.

## Setup and deployment

1. Create a Firebase web app and Realtime Database, then put its web configuration
   in `FIREBASE_CONFIG` in `sync.js`.
2. In Firebase Authentication, enable the **Anonymous** sign-in provider.
3. Configure **App Check** (see below) so only the real client can reach the
   database.
4. Install dependencies with `npm install`.
5. Select the intended Firebase project (`firebase use <project-id>`) and deploy
   the checked-in rules with `npm run deploy:rules`.

Do not use Realtime Database test mode or maintain a separate console-only
ruleset. Run `npm run test:rules` before deploying rule changes. The database
emulator requires Java.

## App Check (client attestation)

App Check attests that database traffic originates from this web app rather than
a scripted client, which is what makes the abuse limits below meaningful. It is
loaded by `firebase-app-check-compat.js` in `index.html` and activated in
`Sync.init()` before authentication.

1. In **Build → App Check**, register this web app with the **reCAPTCHA v3**
   provider. reCAPTCHA v3 runs invisibly and needs no user interaction.
2. Create a reCAPTCHA v3 site key for your domain(s) in the Google reCAPTCHA
   admin console (or let the Firebase console create one), and paste the **site
   key** into `APP_CHECK_RECAPTCHA_SITE_KEY` in `sync.js`. The site key is public
   and safe to ship; keep the matching **secret** in the Firebase console only.
3. In **App Check → Realtime Database**, switch enforcement to **Enforced** once
   the deployed client is attesting successfully. Until then requests from the
   client still pass (monitoring mode), so verify metrics before enforcing.
4. **Local development / emulator:** App Check has no attestation provider on
   `localhost`. Set a debug token before Firebase initializes — add
   `self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;` in a `<script>` above the Firebase
   SDK tags (or paste a fixed token string), then register the printed token
   under **App Check → Apps → Manage debug tokens**. Never commit a real debug
   token. The `@firebase/rules-unit-testing` emulator used by `npm run test:rules`
   does not evaluate App Check, so rule tests are unaffected.

If the App Check SDK or site key is missing, `Sync.init()` logs a warning and
continues so local play still works; only enforce on the database once the live
client is attesting.

## Abuse controls

**Room-creation rate limit (per uid).** `hostGame()` writes the room metadata and
a `hosts/$uid/lastCreated` throttle token in a single atomic update. The token
contains both `created` and `roomCode`: the rules require those values to match
the room being created, so one accepted token cannot be replayed for another
code. They also reject a new token — and therefore the whole room creation —
when the same uid created a room less than 15 s ago
(`ROOM_CREATE_MIN_INTERVAL_MS` in `sync.js`, mirrored by the `+ 15000` guard in
`database.rules.json`). This caps how fast one authenticated client can spin up
rooms. Adjust both constants together if you change the interval.

**Room-code entropy.** `generateJoinCode()` draws an 8-character code from a
32-symbol unambiguous alphabet using the Web Crypto CSPRNG (~40 bits, 32^8 ≈
1.1 × 10^12). Codes are unpredictable and the space is far larger than the older
6-character `Math.random()` codes, so brute-forcing a live code through the
auth-gated `meta` read rule is impractical. There is still no read permission on
`/games`, so rooms cannot be listed.

## Security model

Knowing an eight-character room code permits an authenticated, App Check-attested
client to read the room's public metadata, lobby, connections, builder, and
public game state. There is no read permission on `/games`, so rooms cannot be
listed. Treat room codes as short-lived capabilities, not passwords.

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
code from a missing room.

Pruning is enforced two ways. The `$code` rule lets any authenticated client
delete a whole room **once it has expired** (and only then — live rooms cannot be
deleted this way), and the client uses that permission to opportunistically
remove any expired room it lands on during `joinGame()` / `reconnect()`. Because
Realtime Database rules cannot delete data on a timer, rooms that no client ever
revisits still need a scheduled trusted cleanup (for example, an Admin SDK Cloud
Function) that deletes `/games` children whose `meta/expiresAt` is in the past.
The same job should prune stale `hosts/$uid` throttle tokens.

Authentication changes connection keys from legacy random session IDs to
Firebase UIDs. Deploy the client and rules together. Existing rooms will no
longer be writable after the cutover; players must create new rooms. No durable
game data migration is required because rooms are ephemeral.
