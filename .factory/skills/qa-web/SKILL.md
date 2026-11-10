---
name: qa-web
description: >
  QA tests for the Pulse Fitness web app (Vite + React 19 + React Router single-page site).
  Covers the home page, header and footer navigation, membership plans, class schedule,
  club locations, and the not found page, tested in a real browser as an anonymous visitor.
---

# QA: Pulse Fitness web app

Use the `droid-control` skill for all browser interactions. Route the target through its **browser-use** atom, and use its **capture** and **verify** stages. Load **compose** only when both `video_evidence` and `droid_control.compose` are true in `.factory/skills/qa/config.yaml`. This file describes WHAT to test and what success looks like; droid-control owns HOW to drive the browser, record, and verify.

## Testing Target

The site has no deployed or preview environments. Always test the checked-out branch on a local dev server:

1. Install dependencies if `node_modules` is missing: `npm ci` (Node 24, matching `.github/workflows/ci.yml`).
2. Run `mkdir -p qa-results`, then start the dev server as a background job that outlives the command: use the Execute tool's background mode (`fireAndForget`), not shell `&`. Droid stops processes a command leaves running with `&` when that command returns. Keep its log:
   `npm run dev -- --host 127.0.0.1 --port 5173 --strictPort > ./qa-results/dev-server.log 2>&1`
3. Poll `http://127.0.0.1:5173/` until it returns HTTP 200 (up to 60 seconds). If it never does, report every web flow as BLOCKED and quote the tail of `dev-server.log`.
4. Use `http://127.0.0.1:5173` as the base URL for every flow. Routes are client-side (`BrowserRouter`); the Vite dev server serves `index.html` for deep links such as `/classes`.
5. Stop the dev server by its PID when finished.

**Never fall back to a remote URL.** Remote environments run different code; testing them says nothing about the PR. If the local server can't start, report BLOCKED.

## Authentication in CI

None. The site has no login, accounts, or backend. No app credentials are needed. The CI workflow provides only `FACTORY_API_KEY` (for Droid itself) and, for video uploads, `QA_EVIDENCE_TOKEN` and `REPO_ID`.

## Persona

- **visitor**: anonymous visitor. Can browse every page. There are no restricted areas, so there are no permission (negative-access) tests; use boundary tests instead (unknown routes, narrow viewports, keyboard navigation).

## Source of truth for expected values

Page content comes from static typed data. Read the PR branch's files for expected values instead of hardcoding them, so tests stay correct when a ticket changes the data:

- `src/data/plans.ts`: plan names, monthly prices (rendered with 2 decimals, e.g. `$14.99`), fees, features, which plan is `featured`
- `src/data/classes.ts`: class schedule rows, and the `studios` cards on the home page
- `src/data/locations.ts`: club list, addresses, amenities
- `src/data/amenities.ts`: home page amenity tiles
- Components: `src/components/Header.tsx`, `Footer.tsx`, `PlanCard.tsx`; pages in `src/pages/`

When the diff changes one of these files, assert the NEW values from the branch.

## Flow menu

Pick only the flows the diff touches, plus adjacent integration checks. Map changed files to flows:

| Changed file(s) | Flows |
|---|---|
| `src/pages/Home.tsx`, `src/data/amenities.ts` | home |
| `src/components/Header.tsx` | header-navigation (+ a quick check on two pages) |
| `src/components/Footer.tsx` | footer (+ a quick check on two pages) |
| `src/pages/Memberships.tsx`, `src/components/PlanCard.tsx`, `src/data/plans.ts` | memberships |
| `src/pages/Classes.tsx` | classes |
| `src/data/classes.ts` | classes + home (it also supplies the `studios` cards in "Classes for every goal") |
| `src/pages/Locations.tsx`, `src/data/locations.ts` | locations (+ home, which shows the first 4 clubs) |
| `src/pages/NotFound.tsx`, `src/App.tsx` routes | not-found, header-navigation |
| `src/index.css`, `index.html`, `src/main.tsx`, `src/App.tsx` layout | responsive-layout + the flows for the pages whose styles changed |
| `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig*.json` | smoke: home, header-navigation, one deep link |

### home
1. Open `/`.
2. The level-1 heading reads "Stronger every day."
3. "Join Now" links exist in the header and hero, and both go to `/memberships`.
4. "Start your free 1-day trial" goes to `/locations`.
5. Sections render: "Everything you need, under one roof" (one tile per amenity), "Classes for every goal" (studio cards with "View schedule →" linking to `/classes`), "Find a club near you" (the first 4 clubs and an "All locations →" link), and "What members say" (3 quotes).

### header-navigation
1. On `/`, the "Main" navigation shows Memberships, Classes, and Locations.
2. Click each link: the URL changes, the page's level-1 heading changes, and the clicked link gets the active style (`nav__link active` class / visibly highlighted).
3. The "Pulse Fitness home" logo link returns to `/`.
4. Browser Back returns to the previous page with the correct heading.

### footer
1. On any page, the footer shows the PULSE FITNESS logo, "Stronger every day.", and links to Memberships, Classes, and Locations.
2. Each footer link navigates to the right page.
3. The note "Fictional gym for demo purposes. Clubs, prices, and reviews are made up." is visible.

### memberships
1. Open `/memberships`. Heading: "Memberships that fit your life".
2. One card (`article`, named by the plan) per plan in `src/data/plans.ts`, each with the monthly price (`$X.XX` and "/mo"), tagline, features, and the "$<enrollment> enrollment fee · $<annual> annual fee" line.
3. Only the `featured` plan shows the "Most popular" badge.
4. Each card has a "Choose <plan>" button. Today these buttons have no action: clicking must not navigate, throw, or change the page. If the diff adds behavior, test the new behavior instead.

### classes
1. Open `/classes`. Heading: "Weekly class schedule".
2. The table has the columns Day, Time, Class, Type, Length, Coach.
3. There is one body row per entry in `src/data/classes.ts`; lengths render as "<n> min" and each type renders as a pill.

### locations
1. Open `/locations`. Heading: "Find a club near you".
2. The lead text reads "<count> clubs across the Midwest and Mountain West." with the count from `src/data/locations.ts`.
3. The "Club locations" list has one card per club, each with name, address, city/state/zip, and amenity tags.

### not-found
1. Open an unknown route such as `/does-not-exist`.
2. Heading "Page not found" and the text "That page skipped leg day." appear; the header and footer still render.
3. "Back to home" returns to `/`.

### responsive-layout
1. Check the changed pages at desktop (1280x720) and mobile (375x812) viewports.
2. No horizontal page scroll, no overlapping or clipped text, header nav and "Join Now" stay reachable, and the class table scrolls inside its wrapper on narrow screens.

### Ad-hoc tests
When no flow above covers the change (for example a new button, toggle, or section), write a targeted test from the ticket/PR description: verify the new element renders, works by mouse and keyboard, survives navigation to another page and back, and doesn't break the adjacent sections. Include at least one boundary case.

## Error handling

- Watch the browser console during each flow. Any uncaught error or React error caused by the change is a FAIL, even if the page looks right.
- A blank page usually means a runtime error: capture the console and the tail of `dev-server.log` as evidence.
- If the dev server port is taken, stop the stale process this run started; don't pick a random port without updating the base URL.

## Known Failure Modes

1. **Dev server not reachable from the browser in CI.** Bind explicitly with `--host 127.0.0.1` and use `127.0.0.1`, not `localhost`, if the browser resolves `localhost` to IPv6.
2. **Chromium missing on a fresh runner.** Run `agent-browser doctor --offline --quick`; run `agent-browser install` once if it reports Chrome missing. If it still fails, report BLOCKED.
3. **Lost browser recordings.** WebM finalization needs `ffmpeg`. If a recording is missing or empty, report the flow with text evidence and note the missing video.
4. **Stale snapshot refs after navigation.** React Router swaps the page without a full reload; re-snapshot after every click that changes the route.
5. **Featured-plan styling vs. data.** The "Most popular" badge is driven by `featured: true` in `src/data/plans.ts`; compare against the branch's data, not a hardcoded plan name.
