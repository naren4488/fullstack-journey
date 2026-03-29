# Learning content: “why this matters” and self-check quizzes

## Topic blurbs

- **Data:** [`src/data/topicWhyMatters.ts`](../src/data/topicWhyMatters.ts) maps `moduleSlug` → topic label → one short paragraph.
- **UI:** The topic tracker ([`TopicsTable`](../src/components/TopicsTable.tsx)) shows an expandable **Why this matters** row when copy exists for that topic.
- **Maintenance:** Labels must match [`modules.ts`](../src/data/modules.ts) exactly. If you rename or add a topic, update the map (or omit an entry to hide the blurb).

## Practice projects

- **Data:** Optional `whyMatters` on [`PracticeProject`](../src/data/practiceProject.ts)—a single paragraph of pedagogy.
- **UI:** [`PracticeProjectDetailsPage`](../src/features/practice-projects/PracticeProjectDetailsPage.tsx) renders a **Why this project matters** callout when the field is set.
- **Current coverage:** All HTML and CSS practice projects include `whyMatters`; other modules can adopt the same field over time.

## Self-check quizzes

- **Data:** [`src/data/moduleQuizzes.ts`](../src/data/moduleQuizzes.ts) merges [`moduleQuizzes.part1.ts`](../src/data/moduleQuizzes.part1.ts), [`part2`](../src/data/moduleQuizzes.part2.ts), and [`part3`](../src/data/moduleQuizzes.part3.ts). Types live in [`moduleQuizzes.types.ts`](../src/data/moduleQuizzes.types.ts). Each module has **7** English questions (`prompt`, `choices[]`, `correctIndex`, optional `revealNote`).
- **Behavior:** Client-only, **not graded**, no persistence. Pick an option, then **Reveal answer**.
- **Route:** **`/modules/:moduleSlug/quiz`** — [`ModuleQuizPage`](../src/pages/ModuleQuizPage.tsx) renders [`ModuleSelfCheckQuiz`](../src/components/ModuleSelfCheckQuiz.tsx).
- **Module page CTA:** Below the topic tracker, **Open practice questions (N questions)** links to that route. If a module has no quiz data, the UI shows **Practice questions coming soon** (no dead link).
- **Adding or editing:** Add questions under the right `moduleSlug` in a part file (or extend the merge). Keep `correctIndex` within `0 .. choices.length - 1` and `id` values unique.

You can alternatively maintain the same object in a `.json` file and import it if `resolveJsonModule` is enabled; the TypeScript module keeps types and comments in-repo without extra config.
