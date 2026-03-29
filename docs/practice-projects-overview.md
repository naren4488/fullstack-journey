# Practice projects overview

## Purpose

Every roadmap module in [`src/data/modules.ts`](../src/data/modules.ts) can expose **practice projects**: guided builds with a detail page and a **View code** panel (annotated snippets + explanations). This doc links each module to its planning note and data source.

## Shared implementation

| Piece | Location |
| ----- | -------- |
| Registry (module slug → projects) | [`src/data/practiceProjectsRegistry.ts`](../src/data/practiceProjectsRegistry.ts) |
| Flat catalog (all modules → projects) | [`src/lib/allPracticeProjects.ts`](../src/lib/allPracticeProjects.ts) |
| Shared project type + code walkthrough (incl. optional `whyMatters`) | [`src/data/practiceProject.ts`](../src/data/practiceProject.ts) |
| Topic “why this matters” copy | [`src/data/topicWhyMatters.ts`](../src/data/topicWhyMatters.ts) · [`TopicsTable`](../src/components/TopicsTable.tsx) |
| Module self-check quizzes (7 Q/module, client-only) | [`moduleQuizzes.ts`](../src/data/moduleQuizzes.ts) (+ [`part1`](../src/data/moduleQuizzes.part1.ts)/[`part2`](../src/data/moduleQuizzes.part2.ts)/[`part3`](../src/data/moduleQuizzes.part3.ts)) · [`ModuleQuizPage`](../src/pages/ModuleQuizPage.tsx) · [`ModuleSelfCheckQuiz`](../src/components/ModuleSelfCheckQuiz.tsx) |
| Module page project grid | [`src/features/practice-projects/ModulePracticeProjectsSection.tsx`](../src/features/practice-projects/ModulePracticeProjectsSection.tsx) |
| Project detail + View code | [`src/features/practice-projects/PracticeProjectDetailsPage.tsx`](../src/features/practice-projects/PracticeProjectDetailsPage.tsx) |
| Code modal | [`src/components/ProjectCodeWalkthroughPanel.tsx`](../src/components/ProjectCodeWalkthroughPanel.tsx) |
| Per-module accent styles | [`src/features/practice-projects/modulePracticeUi.ts`](../src/features/practice-projects/modulePracticeUi.ts) |
| App shell nav (roadmap + catalog) | [`src/layout/Shell.tsx`](../src/layout/Shell.tsx) |

## Routes

- **`/`** — roadmap dashboard; links to the practice catalog.
- **`/projects`** — all practice projects with **search** (title, tagline, summary, learnings, module name) and **filters**: module, level, duration band (see `projectMatchesDurationBucket` in [`allPracticeProjects.ts`](../src/lib/allPracticeProjects.ts)).
- **`/modules/:moduleSlug/quiz`** — practice questions for that module ([`ModuleQuizPage`](../src/pages/ModuleQuizPage.tsx)); linked from the module page below the topic tracker.
- **`/modules/:moduleSlug/projects/:projectSlug`** — one pattern for all modules (see [`App.tsx`](../src/App.tsx)).

## Pedagogy

- **Flow within a module:** the project detail page shows **Previous / Next** links that only move between projects **in the same module**, plus “Project *n* of *total*” in the header.
- **Discovery:** the catalog supports filtering so learners can match projects to **time available** and **comfort level** before opening a full brief.
- **Rationale copy:** short **Why this matters** blurbs per roadmap topic and optional **Why this project matters** on practice projects—see [Learning content](./learning-content.md).
- **Self-check quizzes:** **Open practice questions (N questions)** under the topic tracker → dedicated quiz route; not graded, reveal-only—details in [Learning content](./learning-content.md).

## Modules, data files, and planning docs

| Module slug | Project data | Planning doc |
| ----------- | ------------ | ------------ |
| `html` | [`htmlProjects.ts`](../src/data/htmlProjects.ts) | [HTML](./html-feature-planning.md) |
| `css` | [`cssProjects.ts`](../src/data/cssProjects.ts) | [CSS](./css-feature-planning.md) |
| `javascript` | [`practice/extraPart1.ts`](../src/data/practice/extraPart1.ts) (`javascriptProjects`) | [JavaScript](./javascript-feature-planning.md) |
| `browser-web-concepts` | [`practice/extraPart1.ts`](../src/data/practice/extraPart1.ts) (`browserWebConceptsProjects`) | [Browser & Web](./browser-web-concepts-feature-planning.md) |
| `tools-workflow` | [`practice/extraPart1.ts`](../src/data/practice/extraPart1.ts) (`toolsWorkflowProjects`) | [Tools & Workflow](./tools-workflow-feature-planning.md) |
| `react-core` | [`practice/extraPart1.ts`](../src/data/practice/extraPart1.ts) (`reactCoreProjects`) | [React Core](./react-core-feature-planning.md) |
| `react-intermediate` | [`practice/extraPart2.ts`](../src/data/practice/extraPart2.ts) (`reactIntermediateProjects`) | [React Intermediate](./react-intermediate-feature-planning.md) |
| `react-advanced` | [`practice/extraPart2.ts`](../src/data/practice/extraPart2.ts) (`reactAdvancedProjects`) | [React Advanced](./react-advanced-feature-planning.md) |
| `routing` | [`practice/extraPart2.ts`](../src/data/practice/extraPart2.ts) (`routingProjects`) | [Routing](./routing-feature-planning.md) |
| `api-handling` | [`practice/extraPart2.ts`](../src/data/practice/extraPart2.ts) (`apiHandlingProjects`) | [API Handling](./api-handling-feature-planning.md) |
| `authentication` | [`practice/extraPart3.ts`](../src/data/practice/extraPart3.ts) (`authenticationProjects`) | [Authentication](./authentication-feature-planning.md) |
| `forms-validation` | [`practice/extraPart3.ts`](../src/data/practice/extraPart3.ts) (`formsValidationProjects`) | [Forms & Validation](./forms-validation-feature-planning.md) |
| `ui-design` | [`practice/extraPart3.ts`](../src/data/practice/extraPart3.ts) (`uiDesignProjects`) | [UI & Design](./ui-design-feature-planning.md) |
| `performance-optimization` | [`practice/extraPart3.ts`](../src/data/practice/extraPart3.ts) (`performanceOptimizationProjects`) | [Performance](./performance-optimization-feature-planning.md) |

## Topic progress

Practice projects are informational; **topic toggles** still use [`mergeStoredProgress`](../src/lib/journeyStorage.ts) and `modules.ts` as described in [HTML feature planning](./html-feature-planning.md#topic-completion-vs-topic-definitions).
