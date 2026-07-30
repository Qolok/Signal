"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { after, before, beforeEach, test } = require("node:test");
const {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} = require("@firebase/rules-unit-testing");
const { get, ref, set, update } = require("firebase/database");

const projectId = "demo-signal-rules";
const code = "ABC234";
const future = Date.now() + 60 * 60 * 1000;
let env;

const db = (uid) => env.authenticatedContext(uid).database();
const roomRef = (database, child = "") =>
  ref(database, `games/${code}${child ? `/${child}` : ""}`);

async function seedRoom(overrides = {}) {
  await env.withSecurityRulesDisabled(async (context) => {
    await set(roomRef(context.database()), {
      meta: {
        hostId: "host",
        created: Date.now(),
        expiresAt: future,
        started: false,
      },
      connections: {
        bySlot: { 0: "host", 1: "player", 2: "intruder" },
        byUid: { host: 0, player: 1, intruder: 2 },
      },
      state: {
        G: {
          currentPlayer: 1,
          players: [{ isSynth: false }, { isSynth: false }, { isSynth: true }],
        },
        _source: "host",
        _revision: 1,
        _pending: null,
      },
      private: {
        1: { ownerIndex: 1, _revision: 1 },
        2: { ownerIndex: 2, _revision: 1 },
      },
      ...overrides,
    });
  });
}

before(async () => {
  env = await initializeTestEnvironment({
    projectId,
    database: {
      rules: fs.readFileSync(
        path.join(__dirname, "..", "database.rules.json"),
        "utf8",
      ),
    },
  });
});

beforeEach(async () => {
  await env.clearDatabase();
  await seedRoom();
});

after(async () => {
  await env.cleanup();
});

test("requires authentication and prevents room enumeration", async () => {
  const anonymous = env.unauthenticatedContext().database();
  await assertFails(get(roomRef(anonymous, "meta")));
  await assertFails(get(ref(db("player"), "games")));
  await assertSucceeds(get(roomRef(db("player"), "meta")));
});

test("users own only their connection and lobby entries", async () => {
  await assertSucceeds(update(roomRef(db("newcomer"), "connections"), {
    "bySlot/3": "newcomer",
    "byUid/newcomer": 3,
  }));
  await assertFails(update(roomRef(db("newcomer"), "connections"), {
    "bySlot/4": "newcomer",
    "byUid/newcomer": 4,
  }));
  await assertFails(update(roomRef(db("player"), "connections"), {
    "bySlot/2": "player",
    "byUid/player": 2,
  }));
  await assertFails(update(roomRef(db("player"), "connections"), {
    "bySlot/1": null,
  }));
  await assertSucceeds(update(roomRef(db("player"), "connections"), {
    "bySlot/1": null,
    "byUid/player": null,
  }));

  await seedRoom();
  await assertSucceeds(set(roomRef(db("player"), "lobby/player"), {
    name: "Adaeze",
    portraitIndex: 1,
    ready: true,
    connectionSlot: 1,
  }));
  await assertFails(set(roomRef(db("player"), "lobby/intruder"), {
    name: "Adaeze",
    portraitIndex: 1,
    ready: true,
    connectionSlot: 1,
  }));
});

test("a non-host cannot claim slot zero or inherit host privileges", async () => {
  await env.withSecurityRulesDisabled(async (context) => {
    await update(roomRef(context.database(), "connections"), {
      "bySlot/0": null,
      "byUid/host": null,
    });
  });
  await assertFails(update(roomRef(db("newcomer"), "connections"), {
    "bySlot/0": "newcomer",
    "byUid/newcomer": 0,
  }));
  await assertFails(set(roomRef(db("newcomer"), "builder"), { tile: 1 }));
  await assertSucceeds(update(roomRef(db("host"), "connections"), {
    "bySlot/0": "host",
    "byUid/host": 0,
  }));
});

test("only the host writes builder state", async () => {
  await assertSucceeds(set(roomRef(db("host"), "builder"), { tile: 1 }));
  await assertFails(set(roomRef(db("player"), "builder"), { tile: 2 }));
});

test("existing turn owner writes the next revision and other players cannot", async () => {
  const nextState = {
    G: {
      currentPlayer: 2,
      players: [{ isSynth: false }, { isSynth: false }, { isSynth: true }],
    },
    _source: "player",
    _revision: 2,
    _pending: "player",
    _privateOwner: 1,
    _deckOwner: 0,
  };
  await assertSucceeds(set(roomRef(db("player"), "state"), nextState));

  await seedRoom();
  await assertFails(set(roomRef(db("intruder"), "state"), {
    ...nextState,
    _source: "intruder",
    _pending: "intruder",
  }));
  await assertFails(set(roomRef(db("player"), "state"), {
    ...nextState,
    _revision: 3,
  }));

  await seedRoom();
  await assertFails(set(roomRef(db("player"), "state"), {
    G: {
      currentPlayer: 1.5,
      players: {
        0: { isSynth: false },
        1: { isSynth: false },
      },
    },
    _source: "player",
    _revision: 2,
    _pending: "player",
    _privateOwner: 1,
    _deckOwner: 1.5,
  }));
});

test("host may write for a synth turn", async () => {
  await seedRoom({
    state: {
      G: {
        currentPlayer: 2,
        players: [{ isSynth: false }, { isSynth: false }, { isSynth: true }],
      },
      _source: "player",
      _revision: 2,
      _pending: null,
    },
  });
  await assertSucceeds(set(roomRef(db("host"), "state"), {
    G: {
      currentPlayer: 0,
      players: [{ isSynth: false }, { isSynth: false }, { isSynth: true }],
    },
    _source: "host",
    _revision: 3,
    _pending: "host",
    _privateOwner: 0,
    _deckOwner: 0,
  }));
});

test("private state is owner-readable and tied to a pending state commit", async () => {
  await assertSucceeds(get(roomRef(db("player"), "private/1")));
  await assertFails(get(roomRef(db("player"), "private/2")));
  await assertFails(set(roomRef(db("player"), "private/1"), {
    ownerIndex: 1,
    _revision: 2,
  }));

  await assertSucceeds(set(roomRef(db("player"), "state"), {
    G: {
      currentPlayer: 2,
      players: [{ isSynth: false }, { isSynth: false }, { isSynth: true }],
    },
    _source: "player",
    _revision: 2,
    _pending: "player",
    _privateOwner: 1,
    _deckOwner: 0,
  }));
  await assertFails(set(roomRef(db("player"), "private/2"), {
    ownerIndex: 2,
    _revision: 2,
  }));
  await assertSucceeds(update(roomRef(db("player")), {
    "private/1": {
      ownerIndex: 1,
      _revision: 2,
    },
    "private/0": {
      ownerIndex: 0,
      _revision: 2,
    },
    "state/_pending": null,
    "state/_privateOwner": null,
    "state/_deckOwner": null,
  }));
});

test("expired rooms expose only metadata and reject participant access", async () => {
  await seedRoom({
    meta: {
      hostId: "host",
      created: Date.now() - 2 * 60 * 60 * 1000,
      expiresAt: Date.now() - 60 * 60 * 1000,
      started: false,
    },
  });
  await assertSucceeds(get(roomRef(db("player"), "meta")));
  await assertFails(get(roomRef(db("player"), "state")));
  await assertFails(get(roomRef(db("player"), "lobby")));
  await assertFails(get(roomRef(db("player"), "private/1")));
  await assertFails(set(roomRef(db("host"), "builder"), { tile: 1 }));
});

test("room creation cannot extend expiry beyond 24 server hours", async () => {
  await env.clearDatabase();
  const now = Date.now();
  await assertFails(set(roomRef(db("host"), "meta"), {
    hostId: "host",
    created: now + 60 * 60 * 1000,
    expiresAt: now + 25 * 60 * 60 * 1000,
    started: false,
  }));
});

// Room creation must commit the room meta and the per-uid throttle token in one
// atomic write. The token's `created` must match the metadata and its `roomCode`
// binds it to one room. It can only advance once every 15s per uid, which
// rate-limits room-creation spam.
const createRoomAs = (database, uid, roomCode, created) =>
  update(ref(database), {
    [`games/${roomCode}/meta`]: {
      hostId: uid,
      created,
      expiresAt: created + 60 * 60 * 1000,
      started: false,
    },
    [`hosts/${uid}/lastCreated`]: { created, roomCode },
  });

test("room creation requires a matching per-uid throttle token", async () => {
  await env.clearDatabase();
  const now = Date.now();

  // Meta-only creation (no throttle token) is rejected.
  await assertFails(
    set(roomRef(db("creator"), "meta"), {
      hostId: "creator",
      created: now - 1000,
      expiresAt: now - 1000 + 60 * 60 * 1000,
      started: false,
    }),
  );

  // A token whose value does not equal `created` is rejected.
  await assertFails(
    update(ref(db("creator")), {
      "games/FRESHRM1/meta": {
        hostId: "creator",
        created: now - 1000,
        expiresAt: now - 1000 + 60 * 60 * 1000,
        started: false,
      },
      "hosts/creator/lastCreated": {
        created: now - 2000,
        roomCode: "FRESHRM1",
      },
    }),
  );

  // The correct atomic write succeeds.
  await assertSucceeds(createRoomAs(db("creator"), "creator", "FRESHRM1", now - 1000));
});

test("a room-bound throttle token cannot be reused for another code", async () => {
  await env.clearDatabase();
  const created = Date.now() - 1000;

  await assertSucceeds(
    createRoomAs(db("creator"), "creator", "ROOMAAAA", created),
  );

  // Reusing the unchanged token used to authorize unlimited new room codes.
  await assertFails(
    set(ref(db("creator"), "games/ROOMBBBB/meta"), {
      hostId: "creator",
      created,
      expiresAt: created + 60 * 60 * 1000,
      started: false,
    }),
  );
});

test("room creation is rate-limited to one per 15s per uid", async () => {
  await env.clearDatabase();
  const now = Date.now();

  // A recent token blocks a second room within the interval.
  await env.withSecurityRulesDisabled(async (context) => {
    await set(ref(context.database(), "hosts/creator/lastCreated"), {
      created: now - 1000,
      roomCode: "ROOMAAAA",
    });
  });
  await assertFails(createRoomAs(db("creator"), "creator", "ROOMBBBB", now));

  // A token older than the interval lets the same uid create again.
  await env.withSecurityRulesDisabled(async (context) => {
    await set(ref(context.database(), "hosts/creator/lastCreated"), {
      created: now - 60 * 1000,
      roomCode: "ROOMAAAA",
    });
  });
  await assertSucceeds(createRoomAs(db("creator"), "creator", "ROOMCCCC", now - 1000));

  // A different uid is throttled independently, not by another user's token.
  await assertSucceeds(createRoomAs(db("other"), "other", "ROOMDDDD", now - 1000));

  // One uid cannot advance another uid's throttle token.
  await assertFails(
    set(ref(db("creator"), "hosts/other/lastCreated"), {
      created: now - 1000,
      roomCode: "ROOMEEEE",
    }),
  );
});

test("expired rooms may be pruned by any authenticated client", async () => {
  // A live room cannot be deleted wholesale by a stranger.
  await assertFails(set(roomRef(db("stranger")), null));

  // Once expired, any authenticated client may delete the whole room.
  await seedRoom({
    meta: {
      hostId: "host",
      created: Date.now() - 2 * 60 * 60 * 1000,
      expiresAt: Date.now() - 60 * 60 * 1000,
      started: false,
    },
  });
  await assertSucceeds(set(roomRef(db("stranger")), null));
});
