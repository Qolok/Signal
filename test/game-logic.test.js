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

test("joining rejects an expired room without client-side deletion", async () => {
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
  assert.equal(harness.room().meta.hostId, "host");
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

function buildEventDeckFor(withSynth, humanPlayerCount) {
  const gameSource = fs.readFileSync(path.join(__dirname, "..", "game.js"), "utf8");
  const start = gameSource.indexOf("function buildEventDeck(humanPlayerCount)");
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

test("incapacitated crew die after two consecutive skipped turns", () => {
  const crew = { alive: true, isSynth: false, health: 0, incapacitated: 0 };
  const first = logic.incapacitationAfterSkippedTurn(crew);
  const second = logic.incapacitationAfterSkippedTurn({ ...crew, incapacitated: 1 });
  assert.deepEqual([first.died, second.died], [false, true]);
  assert.deepEqual([first.incapacitated, second.incapacitated], [1, 2]);
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
  assert.deepEqual([secondRelapseSkip.died, secondRelapseSkip.incapacitated], [true, 2]);
});

test("advanceTurn: consecutive incapacitated rounds kill on the second round and drop fragments", () => {
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
  assert.ok(logs.some((l) => l.msg.includes("INCAPACITATED (1/2 rounds)")));
  assert.equal(context.G.currentPlayer, 0);

  // Round 2: Anand is still at 0 Health on his next turn -> dies, fragments drop.
  advanceTurn();
  assert.equal(players[1].alive, false);
  assert.ok(logs.some((l) => l.msg === "Anand has DIED."));
  assert.ok(logs.some((l) => l.msg.includes("dropped 3 Radio Fragments")));
  assert.equal(dropTile.droppedFragments, 3);
  assert.equal(players[1].radioFragments, 0);
});

test("advanceTurn: recovery before the second incapacitated round prevents death", () => {
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
