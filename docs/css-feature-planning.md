# CSS Feature Planning

## Purpose

This document mirrors [HTML feature planning](./html-feature-planning.md) for the **CSS** track. It records how the CSS module works in the app today, how to extend it, and sensible next steps—without re-reading the whole codebase.

## Current goal (target experience)

Long term, the CSS module can match the depth of HTML:

- CSS topic tracking with toggles (already shared with all modules)
- optional **CSS-specific practice projects** (not built yet)
- project detail pages, setup/requirements, and optional extended docs under `docs/practice/css/`

Right now only the **roadmap + topics** layer exists for CSS; the practice-project layer is **planned**, not implemented.

## Current user experience

### 1. Dashboard

Same as other modules: learner opens the roadmap and selects **CSS**.

### 2. CSS module details page (`/modules/css`)

- module title, subtitle, summary, and progress
- topics table with **complete / incomplete** toggles
- stats update immediately; persistence is the same as HTML (see [State and storage](#state-and-storage))

There is **no** `module.slug === 'css'` block in the UI yet—unlike HTML, there are no practice project cards at the bottom.

### 3. Styling the app itself

Global styles live in [`src/index.css`](../src/index.css) (Tailwind). That file is **not** the “CSS learning module” content; it only styles this React app.

## Implemented routes (CSS-relevant)

- `/` — dashboard
- `/modules/css` — CSS module details (via `/modules/:slug`)

CSS uses the same route as every module: `/modules/css/projects/:projectSlug`, backed by [`cssProjects.ts`](../src/data/cssProjects.ts) in [`practiceProjectsRegistry.ts`](../src/data/practiceProjectsRegistry.ts).

## Current files

### Data

- [`src/data/modules.ts`](../src/data/modules.ts) — the CSS module is the entry with `slug: 'css'`; all CSS **topics** are defined here.

### UI and state

- [`src/pages/ModuleDetailsPage.tsx`](../src/pages/ModuleDetailsPage.tsx) — shared module page; [`ModulePracticeProjectsSection`](../src/features/practice-projects/ModulePracticeProjectsSection.tsx) renders when the module has projects (CSS included).
- [`src/App.tsx`](../src/App.tsx) + [`src/lib/journeyStorage.ts`](../src/lib/journeyStorage.ts) — topic load/save and `mergeStoredProgress` for **every** module, including CSS (same `localStorage` key: `journey-modules-progress`).

### Reference (HTML parity)

When you implement CSS projects, expect to add:

- `src/data/cssProjects.ts` (or similar)—project metadata
- optional `docs/practice/css/<slug>.md`—long-form briefs if you add in-app or linked docs
- routes and components patterned on HTML’s `/modules/html/projects/...`

## Where and how CSS module changes apply

| What you want to change | Primary file |
| ----------------------- | ------------ |
| CSS topic titles, order, defaults, or module copy | [`src/data/modules.ts`](../src/data/modules.ts) (`slug: 'css'`) |
| Future CSS practice projects | new data file, e.g. [`src/data/cssProjects.ts`](../src/data/cssProjects.ts) (create when ready) |
| CSS project cards & detail page | [`src/data/cssProjects.ts`](../src/data/cssProjects.ts) + shared components under [`src/features/practice-projects/`](../src/features/practice-projects/) (registry picks up `slug: 'css'`) |
| Docs per project (optional) | e.g. `docs/practice/css/<project-slug>.md` + loader/route when you implement docs |

Topic **`label`** is still the key used for toggles and for `mergeStoredProgress`; renaming a topic resets stored completion for that label unless you migrate storage.

## CSS topics currently in `modules.ts`

These are the CSS module topics as of this doc:

- CSS Basics  
- Box Model  
- Flexbox  
- Grid  
- Position  
- Responsive Design  
- Advanced CSS: Transition, Transform, Animation  
- Modern CSS: Tailwind, shadcn/ui  
- Display Types  
- Overflow  
- Object Fit  
- Pseudo Classes  
- Pseudo Elements  

## State and storage

Same behavior as other modules:

- **Load:** canonical structure from `modules.ts`, `done` merged from `localStorage` by `module.slug` + topic `label` (`mergeStoredProgress` in `App.tsx`).
- **Save:** full `Module[]` written to `journey-modules-progress` on change.

See [Current State Logic](./html-feature-planning.md#current-state-logic) in the HTML planning doc for the full picture.

## Design intent (CSS track)

When you add projects and docs, aim for:

- **Layout and systems first**—projects that force box model, flex, grid, and responsive decisions  
- **Visual polish second**—transitions and micro-interactions after structure works  
- **Honest overlap**—many projects will use HTML you already practiced; CSS docs should say which HTML assumptions are OK

## Suggested CSS practice projects (ideas)

Concrete projects to add later in `cssProjects.ts` + `docs/practice/css/`:

1. **Profile card layout** — flex/grid, spacing, typography, one breakpoint.  
2. **Pricing table or feature grid** — alignment, borders, hover states.  
3. **Landing hero + nav** — position/sticky, responsive nav, fluid type.  
4. **Small component library page** — buttons, inputs, cards; pseudo-classes and custom properties.  
5. **Animated UI strip** — transitions/transforms only after static layout is solid.

Match each project to topic `label`s in `learnings` arrays so the UI can cross-link like HTML.

## Suggested next steps

1. **Content:** group CSS topics (e.g. Foundations, Layout, Responsive, Effects, Ecosystem) in `modules.ts` or in UI-only sections—without changing labels unless you accept progress reset for renamed rows.  
2. **Parity:** already aligned with HTML via registry; extend [`cssProjects.ts`](../src/data/cssProjects.ts) for new projects.  
3. **Docs:** add this repo’s `docs/practice/css/*.md` as the long-form source; link from project pages.  
4. **Architecture:** extract shared “practice projects” layout from `App.tsx` so HTML and CSS reuse one shell.

## Quick resume checklist

1. Open [`src/data/modules.ts`](../src/data/modules.ts) and find `slug: 'css'`.  
2. Open [`src/App.tsx`](../src/App.tsx) when adding CSS-only UI or routes.  
3. Read [HTML feature planning](./html-feature-planning.md) for the implemented pattern to copy.  
4. Decide: **topics only**, **+ projects**, or **+ project docs** next.

## Summary

Today the **CSS module** is a full **topic roadmap** with the same progress mechanics as HTML. It does **not** yet include practice projects or per-project docs. Extending it means following the **same data + optional `docs/practice/css/` + `App.tsx` routing** pattern used for HTML, with CSS-specific briefs and routes under `/modules/css/...`.
