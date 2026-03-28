# HTML Feature Planning

## Purpose

This document captures the planning and implementation shape of the HTML-focused feature set currently built in the app. It is meant to be a future reference for continuing the HTML learning experience without needing to re-read the full codebase first.

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
- `/modules/html/projects/:projectSlug`
  - HTML project details page

## Current Files

### Core UI

- [src/App.tsx](/Users/narendrakajla77/Downloads/personal/dev/fullstack-journey/src/App.tsx)
  - main routing
  - dashboard
  - module details page
  - topics table with toggle
  - HTML practice project cards
  - HTML practice project details page

- [src/main.tsx](/Users/narendrakajla77/Downloads/personal/dev/fullstack-journey/src/main.tsx)
  - router setup with `BrowserRouter`

- [src/index.css](/Users/narendrakajla77/Downloads/personal/dev/fullstack-journey/src/index.css)
  - Tailwind import

### Data Sources

- [src/data/modules.ts](/Users/narendrakajla77/Downloads/personal/dev/fullstack-journey/src/data/modules.ts)
  - roadmap module data
  - HTML topics included here

- [src/data/htmlProjects.ts](/Users/narendrakajla77/Downloads/personal/dev/fullstack-journey/src/data/htmlProjects.ts)
  - HTML practice project metadata
  - project summaries
  - setup steps
  - requirements
  - learning topics
  - deliverables
  - visual references

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
- state is saved using local storage key:
  - `journey-modules-progress`

### Important Note

Project data is static right now. Only topic completion state is interactive.

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

- move large route sections out of `App.tsx` into dedicated component files
- consider separate feature folders:
  - `src/features/modules`
  - `src/features/html-projects`
- centralize local storage helpers

## Constraints To Remember

- this is a frontend-only educational interface right now
- project details are informational only
- external visual references are linked from internet sources
- current Vite build is blocked locally by Node version mismatch on this machine
  - installed Node: `20.17.0`
  - required by current Vite toolchain: `20.19+`

## Quick Resume Checklist

If continuing this feature later, start with:

1. Open [src/App.tsx](/Users/narendrakajla77/Downloads/personal/dev/fullstack-journey/src/App.tsx)
2. Review [src/data/modules.ts](/Users/narendrakajla77/Downloads/personal/dev/fullstack-journey/src/data/modules.ts)
3. Review [src/data/htmlProjects.ts](/Users/narendrakajla77/Downloads/personal/dev/fullstack-journey/src/data/htmlProjects.ts)
4. Decide whether the next change is:
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

This makes the HTML module feel like a guided learning product instead of only a progress list.
