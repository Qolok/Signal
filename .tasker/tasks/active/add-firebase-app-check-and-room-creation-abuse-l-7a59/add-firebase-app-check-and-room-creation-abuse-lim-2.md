# Fixed reusable room-creation throttle tokens

The per-uid throttle token is now an object containing `created` and `roomCode`. Database rules require both values to match the room metadata and `$code`, while retaining the 15-second timestamp advance guard. This prevents an accepted token for `ROOMAAAA` from authorizing `ROOMBBBB`.

## Changes

- `database.rules.json`: changed `hosts/$uid/lastCreated` from a scalar to the validated `{created, roomCode}` shape; room creation checks both fields, including `roomCode === $code`.
- `sync.js`: `hostGame()` writes the room-bound token in the existing atomic root update.
- `test/database-rules.test.js`: updated existing throttle fixtures and added the exact replay regression proving a token accepted for `ROOMAAAA` cannot create `ROOMBBBB` without advancing/rebinding the token.
- `docs/FirebaseSetup.md`: documented the room binding and replay protection.

## Verification

- `npm test`: 36 passed, 0 failed.
- `npm run test:rules`: 13 passed, 0 failed; the new replay regression passed.
- `git diff --check`: passed.