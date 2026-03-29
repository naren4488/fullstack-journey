import type { PracticeProject } from '../practiceProject'

const PX = {
  image:
    'https://images.pexels.com/photos/10375902/pexels-photo-10375902.jpeg?cs=srgb&dl=pexels-rdne-10375902.jpg&fm=jpg',
  sourceLabel: 'Pexels' as const,
  sourceUrl: 'https://www.pexels.com/photo/woman-using-laptop-at-cafe-10375902/',
}

export const javascriptProjects: PracticeProject[] = [
  {
    slug: 'dom-todo-mini-app',
    title: 'DOM Todo Mini App',
    tagline: 'Practice arrays, functions, and basic DOM updates in the browser.',
    level: 'Beginner',
    duration: '60-90 min',
    summary:
      'Build a tiny todo list: add items, mark done, remove items—without a framework, so you feel how the DOM and JavaScript work together.',
    brief:
      'Keep the HTML minimal and let JavaScript own behavior. Focus on clear functions, avoiding global state soup, and updating the DOM in small steps.',
    setup: [
      'Create `index.html`, `styles.css` (optional), and `main.js`.',
      'Load `main.js` with `defer` from the HTML file.',
    ],
    requirements: [
      'Use `querySelector` / `querySelectorAll` to grab elements.',
      'Store todos in an array of objects `{ id, text, done }`.',
      'Render the list from that array after every change.',
      'Add keyboard or button actions for add / toggle / delete.',
    ],
    learnings: [
      'Arrays & Objects',
      'DOM Manipulation',
      'Functions',
      'Control Flow',
    ],
    deliverables: ['Working todo UI driven by JavaScript', 'Readable, split functions'],
    visualReferences: [{ ...PX, title: 'Study setup' }],
    codeWalkthrough: {
      overview:
        'The list in the DOM should mirror an in-memory array. After each user action, mutate or replace the array, then call one `render()` function that clears and rebuilds the list (simple pattern; optimize later).',
      snippets: [
        {
          fileLabel: 'main.js',
          language: 'javascript',
          code: `const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const listEl = document.querySelector('#todo-list');

let todos = [];
let nextId = 1;

function render() {
  listEl.innerHTML = '';
  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.dataset.id = String(todo.id);
    li.textContent = todo.text;
    if (todo.done) li.classList.add('done');
    listEl.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ id: nextId++, text, done: false });
  input.value = '';
  render();
});`,
          explanation:
            '`render` is the single place that projects `todos` into the DOM, which keeps mental overhead low. IDs let you add toggle/delete handlers later with `closest` or `dataset`. Using `submit` on the form gives you Enter-key behavior for free.',
        },
      ],
    },
  },
  {
    slug: 'async-json-fetch-card',
    title: 'Async JSON Fetch Card',
    tagline: 'Use fetch, JSON parsing, and async flow for a small read-only UI.',
    level: 'Beginner+',
    duration: '75-100 min',
    summary:
      'Fetch public JSON (e.g. a placeholder API), handle loading and error states, and show the result in a card.',
    brief:
      'This project connects the language module to real network delays and failure modes—skills you will reuse in React data fetching later.',
    setup: [
      'Use a simple static server or Vite so `fetch` is not blocked by file:// quirks.',
      'Pick one stable public GET endpoint for experiments.',
    ],
    requirements: [
      'Use `async/await` or explicit `then` chains consistently.',
      'Show a loading state before the response arrives.',
      'Show a friendly error message when fetch fails or JSON is invalid.',
      'Avoid rendering raw HTML from the API; use `textContent` or safe DOM APIs.',
    ],
    learnings: ['Async JavaScript', 'JSON', 'DOM Manipulation', 'Error Handling'],
    deliverables: ['Card UI with loading / error / success', 'Clean separation of fetch vs render'],
    visualReferences: [{ ...PX, title: 'Focus time' }],
    codeWalkthrough: {
      overview:
        'Separate **fetching** from **presentation**: one function returns data, another renders it. UI state can be an enum-like string: `idle` → `loading` → `success` | `error`.',
      snippets: [
        {
          fileLabel: 'api.js',
          language: 'javascript',
          code: `export async function loadUser(id) {
  const res = await fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`);
  if (!res.ok) {
    throw new Error(\`HTTP \${res.status}\`);
  }
  return res.json();
}`,
          explanation:
            '`res.ok` checks the status band 200–299. Throwing on failure lets a caller use `try/catch` and map errors to UI. Returning `res.json()` keeps parsing in one place.',
        },
        {
          fileLabel: 'main.js (usage)',
          language: 'javascript',
          code: `import { loadUser } from './api.js';

const statusEl = document.querySelector('#status');
const cardEl = document.querySelector('#card');

async function run() {
  statusEl.textContent = 'Loading…';
  cardEl.innerHTML = '';
  try {
    const user = await loadUser(1);
    statusEl.textContent = '';
    cardEl.textContent = \`\${user.name} — \${user.email}\`;
  } catch (err) {
    statusEl.textContent = 'Something went wrong.';
    console.error(err);
  }
}

run();`,
          explanation:
            'The UI resets before each attempt. Errors are surfaced to the user without leaking stack traces. In a larger app you would swap `textContent` for component state.',
        },
      ],
    },
  },
]

export const browserWebConceptsProjects: PracticeProject[] = [
  {
    slug: 'network-tab-diary',
    title: 'Network Tab Diary',
    tagline: 'Document real requests your browser makes for a single page load.',
    level: 'Beginner',
    duration: '45-60 min',
    summary:
      'Open DevTools → Network, reload a site you use, and capture what loads first, what is cached, and which requests block rendering.',
    brief:
      'You are training pattern recognition: HTML document, JS bundles, images, fonts, XHR/fetch. No coding required—notes and screenshots are the deliverable.',
    setup: [
      'Use Chrome or Edge DevTools (Firefox is fine too).',
      'Pick one news site or dashboard you can load repeatedly.',
    ],
    requirements: [
      'Identify the document request and its status code.',
      'Find at least one API/XHR call and note payload shape (JSON vs HTML).',
      'Note whether key assets are cached (disk vs memory) on second reload.',
      'Write 5 bullet insights in your own words.',
    ],
    learnings: ['Networking', 'Core Concepts', 'Browser Rendering Pipeline', 'HTTP vs HTTPS'],
    deliverables: ['Short markdown or text report', 'Optional annotated screenshot'],
    visualReferences: [{ ...PX, title: 'DevTools mindset' }],
    codeWalkthrough: {
      overview:
        'This “code” sample is a checklist you can paste in your notes file—it mirrors what experienced devs scan for in the Network panel.',
      snippets: [
        {
          fileLabel: 'network-checklist.md',
          language: 'text',
          code: `## Page load checklist
- [ ] First request: document (HTML) — status 200?
- [ ] Blocking scripts in <head>? Any deferred/async?
- [ ] Largest image: format (webp/avif/jpg) and transferred size
- [ ] Fetch/XHR: method, status, response type (json/html)
- [ ] Second reload: 304 / (memory cache) / (disk cache) notes`,
          explanation:
            'Treat this as a repeatable audit. Later you will connect each line to performance and security topics (HTTPS, third-party cookies, CSP).',
        },
      ],
    },
  },
  {
    slug: 'storage-quiz-persist',
    title: 'Storage Quiz Persist',
    tagline: 'Persist quiz progress with localStorage and compare with sessionStorage.',
    level: 'Beginner+',
    duration: '60 min',
    summary:
      'Build a 3-question quiz that saves the user score in `localStorage`, and optionally resets when the tab session ends if you switch to `sessionStorage`.',
    brief:
      'You will hit the real-world tradeoff: survive refresh vs survive tab close. Always JSON.stringify complex values and guard `JSON.parse` with try/catch.',
    setup: ['Single HTML page + `quiz.js`.'],
    requirements: [
      'Save `{ score, answered }` after each answer.',
      'On load, read storage and skip completed questions if you choose that UX.',
      'Provide a “Reset progress” button that removes the key.',
    ],
    learnings: [
      'Storage',
      'Cookies vs LocalStorage vs SessionStorage',
      'JSON',
      'Error Handling',
    ],
    deliverables: ['Quiz with persistence', 'One paragraph comparing local vs session choice'],
    visualReferences: [{ ...PX, title: 'Persistence practice' }],
    codeWalkthrough: {
      overview:
        '`localStorage` is synchronous and string-only. Wrap read/write in small helpers so you can swap the backing store or add encryption later.',
      snippets: [
        {
          fileLabel: 'storage.js',
          language: 'javascript',
          code: `const KEY = 'quiz-progress-v1';

export function loadProgress() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : { score: 0, step: 0 };
  } catch {
    return { score: 0, step: 0 };
  }
}

export function saveProgress(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function clearProgress() {
  localStorage.removeItem(KEY);
}`,
          explanation:
            'Version the key (`v1`) so you can migrate schema later. `try/catch` around `JSON.parse` prevents a corrupt string from bricking your app. Keep objects small—`localStorage` is not a database.',
        },
      ],
    },
  },
]

export const toolsWorkflowProjects: PracticeProject[] = [
  {
    slug: 'package-json-scripts',
    title: 'package.json Scripts Lab',
    tagline: 'Wire npm scripts for dev, build, and a custom lint command.',
    level: 'Beginner',
    duration: '45 min',
    summary:
      'Create or extend a small Node project and define scripts that chain tools you already use (vite, eslint, prettier, etc.).',
    brief:
      'Scripts are the team’s shared vocabulary for “how we run this repo”. Practice readable names and cross-platform commands.',
    setup: ['Clone your own small Vite project or use `npm create vite@latest`.'],
    requirements: [
      'Add `npm run check` that runs lint (and typecheck if applicable).',
      'Document each script in README in one line.',
      'Avoid OS-specific commands where possible (`rimraf` vs `rm -rf`).',
    ],
    learnings: ['Package Managers', 'Build Tools', 'Development Tools'],
    deliverables: ['Updated package.json', 'README script table'],
    visualReferences: [{ ...PX, title: 'Tooling focus' }],
    codeWalkthrough: {
      overview:
        'npm scripts are entries in `package.json` under `"scripts"`. They run with the local `node_modules/.bin` on PATH.',
      snippets: [
        {
          fileLabel: 'package.json (fragment)',
          language: 'json',
          code: `{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "check": "npm run lint && npm run build"
  }
}`,
          explanation:
            '`check` composes other scripts with `npm run`. Order matters: lint before build catches issues faster. For larger repos you might split `check` into CI steps instead.',
        },
      ],
    },
  },
  {
    slug: 'git-feature-branch-story',
    title: 'Git Feature Branch Story',
    tagline: 'Walk through a feature branch from create to PR, documented.',
    level: 'Beginner+',
    duration: '60 min',
    summary:
      'Simulate a feature: branch from main, two commits, push, open PR description with context and test notes.',
    brief:
      'Communication matters as much as commands. Practice conventional commit messages and a PR template mindset.',
    setup: ['Use a test repo on GitHub/GitLab or a local bare remote.'],
    requirements: [
      'Create `feat/short-description` from updated main.',
      'At least two meaningful commits (not “wip”).',
      'PR / merge request description: problem, solution, how to test.',
    ],
    learnings: ['Version Control', 'Development Tools'],
    deliverables: ['Branch + PR link or screenshot', 'Reflection: one merge conflict tip'],
    visualReferences: [{ ...PX, title: 'Collaboration' }],
    codeWalkthrough: {
      overview:
        'Commands below are a minimal happy path; adapt remote names (`origin`) and default branch (`main`).',
      snippets: [
        {
          fileLabel: 'terminal.sh',
          language: 'bash',
          code: `git checkout main
git pull
git checkout -b feat/add-quiz-footer
# ... edit files ...
git add -p
git commit -m "feat(quiz): add footer actions"
git push -u origin feat/add-quiz-footer`,
          explanation:
            '`git add -p` stages hunks so you review every change. `-u` on first push sets upstream tracking. Small commits keep review and bisect friendly.',
        },
      ],
    },
  },
]

export const reactCoreProjects: PracticeProject[] = [
  {
    slug: 'counter-with-step',
    title: 'Counter with Step',
    tagline: 'Lift step size into state and derive the display from props + state.',
    level: 'Beginner',
    duration: '45 min',
    summary:
      'Build a counter where the user picks step (1, 5, 10) and the count updates with one source of truth.',
    brief:
      'Practice controlled selects or buttons, and why you should not duplicate derived values in state.',
    setup: ['Vite + React + TypeScript template.'],
    requirements: [
      'Use `useState` for count and step (or derive step from UI directly).',
      'Disable decrement when count would go below a sensible min.',
      'Extract a presentational child if it helps readability.',
    ],
    learnings: [
      'Basics: JSX, Components, Props, State',
      'Rendering: Conditional Rendering, Lists & Keys',
      'Events: Forms, onClick, onChange',
    ],
    deliverables: ['Counter UI', 'Short note: what is derived vs stored'],
    visualReferences: [{ ...PX, title: 'React basics' }],
    codeWalkthrough: {
      overview:
        'Keep `count` in state; `step` can be state too. The label `count * step` is derived—do not store it unless you need historical values.',
      snippets: [
        {
          fileLabel: 'Counter.tsx',
          language: 'tsx',
          code: `import { useState } from 'react';

const STEPS = [1, 5, 10] as const;

export function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState<(typeof STEPS)[number]>(1);

  return (
    <section>
      <p>Count: {count}</p>
      <div>
        {STEPS.map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={step === s}
            onClick={() => setStep(s)}
          >
            Step {s}
          </button>
        ))}
      </div>
      <button type="button" onClick={() => setCount((c) => c + step)}>
        Increment
      </button>
      <button
        type="button"
        disabled={count - step < 0}
        onClick={() => setCount((c) => c - step)}
      >
        Decrement
      </button>
    </section>
  );
}`,
          explanation:
            'Functional updates `setCount(c => c + step)` avoid stale closures in async handlers. `aria-pressed` hints toggle semantics for step buttons—polish for accessibility.',
        },
      ],
    },
  },
  {
    slug: 'static-todo-list-keys',
    title: 'Static Todo List & Keys',
    tagline: 'Render a list from props and practice stable React keys.',
    level: 'Beginner+',
    duration: '60 min',
    summary:
      'Parent holds todos; child list renders items. Add delete with immutable updates.',
    brief:
      'Never key list rows by array index if items can reorder or delete—use ids.',
    setup: ['Extend your Vite React app with a small component tree.'],
    requirements: [
      'Todos include stable `id` (use `crypto.randomUUID()` or incremental).',
      'Delete removes by id without mutating the previous array.',
      'Optional: toggle `done` with checkbox.',
    ],
    learnings: [
      'Basics: JSX, Components, Props, State',
      'Rendering: Conditional Rendering, Lists & Keys',
    ],
    deliverables: ['List with add/delete', 'Comment in code on key choice'],
    visualReferences: [{ ...PX, title: 'Lists in React' }],
    codeWalkthrough: {
      overview:
        'Parent owns state; pass callbacks down. Use `filter` / `map` to produce the next array immutably.',
      snippets: [
        {
          fileLabel: 'TodoApp.tsx',
          language: 'tsx',
          code: `import { useState } from 'react';

type Todo = { id: string; text: string };

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);

  function add(text: string) {
    setTodos((prev) => [...prev, { id: crypto.randomUUID(), text }]);
  }

  function remove(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const text = String(fd.get('text') ?? '').trim();
          if (!text) return;
          add(text);
          e.currentTarget.reset();
        }}
      >
        <input name="text" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {t.text}{' '}
            <button type="button" onClick={() => remove(t.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}`,
          explanation:
            '`crypto.randomUUID()` is fine for client-only ids; servers often return ids from the database. Keys are `t.id`, stable across renders. State updates always replace the array reference.',
        },
      ],
    },
  },
]
