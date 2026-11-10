# AGENTS.md

Pulse Fitness: a website for a fictional gym, used for Factory demos. Built with Vite, React 19, TypeScript, and React Router.

## Commands

- Install: `npm install`
- Dev server: `npm run dev` (http://localhost:5173)
- Lint: `npm run lint` (oxlint)
- Test: `npm test` (Vitest + Testing Library, jsdom)
- Build and type check: `npm run build`

Run lint, test, and build before opening a PR. CI runs the same three checks.

## Layout

- `src/pages/` one component per route (`Home`, `Memberships`, `Classes`, `Locations`, `NotFound`)
- `src/components/` shared UI (`Header`, `Footer`, `PlanCard`)
- `src/data/` static typed data (plans, locations, classes, amenities); there is no backend
- `src/index.css` all styles, using the CSS variables in `:root`
- `src/test/` tests; render routes with `MemoryRouter` like `App.test.tsx`

## Conventions

- Function components and named types in the data files.
- Import local files with the `.tsx`/`.ts` extension.
- Query elements by accessible role and name in tests.
- Add tests for every new feature.
