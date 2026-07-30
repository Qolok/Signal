(function (root, factory) {
  const logic = factory();
  if (typeof module === "object" && module.exports) module.exports = logic;
  else root.SignalGameLogic = logic;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const INCAPACITATION_ROUNDS = 3;

  function firebaseArray(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return Object.keys(value)
      .sort((a, b) => Number(a) - Number(b))
      .map((key) => value[key]);
  }

  function playerName(value, fallback = "Crew") {
    const fallbackName =
      typeof fallback === "string" && fallback.trim() ? fallback.trim() : "Crew";
    if (typeof value !== "string" || !value.trim())
      return Array.from(fallbackName).slice(0, 16).join("");
    return Array.from(value.trim()).slice(0, 16).join("");
  }

  function enumeratedValue(value, allowed, fallback) {
    return allowed.includes(value) ? value : fallback;
  }

  function normalizePlayerIdentities(game, colors, portraits) {
    if (!game?.players) return game;
    game.players.forEach((player, index) => {
      const synth = player.isSynth === true;
      const fallbackPortrait = synth
        ? "iris"
        : portraits[index % portraits.length];
      const fallbackColor = synth
        ? colors[colors.length - 1]
        : colors[index % (colors.length - 1)];
      player.name = playerName(player.name, synth ? "IRIS" : fallbackPortrait);
      player.portrait = enumeratedValue(
        player.portrait,
        portraits,
        fallbackPortrait,
      );
      player.color = enumeratedValue(player.color, colors, fallbackColor);
    });
    return game;
  }

  // ── Untrusted-ingress validation ─────────────────────────────────
  // Remote multiplayer snapshots arrive from other clients (or ones that
  // predate the server-side database rules). Every consumed field is
  // clamped to a sane type/range/enum here so a compromised or buggy peer
  // cannot corrupt or hang another client's local state.
  const INGRESS_LIMITS = {
    maxPlayers: 6,
    coord: 64, // board terrain is capped near the origin
    health: 3,
    food: 15,
    o2: 3,
    battery: 10,
    scannerCharges: 3,
    fragments: 5,
    incapacitated: INCAPACITATION_ROUNDS,
    rounds: 99, // signalArrayRounds
    turn: 9999,
    movement: 64, // bounds the BFS reach expansion
    cargo: 15,
    activated: 5,
    maxTiles: 128,
    maxTerrainDeck: 43,
    maxEquipmentDeck: 48,
    maxEventDeck: 80,
    maxLogs: 50,
    maxLogLength: 240,
  };
  const INGRESS_PHASES = ["roll", "move", "action", "stasis", "over"];
  const INGRESS_PLAYER_BOOLEANS = [
    "alive",
    "isSynth",
    "inStasis",
    "stunned",
    "skipO2",
    "extracted",
    "scannerUsed",
    "rebreatherCycle",
    "lockerUsedThisVisit",
    "medBayHealedThisRound",
    "soloRescueActive",
    "rfExtractionActive",
    "cpu",
    "corrupted",
    "deactivated",
  ];
  const INGRESS_EVENT_FIELDS = [
    "pub",
    "rollFood",
    "rollWreckage",
    "drawEq",
    "drawEqHidden",
    "rf",
    "skipO2",
    "irisCorruption",
    "takeAllCargo",
    "trackSignalArray",
    "rfExtraction",
    "keep",
    "gainFood",
    "takeCargoFood",
    "loseFood",
    "loseHealth",
  ];
  const INGRESS_TILE_TYPES = [
    "face_down",
    "crash_site",
    "terrain",
    "anomaly",
    "ship_section",
  ];
  const INGRESS_LOG_CLASSES = [
    "",
    "act",
    "crit",
    "frag",
    "good",
    "sys",
    "tile",
  ];

  function clampInt(value, min, max, fallback) {
    const number = Math.round(Number(value));
    if (!Number.isFinite(number)) return fallback;
    return Math.min(max, Math.max(min, number));
  }

  function safeRevision(value) {
    const number = Number(value);
    return Number.isSafeInteger(number) && number >= 0 ? number : 0;
  }

  function isValidTileKey(key) {
    return typeof key === "string" && /^-?\d+,-?\d+$/.test(key);
  }

  function isRecord(value) {
    return !!value && typeof value === "object" && !Array.isArray(value);
  }

  function canonicalEquipmentCard(card, definitions, requireUid) {
    if (!isRecord(card) || typeof card.id !== "string") return null;
    const definition = definitions.find((candidate) => candidate.id === card.id);
    if (!definition) return null;
    if (!requireUid) return { ...definition };
    const uid = Number(card.uid);
    if (!Number.isSafeInteger(uid) || uid < 1) return null;
    return { ...definition, uid };
  }

  function eventSignature(card) {
    if (!isRecord(card)) return null;
    const signature = {};
    for (const field of INGRESS_EVENT_FIELDS) {
      if (!Object.prototype.hasOwnProperty.call(card, field)) continue;
      const value = card[field];
      if (typeof value !== "boolean" && !Number.isSafeInteger(value)) return null;
      signature[field] = value;
    }
    return JSON.stringify(signature);
  }

  function resolvedEventText(card, playerCount, allowFunction = false) {
    const text =
      typeof card?.text === "function"
        ? allowFunction
          ? card.text(playerCount)
          : null
        : card?.text;
    if (
      typeof text !== "string" &&
      (!Array.isArray(text) || text.some((line) => typeof line !== "string"))
    )
      return null;
    return Array.isArray(text) ? [...text] : text;
  }

  function canonicalEventCard(card, definitions, playerCount) {
    const signature = eventSignature(card);
    const incomingText = resolvedEventText(card, playerCount);
    if (signature === null || incomingText === null) return null;
    const definition = definitions.find(
      (candidate) => {
        if (eventSignature(candidate) !== signature) return false;
        const candidateText = resolvedEventText(candidate, playerCount, true);
        return (
          candidateText !== null &&
          JSON.stringify(candidateText) === JSON.stringify(incomingText)
        );
      },
    );
    if (!definition) return null;
    return {
      ...definition,
      text: resolvedEventText(definition, playerCount, true),
    };
  }

  function sanitizeEquipment(cards, opts, playerCount) {
    const values = firebaseArray(cards);
    if (values.length > opts.maxEquipmentCards) return null;
    const result = [];
    for (const card of values) {
      let clean;
      if (isRecord(card) && Object.prototype.hasOwnProperty.call(card, "eventCard")) {
        const eventCard = canonicalEventCard(
          card.eventCard,
          opts.eventCards,
          playerCount,
        );
        const uid = Number(card.uid);
        clean =
          eventCard && Number.isSafeInteger(uid) && uid >= 1
            ? { eventCard, uid }
            : null;
      } else {
        clean = canonicalEquipmentCard(card, opts.equipmentCards, true);
      }
      if (!clean) {
        if (opts.strict) return null;
        continue;
      }
      result.push(clean);
    }
    return result;
  }

  function sanitizeIncomingPlayer(player, index, opts, playerCount) {
    const src = isRecord(player) ? player : {};
    const L = INGRESS_LIMITS;
    const equipment = sanitizeEquipment(src.equipment, opts, playerCount);
    if (!equipment) return null;
    const clean = {
      id: index, // identity is positional; never trust a remote-supplied id
      name: src.name,
      color: src.color,
      portrait: src.portrait,
      q: clampInt(src.q, -L.coord, L.coord, 0),
      r: clampInt(src.r, -L.coord, L.coord, 0),
      health: clampInt(src.health, 0, L.health, 0),
      food: clampInt(src.food, 0, L.food, 0),
      o2: clampInt(src.o2, 0, L.o2, 0),
      radioFragments: clampInt(src.radioFragments, 0, L.fragments, 0),
      incapacitated: clampInt(src.incapacitated, 0, L.incapacitated, 0),
      signalArrayRounds: clampInt(src.signalArrayRounds, 0, L.rounds, 0),
      scannerCharges: clampInt(
        src.scannerCharges,
        0,
        L.scannerCharges,
        0,
      ),
      battery: clampInt(src.battery, 0, L.battery, 0),
      equipment,
    };
    for (const field of INGRESS_PLAYER_BOOLEANS) clean[field] = src[field] === true;
    return clean;
  }

  function tileDefinitionIdentity(tile) {
    if (!isRecord(tile) || !INGRESS_TILE_TYPES.includes(tile.type)) return null;
    if (tile.type === "crash_site")
      return typeof tile.name === "string" ? `crash_site:${tile.name}` : null;
    if (tile.type === "terrain")
      return Array.isArray(tile.pois) && typeof tile.pois[0] === "string"
        ? `terrain:${tile.pois[0]}`
        : null;
    if (tile.type === "anomaly")
      return typeof tile.anomaly === "string" ? `anomaly:${tile.anomaly}` : null;
    return tile.type;
  }

  function sanitizeTile(tile, key, opts, playerCount) {
    if (!isRecord(tile) || !isValidTileKey(key)) return null;
    const [q, r] = key.split(",").map(Number);
    const L = INGRESS_LIMITS;
    if (
      !Number.isInteger(q) ||
      !Number.isInteger(r) ||
      Math.abs(q) > L.coord ||
      Math.abs(r) > L.coord ||
      key !== `${q},${r}`
    )
      return null;
    const identity = tileDefinitionIdentity(tile);
    if (!identity) return null;
    if (tile.type === "face_down") {
      if (
        Object.prototype.hasOwnProperty.call(tile, "imgOverride") ||
        tile.revealed === true
      )
        return null;
      return { q, r, type: "face_down", revealed: false, pois: [] };
    }

    const definitions =
      tile.type === "crash_site" ? opts.crashTiles : opts.tileDefinitions;
    const candidates = definitions.filter(
      (definition) => tileDefinitionIdentity(definition) === identity,
    );
    if (!candidates.length) return null;
    if (
      Object.prototype.hasOwnProperty.call(tile, "imgOverride") &&
      (typeof tile.imgOverride !== "string" ||
        !opts.allowedTileImages.includes(tile.imgOverride))
    )
      return null;
    const definition =
      candidates.find(
        (candidate) =>
          tile.imgOverride === undefined ||
          candidate.imgOverride === tile.imgOverride,
      ) || null;
    if (!definition) return null;
    if (
      tile.pois !== undefined &&
      (!Array.isArray(tile.pois) ||
        tile.pois.some((poi) => typeof poi !== "string"))
    )
      return null;
    const pois = Array.isArray(definition.pois) ? [...definition.pois] : [];
    if (
      tile.pois !== undefined &&
      JSON.stringify(tile.pois) !== JSON.stringify(pois)
    )
      return null;
    const clean = {
      ...definition,
      q,
      r,
      pois,
      revealed: tile.type === "crash_site" || tile.revealed === true,
      investigatedCount: clampInt(
        tile.investigatedCount,
        0,
        pois.length,
        0,
      ),
      radioFragment:
        definition.radioFragment === true && tile.radioFragment === true,
      toolReward:
        definition.toolReward && tile.toolReward === definition.toolReward
          ? definition.toolReward
          : null,
      shockTrap: tile.shockTrap === true,
      droppedFragments: clampInt(
        tile.droppedFragments,
        0,
        playerCount * L.fragments,
        0,
      ),
    };
    clean.shockTrapOwner =
      clean.shockTrap &&
      Number.isInteger(tile.shockTrapOwner) &&
      tile.shockTrapOwner >= 0 &&
      tile.shockTrapOwner < playerCount
        ? tile.shockTrapOwner
        : null;
    return clean;
  }

  function sanitizeTileCollection(tiles, opts, playerCount) {
    if (!(tiles instanceof Map) || tiles.size > INGRESS_LIMITS.maxTiles)
      return null;
    if (opts.strict && tiles.size < 1) return null;
    const result = new Map();
    for (const [key, tile] of tiles) {
      const clean = sanitizeTile(tile, key, opts, playerCount);
      if (!clean) return null;
      result.set(key, clean);
    }
    return result;
  }

  function sanitizeTileDeck(deck, opts) {
    const values = firebaseArray(deck);
    if (values.length > INGRESS_LIMITS.maxTerrainDeck) return null;
    const result = [];
    for (const tile of values) {
      const identity = tileDefinitionIdentity(tile);
      const definition = opts.tileDefinitions.find(
        (candidate) =>
          tileDefinitionIdentity(candidate) === identity &&
          (tile.imgOverride === undefined ||
            candidate.imgOverride === tile.imgOverride),
      );
      if (!definition) return null;
      result.push({
        ...definition,
        pois: Array.isArray(definition.pois) ? [...definition.pois] : [],
      });
    }
    return result;
  }

  function sanitizeEquipmentDeck(deck, opts) {
    const values = firebaseArray(deck);
    if (values.length > INGRESS_LIMITS.maxEquipmentDeck) return null;
    const result = [];
    for (const card of values) {
      const clean = canonicalEquipmentCard(card, opts.equipmentCards, false);
      if (!clean) return null;
      result.push(clean);
    }
    return result;
  }

  function sanitizeEventDeck(deck, opts, playerCount) {
    const values = firebaseArray(deck);
    if (values.length > INGRESS_LIMITS.maxEventDeck) return null;
    const result = [];
    for (const card of values) {
      const clean = canonicalEventCard(card, opts.eventCards, playerCount);
      if (!clean) return null;
      result.push(clean);
    }
    return result;
  }

  function sanitizeLogs(logs) {
    const values = firebaseArray(logs);
    if (values.length > INGRESS_LIMITS.maxLogs) return null;
    const result = [];
    for (const log of values) {
      const cls = log?.cls === undefined ? "" : log.cls;
      if (
        !isRecord(log) ||
        typeof log.msg !== "string" ||
        typeof cls !== "string" ||
        !INGRESS_LOG_CLASSES.includes(cls)
      )
        return null;
      result.push({
        msg: Array.from(log.msg).slice(0, INGRESS_LIMITS.maxLogLength).join(""),
        cls,
      });
    }
    return result;
  }

  function tileLocation(tile) {
    if (!tile) return "Unknown";
    if (tile.name) return tile.name;
    if (tile.type === "anomaly") return tile.anomaly;
    if (tile.type === "ship_section") return "Ship Section";
    return tile.pois?.[0] || "Terrain";
  }

  // Validates a normalized remote game state in place. Returns the game on
  // success, or null when the snapshot is too malformed to trust at all
  // (caller must then reject it rather than apply a half-valid state).
  function sanitizeIncomingGameState(game, opts = {}) {
    if (!game || typeof game !== "object" || Array.isArray(game)) return null;
    const L = INGRESS_LIMITS;
    const options = {
      strict: opts.strict === true,
      equipmentCards: Array.isArray(opts.equipmentCards)
        ? opts.equipmentCards
        : [],
      eventCards: Array.isArray(opts.eventCards) ? opts.eventCards : [],
      tileDefinitions: Array.isArray(opts.tileDefinitions)
        ? opts.tileDefinitions
        : [],
      crashTiles: Array.isArray(opts.crashTiles) ? opts.crashTiles : [],
      allowedTileImages: Array.isArray(opts.allowedTileImages)
        ? opts.allowedTileImages
        : [],
      maxEquipmentCards: Number.isInteger(opts.maxEquipmentCards)
        ? opts.maxEquipmentCards
        : 64,
    };
    if (
      options.strict &&
      (!options.equipmentCards.length ||
        !options.eventCards.length ||
        !options.tileDefinitions.length ||
        !options.crashTiles.length)
    )
      return null;
    const maxPlayers = Number.isInteger(opts.maxPlayers)
      ? opts.maxPlayers
      : L.maxPlayers;
    const players = firebaseArray(game.players);
    if (players.length < 1 || players.length > maxPlayers) return null;
    const synthIndices = players.flatMap((player, index) =>
      player?.isSynth === true ? [index] : [],
    );
    const expectedPlayerLayout =
      Array.isArray(opts.expectedPlayerLayout) &&
      opts.expectedPlayerLayout.every((isSynth) => typeof isSynth === "boolean")
        ? opts.expectedPlayerLayout
        : null;
    if (expectedPlayerLayout) {
      if (
        players.length !== expectedPlayerLayout.length ||
        players.some(
          (player, index) =>
            (player?.isSynth === true) !== expectedPlayerLayout[index],
        )
      )
        return null;
    } else if (
      synthIndices.length > 1 ||
      (synthIndices.length === 1 && synthIndices[0] !== players.length - 1)
    ) {
      return null;
    }
    const humanPlayerCount = players.length - synthIndices.length;
    if (humanPlayerCount < 1) return null;
    if (
      Number.isInteger(opts.expectedHumanPlayerCount) &&
      humanPlayerCount !== opts.expectedHumanPlayerCount
    )
      return null;
    const cleanPlayers = players.map((player, index) =>
      sanitizeIncomingPlayer(player, index, options, humanPlayerCount),
    );
    if (cleanPlayers.some((player) => !player)) return null;
    const inventoryUids = new Set();
    for (const player of cleanPlayers) {
      for (const card of player.equipment) {
        if (inventoryUids.has(card.uid)) return null;
        inventoryUids.add(card.uid);
      }
    }
    const tiles = sanitizeTileCollection(game.tiles, options, players.length);
    const terrainDeck = sanitizeTileDeck(game.terrainDeck, options);
    const eqDeck = sanitizeEquipmentDeck(game.eqDeck, options);
    const evtDeck = sanitizeEventDeck(game.evtDeck, options, humanPlayerCount);
    const pendingLogs = sanitizeLogs(game._pendingLogs);
    if (!tiles || !terrainDeck || !eqDeck || !evtDeck || !pendingLogs) return null;
    for (const player of cleanPlayers)
      player.location = tileLocation(tiles.get(`${player.q},${player.r}`));

    let lastPublicEvt = null;
    if (game.lastPublicEvt?._sourceAntimatter === true) {
      lastPublicEvt = { _sourceAntimatter: true };
    } else if (game.lastPublicEvt != null) {
      lastPublicEvt = canonicalEventCard(
        game.lastPublicEvt,
        options.eventCards,
        humanPlayerCount,
      );
      if (!lastPublicEvt || lastPublicEvt.pub !== true) return null;
    }

    const clean = {
      players: cleanPlayers,
      currentPlayer: clampInt(game.currentPlayer, 0, players.length - 1, 0),
      tiles,
      terrainDeck,
      eqDeck,
      eqDeckCount: eqDeck.length,
      evtDeck,
      evtDeckCount: evtDeck.length
        ? evtDeck.length
        : clampInt(game.evtDeckCount, 0, L.maxEventDeck, 0),
      radioFragmentsActivated: clampInt(
      game.radioFragmentsActivated,
      0,
      L.activated,
      0,
      ),
      turn: clampInt(game.turn, 1, L.turn, 1),
      phase: INGRESS_PHASES.includes(game.phase) ? game.phase : "roll",
      movementLeft: clampInt(game.movementLeft, 0, L.movement, 0),
      reach: new Map(),
      tileActionUsed: game.tileActionUsed === true,
      signalRolled: game.signalRolled === true,
      cargoHold: clampInt(game.cargoHold, 0, L.cargo, 0),
      lastPublicEvt,
      jammerActive: game.jammerActive === true,
      _pendingLogs: pendingLogs,
    };
    for (const key of Object.keys(game)) delete game[key];
    Object.assign(game, clean);
    return game;
  }

  function normalizeSavedGame(saved) {
    const game = saved.G;
    game.tiles = new Map(Object.entries(game.tiles || {}));
    game.reach = new Map();
    game.terrainDeck = firebaseArray(game.terrainDeck);
    game.eqDeck = firebaseArray(game.eqDeck);
    game.evtDeck = firebaseArray(game.evtDeck);
    game.players = firebaseArray(game.players).map((player) => ({
      ...player,
      equipment: firebaseArray(player.equipment),
    }));
    return saved;
  }

  function isTurnOwner({ online, active, playerIndex, currentPlayer }) {
    return !online || !active || playerIndex === currentPlayer;
  }

  function canWriteState(context) {
    const currentPlayer = context.writerTurnOwner ?? context.currentPlayer;
    const hostControlsSynth =
      context.online &&
      context.active &&
      context.writerIsSynth &&
      context.playerIndex === 0;
    return (
      !context.receiving &&
      (hostControlsSynth || isTurnOwner({ ...context, currentPlayer }))
    );
  }

  function controllingPlayerIndex(players, currentPlayer) {
    return players[currentPlayer]?.isSynth ? 0 : currentPlayer;
  }

  function ownsPrivateCard({ online, active, playerIndex, currentPlayer, cardPlayerIndex }) {
    return (online && active ? playerIndex : currentPlayer) === cardPlayerIndex;
  }

  const PRIVATE_PLAYER_DEFAULTS = {
    soloRescueActive: false,
    rfExtractionActive: false,
    signalArrayRounds: 0,
  };
  const PRIVATE_PLAYER_FIELDS = Object.keys(PRIVATE_PLAYER_DEFAULTS);

  function publicGameState(game) {
    return {
      ...game,
      evtDeck: [],
      players: game.players.map((player) => {
        const publicPlayer = {
          ...player,
          equipment: player.equipment.filter((card) => !card.eventCard),
        };
        for (const field of PRIVATE_PLAYER_FIELDS) delete publicPlayer[field];
        return publicPlayer;
      }),
    };
  }

  function privateGameState(game, ownerIndex) {
    const player = game.players[ownerIndex];
    if (!player) return { ownerIndex, evtDeck: [...game.evtDeck] };
    const privatePlayer = {
      equipment: player.equipment.filter((card) => !!card.eventCard),
    };
    for (const field of PRIVATE_PLAYER_FIELDS) {
      if (Object.prototype.hasOwnProperty.call(player, field))
        privatePlayer[field] = player[field];
    }
    return { ownerIndex, evtDeck: [...game.evtDeck], player: privatePlayer };
  }

  function mergePrivateGameState(game, secret, existingGame, ownerIndex) {
    if (secret?.ownerIndex !== ownerIndex) secret = null;
    const existingPlayer = existingGame?.players?.[ownerIndex];
    const secretPlayer = secret?.player;
    const player = game.players[ownerIndex];
    if (player) {
      const hasSecretCards =
        secretPlayer &&
        Object.prototype.hasOwnProperty.call(secretPlayer, "equipment");
      const privateCards = hasSecretCards
        ? firebaseArray(secretPlayer.equipment)
        : (existingPlayer?.equipment || []).filter((card) => !!card.eventCard);
      player.equipment = [
        ...player.equipment.filter((card) => !card.eventCard),
        ...privateCards,
      ];
      for (const field of PRIVATE_PLAYER_FIELDS) {
        if (
          secretPlayer &&
          Object.prototype.hasOwnProperty.call(secretPlayer, field)
        )
          player[field] = secretPlayer[field];
        else if (
          existingPlayer &&
          Object.prototype.hasOwnProperty.call(existingPlayer, field)
        )
          player[field] = existingPlayer[field];
        else player[field] = PRIVATE_PLAYER_DEFAULTS[field];
      }
    }
    if (secret && Object.prototype.hasOwnProperty.call(secret, "evtDeck"))
      game.evtDeck = firebaseArray(secret.evtDeck);
    else if (existingGame?.evtDeck?.length) game.evtDeck = existingGame.evtDeck;
    return game;
  }

  function eventDeckComposition(deck) {
    return deck.reduce(
      (result, card) => {
        result.total++;
        result[card.pub ? "public" : "private"]++;
        if (card.irisCorruption) result.irisThreat++;
        return result;
      },
      { total: 0, public: 0, private: 0, irisThreat: 0 },
    );
  }

  function expectedEventDeckComposition(withSynth, humanPlayerCount) {
    const irisThreat = withSynth ? 2 : 0;
    if (humanPlayerCount === 1)
      return { total: 51, public: 51, private: 0, irisThreat };
    return { total: 80, public: 51, private: 29, irisThreat };
  }

  function takeEquipmentCard(deck, { category, id } = {}) {
    if (!Array.isArray(deck) || !deck.length) return null;
    let index = deck.length - 1;
    if (category || id) {
      while (
        index >= 0 &&
        ((category && deck[index]?.cat !== category) ||
          (id && deck[index]?.id !== id))
      )
        index--;
    }
    if (index < 0) return null;
    return deck.splice(index, 1)[0] || null;
  }

  function incapacitationAfterSkippedTurn(player) {
    if (!player.alive || player.isSynth || player.health !== 0)
      return { skipped: false, died: false, incapacitated: player.incapacitated };
    const incapacitated = (player.incapacitated || 0) + 1;
    return {
      skipped: true,
      died: incapacitated >= INCAPACITATION_ROUNDS,
      incapacitated,
    };
  }

  function nextLivingPlayer(players, currentPlayer) {
    let next = (currentPlayer + 1) % players.length;
    let tries = 0;
    while (!players[next].alive && tries++ < players.length)
      next = (next + 1) % players.length;
    return next;
  }

  // Inversion Field is mandatory: the acting player must swap Food with a
  // chosen crew member and neither side may decline (docs/FieldGuide.md).
  // Both the first-landing and repeat/anomaly resolution paths in game.js
  // share this logic so the rule can't drift out of sync between them.
  function inversionFieldTargets(players, actingPlayerId) {
    return players.filter(
      (player) => player.alive && player.id !== actingPlayerId,
    );
  }

  function swapFood(playerA, playerB) {
    const tmp = playerA.food;
    playerA.food = playerB.food;
    playerB.food = tmp;
  }

  return {
    INCAPACITATION_ROUNDS,
    firebaseArray,
    playerName,
    enumeratedValue,
    clampInt,
    safeRevision,
    sanitizeIncomingGameState,
    normalizePlayerIdentities,
    normalizeSavedGame,
    isTurnOwner,
    canWriteState,
    controllingPlayerIndex,
    ownsPrivateCard,
    publicGameState,
    privateGameState,
    mergePrivateGameState,
    eventDeckComposition,
    expectedEventDeckComposition,
    takeEquipmentCard,
    incapacitationAfterSkippedTurn,
    nextLivingPlayer,
    inversionFieldTargets,
    swapFood,
  };
});
