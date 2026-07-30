![Signal Game](img/screens/game.jpg)

# SIGNAL

[![CI](https://github.com/Qolok/Signal/actions/workflows/ci.yml/badge.svg)](https://github.com/Qolok/Signal/actions/workflows/ci.yml)

## Tests

Every push and pull request runs the checks below via
[GitHub Actions](.github/workflows/ci.yml); the badge above reflects the latest
run on the default branch. A red badge means `npm test` or `npm run test:rules`
failed — those steps block the build, while `npm audit` runs as a reported,
non-blocking step.

Run the same checks locally:

```sh
npm ci             # install dev tooling from package-lock.json
npm test           # game-logic regression suite (Node test runner, no Firebase)
npm run test:rules # Firebase database rules suite against the emulator
npm audit          # reported only — advisories don't fail the build
```

`npm test` uses Node's built-in test runner and does not connect to Firebase.
`npm run test:rules` boots the Firebase Realtime Database emulator (a Java
process — install a JDK 17+ / `java` on your PATH) via `firebase-tools`, so it
needs no live Firebase project.

## Dependencies & Security

The game itself ships no npm dependencies to the browser — `index.html`, `game.js`,
`game-logic.js`, `sync.js`, and `style.css` are served as-is by any static host. The
npm packages are dev-only tooling: `serve` (local dev server via `npm start`),
`firebase-tools` (rules deploy + database emulator), and `@firebase/rules-unit-testing`
(the emulator rules suite). None of them reach the served bundle.

`firebase-tools@15` pulls in transitive packages that carried published advisories
(a `brace-expansion` DoS cascade plus `uuid` and `@opentelemetry/core` issues), and
there is no patched `firebase-tools` release that resolves them — `npm audit fix --force`
only offers a breaking downgrade to `firebase-tools@14`. Instead, the affected transitive
packages are pinned to their patched versions via `overrides` in `package.json`:

```json
"overrides": {
  "brace-expansion": "5.0.9",
  "gaxios@6.7.1": {
    "uuid": "11.1.1"
  },
  "@opentelemetry/core": "2.8.0"
}
```

With these in place `npm audit` reports **0 vulnerabilities**, while `firebase-tools`
stays on the current `15.x` line. The `uuid` override is limited to the affected
`gaxios@6.7.1` dependency, leaving packages that require newer `uuid` releases on
their compatible versions. `npm test`, `npm run test:rules` (the Java emulator suite),
and `npm start` all pass with the overrides applied. If a future `firebase-tools`
upgrade adopts these patched versions natively, the `overrides` block can be removed.

*A game of survival, exploration, and eroding trust — where rescue is uncertain, and the greatest threat may be sitting across the table.*

**1–6 Players · Ages 14+ · 30–60 Minutes**

---

# The Story

You are the crew of the Endymion 7, a deep-range mining vessel. Your ship has crash-landed on an uncharted alien planet. You don't know what brought you down. You don't know what's out there. You have what survived the crash, and each other — for now.

Somewhere out there, scattered across the terrain, are pieces of your radio. Find them and rebuild the Signal Array. Rescue is possible but not guaranteed. And the longer you're stranded, the more the planet changes you.

---

# How to Play

Signal is a survival game. All players begin at a crashed ship with nothing but a handful of equipment and a dwindling supply of food and oxygen. The planet around you is unmapped — you reveal it as you explore, placing tiles as you go.

Your goal is to locate Radio Fragments scattered across the terrain, return them to the ship's Signal Array, and activate a rescue beacon strong enough to be heard. Rescue arrives when the Signal Roll succeeds. Anyone alive at that moment wins.

But survival is not just about resources and navigation. The planet corrupts. Some players may find themselves — quietly, privately — working against the group.

The game has no fixed end point. You don't know when rescue will come. You don't know who, if anyone, has been corrupted. You only know what you can see, what you've been told, and how much you have left.

## The Three Tensions

- **Survival.** Rations and O2 Tanks deplete every round. The crash site is your lifeline. Venture too far and you may not make it back.
- **Exploration.** Radio Fragments are out there, but finding them means pushing deeper into unknown terrain — away from safety, away from others, into situations only you will know about.
- **Trust.** Corruption changes a player's win condition silently. The group must cooperate to survive, but cooperation requires trust the planet is quietly eroding.

Signal is designed to teach itself with instructions revealed through gameplay. The only things players need to know before their first turn:

- Roll to move.
- Draw and place tiles when you reach unexplored space.
- Investigate and draw an Event card.
- Flip your resources when your turn ends.
- Survive until rescue.

---

# Field Guide

- View the [Field Guide](docs/FieldGuide.md) which fully explains all the rules and gameplay.
