# HTML Feature Planning

## Purpose

This document captures the planning and implementation shape of the HTML-focused feature set currently built in the app. It is meant to be a future reference for continuing the HTML learning experience without needing to re-read the full codebase first. For **all modules** practice projects and file layout, see [practice-projects-overview](./practice-projects-overview.md).

## Current Goal

The app should help a learner focus on the HTML module for a while, not just as a static checklist, but as a guided learning space with:

- HTML topic tracking
- topic completion toggles
- module-specific practice project suggestions
- project detail pages with setup, requirements, and learning outcomes
- visual inspiration links for practice projects

## Current User Experience

### 1. Dashboard

The learner starts on the roadmap dashboard and can open any module.

### 2. HTML Module Details Page

When the learner opens the HTML module page, they can:

- see HTML module summary and progress
- view topics in a table
- toggle each topic as completed or incomplete
- see updated module stats immediately
- find HTML-specific practice project suggestions at the bottom

### 3. HTML Practice Project Cards

At the bottom of the HTML module page, the learner sees lightweight project cards with:

- project title
- level
- estimated duration
- short summary
- a few related HTML topics

### 4. HTML Practice Project Details Page

When the learner clicks a project card, they open a dedicated project page with:

- project brief
- setup instructions
- project requirements
- expected deliverables
- topics the learner will practice
- visual reference images from the internet
- simple icon/pixel-style visual treatment

## Implemented Routes

These are the important routes currently used:

- `/`
  - main roadmap dashboard
- `/modules/:slug`
  - module details page
- `/modules/:moduleSlug/projects/:projectSlug`
  - practice project details page (shared for every module, including HTML)

## Current Files

### App shell & routing

- [`src/App.tsx`](../src/App.tsx) — routes, module state, `localStorage` sync, topic toggle handler
- [`src/lib/journeyStorage.ts`](../src/lib/journeyStorage.ts) — `mergeStoredProgress`, storage key constant
- [`src/main.tsx`](../src/main.tsx) — `BrowserRouter`
- [`src/index.css`](../src/index.css) — Tailwind import

### Shared pages & layout

- [`src/pages/DashboardPage.tsx`](../src/pages/DashboardPage.tsx) — roadmap dashboard
- [`src/pages/ModuleDetailsPage.tsx`](../src/pages/ModuleDetailsPage.tsx) — any `/modules/:slug` (topics + [`ModulePracticeProjectsSection`](../src/features/practice-projects/ModulePracticeProjectsSection.tsx) when the module has projects)
- [`src/layout/Shell.tsx`](../src/layout/Shell.tsx) — page chrome
- [`src/components/`](../src/components/) — `MetricCard`, `ModuleCard`, `TopicsTable`, `NotFoundPage`, `InfoListCard`, `FeatureIcon`

### Shared practice-project UI

- [`src/features/practice-projects/ModulePracticeProjectsSection.tsx`](../src/features/practice-projects/ModulePracticeProjectsSection.tsx) — project grid for any module that has entries in the registry
- [`src/features/practice-projects/ModulePracticeProjectCard.tsx`](../src/features/practice-projects/ModulePracticeProjectCard.tsx) — card linking to a project
- [`src/features/practice-projects/PracticeProjectDetailsPage.tsx`](../src/features/practice-projects/PracticeProjectDetailsPage.tsx) — full project page + **View code** panel
- [`src/features/practice-projects/modulePracticeUi.ts`](../src/features/practice-projects/modulePracticeUi.ts) — per-module accent colors

### Data Sources

- [`src/data/modules.ts`](../src/data/modules.ts)
  - roadmap module data
  - the HTML module is the entry with `slug: 'html'`; its topics live here

- [`src/data/htmlProjects.ts`](../src/data/htmlProjects.ts) — HTML `PracticeProject[]` (`slug: 'html'` in [`practiceProjectsRegistry.ts`](../src/data/practiceProjectsRegistry.ts))
- [`src/data/practiceProjectsRegistry.ts`](../src/data/practiceProjectsRegistry.ts) — maps every module slug to its project list
- [`src/data/practiceProject.ts`](../src/data/practiceProject.ts) — shared `PracticeProject` type and `codeWalkthrough` shape

## Where and how HTML module changes apply

Most HTML-module work falls into **data** vs **UI** edits. There is no separate `.html` file per module: the app is React plus TypeScript data files; Vite serves the shell [`index.html`](../index.html) and mounts the app on `#root`.

### Where to edit

| What you want to change | Primary file |
| ----------------------- | ------------ |
| HTML topic titles, order, default completion, or module copy | [`src/data/modules.ts`](../src/data/modules.ts) (the `slug: 'html'` module) |
| Practice projects: new project, steps, requirements, links | [`src/data/htmlProjects.ts`](../src/data/htmlProjects.ts) |
| Practice project UI (all modules) | [`src/features/practice-projects/`](../src/features/practice-projects/) |
| Shared module page / dashboard layout | [`src/pages/`](../src/pages/), [`src/components/`](../src/components/) |
| Routes, progress state, `localStorage` | [`src/App.tsx`](../src/App.tsx), [`src/lib/journeyStorage.ts`](../src/lib/journeyStorage.ts) |

Edits to the data files update the dashboard, the HTML module page, and project detail routes as soon as the dev server hot-reloads.

### Topic completion vs topic definitions

- **On load:** [`App.tsx`](../src/App.tsx) calls `mergeStoredProgress` from [`journeyStorage.ts`](../src/lib/journeyStorage.ts): the **topic list, order, and module copy** always come from [`modules.ts`](../src/data/modules.ts). Saved `done` values are restored when **`module.slug` + topic `label`** still exist in storage; **new topics** use defaults from `modules.ts`; **renamed** topics lose the old `done` (labels no longer match).
- **On save:** the full in-memory `Module[]` is still written to `journey-modules-progress` after each change (same key as before).
- You rarely need to clear `localStorage` for structural edits anymore; clear it if you change storage shape or want a full reset.

### Practice projects

Project copy and structure are **static data** until you implement extra progress features ([Progress Improvements](#progress-improvements)). Adding a project is usually: append an object in [`htmlProjects.ts`](../src/data/htmlProjects.ts), ensure `slug` is unique, and open it at `/modules/html/projects/:projectSlug` (same URL pattern as other modules; see [practice-projects-overview](./practice-projects-overview.md)).

## HTML Topics Currently Included

The HTML module currently includes:

- Basic Structure
- Text & Formatting Tags
- Links & Navigation
- Images & Media
- Lists
- Tables
- Forms
- Semantic HTML
- Attributes
- Accessibility Basics
- Meta Tags & SEO Basics
- Inline vs Block Elements
- Relative vs Absolute Paths
- Form Attributes in Depth
- Favicon and App Icons

## HTML Practice Projects Currently Included

### 1. Portfolio Link Hub

Focus:

- semantic structure
- links
- profile image
- relative paths
- favicon

### 2. Artisan Cafe Menu

Focus:

- lists
- tables
- forms
- semantic grouping
- form attributes

### 3. City Guide Landing Page

Focus:

- long-form page structure
- in-page navigation
- images
- semantics
- accessibility basics

## Current State Logic

Topic completion is currently handled in app state and persisted to `localStorage`.

### Behavior

- toggling a topic updates the details page immediately
- dashboard stats also update immediately
- the full `Module[]` is written to `localStorage` under the key `journey-modules-progress` on each change
- toggles identify rows by topic **`label`** (see `handleToggleTopic` in [`App.tsx`](../src/App.tsx))
- **initial load** merges stored `done` via `mergeStoredProgress` in [`journeyStorage.ts`](../src/lib/journeyStorage.ts)

### Important Note

Project data is static right now. Only module/topic state in the app is interactive. For how edits to topics and projects surface in the UI, see [Where and how HTML module changes apply](#where-and-how-html-module-changes-apply).

## Design Intent

The HTML experience should feel:

- focused
- visually warm
- easy to scan
- practical rather than theory-heavy
- like a roadmap plus guided workbook

The practice-project section is intentionally not a code generator or hosted builder. It is meant to guide the learner to build projects outside the website.

## Why This Feature Exists

The HTML module is the first deep-learning area in the roadmap. A plain checklist is useful, but not enough. The added practice-project layer helps learners:

- apply HTML topics in context
- understand how topics connect together
- move from passive completion to active building
- know what to build next without inventing project ideas from scratch

## Suggested Next Steps

These are the most natural follow-ups later:

### Content Improvements

- group HTML topics into categories like Structure, Forms, Accessibility, SEO
- add short topic explanations or examples
- add “why this matters” notes for each topic
- add difficulty markers per topic

### Practice Project Improvements

- add more HTML projects
- add project filtering by difficulty
- add “recommended after completing X topics” logic
- add downloadable project brief format later if needed

### Progress Improvements

- track project completion separately from topic completion
- add “started / in progress / completed” project states
- show progress history or last updated timestamp

### UX Improvements

- add breadcrumbs on project details pages
- add previous/next project navigation
- add topic-based project recommendations
- add a small “what you should learn first” block on each project page

### Architecture Improvements

- further split [`src/pages/ModuleDetailsPage.tsx`](../src/pages/ModuleDetailsPage.tsx) if it grows (per-module tabs, etc.)
- add `src/features/modules/` if shared module-only widgets multiply
- optional: centralize topic-toggle logic in a small hook next to [`journeyStorage.ts`](../src/lib/journeyStorage.ts)

## Constraints To Remember

- this is a frontend-only educational interface right now
- project details are informational only
- external visual references are linked from internet sources
- use a Node.js version that satisfies the toolchain (check `package.json` engines if present, CI config, and Vite’s current requirements) so `npm run dev` and `npm run build` work reliably

## Quick Resume Checklist

If continuing this feature later, start with:

1. Read [Where and how HTML module changes apply](#where-and-how-html-module-changes-apply) so the next edit goes in the right file.
2. Open [`src/features/practice-projects/`](../src/features/practice-projects/) for shared project UI; [`src/App.tsx`](../src/App.tsx) for routes and state.
3. Review [`src/data/modules.ts`](../src/data/modules.ts) for the HTML module’s topics.
4. Review [`src/data/htmlProjects.ts`](../src/data/htmlProjects.ts) for practice projects.
5. Decide whether the next change is:
   - topic structure
   - project content
   - UI polish
   - routing/component refactor

## Summary

The HTML feature currently combines:

- topic tracking
- route-based HTML module details
- practice-project discovery
- detailed project briefs
- visual inspiration references

This makes the HTML module feel like a guided learning product instead of only a progress list. Future work follows the same pattern: **content in `modules.ts` and `htmlProjects.ts`, HTML UI in `src/features/html/`, shared screens in `src/pages/` and `src/components/`, routes and state in `App.tsx`**.
