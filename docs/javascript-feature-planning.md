# JavaScript module — practice projects

## Purpose

Companion to the JavaScript roadmap slice (`slug: 'javascript'` in [`modules.ts`](../src/data/modules.ts)). Mirrors the pattern documented in [HTML feature planning](./html-feature-planning.md) and the cross-module index [practice-projects-overview](./practice-projects-overview.md).

## Data

- Projects live in **`javascriptProjects`** inside [`src/data/practice/extraPart1.ts`](../src/data/practice/extraPart1.ts).
- Registered under `javascript` in [`practiceProjectsRegistry.ts`](../src/data/practiceProjectsRegistry.ts).

## Current projects

| Slug | Focus |
| ---- | ----- |
| `dom-todo-mini-app` | DOM updates, arrays, render loop |
| `async-json-fetch-card` | `fetch`, async/await, loading/error UI |

## UX

- Cards appear on **`/modules/javascript`** via [`ModulePracticeProjectsSection`](../src/features/practice-projects/ModulePracticeProjectsSection.tsx).
- Detail + **View code**: **`/modules/javascript/projects/:projectSlug`**.

## Editing

- Add or change projects in `extraPart1.ts` (`javascriptProjects`).
- Reuse topic `label`s from the JavaScript module in `learnings` for consistency with the topic tracker.
