"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const logic = require("../game-logic");

function loadAdvanceTurn() {
  const gameSource = fs.readFileSync(path.join(__dirname, "..", "game.js"), "utf8");
  const start = gameSource.indexOf("function advanceTurn(");
  const end = gameSource.indexOf("\nfunction toggleIrisDeactivation", start);
  const src = gameSource.slice(start, end);
  const logs = [];
  const context = {
    SignalGameLogic: logic,
    G: null,
    hk: (q, r) => `${q},${r}`,
    sfx: () => {},
    addLog: (msg, cls) => logs.push({ msg, cls }),
    markTilesDirty: () => {},
    updateUI: () => {},
    render: () => {},
    isMyTurn: () => false,
    _play: () => {},
    _alarmCrit: { pause() {}, play: () => Promise.resolve(), currentTime: 0 },
    hideTableDice: () => {},
    showTableDice: () => {},
    panToPlayer: () => {},
    window: {},
    doSynthTurn: () => {},
    showModal: () => {},
    e7ScreenSeq: () => {},
    clearSave: () => {},
    location: { reload: () => {} },
    setTimeout: () => {},
    viewedPlayer: 0,
    eqGalleryOffset: 0,
    console,
  };
  vm.createContext(context);
  vm.runInContext(`${src}\nthis.advanceTurn = advanceTurn;`, context);
  return { advanceTurn: context.advanceTurn, context, logs };
}

function loadPlayerChoiceRenderer() {
  const gameSource = fs.readFileSync(path.join(__dirname, "..", "game.js"), "utf8");
  const start = gameSource.indexOf("function appendPlayerChoiceContent");
  const closing = /\r?\n}\r?\n/.exec(gameSource.slice(start));
  const end = start + closing.index + closing[0].length;
  const context = {
    document: {
      createElement(tagName) {
        return {
          tagName,
          style: {},
          children: [],
          appendChild(child) {
            this.children.push(child);
          },
        };
      },
    },
  };
  vm.runInNewContext(
    `${gameSource.slice(start, end)}; result = appendPlayerChoiceContent`,
    context,
  );
  return context.result;
}

function fakeElement() {
  return {
    children: [],
    appendChild(child) {
      this.children.push(child);
    },
  };
}

// A richer DOM stub (classList/style/prepend/lastElementChild) for harnesses
// that exercise real game.js DOM-manipulating functions end-to-end.
function fakeDomElement(id) {
  let innerHTML = "";
  const el = {
    id,
    style: {
      setProperty() {},
      removeProperty() {},
    },
    textContent: "",
    children: [],
    onclick: null,
    _classes: new Set(),
    classList: {
      add(...names) {
        names.forEach((n) => el._classes.add(n));
      },
      remove(...names) {
        names.forEach((n) => el._classes.delete(n));
      },
      toggle(name, force) {
        const want = force === undefined ? !el._classes.has(name) : !!force;
        if (want) el._classes.add(name);
        else el._classes.delete(name);
        return want;
      },
      contains(name) {
        return el._classes.has(name);
      },
    },
    appendChild(child) {
      this.children.push(child);
      return child;
    },
    prepend(child) {
      this.children.unshift(child);
      return child;
    },
    remove() {},
    removeProperty() {},
    setProperty() {},
    get lastElementChild() {
      return this.children[this.children.length - 1] || null;
    },
    // Real DOM: assigning innerHTML replaces all child nodes. "" clears them.
    get innerHTML() {
      return innerHTML;
    },
    set innerHTML(value) {
      innerHTML = value;
      if (value === "") this.children = [];
    },
  };
  return el;
}

function fakeDom() {
  const registry = new Map();
  return {
    getElementById(id) {
      if (!registry.has(id)) registry.set(id, fakeDomElement(id));
      return registry.get(id);
    },
    createElement() {
      return fakeDomElement();
    },
  };
}

// Loads the real showTileRevealModal (first-landing resolution path) with
// its DOM/helper dependencies stubbed out, so its Inversion Field branch can
// be exercised directly.
function loadShowTileRevealModal() {
  const gameSource = fs.readFileSync(path.join(__dirname, "..", "game.js"), "utf8");
  const start = gameSource.indexOf("function showTileRevealModal(");
  const end = gameSource.indexOf("\nfunction drawTileEvent", start);
  const src = gameSource.slice(start, end);
  const logs = [];
  const doc = fakeDom();
  const context = {
    SignalGameLogic: logic,
    TILE_TIPS: { "Inversion Field": [[0, "", "Gravity inversion."]] },
    G: null,
    document: doc,
    getTileImg: () => null,
    trDesc: () => {},
    guidance: () => {},
    drawTileEvent: () => {},
    cancelTooltip: () => {},
    cp: () => context.G.players[context.G.currentPlayer],
    sfx: () => {},
    addLog: (msg, cls) => logs.push({ msg, cls }),
    markTilesDirty: () => {},
    updateUI: () => {},
    render: () => {},
    window: {},
    setTimeout: () => {},
    console,
  };
  vm.createContext(context);
  vm.runInContext(`${src}\nthis.showTileRevealModal = showTileRevealModal;`, context);
  return { showTileRevealModal: context.showTileRevealModal, context, logs, doc };
}

// Loads the real triggerAnomaly (repeat/re-landing resolution path) together
// with the real showModal it drives, so its Inversion Field branch produces
// an actual DOM button list to inspect.
function loadTriggerAnomaly() {
  const gameSource = fs.readFileSync(path.join(__dirname, "..", "game.js"), "utf8");
  const taStart = gameSource.indexOf("function triggerAnomaly(");
  const taEnd = gameSource.indexOf("\nfunction openTrade", taStart);
  const smStart = gameSource.indexOf("function showModal(");
  const smEnd = gameSource.indexOf("\nfunction showDieRoll", smStart);
  const src = `${gameSource.slice(taStart, taEnd)}\n${gameSource.slice(smStart, smEnd)}`;
  const logs = [];
  const doc = fakeDom();
  const context = {
    SignalGameLogic: logic,
    G: null,
    document: doc,
    cp: () => context.G.players[context.G.currentPlayer],
    sfx: () => {},
    addLog: (msg, cls) => logs.push({ msg, cls }),
    markTilesDirty: () => {},
    updateUI: () => {},
    render: () => {},
    showTileRevealModal: () => {},
    _gameoverSnd: { play: () => Promise.resolve(), pause() {}, currentTime: 0, _active: false },
    _musicEnabled: false,
    console,
  };
  vm.createContext(context);
  vm.runInContext(
    `${src}\nthis.triggerAnomaly = triggerAnomaly;\nthis.showModal = showModal;`,
    context,
  );
  return { triggerAnomaly: context.triggerAnomaly, context, logs, doc };
}

test("hostile local player names are length-limited and rendered as text", () => {
  const renderChoice = loadPlayerChoiceRenderer();
  const button = fakeElement();
  const name = logic.playerName("<img src=x onerror=alert(1)>");

  renderChoice(button, { name, color: "#abcdef" }, "♥ 3/3");

  assert.equal(name, "<img src=x onerr");
  assert.equal(button.children[0].textContent, name);
  assert.equal(button.children[0].innerHTML, undefined);
});

test("hostile online player identity fields are normalized before rendering", () => {
  const game = {
    players: [{
      name: "<b>Eve</b>",
      color: "red;position:fixed",
      portrait: "../../payload",
      equipment: [],
    }],
  };
  logic.normalizePlayerIdentities(
    game,
    ["#112233", "#9ab0c0"],
    ["Avery", "iris"],
  );
  const button = fakeElement();
  loadPlayerChoiceRenderer()(button, game.players[0]);

  assert.equal(game.players[0].name, "<b>Eve</b>");
  assert.equal(game.players[0].color, "#112233");
  assert.equal(game.players[0].portrait, "Avery");
  assert.equal(button.children[0].textContent, "<b>Eve</b>");
  assert.equal(button.children[0].innerHTML, undefined);
});

function loadSyncHarness(initialRoom) {
  const clone = (value) =>
    value === undefined ? undefined : JSON.parse(JSON.stringify(value));
  let room = clone(initialRoom);
  let stateListener = null;
  const readPaths = [];

  class Snapshot {
    constructor(value) {
      this.value = clone(value);
    }
    exists() {
      return this.value !== undefined && this.value !== null;
    }
    val() {
      return clone(this.value);
    }
  }

  const read = (pathParts) =>
    pathParts.reduce((value, part) => value?.[part], room);
  const write = (pathParts, value) => {
    if (!pathParts.length) {
      room = clone(value);
      return;
    }
    let target = room;
    for (const part of pathParts.slice(0, -1)) {
      target[part] ||= {};
      target = target[part];
    }
    target[pathParts.at(-1)] = clone(value);
  };
  const remove = (pathParts) => {
    const target = pathParts
      .slice(0, -1)
      .reduce((value, part) => value?.[part], room);
    if (target) delete target[pathParts.at(-1)];
  };

  class Ref {
    constructor(pathParts = []) {
      this.pathParts = pathParts;
    }
    child(part) {
      return new Ref([...this.pathParts, String(part)]);
    }
    set(value) {
      write(this.pathParts, value);
      return Promise.resolve();
    }
    remove() {
      remove(this.pathParts);
      return Promise.resolve();
    }
    onDisconnect() {
      return {
        remove: () => Promise.resolve(),
        update: () => Promise.resolve(),
        cancel: () => Promise.resolve(),
      };
    }
    update(values) {
      for (const [childPath, value] of Object.entries(values)) {
        const pathParts = [...this.pathParts, ...childPath.split("/")];
        if (value === null) remove(pathParts);
        else write(pathParts, value);
      }
      return Promise.resolve();
    }
    once() {
      readPaths.push(this.pathParts.join("/"));
      return Promise.resolve(new Snapshot(read(this.pathParts)));
    }
    on(event, callback) {
      if (event === "value" && this.pathParts.join("/") === "state")
        stateListener = callback;
    }
    off() {}
    transaction(update) {
      const candidate = update(clone(read(this.pathParts)));
      const committed = candidate !== undefined;
      if (committed) write(this.pathParts, candidate);
      return Promise.resolve({
        committed,
        snapshot: new Snapshot(read(this.pathParts)),
      });
    }
  }

  const storage = new Map();
  const auth = {
    currentUser: { uid: "waiting-client" },
    signInAnonymously: () => Promise.resolve(),
  };
  const context = {
    window: {},
    firebase: {
      apps: [{}],
      auth: () => auth,
      database: () => ({ ref: () => new Ref() }),
    },
    crypto: { randomUUID: () => "waiting-client" },
    localStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
      removeItem: (key) => storage.delete(key),
    },
    console,
  };
  vm.runInNewContext(
    fs.readFileSync(path.join(__dirname, "..", "sync.js"), "utf8"),
    context,
  );
  context.window.Sync.init();
  return {
    Sync: context.window.Sync,
    emitState() {
      assert.ok(stateListener);
      stateListener(new Snapshot(room.state));
    },
    room: () => clone(room),
    readPaths: () => [...readPaths],
    replaceRoom(nextRoom) {
      room = clone(nextRoom);
    },
  };
}

function loadConcurrentJoinHarness(initialRoom) {
  const clone = (value) =>
    value === undefined ? undefined : JSON.parse(JSON.stringify(value));
  let room = clone(initialRoom);
  let transactionQueue = [];
  let transactionScheduled = false;
  const transactionAttempts = [];
  const disconnectRemovals = new Map();
  const sessionStores = new Map();

  class Snapshot {
    constructor(value) {
      this.value = clone(value);
    }
    exists() {
      return this.value !== undefined && this.value !== null;
    }
    val() {
      return clone(this.value);
    }
  }

  const read = (pathParts) =>
    pathParts.reduce((value, part) => value?.[part], room);
  const write = (pathParts, value) => {
    let target = room;
    for (const part of pathParts.slice(0, -1)) {
      target[part] ||= {};
      target = target[part];
    }
    target[pathParts.at(-1)] = clone(value);
  };
  const remove = (pathParts) => {
    if (!pathParts.length) {
      room = undefined;
      return;
    }
    const target = pathParts
      .slice(0, -1)
      .reduce((value, part) => value?.[part], room);
    if (target) delete target[pathParts.at(-1)];
  };

  class Ref {
    constructor(pathParts = []) {
      this.pathParts = pathParts;
    }
    child(part) {
      return new Ref([...this.pathParts, String(part)]);
    }
    once() {
      return Promise.resolve(new Snapshot(read(this.pathParts)));
    }
    set(value) {
      write(this.pathParts, value);
      return Promise.resolve();
    }
    update(values) {
      for (const [childPath, value] of Object.entries(values)) {
        const pathParts = [...this.pathParts, ...childPath.split("/")];
        if (value === null) remove(pathParts);
        else write(pathParts, value);
      }
      return Promise.resolve();
    }
    onDisconnect() {
      const key = this.pathParts.join("/");
      const registeredKeys = [];
      return {
        remove: () => {
          disconnectRemovals.set(key, [...this.pathParts]);
          registeredKeys.push(key);
          return Promise.resolve();
        },
        update: (values) => {
          for (const [childPath, value] of Object.entries(values)) {
            if (value !== null) continue;
            const pathParts = [
              ...this.pathParts,
              ...childPath.split("/"),
            ];
            const childKey = pathParts.join("/");
            disconnectRemovals.set(childKey, pathParts);
            registeredKeys.push(childKey);
          }
          return Promise.resolve();
        },
        cancel: () => {
          registeredKeys.forEach((registeredKey) =>
            disconnectRemovals.delete(registeredKey));
          return Promise.resolve();
        },
      };
    }
    remove() {
      remove(this.pathParts);
      return Promise.resolve();
    }
    on() {}
    off() {}
    transaction(update) {
      assert.deepEqual(this.pathParts, ["connections"]);
      return new Promise((resolve) => {
        transactionQueue.push({ update, resolve });
        if (transactionScheduled) return;
        transactionScheduled = true;
        queueMicrotask(() => {
          const queued = transactionQueue;
          transactionQueue = [];
          transactionScheduled = false;
          const initialValue = clone(read(this.pathParts));
          const proposals = queued.map((transaction) => ({
            ...transaction,
            candidate: transaction.update(clone(initialValue)),
            attempts: 1,
          }));
          for (const transaction of proposals) {
            let candidate = transaction.candidate;
            if (
              candidate !== undefined &&
              JSON.stringify(read(this.pathParts)) !== JSON.stringify(initialValue)
            ) {
              candidate = transaction.update(clone(read(this.pathParts)));
              transaction.attempts++;
            }
            const committed = candidate !== undefined;
            if (committed) write(this.pathParts, candidate);
            transactionAttempts.push(transaction.attempts);
            transaction.resolve({
              committed,
              snapshot: new Snapshot(read(this.pathParts)),
            });
          }
        });
      });
    }
  }

  const createClient = (clientId, tabId = clientId) => {
    const storage = new Map();
    const sessionStorage = sessionStores.get(tabId) || new Map();
    sessionStores.set(tabId, sessionStorage);
    const auth = {
      currentUser: { uid: `client-${tabId}` },
      signInAnonymously: () => Promise.resolve(),
    };
    const context = {
      window: {},
      firebase: {
        apps: [{}],
        auth: () => auth,
        database: () => ({ ref: () => new Ref() }),
      },
      crypto: { randomUUID: () => clientId },
      localStorage: {
        getItem: (key) => storage.get(key) ?? null,
        setItem: (key, value) => storage.set(key, value),
        removeItem: (key) => storage.delete(key),
      },
      sessionStorage: {
        getItem: (key) => sessionStorage.get(key) ?? null,
        setItem: (key, value) => sessionStorage.set(key, value),
      },
      console,
      Set,
    };
    vm.runInNewContext(
      fs.readFileSync(path.join(__dirname, "..", "sync.js"), "utf8"),
      context,
    );
    context.window.Sync.init();
    return context.window.Sync;
  };

  return {
    createClient,
    disconnect(clientId) {
      const uid = clientId.startsWith("client-")
        ? clientId
        : `client-${clientId}`;
      const slot = room.connections?.byUid?.[uid];
      for (const [key, pathParts] of disconnectRemovals) {
        if (
          pathParts.at(-1) === uid ||
          (
            Number.isInteger(slot) &&
            pathParts.join("/") === `connections/bySlot/${slot}`
          )
        ) {
          remove(pathParts);
          disconnectRemovals.delete(key);
        }
      }
    },
    disconnectPresence(presenceId) {
      for (const [key, pathParts] of disconnectRemovals) {
        if (pathParts.at(-1) === presenceId) {
          remove(pathParts);
          disconnectRemovals.delete(key);
        }
      }
    },
    room: () => clone(room),
    transactionAttempts: () => [...transactionAttempts],
  };
}

test("simultaneous joiners atomically claim different player slots", async () => {
  const harness = loadConcurrentJoinHarness({
    meta: { hostId: "host" },
    connections: {
      bySlot: { 0: "host" },
      byUid: { host: 0 },
    },
  });
  const first = harness.createClient("first");
  const second = harness.createClient("second");

  const slots = await Promise.all([
    first.joinGame("ABCDEF"),
    second.joinGame("ABCDEF"),
  ]);

  assert.deepEqual(slots.sort(), [1, 2]);
  assert.deepEqual(
    Object.keys(harness.room().connections.bySlot).sort(),
    ["0", "1", "2"],
  );
  assert.deepEqual(harness.transactionAttempts(), [1, 2]);
});

test("an atomic join reports a full room without activating the client", async () => {
  const harness = loadConcurrentJoinHarness({
    meta: { hostId: "host" },
    connections: {
      bySlot: {
        0: "host",
        1: "a",
        2: "b",
        3: "c",
        4: "d",
        5: "e",
      },
      byUid: { host: 0, a: 1, b: 2, c: 3, d: 4, e: 5 },
    },
  });
  const client = harness.createClient("late");

  await assert.rejects(
    client.joinGame("ABCDEF"),
    /Game is full \(6 players maximum\)\./,
  );
  assert.equal(client.isActive(), false);
  assert.equal(client.myPlayerIndex(), null);
  assert.equal(
    Object.keys(harness.room().connections.byUid)
      .some(presenceId => presenceId.includes("late")),
    false,
  );
});

test("leaving releases an atomically claimed slot for the next joiner", async () => {
  const harness = loadConcurrentJoinHarness({
    meta: { hostId: "host" },
    connections: {
      bySlot: { 0: "host" },
      byUid: { host: 0 },
    },
  });
  const first = harness.createClient("first");
  assert.equal(await first.joinGame("ABCDEF"), 1);

  await first.leaveLobby();

  const replacement = harness.createClient("replacement");
  assert.equal(await replacement.joinGame("ABCDEF"), 1);
  assert.equal(
    Object.keys(harness.room().connections.byUid)
      .some(presenceId => presenceId.includes("first")),
    false,
  );
});

test("disconnect cleanup releases connection and lobby records", async () => {
  const harness = loadConcurrentJoinHarness({
    meta: { hostId: "host" },
    connections: {
      bySlot: { 0: "host" },
      byUid: { host: 0 },
    },
  });
  const client = harness.createClient("remote");
  assert.equal(await client.joinGame("ABCDEF"), 1);
  client.updateLobbySlot({ name: "Mizuki" });

  harness.disconnect("remote");

  assert.equal(
    Object.keys(harness.room().connections.byUid)
      .some(presenceId => presenceId.includes("remote")),
    false,
  );
  assert.equal(
    Object.keys(harness.room().lobby)
      .some(presenceId => presenceId.startsWith("remote:")),
    false,
  );
});

test("a page reload reuses its authenticated identity and player slot", async () => {
  const harness = loadConcurrentJoinHarness({
    meta: { hostId: "host" },
    connections: {
      bySlot: { 0: "host" },
      byUid: { host: 0 },
    },
  });
  const firstLoad = harness.createClient("first-id", "same-tab");
  assert.equal(await firstLoad.joinGame("ABCDEF"), 1);
  firstLoad.updateLobbySlot({ name: "First load" });
  const oldPresenceId = Object.keys(harness.room().connections.byUid)
    .find(presenceId => presenceId !== "host");

  const reloaded = harness.createClient("unused-new-id", "same-tab");
  assert.equal(await reloaded.joinGame("ABCDEF"), 1);
  reloaded.updateLobbySlot({ name: "Reloaded" });
  const currentPresenceIds = Object.keys(harness.room().connections.byUid)
    .filter(presenceId => presenceId !== "host");
  assert.equal(currentPresenceIds.length, 1);
  assert.equal(currentPresenceIds[0], oldPresenceId);
  assert.deepEqual(
    harness.room().lobby[currentPresenceIds[0]],
    { name: "Reloaded" },
  );
});

test("joining an expired room rejects and prunes it", async () => {
  const harness = loadConcurrentJoinHarness({
    meta: { hostId: "host", expiresAt: Date.now() - 1 },
    connections: {
      bySlot: { 0: "host" },
      byUid: { host: 0 },
    },
  });

  await assert.rejects(
    harness.createClient("late").joinGame("ABCDEF"),
    /game room has expired/,
  );
  // The client opportunistically deletes the expired room it landed on; the
  // rules permit deleting a room only once expired.
  assert.equal(harness.room(), undefined);
});

test("normalizes local and Firebase-shaped saved state", () => {
  const saved = {
    G: {
      tiles: { "0,0": { name: "Crash Site" } },
      terrainDeck: { 1: "second", 0: "first" },
      eqDeck: ["tool"],
      evtDeck: null,
      players: { 0: { name: "A", equipment: { 1: "b", 0: "a" } } },
    },
  };
  logic.normalizeSavedGame(saved);
  assert.ok(saved.G.tiles instanceof Map);
  assert.ok(saved.G.reach instanceof Map);
  assert.deepEqual(saved.G.terrainDeck, ["first", "second"]);
  assert.deepEqual(saved.G.eqDeck, ["tool"]);
  assert.deepEqual(saved.G.evtDeck, []);
  assert.deepEqual(saved.G.players[0].equipment, ["a", "b"]);
});

const TEST_EQ_CARDS = [
  { id: "tool", name: "Canonical Tool", cat: "Tool", txt: "Safe." },
  { id: "medpack", name: "MedPack", cat: "Supply", txt: "Heal.", use: "medpack" },
];
const TEST_EVENT_CARDS = [
  { text: "Safe public event.", pub: true, drawEq: true },
  { text: "A different safe public event.", pub: true, drawEq: true },
  { text: "Safe private objective.", pub: false, keep: true },
];
const TEST_TERRAIN_TILES = [
  {
    type: "terrain",
    pois: ["Cave"],
    radioFragment: false,
    requiresTool: null,
    toolReward: null,
    noEvent: false,
    investigatedCount: 0,
  },
  {
    type: "ship_section",
    pois: ["Airlock", "Emergency Bay", "Supply Cache"],
    investigatedCount: 0,
    imgOverride: "ship-section1.webp",
  },
];
const TEST_CRASH_TILES = [
  { q: 0, r: 0, name: "Crash Site", short: "CRASH", type: "crash_site" },
];

function testIngressOptions(overrides = {}) {
  return {
    strict: true,
    equipmentCards: TEST_EQ_CARDS,
    eventCards: TEST_EVENT_CARDS,
    tileDefinitions: TEST_TERRAIN_TILES,
    crashTiles: TEST_CRASH_TILES,
    allowedTileImages: ["ship-section1.webp"],
    ...overrides,
  };
}

function realIngressOptions(game, trustedGame, lobbyData = {}) {
  const gameSource = fs.readFileSync(path.join(__dirname, "..", "game.js"), "utf8");
  const parts = [
    gameSource.slice(
      gameSource.indexOf("const CRASH_HEXES_DEFAULT"),
      gameSource.indexOf("// FIXED 43-TILE"),
    ),
    gameSource.slice(
      gameSource.indexOf("function buildTerrainDeck("),
      gameSource.indexOf("const POI_COLOR"),
    ),
    gameSource.slice(
      gameSource.indexOf("const TILE_IMAGE_MAP"),
      gameSource.indexOf("const _BLUR_TILES"),
    ),
    gameSource.slice(
      gameSource.indexOf("const EQ_CARDS"),
      gameSource.indexOf("// Note: The Event Cards"),
    ),
    gameSource.slice(
      gameSource.indexOf("function remoteStateIngressOptions("),
      gameSource.indexOf("// Applies a game state received"),
    ),
  ];
  const context = {
    SignalGameLogic: logic,
    _onlineLobbyData: lobbyData,
    addSynth: false,
    console,
    Math,
  };
  vm.runInNewContext(
    `${parts.join("\n")}\nthis.makeOptions = remoteStateIngressOptions;`,
    context,
  );
  return context.makeOptions(game, trustedGame);
}

function validIngressGame() {
  return {
    currentPlayer: 0,
    turn: 1,
    phase: "roll",
    movementLeft: 0,
    radioFragmentsActivated: 0,
    cargoHold: 5,
    tileActionUsed: false,
    signalRolled: false,
    jammerActive: false,
    tiles: new Map([
      [
        "0,0",
        {
          q: 0,
          r: 0,
          name: "Crash Site",
          short: "CRASH",
          type: "crash_site",
          revealed: true,
        },
      ],
    ]),
    terrainDeck: [],
    eqDeck: [],
    eqDeckCount: 0,
    evtDeck: [],
    evtDeckCount: 0,
    lastPublicEvt: null,
    _pendingLogs: [],
    players: [
      {
        id: 0,
        name: "A",
        color: "#112233",
        portrait: "Avery",
        q: 0,
        r: 0,
        health: 3,
        food: 5,
        o2: 3,
        radioFragments: 0,
        incapacitated: 0,
        signalArrayRounds: 0,
        scannerCharges: 3,
        alive: true,
        equipment: [],
      },
    ],
  };
}

test("hostile remote snapshot fields are clamped to safe types/ranges/enums", () => {
  const game = validIngressGame();
  Object.assign(game, {
    currentPlayer: 99, // out of range -> index would crash cp()
    turn: -5,
    phase: "javascript:alert(1)",
    movementLeft: 1e9, // would blow up the BFS reach expansion
    radioFragmentsActivated: -3,
    cargoHold: Number.NaN,
    tileActionUsed: "yes",
    signalRolled: 1,
    jammerActive: "true",
  });
  Object.assign(game.players[0], {
    id: 5, // spoofed identity
    q: "9999",
    r: Number.POSITIVE_INFINITY,
    health: 99,
    food: -10,
    o2: Number.NaN,
    radioFragments: -1,
    incapacitated: 7,
    signalArrayRounds: -4,
    scannerCharges: "3",
    alive: "truthy-string",
    isSynth: 1,
    inStasis: "x",
    equipment: [
      {
        id: "tool",
        uid: 7,
        name: "<img>",
        cat: "Weapon",
        txt: { hostile: true },
      },
    ],
  });

  const result = logic.sanitizeIncomingGameState(game, testIngressOptions());
  assert.ok(result);
  assert.equal(result.currentPlayer, 0);
  assert.equal(result.turn, 1);
  assert.equal(result.phase, "roll");
  assert.equal(result.movementLeft, 64);
  assert.equal(result.radioFragmentsActivated, 0);
  assert.equal(result.cargoHold, 0);
  assert.equal(result.tileActionUsed, false);
  assert.equal(result.signalRolled, false);
  assert.equal(result.jammerActive, false);

  const p = result.players[0];
  assert.equal(p.id, 0); // reindexed positionally, spoofed id dropped
  assert.equal(p.q, 64);
  assert.equal(p.r, 0); // Infinity -> fallback
  assert.equal(p.health, 3);
  assert.equal(p.food, 0);
  assert.equal(p.o2, 0);
  assert.equal(p.radioFragments, 0);
  assert.equal(p.incapacitated, 3);
  assert.equal(p.signalArrayRounds, 0);
  assert.equal(p.scannerCharges, 3);
  assert.equal(p.alive, false); // only strict boolean true is honored
  assert.equal(p.isSynth, false);
  assert.equal(p.inStasis, false);
  assert.deepEqual(p.equipment, [{ ...TEST_EQ_CARDS[0], uid: 7 }]);
  assert.equal(p.location, "Unknown");
});

test("structurally unusable remote snapshots are rejected outright", () => {
  assert.equal(logic.sanitizeIncomingGameState(null), null);
  assert.equal(logic.sanitizeIncomingGameState(42), null);
  assert.equal(logic.sanitizeIncomingGameState([]), null);
  assert.equal(logic.sanitizeIncomingGameState({ players: [] }), null);
  assert.equal(logic.sanitizeIncomingGameState({ players: null }), null);
  // More players than the 6-slot maximum is a corruption signal, not clamped
  assert.equal(
    logic.sanitizeIncomingGameState({
      players: Array.from({ length: 7 }, () => ({})),
    }),
    null,
  );
});

test("valid remote snapshot fields pass through unchanged", () => {
  const game = validIngressGame();
  game.players.push({
    id: 1,
    name: "B",
    color: "#445566",
    portrait: "Blake",
    q: 0,
    r: 0,
    health: 3,
    food: 4,
    o2: 2,
    alive: true,
    isSynth: true,
    equipment: [],
  });
  Object.assign(game, {
    currentPlayer: 1,
    turn: 4,
    phase: "move",
    movementLeft: 3,
  });
  Object.assign(game.players[0], { q: 1, r: -1, health: 2 });
  const result = logic.sanitizeIncomingGameState(game, testIngressOptions());
  assert.equal(result.currentPlayer, 1);
  assert.equal(result.phase, "move");
  assert.equal(result.movementLeft, 3);
  assert.equal(result.players[1].isSynth, true);
  assert.deepEqual(
    result.players.map((p) => [p.q, p.r, p.health]),
    [[1, -1, 2], [0, 0, 3]],
  );
});

test("remote roster count and synth layout must remain immutable", () => {
  const existing = validIngressGame();
  existing.players.push({
    ...existing.players[0],
    id: 1,
    name: "B",
    equipment: [],
  });
  const options = testIngressOptions({
    expectedPlayerLayout: [false, false],
  });

  const shrunk = validIngressGame();
  assert.equal(logic.sanitizeIncomingGameState(shrunk, options), null);

  const synthReplacement = structuredClone(existing);
  synthReplacement.tiles = new Map(existing.tiles);
  synthReplacement.players[1].isSynth = true;
  assert.equal(
    logic.sanitizeIncomingGameState(synthReplacement, options),
    null,
  );
});

test("first remote state permits at most one final synth", () => {
  const twoSynths = validIngressGame();
  twoSynths.players[0].isSynth = true;
  twoSynths.players.push({
    ...twoSynths.players[0],
    id: 1,
    equipment: [],
  });
  assert.equal(
    logic.sanitizeIncomingGameState(twoSynths, testIngressOptions()),
    null,
  );

  const nonFinalSynth = validIngressGame();
  nonFinalSynth.players[0].isSynth = true;
  nonFinalSynth.players.push({
    ...nonFinalSynth.players[0],
    id: 1,
    isSynth: false,
    equipment: [],
  });
  assert.equal(
    logic.sanitizeIncomingGameState(nonFinalSynth, testIngressOptions()),
    null,
  );

  const onlySynth = validIngressGame();
  onlySynth.players[0].isSynth = true;
  assert.equal(
    logic.sanitizeIncomingGameState(onlySynth, testIngressOptions()),
    null,
  );
});

test("event canonicalization preserves cards with identical effect flags", () => {
  const game = validIngressGame();
  game.lastPublicEvt = { ...TEST_EVENT_CARDS[1] };
  const result = logic.sanitizeIncomingGameState(game, testIngressOptions());
  assert.ok(result);
  assert.equal(result.lastPublicEvt.text, TEST_EVENT_CARDS[1].text);
});

test("canonical collections reject hostile cards, tiles, events, and logs", () => {
  const cases = [
    (game) => {
      game.tiles.set("1,0", {
        type: "terrain",
        pois: ["Cave"],
        revealed: true,
        imgOverride: {},
      });
    },
    (game) => {
      game.players[0].equipment = [{ id: "root_shell", uid: 1 }];
    },
    (game) => {
      game.eqDeck = [{ id: "root_shell" }];
    },
    (game) => {
      game.terrainDeck = [{ type: "terrain", pois: ["../../payload"] }];
    },
    (game) => {
      game.evtDeck = [{ text: "Do arbitrary damage.", pub: true, loseHealth: 99 }];
    },
    (game) => {
      game._pendingLogs = [{ msg: {}, cls: "crit" }];
    },
    (game) => {
      game._pendingLogs = [{ msg: "Looks safe", cls: 0 }];
    },
    (game) => {
      game.players.push({
        ...game.players[0],
        id: 1,
        equipment: [{ id: "tool", uid: 7 }],
      });
      game.players[0].equipment = [{ id: "medpack", uid: 7 }];
    },
  ];

  for (const mutate of cases) {
    const game = validIngressGame();
    mutate(game);
    assert.equal(
      logic.sanitizeIncomingGameState(game, testIngressOptions()),
      null,
    );
  }
});

test("remote revision/cardUid counters reject unsafe values", () => {
  assert.equal(logic.safeRevision(7), 7);
  assert.equal(logic.safeRevision(0), 0);
  assert.equal(logic.safeRevision(-1), 0);
  assert.equal(logic.safeRevision("nope"), 0);
  assert.equal(logic.safeRevision(Number.NaN), 0);
  assert.equal(logic.safeRevision(2 ** 53), 0); // beyond safe-integer range
});

test("the remote apply path sanitizes the snapshot before adopting it", () => {
  const gameSource = fs.readFileSync(path.join(__dirname, "..", "game.js"), "utf8");
  const start = gameSource.indexOf("function receiveRemoteState(");
  const end = gameSource.indexOf("\nfunction _updateMpBadge", start);
  const src = gameSource.slice(start, end);
  const sanitizeAt = src.indexOf("sanitizeIncomingGameState");
  const rejectAt = src.indexOf("return;", sanitizeAt);
  const adoptAt = src.indexOf("G = sg;");
  assert.ok(sanitizeAt >= 0, "receiveRemoteState must sanitize the snapshot");
  assert.ok(rejectAt > sanitizeAt, "a malformed snapshot must be rejected");
  assert.ok(adoptAt > sanitizeAt, "sanitization must precede adopting G = sg");
  assert.match(src, /SignalGameLogic\.safeRevision\(data\.cardUid\)/);
});

function firebaseRemoteData() {
  const game = validIngressGame();
  return {
    G: {
      ...game,
      tiles: Object.fromEntries(game.tiles),
      players: game.players.map((player) => ({ ...player })),
    },
    cardUid: 12,
  };
}

function loadReceiveRemoteState({
  existingGame = validIngressGame(),
  lobbyData = {},
} = {}) {
  const gameSource = fs.readFileSync(path.join(__dirname, "..", "game.js"), "utf8");
  const start = gameSource.indexOf("function receiveRemoteState(");
  const end = gameSource.indexOf("\nfunction _updateMpBadge", start);
  const source = gameSource.slice(start, end);
  const document = fakeDom();
  document.getElementById("game").className = "running";
  let renders = 0;
  let receiveDepth = 0;
  const context = {
    SignalGameLogic: logic,
    G: existingGame,
    cardUid: 4,
    viewedPlayer: 0,
    eqGalleryOffset: 0,
    PCOLORS: ["#112233"],
    SYNTH_COLOR: "#9ab0c0",
    CREW_PORTRAITS: [{ name: "Avery" }],
    remoteStateIngressOptions: (game, trustedGame) =>
      realIngressOptions(game, trustedGame, lobbyData),
    document,
    window: {
      Sync: {
        beginReceive: () => receiveDepth++,
        endReceive: () => receiveDepth--,
        isActive: () => true,
        myPlayerIndex: () => 0,
      },
    },
    cp: () => context.G.players[context.G.currentPlayer],
    bfsReach: () => new Map(),
    markTilesDirty: () => {},
    render: () => {
      renders++;
      for (const tile of context.G.tiles.values())
        if (tile.imgOverride) tile.imgOverride.replace(/\.webp$/, "");
    },
    updateUI: () => {},
    sfx: () => {},
    addLog: () => {},
    showTableDice: () => {},
    hideTableDice: () => {},
    panToPlayer: () => {},
    doSynthTurn: () => {},
    preloadTileImages: () => {},
    initBoard: () => {},
    e7Seq: () => {},
    _maybeTourPrompt: () => {},
    _updateMpBadge: () => {},
    setTimeout: () => {},
    console: { warn: () => {}, error: () => {} },
    _builderReadOnly: false,
  };
  vm.createContext(context);
  vm.runInContext(`${source}\nthis.receiveRemoteState = receiveRemoteState;`, context);
  return {
    context,
    receiveRemoteState: context.receiveRemoteState,
    renders: () => renders,
    receiveDepth: () => receiveDepth,
  };
}

test("the real remote apply path rejects hostile public and private snapshots", () => {
  const hostileSnapshots = [
    () => {
      const data = firebaseRemoteData();
      data.G.tiles["1,0"] = {
        type: "terrain",
        pois: ["Cave"],
        revealed: true,
        imgOverride: {},
      };
      return data;
    },
    () => {
      const data = firebaseRemoteData();
      data.G.eqDeck = [{ id: "root_shell", cat: "Weapon" }];
      return data;
    },
    () => {
      const data = firebaseRemoteData();
      data.G._pendingLogs = [null, { msg: {}, cls: "crit" }];
      return data;
    },
    () => {
      const data = firebaseRemoteData();
      data._privateState = {
        ownerIndex: 0,
        evtDeck: [{ text: "Forged.", pub: false, loseHealth: 999 }],
        player: { equipment: [] },
      };
      return data;
    },
    () => {
      const data = firebaseRemoteData();
      data.G.players.push({
        ...data.G.players[0],
        id: 1,
        equipment: [],
      });
      return data;
    },
    () => {
      const data = firebaseRemoteData();
      data.G.players[0].isSynth = true;
      return data;
    },
  ];

  for (const makeSnapshot of hostileSnapshots) {
    const harness = loadReceiveRemoteState();
    const originalGame = harness.context.G;
    harness.receiveRemoteState(makeSnapshot());
    assert.equal(harness.context.G, originalGame);
    assert.equal(harness.context.cardUid, 4);
    assert.equal(harness.renders(), 0);
    assert.equal(harness.receiveDepth(), 0);
  }
});

test("the first real remote apply rejects lobby and synth roster mismatches", () => {
  const hostileSnapshots = [
    () => {
      const data = firebaseRemoteData();
      data.G.players[0].isSynth = true;
      data.G.players.push({
        ...data.G.players[0],
        id: 1,
        equipment: [],
      });
      return data;
    },
    () => firebaseRemoteData(),
  ];
  const lobbyData = {
    0: { connectionSlot: 0 },
    1: { connectionSlot: 1 },
  };

  for (const makeSnapshot of hostileSnapshots) {
    const harness = loadReceiveRemoteState({ existingGame: null, lobbyData });
    harness.receiveRemoteState(makeSnapshot());
    assert.equal(harness.context.G, null);
    assert.equal(harness.context.cardUid, 4);
    assert.equal(harness.renders(), 0);
    assert.equal(harness.receiveDepth(), 0);
  }
});

test("the real remote apply preserves distinct canonical event text", () => {
  const harness = loadReceiveRemoteState();
  const data = firebaseRemoteData();
  const radioEvents = realIngressOptions(data.G, harness.context.G).eventCards
    .filter((card) => card.rf)
    .filter(
      (card, index, cards) =>
        cards.findIndex(
          (candidate) =>
            JSON.stringify(candidate.text) === JSON.stringify(card.text),
        ) === index,
    );
  assert.ok(radioEvents.length >= 2);
  data.G.lastPublicEvt = { ...radioEvents[1] };

  harness.receiveRemoteState(data);

  assert.equal(harness.context.G.lastPublicEvt.text, radioEvents[1].text);
  assert.notEqual(
    harness.context.G.lastPublicEvt.text,
    radioEvents[0].text,
  );
});

test("the real remote apply path reconstructs canonical inventory cards", () => {
  const harness = loadReceiveRemoteState();
  const data = firebaseRemoteData();
  data.G.players[0].equipment = [
    {
      id: "plasma_cutter",
      uid: 17,
      name: "<img src=x>",
      cat: "Weapon",
      txt: {},
      content: { hostile: true },
    },
  ];

  harness.receiveRemoteState(data);

  assert.notEqual(harness.context.G, null);
  assert.deepEqual(
    JSON.parse(JSON.stringify(harness.context.G.players[0].equipment)),
    [
      {
        id: "plasma_cutter",
        name: "Plasma Cutter",
        cat: "Tool",
        txt: "Cut through sealed structures.",
        uid: 17,
      },
    ],
  );
  assert.equal(harness.context.cardUid, 17);
  assert.equal(harness.renders(), 1);
  assert.equal(harness.receiveDepth(), 0);
});

test("only the active multiplayer turn owner may write state", () => {
  assert.equal(logic.canWriteState({
    online: true, active: true, receiving: false, playerIndex: 1, currentPlayer: 1,
  }), true);
  assert.equal(logic.canWriteState({
    online: true, active: true, receiving: false, playerIndex: 0, currentPlayer: 1,
  }), false);
  assert.equal(logic.canWriteState({
    online: true, active: true, receiving: true, playerIndex: 1, currentPlayer: 1,
  }), false);
  assert.equal(logic.canWriteState({
    online: false, active: false, receiving: false, playerIndex: null, currentPlayer: 2,
  }), true);
  assert.equal(logic.canWriteState({
    online: true,
    active: true,
    receiving: false,
    playerIndex: 0,
    currentPlayer: 1,
    writerTurnOwner: 0,
  }), true);
  assert.equal(logic.canWriteState({
    online: true,
    active: true,
    receiving: false,
    playerIndex: 0,
    currentPlayer: 3,
    writerTurnOwner: 3,
    writerIsSynth: true,
  }), true);
  assert.equal(logic.canWriteState({
    online: true,
    active: true,
    receiving: false,
    playerIndex: 1,
    currentPlayer: 3,
    writerTurnOwner: 3,
    writerIsSynth: true,
  }), false);
});

test("restoring a host session guards another player's turn before rendering", async () => {
  const harness = loadSyncHarness({ meta: { hostId: "waiting-client" } });
  const reconnect = harness.Sync.reconnect("ABC234", 0);

  assert.equal(harness.Sync.isActive(), true);
  assert.equal(harness.Sync.myPlayerIndex(), 0);
  assert.equal(logic.isTurnOwner({
    online: harness.Sync.isActive(),
    active: harness.Sync.isActive(),
    playerIndex: harness.Sync.myPlayerIndex(),
    currentPlayer: 2,
  }), false);
  await reconnect;

  const gameSource = fs.readFileSync(path.join(__dirname, "..", "game.js"), "utf8");
  const restoreStart = gameSource.indexOf(
    "// Check for an existing multiplayer session",
  );
  const hostRestoreEnd = gameSource.indexOf("// JOINER:", restoreStart);
  const restoreSource = gameSource.slice(restoreStart, hostRestoreEnd);
  const hostReconnect = restoreSource.indexOf(
    "window.Sync.reconnect(mpSession.joinCode, 0)",
  );
  const firstRender = restoreSource.indexOf("render();");

  assert.ok(hostReconnect >= 0);
  assert.ok(firstRender > hostReconnect);
  assert.match(restoreSource, /syncReady = await window\.Sync\?\.init\(\)/);
  assert.doesNotMatch(gameSource, /\b_isOnlineMode\b/);
  assert.match(
    gameSource,
    /function isMyTurn\(\) \{\s+const online = !!window\.Sync\?\.isActive\(\);/,
  );
  assert.match(
    gameSource,
    /function useCard\(playerIdx, uid\) \{\s+if \(!isMyTurn\(\)\) return;/,
  );
  assert.match(
    gameSource,
    /function doStasisEndTurn\(\) \{\s+if \(!isMyTurn\(\)\) return;/,
  );
  assert.match(
    gameSource,
    /function doStasisLeave\(\) \{\s+if \(!isMyTurn\(\)\) return;/,
  );
});

test("viewing another crew member is local UI state and does not publish", () => {
  const gameSource = fs.readFileSync(path.join(__dirname, "..", "game.js"), "utf8");
  const start = gameSource.indexOf("function buildCrewTabs()");
  const end = gameSource.indexOf("function saveGame", start);
  const crewTabsSource = gameSource.slice(start, end);

  assert.match(crewTabsSource, /viewedPlayer = pl\.id;[\s\S]*updateUI\(false\)/);
  assert.doesNotMatch(
    gameSource.slice(
      gameSource.indexOf("const s = {", gameSource.indexOf("function saveGame")),
      gameSource.indexOf("s.G.players =", gameSource.indexOf("function saveGame")),
    ),
    /\bviewedPlayer\b/,
  );
  assert.match(
    gameSource,
    /function updateUI\(gameplayMutation = false, writerTurnOwner\)/,
  );
  assert.doesNotMatch(gameSource, /\bupdateUI\(\);/);
});

test("a stale waiting client cannot replace a newer multiplayer revision", async () => {
  const harness = loadSyncHarness({
    meta: { hostId: "host" },
    state: {
      G: { currentPlayer: 1, turn: 4 },
      _source: "active-client",
      _revision: 3,
    },
  });
  harness.Sync.onStateUpdate(() => {});
  await harness.Sync.reconnect("ABC234", 2);
  harness.emitState();
  await new Promise((resolve) => setImmediate(resolve));

  const advancedRoom = harness.room();
  advancedRoom.state = {
    G: { currentPlayer: 2, turn: 5 },
    _source: "active-client",
    _revision: 4,
  };
  harness.replaceRoom(advancedRoom);

  const committed = await harness.Sync.pushState({
    G: { currentPlayer: 1, turn: 4 },
  });
  assert.equal(committed, false);
  assert.deepEqual(harness.room().state.G, { currentPlayer: 2, turn: 5 });
  assert.equal(harness.room().state._revision, 4);

  harness.emitState();
  await new Promise((resolve) => setImmediate(resolve));
  const currentCommit = await harness.Sync.pushState({
    G: { currentPlayer: 2, turn: 5, movementLeft: 3 },
  });
  assert.equal(currentCommit, true);
  assert.equal(harness.room().state._revision, 5);
  assert.equal(harness.room().state.G.movementLeft, 3);

  const firstQueuedCommit = harness.Sync.pushState({
    G: { currentPlayer: 2, turn: 5, movementLeft: 2 },
  });
  const secondQueuedCommit = harness.Sync.pushState({
    G: { currentPlayer: 2, turn: 5, movementLeft: 1 },
  });
  assert.deepEqual(
    await Promise.all([firstQueuedCommit, secondQueuedCommit]),
    [true, true],
  );
  assert.equal(harness.room().state._revision, 7);
  assert.equal(harness.room().state.G.movementLeft, 1);
});

test("private event cards are visible only to their local owner", () => {
  assert.equal(logic.ownsPrivateCard({
    online: true, active: true, playerIndex: 2, currentPlayer: 1, cardPlayerIndex: 2,
  }), true);
  assert.equal(logic.ownsPrivateCard({
    online: true, active: true, playerIndex: 2, currentPlayer: 1, cardPlayerIndex: 1,
  }), false);
  assert.equal(logic.ownsPrivateCard({
    online: false, active: false, currentPlayer: 1, cardPlayerIndex: 1,
  }), true);
  assert.equal(logic.ownsPrivateCard({
    online: false, active: false, currentPlayer: 1, cardPlayerIndex: 2,
  }), false);
});

test("online public state excludes the deck and every player's private data", () => {
  const game = {
    evtDeck: [{ text: "future private card", pub: false }],
    players: [
      {
        id: 0,
        equipment: [{ id: "tool" }, { uid: 7, eventCard: { text: "secret" } }],
        soloRescueActive: true,
        rfExtractionActive: false,
        signalArrayRounds: 2,
      },
      {
        id: 1,
        equipment: [{ uid: 8, eventCard: { text: "other secret" } }],
        rfExtractionActive: true,
      },
    ],
  };
  const publicState = logic.publicGameState(game);
  assert.deepEqual(publicState.evtDeck, []);
  assert.deepEqual(publicState.players[0].equipment, [{ id: "tool" }]);
  assert.deepEqual(publicState.players[1].equipment, []);
  assert.equal("soloRescueActive" in publicState.players[0], false);
  assert.equal("rfExtractionActive" in publicState.players[0], false);
  assert.equal("signalArrayRounds" in publicState.players[0], false);
  assert.equal("rfExtractionActive" in publicState.players[1], false);
  assert.equal(game.evtDeck.length, 1);
  assert.equal(game.players[0].equipment.length, 2);
});

test("private state is owner-targeted and restores only that owner's secrets", () => {
  const full = {
    evtDeck: [{ text: "next" }],
    players: [
      {
        equipment: [{ uid: 1, eventCard: { text: "mine" } }],
        soloRescueActive: true,
        rfExtractionActive: false,
        signalArrayRounds: 2,
      },
      {
        equipment: [{ uid: 2, eventCard: { text: "theirs" } }],
        soloRescueActive: false,
        rfExtractionActive: true,
        signalArrayRounds: 0,
      },
    ],
  };
  const publicState = logic.publicGameState(full);
  const ownerSecret = logic.privateGameState(full, 0);
  logic.mergePrivateGameState(publicState, ownerSecret, null, 0);
  assert.deepEqual(publicState.evtDeck, full.evtDeck);
  assert.deepEqual(publicState.players[0].equipment, full.players[0].equipment);
  assert.deepEqual(publicState.players[1].equipment, []);
  assert.equal(publicState.players[0].soloRescueActive, true);
  assert.equal(publicState.players[0].rfExtractionActive, false);
  assert.equal(publicState.players[0].signalArrayRounds, 2);
  assert.equal("rfExtractionActive" in publicState.players[1], false);

  const wrongOwnerState = logic.publicGameState(full);
  logic.mergePrivateGameState(wrongOwnerState, ownerSecret, null, 1);
  assert.deepEqual(wrongOwnerState.evtDeck, []);
  assert.deepEqual(wrongOwnerState.players[1].equipment, []);
  assert.equal(wrongOwnerState.players[1].soloRescueActive, false);
  assert.equal(wrongOwnerState.players[1].rfExtractionActive, false);
  assert.equal(wrongOwnerState.players[1].signalArrayRounds, 0);

  const existingState = {
    evtDeck: [{ text: "already drawn" }],
    players: [{ equipment: [{ uid: 3, eventCard: { text: "already used" } }] }],
  };
  const emptiedState = {
    evtDeck: [],
    players: [{ equipment: [] }],
  };
  logic.mergePrivateGameState(
    emptiedState,
    { ownerIndex: 0, evtDeck: [], player: { equipment: [] } },
    existingState,
    0,
  );
  assert.deepEqual(emptiedState.evtDeck, []);
  assert.deepEqual(emptiedState.players[0].equipment, []);
});

test("multiplayer sync reads only the current owner's private path", async () => {
  const harness = loadSyncHarness({
    meta: { hostId: "host" },
    state: {
      G: { currentPlayer: 1, turn: 2 },
      _source: "active-client",
      _revision: 1,
    },
    private: {
      1: {
        ownerIndex: 1,
        evtDeck: [{ text: "next" }],
        player: { equipment: [{ uid: 1, eventCard: { text: "mine" } }] },
        _revision: 1,
      },
      2: {
        ownerIndex: 2,
        player: { equipment: [{ uid: 2, eventCard: { text: "theirs" } }] },
        _revision: 1,
      },
    },
  });
  let received;
  harness.Sync.onStateUpdate((state) => {
    received = state;
  });
  await harness.Sync.reconnect("ABC234", 1);
  harness.emitState();
  await new Promise((resolve) => setImmediate(resolve));

  assert.equal(received._privateState.ownerIndex, 1);
  assert.deepEqual(harness.readPaths(), ["meta", "lobby", "private/1"]);

  const committed = await harness.Sync.pushState(
    { G: { currentPlayer: 2, turn: 2 } },
    {
      ownerIndex: 1,
      evtDeck: [{ text: "later" }],
      player: { equipment: [] },
    },
    1,
    2,
  );
  assert.equal(committed, true);
  assert.equal(harness.room().private[1]._revision, 2);
  assert.deepEqual(harness.room().private[1].evtDeck, []);
  assert.deepEqual(harness.room().private[2].evtDeck, [{ text: "later" }]);
  assert.equal(harness.room().private[2].player.equipment[0].uid, 2);
  assert.deepEqual(harness.readPaths(), ["meta", "lobby", "private/1"]);
});

test("local hot-seat saves retain all private cards and future deck order", () => {
  const gameSource = fs.readFileSync(path.join(__dirname, "..", "game.js"), "utf8");
  const saveSource = gameSource.slice(
    gameSource.indexOf("function saveGame"),
    gameSource.indexOf("function loadGame"),
  );
  assert.match(saveSource, /localStorage\.setItem\([\s\S]*JSON\.stringify\(\{ \.\.\.s, viewedPlayer \}\)/);
  assert.match(saveSource, /SignalGameLogic\.publicGameState\(s\.G\)/);
});

test("saved dynamic event text uses the human roster count", () => {
  const gameSource = fs.readFileSync(path.join(__dirname, "..", "game.js"), "utf8");
  const saveSource = gameSource.slice(
    gameSource.indexOf("function saveGame"),
    gameSource.indexOf("function loadGame"),
  );
  const dynamicEvent = {
    text: (count) => `Supports ${count} human.`,
    pub: false,
    keep: true,
  };
  let saved;
  const context = {
    G: {
      players: [
        {
          isSynth: false,
          equipment: [{ eventCard: dynamicEvent, uid: 1 }],
        },
        { isSynth: true, equipment: [] },
      ],
      tiles: new Map(),
      terrainDeck: [],
      eqDeck: [],
      evtDeck: [dynamicEvent],
    },
    cardUid: 1,
    pendingNames: [],
    pendingPortraits: [],
    viewedPlayer: 0,
    localStorage: {
      setItem: (_key, value) => {
        saved = JSON.parse(value);
      },
    },
    window: { Sync: { isActive: () => false } },
    SignalGameLogic: logic,
    console,
  };
  vm.runInNewContext(`${saveSource}\nthis.saveGame = saveGame;`, context);

  context.saveGame(false);

  assert.equal(saved.G.evtDeck[0].text, "Supports 1 human.");
  assert.equal(
    saved.G.players[0].equipment[0].eventCard.text,
    "Supports 1 human.",
  );
});

function buildEventDeckFor(withSynth, humanPlayerCount) {
  const gameSource = fs.readFileSync(path.join(__dirname, "..", "game.js"), "utf8");
  const start = gameSource.indexOf("function buildEventDeck(");
  const end = gameSource.indexOf("// Note: The Event Cards", start);
  const buildSource = gameSource.slice(start, end);

  const context = {
    addSynth: withSynth,
    SignalGameLogic: logic,
    console,
    Math: Object.create(Math),
  };
  context.Math.random = () => 0.5;
  vm.runInNewContext(
    `${buildSource}; result = buildEventDeck(${JSON.stringify(humanPlayerCount)});`,
    context,
  );
  return context.result;
}

test("event deck has stable public/private composition", () => {
  for (const withSynth of [false, true]) {
    for (const humanPlayerCount of [2, 3, 4]) {
      const deck = buildEventDeckFor(withSynth, humanPlayerCount);
      assert.deepEqual(
        logic.eventDeckComposition(deck),
        logic.expectedEventDeckComposition(withSynth, humanPlayerCount),
      );
    }
  }
});

test("solo play (1 human) removes all private event cards, multiplayer keeps them", () => {
  for (const withSynth of [false, true]) {
    // Representative player counts: solo (1 human, +IRIS optional), a
    // 2-human game, and a full 4-human game.
    for (const humanPlayerCount of [1, 2, 4]) {
      const deck = buildEventDeckFor(withSynth, humanPlayerCount);
      const composition = logic.eventDeckComposition(deck);
      const expected = logic.expectedEventDeckComposition(withSynth, humanPlayerCount);
      assert.deepEqual(composition, expected);

      if (humanPlayerCount === 1) {
        assert.equal(composition.private, 0);
        assert.equal(deck.some((card) => card.pub === false), false);
        assert.equal(deck.length, 51);
      } else {
        assert.equal(composition.private, 29);
        assert.equal(deck.some((card) => card.pub === false), true);
        assert.equal(deck.length, 80);
      }

      // Radio Fragment cards are public and must survive in every mode,
      // including solo.
      const rfCards = deck.filter((card) => card.rf === true);
      assert.equal(rfCards.length, 2);

      // IRIS corruption cards are public threat cards; they appear only
      // when IRIS is in the game, in solo and multiplayer alike.
      const irisCards = deck.filter((card) => card.irisCorruption === true);
      assert.equal(irisCards.length, withSynth ? 2 : 0);
      assert.equal(
        irisCards.every((card) => card.pub === true),
        true,
      );
    }
  }
});

test("equipment draws remove a card only from the chosen category", () => {
  const deck = [
    { id: "tool_a", cat: "Tool" },
    { id: "supply_a", cat: "Supply" },
    { id: "tool_b", cat: "Tool" },
  ];

  const supply = logic.takeEquipmentCard(deck, { category: "Supply" });
  assert.equal(supply.id, "supply_a");
  assert.deepEqual(
    deck.map((card) => card.id),
    ["tool_a", "tool_b"],
  );

  const beforeMissingDraw = [...deck];
  assert.equal(logic.takeEquipmentCard(deck, { category: "Weapon" }), null);
  assert.deepEqual(deck, beforeMissingDraw);

  const specific = logic.takeEquipmentCard(deck, { id: "tool_a" });
  assert.equal(specific.id, "tool_a");
  assert.deepEqual(
    deck.map((card) => card.id),
    ["tool_b"],
  );
});

test("the all-crew-lost modal supports peeking at its unblurred background", () => {
  const gameSource = fs.readFileSync(path.join(__dirname, "..", "game.js"), "utf8");
  const styleSource = fs.readFileSync(path.join(__dirname, "..", "style.css"), "utf8");

  assert.match(
    gameSource,
    /_movEl\.classList\.contains\("all-dead"\)/,
  );
  assert.match(
    styleSource,
    /#mov\.all-dead\s*\{[^}]*all-dead_overlay\.webp/s,
  );
  assert.match(styleSource, /#mov\.all-dead\.peeking::before/);
  assert.match(styleSource, /#mov\.all-dead\.peeking \.mbox/);
});

test("incapacitated crew die after three consecutive skipped turns", () => {
  const crew = { alive: true, isSynth: false, health: 0, incapacitated: 0 };
  const first = logic.incapacitationAfterSkippedTurn(crew);
  const second = logic.incapacitationAfterSkippedTurn({ ...crew, incapacitated: 1 });
  const third = logic.incapacitationAfterSkippedTurn({ ...crew, incapacitated: 2 });
  assert.deepEqual([first.died, second.died, third.died], [false, false, true]);
  assert.deepEqual(
    [first.incapacitated, second.incapacitated, third.incapacitated],
    [1, 2, 3],
  );
});

test("MedPack/Stretcher recovery resets the incapacitation counter", () => {
  // A crew member skips one round while incapacitated...
  const crew = { alive: true, isSynth: false, health: 0, incapacitated: 0 };
  const firstSkip = logic.incapacitationAfterSkippedTurn(crew);
  assert.deepEqual([firstSkip.died, firstSkip.incapacitated], [false, 1]);

  // ...then a MedPack or Stretcher restores Health and (per game.js) resets
  // player.incapacitated to 0. A relapse to 0 Health afterward must start the
  // consecutive-round count over, not resume from the pre-recovery value.
  const recovered = { alive: true, isSynth: false, health: 0, incapacitated: 0 };
  const relapseSkip = logic.incapacitationAfterSkippedTurn(recovered);
  assert.deepEqual([relapseSkip.died, relapseSkip.incapacitated], [false, 1]);
  const secondRelapseSkip = logic.incapacitationAfterSkippedTurn({
    ...recovered,
    incapacitated: relapseSkip.incapacitated,
  });
  assert.deepEqual(
    [secondRelapseSkip.died, secondRelapseSkip.incapacitated],
    [false, 2],
  );
  const thirdRelapseSkip = logic.incapacitationAfterSkippedTurn({
    ...recovered,
    incapacitated: secondRelapseSkip.incapacitated,
  });
  assert.deepEqual(
    [thirdRelapseSkip.died, thirdRelapseSkip.incapacitated],
    [true, 3],
  );
});

test("advanceTurn: consecutive incapacitated rounds kill on the third round and drop fragments", () => {
  const { advanceTurn, context, logs } = loadAdvanceTurn();
  const players = [
    { id: 0, name: "Adaeze", alive: true, isSynth: false, health: 3, o2: 3, q: 0, r: 0 },
    {
      id: 1,
      name: "Anand",
      alive: true,
      isSynth: false,
      health: 0,
      incapacitated: 0,
      radioFragments: 3,
      q: 2,
      r: -1,
    },
  ];
  const dropTile = { droppedFragments: 0 };
  context.G = {
    players,
    currentPlayer: 0,
    turn: 1,
    tiles: new Map([["2,-1", dropTile]]),
  };

  // Round 1: Anand's turn comes up at 0 Health -> incapacitated, not dead yet.
  advanceTurn();
  assert.equal(players[1].alive, true);
  assert.equal(players[1].incapacitated, 1);
  assert.ok(logs.some((l) => l.msg.includes("INCAPACITATED (1/3 rounds)")));
  assert.equal(context.G.currentPlayer, 0);

  // Round 2: Anand is still incapacitated but remains alive.
  advanceTurn();
  assert.equal(players[1].alive, true);
  assert.equal(players[1].incapacitated, 2);
  assert.ok(logs.some((l) => l.msg.includes("INCAPACITATED (2/3 rounds)")));

  // Round 3: Anand is still at 0 Health on his next turn -> dies, fragments drop.
  advanceTurn();
  assert.equal(players[1].alive, false);
  assert.ok(logs.some((l) => l.msg === "Anand has DIED."));
  assert.ok(logs.some((l) => l.msg.includes("dropped 3 Radio Fragments")));
  assert.equal(dropTile.droppedFragments, 3);
  assert.equal(players[1].radioFragments, 0);
});

test("advanceTurn: recovery before the third incapacitated round prevents death", () => {
  const { advanceTurn, context, logs } = loadAdvanceTurn();
  const players = [
    { id: 0, name: "Adaeze", alive: true, isSynth: false, health: 3, o2: 3, q: 0, r: 0 },
    {
      id: 1,
      name: "Anand",
      alive: true,
      isSynth: false,
      health: 0,
      incapacitated: 0,
      radioFragments: 2,
      q: 2,
      r: -1,
    },
  ];
  context.G = {
    players,
    currentPlayer: 0,
    turn: 1,
    tiles: new Map([["2,-1", { droppedFragments: 0 }]]),
  };

  // Round 1: incapacitated, counter goes to 1.
  advanceTurn();
  assert.equal(players[1].incapacitated, 1);

  // A MedPack/Stretcher heals Anand before his next turn (mirrors the reset
  // performed at the MedPack/Stretcher/Medical Bay use sites in game.js).
  players[1].health = 1;
  players[1].incapacitated = 0;

  // Round 2: Anand is healthy now, so his turn proceeds normally instead of
  // ticking the incapacitation counter toward death.
  advanceTurn();
  assert.equal(players[1].alive, true);
  assert.equal(players[1].incapacitated, 0);
  assert.ok(logs.some((l) => l.msg === `Turn ${context.G.turn}: Anand.`));
  assert.ok(!logs.some((l) => l.msg.includes("DIED")));
});

test("turn ownership advances to the next living player and wraps", () => {
  const players = [
    { alive: true },
    { alive: false },
    { alive: true },
    { alive: true, isSynth: true },
  ];
  assert.equal(logic.nextLivingPlayer(players, 0), 2);
  assert.equal(logic.nextLivingPlayer(players, 3), 0);
  assert.equal(logic.controllingPlayerIndex(players, 2), 2);
  assert.equal(logic.controllingPlayerIndex(players, 3), 0);
  assert.equal(logic.isTurnOwner({
    online: true, active: true, playerIndex: 2, currentPlayer: 2,
  }), true);
});

test("inversionFieldTargets excludes the acting player and the dead", () => {
  const players = [
    { id: 0, alive: true },
    { id: 1, alive: false },
    { id: 2, alive: true },
  ];
  const targets = logic.inversionFieldTargets(players, 0);
  assert.deepEqual(targets.map((p) => p.id), [2]);
});

test("swapFood exchanges Food between exactly the two given players", () => {
  const a = { food: 5 };
  const b = { food: 9 };
  logic.swapFood(a, b);
  assert.deepEqual([a.food, b.food], [9, 5]);
});

test("Inversion Field: first-landing resolution offers no Decline, only mandatory swaps", () => {
  const { showTileRevealModal, context, doc } = loadShowTileRevealModal();
  const p = { id: 0, name: "Adaeze", food: 4, alive: true };
  const other = { id: 1, name: "Anand", food: 9, alive: true };
  context.G = { players: [p, other], currentPlayer: 0 };

  let dismissed = false;
  showTileRevealModal(
    { type: "anomaly", anomaly: "Inversion Field" },
    () => {
      dismissed = true;
    },
  );

  const buttons = doc.getElementById("tr-actions").children;
  const labels = buttons.map((b) => b.textContent);
  assert.deepEqual(labels, [`Swap with ${other.name} (${other.food} Food)`]);
  assert.ok(!labels.some((l) => /decline/i.test(l)));

  buttons[0].onclick();
  assert.equal(dismissed, true);
  assert.deepEqual([p.food, other.food], [9, 4]);
});

test("Inversion Field: with no other living players, first landing only offers Acknowledge", () => {
  const { showTileRevealModal, context, doc } = loadShowTileRevealModal();
  const p = { id: 0, name: "Adaeze", food: 4, alive: true };
  const dead = { id: 1, name: "Anand", food: 9, alive: false };
  context.G = { players: [p, dead], currentPlayer: 0 };

  showTileRevealModal({ type: "anomaly", anomaly: "Inversion Field" }, () => {});

  const labels = doc.getElementById("tr-actions").children.map((b) => b.textContent);
  assert.deepEqual(labels, ["Acknowledge"]);
});

test("Inversion Field: repeat/re-landing resolution offers no Decline, only mandatory swaps", () => {
  const { triggerAnomaly, context, doc } = loadTriggerAnomaly();
  const p = { id: 0, name: "Adaeze", food: 4, alive: true };
  const other = { id: 1, name: "Anand", food: 9, alive: true };
  context.G = { players: [p, other], currentPlayer: 0 };

  triggerAnomaly({ type: "anomaly", anomaly: "Inversion Field" });

  assert.equal(doc.getElementById("mtit").textContent, "INVERSION FIELD");
  const mact = doc.getElementById("mact");
  const labels = mact.children.flatMap((child) =>
    child.textContent ? [child.textContent] : child.children.map((b) => b.textContent),
  );
  assert.deepEqual(labels, [`Swap with ${other.name} (${other.food} Food)`]);
  assert.ok(!labels.some((l) => /decline/i.test(l)));

  const swapBtn = mact.children.flatMap((c) => (c.children.length ? c.children : [c]))[0];
  swapBtn.onclick();
  assert.deepEqual([p.food, other.food], [9, 4]);
});

test("Inversion Field: repeat and first-landing resolution behave identically for the same matchup", () => {
  const scenario = () => ({
    p: { id: 0, name: "Adaeze", food: 4, alive: true },
    other: { id: 1, name: "Anand", food: 9, alive: true },
  });

  const first = loadShowTileRevealModal();
  const { p: p1, other: o1 } = scenario();
  first.context.G = { players: [p1, o1], currentPlayer: 0 };
  first.showTileRevealModal({ type: "anomaly", anomaly: "Inversion Field" }, () => {});
  const firstLabels = first.doc
    .getElementById("tr-actions")
    .children.map((b) => b.textContent);
  first.doc.getElementById("tr-actions").children[0].onclick();

  const repeat = loadTriggerAnomaly();
  const { p: p2, other: o2 } = scenario();
  repeat.context.G = { players: [p2, o2], currentPlayer: 0 };
  repeat.triggerAnomaly({ type: "anomaly", anomaly: "Inversion Field" });
  const repeatMact = repeat.doc.getElementById("mact");
  const repeatLabels = repeatMact.children.flatMap((child) =>
    child.textContent ? [child.textContent] : child.children.map((b) => b.textContent),
  );
  repeatMact.children.flatMap((c) => (c.children.length ? c.children : [c]))[0].onclick();

  // Same button set (a single mandatory swap option, no Decline) and the
  // same resulting Food swap on both the initial-landing and repeat paths.
  assert.deepEqual(firstLabels, repeatLabels);
  assert.deepEqual([p1.food, o1.food], [p2.food, o2.food]);
});
