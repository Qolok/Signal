'use strict';
// ═══════════════════════════════════════════════════════════════════
// SIGNAL — Online Multiplayer Sync (Firebase Realtime Database)
// ═══════════════════════════════════════════════════════════════════
//
// Deploy database.rules.json and enable Firebase Anonymous Authentication before
// hosting this client. See docs/FirebaseSetup.md for setup and migration details.
//
// ═══════════════════════════════════════════════════════════════════

const FIREBASE_CONFIG = {
  apiKey:            'AIzaSyAmAEV8aSWmNC0euQo9nIjXRONAuAS0s64',
  authDomain:        'signal-serve.firebaseapp.com',
  databaseURL:       'https://signal-serve-default-rtdb.firebaseio.com',
  projectId:         'signal-serve',
  storageBucket:     'signal-serve.firebasestorage.app',
  messagingSenderId: '856688466444',
  appId:             '1:856688466444:web:22f65380f65c8412756c29',
};

// App Check (attestation): the public reCAPTCHA v3 SITE key for this domain.
// This is safe to ship in the client; the matching secret lives in the Firebase
// console. Enforce App Check on the Realtime Database in the console so only
// attested clients can read/write. See docs/FirebaseSetup.md.
const APP_CHECK_RECAPTCHA_SITE_KEY = 'REPLACE_WITH_RECAPTCHA_V3_SITE_KEY';

// ── Internal state ──────────────────────────────────────────────────
const SESSION_KEY = 'signal_mp_session';
const ROOM_TTL_MS = 24 * 60 * 60 * 1000;
// Minimum server-time gap between two room creations by the same uid. Kept in
// sync with the `hosts/$uid/lastCreated` throttle in database.rules.json.
const ROOM_CREATE_MIN_INTERVAL_MS = 15 * 1000;
// Room-code length and alphabet. 8 chars over a 32-symbol alphabet is ~40 bits
// of entropy (32^8 ≈ 1.1e12), drawn from a CSPRNG, so brute-forcing a live code
// through the auth-gated read rule is impractical.
const JOIN_CODE_LENGTH = 8;
const JOIN_CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

let _clientId = null;
let _presenceId = null;

let _db             = null;
let _gameRef        = null;
let _joinCode       = null;
let _myPlayerIndex  = null;
let _active         = false;
let _receivingState = false;
let _onStateUpdate  = null;
let _stateRevision  = 0;
let _hasState       = false;
let _writeQueue     = Promise.resolve();
let _sessionGeneration = 0;
let _disconnectCleanup = null;
let _connectedRef = null;
let _lobbyData = null;
const _SUPERSEDED_PRIVATE_STATE = {};

// ── Public API ──────────────────────────────────────────────────────
window.Sync = {

  isActive()      { return _active; },
  myPlayerIndex() { return _myPlayerIndex; },
  joinCode()      { return _joinCode; },
  isReceiving()   { return _receivingState; },

  // Call once on page load before using any other Sync method
  async init() {
    if (typeof firebase === 'undefined') {
      console.error('Sync: Firebase SDK not loaded. Check your <script> tags.');
      return false;
    }
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    _activateAppCheck();
    if (typeof firebase.auth !== 'function') {
      console.error('Sync: Firebase Auth SDK not loaded. Check your <script> tags.');
      return false;
    }
    const auth = firebase.auth();
    const credential = auth.currentUser
      ? null
      : await auth.signInAnonymously();
    _clientId = auth.currentUser?.uid || credential?.user?.uid;
    if (!_clientId) throw new Error('Firebase anonymous authentication failed.');
    _presenceId = _clientId;
    _db = firebase.database();
    return true;
  },

  generateJoinCode() {
    // Excludes ambiguous characters: I, O, 0, 1. Draws each symbol from a
    // CSPRNG so codes are unpredictable — Math.random() is not cryptographically
    // secure. The 32-symbol alphabet divides 256 evenly, so byte % 32 is
    // unbiased with no rejection sampling required.
    const chars = JOIN_CODE_ALPHABET;
    const crypto = _crypto();
    let code = '';
    if (crypto) {
      const bytes = crypto.getRandomValues(new Uint8Array(JOIN_CODE_LENGTH));
      for (let i = 0; i < JOIN_CODE_LENGTH; i++) {
        code += chars[bytes[i] % chars.length];
      }
    } else {
      // Fallback for environments without Web Crypto (very old browsers).
      for (let i = 0; i < JOIN_CODE_LENGTH; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    return code;
  },

  // HOST: register a game room in Firebase and claim player slot 0
  async hostGame(joinCode) {
    if (_gameRef) await _removePresence(_gameRef);
    _resetStateTracking();
    _joinCode      = joinCode;
    _myPlayerIndex = 0;
    _active        = true;
    _gameRef       = _db.ref(`games/${joinCode}`);

    let ownsRoom = false;
    try {
      const created = Date.now();
      // Atomic write: the room meta and the per-uid throttle token commit
      // together. database.rules.json ties room creation to this token and
      // rejects it when the same uid created a room < ROOM_CREATE_MIN_INTERVAL_MS
      // ago, rate-limiting room-creation spam.
      await _db.ref().update({
        [`games/${joinCode}/meta`]: {
          hostId:  _clientId,
          created,
          expiresAt: created + ROOM_TTL_MS,
          started: false,
        },
        [`hosts/${_clientId}/lastCreated`]: {
          created,
          roomCode: joinCode,
        },
      });
      ownsRoom = true;
      await _attachPresence(0);
    } catch (error) {
      if (ownsRoom) {
        await _removePresence(_gameRef, 0).catch(() => {});
      }
      _gameRef?.off();
      _gameRef = null;
      _joinCode = null;
      _myPlayerIndex = null;
      _active = false;
      await _cancelDisconnectCleanup().catch(() => {});
      throw error;
    }

    _saveSession();
    _startListening();
  },

  // JOIN: connect to an existing game and claim the next open slot (1–5)
  async joinGame(joinCode) {
    if (_gameRef) await _removePresence(_gameRef);
    _resetStateTracking();
    _myPlayerIndex = null;
    _active = false;
    _joinCode = joinCode.toUpperCase().trim();
    _gameRef  = _db.ref(`games/${_joinCode}`);

    const metaSnap = await _gameRef.child('meta').once('value');
    if (!metaSnap.exists()) {
      _gameRef = null;
      _joinCode = null;
      throw new Error('Game not found. Check the join code and try again.');
    }
    if (_isExpired(metaSnap.val())) {
      _pruneExpiredRoom(_gameRef);
      _gameRef = null;
      _joinCode = null;
      throw new Error('This game room has expired.');
    }

    let slot;
    try {
      slot = await _claimPlayerSlot(_gameRef);
      const presenceRefs = _getPresenceRefs(_gameRef);
      await _armDisconnectCleanup(
        presenceRefs.connectionRef,
        presenceRefs.lobbyRef,
        slot,
      );
      await _removeStaleLobbyEntries(_gameRef);
      _monitorPresence(
        _gameRef,
        presenceRefs.connectionRef,
        presenceRefs.lobbyRef,
        slot,
      );
    } catch (error) {
      if (Number.isInteger(slot)) {
        await _removePresence(_gameRef, slot).catch(() => {});
      }
      await _cancelDisconnectCleanup();
      throw error;
    }
    _myPlayerIndex = slot;
    _active = true;
    _saveSession();
    _startListening();
    return slot;
  },

  // Called only for explicit gameplay mutations. A pending marker hides the
  // public revision until its owner-private state has been written.
  pushState(serializedState, privateState, privateOwner, deckOwner) {
    if (!_active || !_gameRef || _receivingState) return;
    const gameRef = _gameRef;
    const sessionGeneration = _sessionGeneration;
    const write = () =>
      sessionGeneration === _sessionGeneration
        ? _transactionalStateWrite(
          gameRef,
          sessionGeneration,
          serializedState,
          privateState,
          privateOwner,
          deckOwner,
        )
        : false;
    _writeQueue = _writeQueue.then(write, write);
    return _writeQueue;
  },

  // Register the callback that game.js calls with incoming remote state
  onStateUpdate(callback) {
    _onStateUpdate = callback;
  },

  // Returns the stored multiplayer session, or null if none
  restoreSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  },

  // Re-attach to an existing Firebase room after a page reload
  async reconnect(joinCode, playerIndex) {
    _resetStateTracking();
    _joinCode      = joinCode;
    _myPlayerIndex = playerIndex;
    _active        = true;
    _gameRef       = _db.ref(`games/${joinCode}`);
    const metaSnap = await _gameRef.child('meta').once('value');
    if (!metaSnap.exists() || _isExpired(metaSnap.val())) {
      if (metaSnap.exists() && _isExpired(metaSnap.val())) {
        _pruneExpiredRoom(_gameRef);
      }
      _gameRef = null;
      _joinCode = null;
      _active = false;
      localStorage.removeItem(SESSION_KEY);
      throw new Error('This game room is no longer available.');
    }
    const presenceRefs = _getPresenceRefs(_gameRef);
    const result = await _restorePresence(_gameRef, playerIndex);
    if (_slotForUid(result.snapshot.val(), _presenceId) !== playerIndex) {
      await _removeStaleLobbyEntries(_gameRef);
      await _cancelDisconnectCleanup();
      _gameRef = null;
      _joinCode = null;
      _active = false;
      localStorage.removeItem(SESSION_KEY);
      throw new Error('Your previous player slot is no longer available.');
    }
    await _armDisconnectCleanup(
      presenceRefs.connectionRef,
      presenceRefs.lobbyRef,
      playerIndex,
    );
    await _removeStaleLobbyEntries(_gameRef);
    _monitorPresence(
      _gameRef,
      presenceRefs.connectionRef,
      presenceRefs.lobbyRef,
      playerIndex,
    );
    _saveSession();
    _startListening();
  },

  // Suppress echo push while applying incoming state (call before/after render)
  beginReceive() { _receivingState = true;  },
  endReceive()   { _receivingState = false; },

  // Write this client's lobby selection (portrait + name)
  updateLobbySlot(data) {
    if (!_active || !_gameRef) return;
    _lobbyData = data;
    _gameRef.child('lobby').child(_presenceId).set(data);
  },

  // Listen for any lobby change (fires immediately with current data)
  onLobbyUpdate(callback) {
    if (!_gameRef) return;
    _gameRef.child('lobby').on('value', snap => callback(snap.val() || {}));
  },

  // One-time read of the full lobby (used by host at launch)
  async getLobbyOnce() {
    const snap = await _gameRef.child('lobby').once('value');
    return snap.val() || {};
  },

  // Graceful leave: remove lobby + connection entries, then clear session
  async leaveLobby() {
    if (_gameRef) {
      try {
        await _removePresence(_gameRef);
      } catch(_) {}
      _gameRef.off();
      _gameRef = null;
    }
    localStorage.removeItem(SESSION_KEY);
    _active = false;
    _lobbyData = null;
    _resetStateTracking();
  },

  clearSession() {
    const gameRef = _gameRef;
    localStorage.removeItem(SESSION_KEY);
    _active = false;
    _lobbyData = null;
    _resetStateTracking();
    if (gameRef) {
      gameRef.off();
      _gameRef = null;
      _removePresence(gameRef).catch(() => {});
    }
  },

  // HOST: push site builder placed-tile snapshot for clients to watch
  pushBuilderState(placedObj) {
    if (!_active || !_gameRef) return;
    _gameRef.child('builder').set(placedObj);
  },

  // CLIENT: watch for builder state changes while host is building
  onBuilderUpdate(callback) {
    if (!_gameRef) return;
    _gameRef.child('builder').on('value', snap => {
      if (snap.exists()) callback(snap.val());
    });
  },
};

// ── Private helpers ─────────────────────────────────────────────────

function _crypto() {
  return (typeof globalThis !== 'undefined' &&
    globalThis.crypto &&
    typeof globalThis.crypto.getRandomValues === 'function')
    ? globalThis.crypto
    : null;
}

let _appCheckActivated = false;
function _activateAppCheck() {
  if (_appCheckActivated) return;
  // App Check SDK optional at runtime: if the script tag is absent the game
  // still works, but production must load it and enforce App Check on the
  // Realtime Database in the Firebase console (see docs/FirebaseSetup.md).
  if (typeof firebase.appCheck !== 'function') return;
  if (!APP_CHECK_RECAPTCHA_SITE_KEY ||
      APP_CHECK_RECAPTCHA_SITE_KEY === 'REPLACE_WITH_RECAPTCHA_V3_SITE_KEY') {
    console.warn('Sync: App Check reCAPTCHA site key not configured; skipping activation.');
    return;
  }
  try {
    // Second arg enables automatic token refresh so long sessions stay attested.
    firebase.appCheck().activate(APP_CHECK_RECAPTCHA_SITE_KEY, true);
    _appCheckActivated = true;
  } catch (error) {
    console.error('Sync: App Check activation failed.', error);
  }
}

function _pruneExpiredRoom(gameRef) {
  // The rules permit any authenticated client to delete a room once it has
  // expired, so clients opportunistically clean up abandoned rooms they land
  // on. A scheduled trusted job still handles rooms no client ever revisits.
  if (!gameRef) return Promise.resolve();
  return gameRef.remove().catch(() => {});
}

function _saveSession() {
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    joinCode:    _joinCode,
    playerIndex: _myPlayerIndex,
  }));
}

function _isExpired(meta) {
  return Number.isFinite(meta?.expiresAt) && meta.expiresAt <= Date.now();
}

async function _attachPresence(playerIndex) {
  const { connectionRef, lobbyRef } = _getPresenceRefs(_gameRef);
  const result = await _restorePresence(_gameRef, playerIndex);
  if (_slotForUid(result.snapshot.val(), _presenceId) !== playerIndex) {
    throw new Error('The host player slot is unavailable.');
  }
  await _armDisconnectCleanup(connectionRef, lobbyRef, playerIndex);
  _monitorPresence(_gameRef, connectionRef, lobbyRef, playerIndex);
}

function _getPresenceRefs(gameRef) {
  return {
    connectionRef: gameRef.child('connections'),
    lobbyRef: gameRef.child('lobby').child(_presenceId),
  };
}

function _monitorPresence(gameRef, connectionRef, lobbyRef, playerIndex) {
  _connectedRef = _db.ref('.info/connected');
  let seenConnectionState = false;
  let wasConnected = false;
  _connectedRef.on('value', snap => {
    const connected = !!snap.val();
    const reconnected = seenConnectionState && connected && !wasConnected;
    seenConnectionState = true;
    wasConnected = connected;
    if (!reconnected || !_active || !_gameRef) return;
    _handleReconnect(gameRef, connectionRef, lobbyRef, playerIndex)
      .catch(() => {});
  });
}

async function _handleReconnect(gameRef, connectionRef, lobbyRef, playerIndex) {
  if (!_active || gameRef !== _gameRef) return;
  const result = await _restorePresence(gameRef, playerIndex);
  if (_slotForUid(result.snapshot.val(), _presenceId) !== playerIndex) {
    await lobbyRef.remove();
    localStorage.removeItem(SESSION_KEY);
    _active = false;
    return;
  }
  await _armDisconnectCleanup(connectionRef, lobbyRef, playerIndex);
  await _removeStaleLobbyEntries(gameRef);
  if (_lobbyData !== null) await lobbyRef.set(_lobbyData);
}

function _restorePresence(gameRef, playerIndex) {
  return gameRef.child('connections').transaction(connectionsValue => {
    const connections = _normalizedConnections(connectionsValue);
    const existingSlot = _slotForUid(connections, _presenceId);
    const slotOwner = connections.bySlot[playerIndex];
    if (
      (existingSlot !== null && existingSlot !== playerIndex) ||
      (slotOwner && slotOwner !== _presenceId)
    )
      return;
    return {
      bySlot: {
        ...connections.bySlot,
        [playerIndex]: _presenceId,
      },
      byUid: {
        ...connections.byUid,
        [_presenceId]: playerIndex,
      },
    };
  }, undefined, false);
}

function _isOwnPresenceId(presenceId) {
  return presenceId === _clientId;
}

async function _removeStaleLobbyEntries(gameRef) {
  const lobbyRef = gameRef.child('lobby');
  const snapshot = await lobbyRef.once('value');
  const stalePresenceIds = Object.keys(snapshot.val() || {})
    .filter(presenceId =>
      presenceId !== _presenceId && _isOwnPresenceId(presenceId));
  await Promise.all(
    stalePresenceIds.map(presenceId => lobbyRef.child(presenceId).remove()),
  );
}

async function _armDisconnectCleanup(connectionRef, lobbyRef, playerIndex) {
  const cleanup = {
    connection: connectionRef.onDisconnect(),
    lobby: lobbyRef.onDisconnect(),
  };
  await Promise.all([
    cleanup.connection.update({
      [`bySlot/${playerIndex}`]: null,
      [`byUid/${_presenceId}`]: null,
    }),
    cleanup.lobby.remove(),
  ]);
  _disconnectCleanup = cleanup;
}

async function _cancelDisconnectCleanup(
  cleanup = _disconnectCleanup,
  connectedRef = _connectedRef,
) {
  if (connectedRef) {
    connectedRef.off();
    if (_connectedRef === connectedRef) _connectedRef = null;
  }
  const cleanups = [cleanup?.connection, cleanup?.lobby]
    .filter(Boolean)
    .map(cleanup => cleanup.cancel());
  if (_disconnectCleanup === cleanup) _disconnectCleanup = null;
  await Promise.all(cleanups);
}

async function _removePresence(gameRef, playerIndex = _myPlayerIndex) {
  const cleanup = _disconnectCleanup;
  const connectedRef = _connectedRef;
  if (connectedRef) connectedRef.off();
  if (_disconnectCleanup === cleanup) _disconnectCleanup = null;
  if (_connectedRef === connectedRef) _connectedRef = null;
  const removals = [
    gameRef.child('lobby').child(_presenceId).remove(),
  ];
  if (Number.isInteger(playerIndex)) {
    removals.push(gameRef.child('connections').update({
      [`bySlot/${playerIndex}`]: null,
      [`byUid/${_presenceId}`]: null,
    }));
  }
  await Promise.all(removals);
  await _cancelDisconnectCleanup(cleanup, connectedRef);
}

function _resetStateTracking() {
  _sessionGeneration++;
  _stateRevision = 0;
  _hasState = false;
  _writeQueue = Promise.resolve();
}

function _claimPlayerSlot(gameRef) {
  return gameRef.child('connections').transaction(connectionsValue => {
    const connections = _normalizedConnections(connectionsValue);
    const existingSlot = _slotForUid(connections, _presenceId);
    if (
      Number.isInteger(existingSlot) &&
      existingSlot >= 1 &&
      existingSlot <= 5 &&
      connections.bySlot[existingSlot] === _presenceId
    )
      return connections;
    if (existingSlot !== null) return;
    let slot = 1;
    while (connections.bySlot[slot] && slot <= 5) slot++;
    if (slot > 5) return;
    return {
      bySlot: {
        ...connections.bySlot,
        [slot]: _presenceId,
      },
      byUid: {
        ...connections.byUid,
        [_presenceId]: slot,
      },
    };
  }, undefined, false).then(result => {
    const slot = _slotForUid(result.snapshot.val(), _presenceId);
    if (!result.committed || !Number.isInteger(slot)) {
      _gameRef = null;
      _joinCode = null;
      throw new Error('Game is full (6 players maximum).');
    }
    return slot;
  }, error => {
    _gameRef = null;
    _joinCode = null;
    throw error;
  });
}

function _normalizedConnections(value) {
  return {
    bySlot: { ...(value?.bySlot || {}) },
    byUid: { ...(value?.byUid || {}) },
  };
}

function _slotForUid(connections, uid) {
  const slot = connections?.byUid?.[uid];
  return Number.isInteger(slot) ? slot : null;
}

function _revisionOf(state) {
  const revision = Number(state?._revision);
  return Number.isSafeInteger(revision) && revision >= 0 ? revision : 0;
}

function _transactionalStateWrite(
  gameRef,
  sessionGeneration,
  serializedState,
  privateState,
  privateOwner,
  deckOwner,
) {
  if (
    !_active ||
    gameRef !== _gameRef ||
    sessionGeneration !== _sessionGeneration ||
    _receivingState
  )
    return Promise.resolve(false);
  const expectedRevision = _stateRevision;
  const nextRevision = expectedRevision + 1;
  return gameRef.child('state').transaction(stateValue => {
    if (_revisionOf(stateValue) !== expectedRevision) return;
    return {
      ...serializedState,
      _source: _clientId,
      _revision: nextRevision,
      _pending: _clientId,
      _privateOwner: privateOwner,
      _deckOwner: deckOwner,
    };
  }, undefined, false).then(result => {
    if (!result.committed) return false;
    const updates = {
      'state/_pending': null,
      'state/_privateOwner': null,
      'state/_deckOwner': null,
    };
    if (Number.isInteger(privateOwner)) {
      updates[`private/${privateOwner}`] = {
        ...privateState,
        evtDeck:
          privateOwner === deckOwner ? privateState.evtDeck : [],
        _revision: nextRevision,
      };
    }
    if (Number.isInteger(deckOwner) && deckOwner !== privateOwner) {
      updates[`private/${deckOwner}/ownerIndex`] = deckOwner;
      updates[`private/${deckOwner}/evtDeck`] = privateState.evtDeck;
      updates[`private/${deckOwner}/_revision`] = nextRevision;
    }
    return gameRef.update(updates)
      .then(() => {
        if (sessionGeneration === _sessionGeneration) {
          _stateRevision = nextRevision;
          _hasState = true;
        }
        return true;
      });
  });
}

function _readPrivateState(gameRef, ownerIndex, revision) {
  return gameRef.child('private').child(ownerIndex).once('value').then(snap => {
    const privateState = snap.val() || null;
    const privateRevision = _revisionOf(privateState);
    if (privateRevision > revision) return _SUPERSEDED_PRIVATE_STATE;
    return privateState;
  });
}

function _startListening() {
  if (!_gameRef) return;
  _gameRef.child('state').on('value', snap => {
    if (!snap.exists()) return;
    if (!_onStateUpdate) return;
    const gameRef = _gameRef;
    const sessionGeneration = _sessionGeneration;
    const data = snap.val();
    // Ingress guard: state must be an object. Revisions are validated by
    // _revisionOf; game.js sanitizes every consumed field before applying.
    if (!data || typeof data !== 'object' || Array.isArray(data)) return;
    if (data._pending) return;
    const revision = _revisionOf(data);
    if (_hasState && revision <= _stateRevision) return;
    _stateRevision = revision;
    _hasState = true;
    if (data._source === _clientId) return;
    if (!Number.isInteger(_myPlayerIndex)) {
      _onStateUpdate(data);
      return;
    }
    _readPrivateState(gameRef, _myPlayerIndex, revision).then(privateState => {
      if (
        sessionGeneration !== _sessionGeneration ||
        gameRef !== _gameRef ||
        revision !== _stateRevision ||
        privateState === _SUPERSEDED_PRIVATE_STATE
      )
        return;
      data._privateState = privateState;
      _onStateUpdate(data);
    });
  });
}
