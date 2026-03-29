import type { PracticeProject } from '../practiceProject'

const PX = {
  image:
    'https://images.pexels.com/photos/10375902/pexels-photo-10375902.jpeg?cs=srgb&dl=pexels-rdne-10375902.jpg&fm=jpg',
  sourceLabel: 'Pexels' as const,
  sourceUrl: 'https://www.pexels.com/photo/woman-using-laptop-at-cafe-10375902/',
}

/** Third practice project per module (order 3) — extends tracks that had two projects. */
export const thirdSupplementByModuleSlug: Record<string, PracticeProject> = {
  javascript: {
    slug: 'module-pattern-iife',
    title: 'Module Pattern (IIFE)',
    tagline: 'Hide variables from the global scope with an immediately invoked function.',
    level: 'Beginner+',
    duration: '45-60 min',
    summary:
      'Wrap your script so helpers and state do not pollute `window`, mimicking how bundlers scope modules today.',
    brief:
      'Good bridge from script tags toward ES modules: still one file, but disciplined boundaries.',
    setup: ['Single `app.js` included without `type="module"` if you want the classic exercise.'],
    requirements: [
      'Wrap logic in `(function () { ... })();`.',
      'Expose at most one namespace object on `window` if the HTML must call in.',
      'Keep DOM queries inside the IIFE.',
    ],
    learnings: ['Functions', 'Advanced Concepts: this, Closures, Hoisting', 'DOM Manipulation'],
    recommendedAfterTopics: ['Functions', 'DOM Manipulation'],
    deliverables: ['Non-global script', 'Short comment on ES modules next step'],
    visualReferences: [{ ...PX, title: 'Scope practice' }],
    codeWalkthrough: {
      overview:
        'An IIFE creates a new function scope; `const`/`let` inside are not globals. This pattern predates `import`/`export` but teaches why modules matter.',
      snippets: [
        {
          fileLabel: 'app.js',
          language: 'javascript',
          code: `(function () {
  const todos = [];

  function render() {
    /* ... */
  }

  document.querySelector('#add').addEventListener('click', () => {
    /* push + render */
  });
})();`,
          explanation:
            '`todos` cannot be read from DevTools console unless you attach a debugger—by design. Compare with polluting `var todos` at the top level.',
        },
      ],
    },
  },
  'browser-web-concepts': {
    slug: 'security-headers-research',
    title: 'Security Headers Research',
    tagline: 'Read MDN or web.dev summaries for CSP, HSTS, and X-Frame-Options.',
    level: 'Beginner+',
    duration: '45 min',
    summary:
      'Produce a one-page cheat sheet describing what each header mitigates and one real-world misconfiguration story.',
    brief:
      'Connects the Security topic to concrete HTTP response headers—no server required if you only research.',
    setup: ['Bookmark MDN HTTP headers and OWASP cheat sheets.'],
    requirements: [
      'Define CSP in one sentence for a friend.',
      'Explain why `X-Frame-Options` or `frame-ancestors` matters for clickjacking.',
      'Note difference between `HttpOnly` and `Secure` cookie flags.',
    ],
    learnings: ['Security', 'HTTP vs HTTPS', 'Networking'],
    recommendedAfterTopics: ['Security', 'HTTP vs HTTPS'],
    deliverables: ['Cheat sheet markdown', '3 bullet “so what” takeaways'],
    visualReferences: [{ ...PX, title: 'Security study' }],
    codeWalkthrough: {
      overview:
        'Example CSP line you might see in the wild—do not copy blindly into production without tailoring.',
      snippets: [
        {
          fileLabel: 'csp-example.txt',
          language: 'text',
          code: `Content-Security-Policy: default-src 'self'; img-src 'self' https: data:; script-src 'self'`,
          explanation:
            '`default-src` is the fallback; overrides like `img-src` relax only images. `script-src` is where XSS defenses concentrate.',
        },
      ],
    },
  },
  'tools-workflow': {
    slug: 'prettier-eslint-align',
    title: 'Prettier + ESLint',
    tagline: 'Install both, avoid rule conflicts, and format on save in VS Code / Cursor.',
    level: 'Beginner+',
    duration: '45 min',
    summary:
      'Wire `eslint-config-prettier` so formatting and linting do not fight, then document the team command.',
    brief:
      'Daily workflow topic: consistent style reduces noise in code review.',
    setup: ['Existing Node project with ESLint.'],
    requirements: [
      'Add Prettier and eslint-config-prettier (or flat-config equivalent).',
      'Add `npm run format`.',
      'Turn on format-on-save locally and describe in README.',
    ],
    learnings: ['Development Tools', 'Build Tools', 'Package Managers'],
    recommendedAfterTopics: ['Development Tools', 'Package Managers'],
    deliverables: ['Working format + lint', 'README snippet'],
    visualReferences: [{ ...PX, title: 'Editor setup' }],
    codeWalkthrough: {
      overview:
        'Minimal `.prettierrc` plus extending Prettier last in ESLint `extends` prevents duplicate stylistic rules.',
      snippets: [
        {
          fileLabel: '.prettierrc',
          language: 'json',
          code: `{
  "singleQuote": true,
  "semi": false
}`,
          explanation:
            'Pick team conventions once. Prettier owns whitespace; ESLint owns logic and complexity.',
        },
      ],
    },
  },
  'react-core': {
    slug: 'composition-children-slot',
    title: 'Composition with Children',
    tagline: 'Build a `Panel` that wraps arbitrary children with a title bar.',
    level: 'Beginner+',
    duration: '50 min',
    summary:
      'Practice the React pattern: container owns chrome, parents pass content as `children`.',
    brief:
      'Avoid prop drilling for large markup blobs—composition scales better than giant props.',
    setup: ['Vite React TS.'],
    requirements: [
      '`Panel` accepts `title` and `children`.',
      'Nest two panels on a page with different inner content.',
      'Use semantic headings inside the panel body.',
    ],
    learnings: [
      'Basics: JSX, Components, Props, State',
      'Rendering: Conditional Rendering, Lists & Keys',
    ],
    recommendedAfterTopics: ['Basics: JSX, Components, Props, State'],
    deliverables: ['Reusable `Panel`', 'Screenshot or story'],
    visualReferences: [{ ...PX, title: 'Composition' }],
    codeWalkthrough: {
      overview:
        '`children` is a prop like any other, but JSX nests it between tags for readability.',
      snippets: [
        {
          fileLabel: 'Panel.tsx',
          language: 'tsx',
          code: `export function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border p-4">
      <header className="mb-3 font-bold">{title}</header>
      {children}
    </section>
  );
}`,
          explanation:
            'Parents pass complex trees without listing every sub-prop. Later you can swap `children` for named slots if needed.',
        },
      ],
    },
  },
  'react-intermediate': {
    slug: 'custom-hook-use-toggle',
    title: 'Custom Hook: useToggle',
    tagline: 'Extract boolean toggle logic reused across modals and accordions.',
    level: 'Beginner+',
    duration: '40 min',
    summary:
      'Implement `useToggle(initial)` returning `[value, toggle, set]`.',
    brief:
      'Hooks compose—keep API tiny and predictable.',
    setup: ['React 18+.'],
    requirements: [
      'Stable `toggle` reference via `useCallback` (optional stretch).',
      'Use the hook in two unrelated components.',
    ],
    learnings: ['Hooks: useEffect', 'State Management', 'useRef'],
    recommendedAfterTopics: ['State Management', 'Hooks: useEffect'],
    deliverables: ['Hook file + two consumers'],
    visualReferences: [{ ...PX, title: 'Hooks' }],
    codeWalkthrough: {
      overview:
        'Custom hooks are functions whose name starts with `use` and may call other hooks.',
      snippets: [
        {
          fileLabel: 'useToggle.ts',
          language: 'typescript',
          code: `import { useCallback, useState } from 'react';

export function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn((v) => !v), []);
  return [on, toggle, setOn] as const;
}`,
          explanation:
            '`as const` preserves tuple typing. Callers decide initial state; `toggle` stays referentially stable if dependencies stay empty.',
        },
      ],
    },
  },
  'react-advanced': {
    slug: 'error-boundary-class',
    title: 'Error Boundary (class)',
    tagline: 'Catch render errors in a subtree and show fallback UI.',
    level: 'Intermediate',
    duration: '60 min',
    summary:
      'Implement `componentDidCatch` + `getDerivedStateFromError` (or the modern class pattern you prefer) around a risky child.',
    brief:
      'Error boundaries do not catch event handlers or async code—only render/lifecycle errors.',
    setup: ['Class component or community helper—exercise uses class for learning.'],
    requirements: [
      'Demonstrate a child that throws on purpose.',
      'Reset boundary via button.',
    ],
    learnings: ['Error Handling', 'Advanced Hooks', 'Re-rendering Concept'],
    recommendedAfterTopics: ['Error Handling', 'Advanced Hooks'],
    deliverables: ['Boundary + demo throw', 'Note on async limits'],
    visualReferences: [{ ...PX, title: 'Resilience' }],
    codeWalkthrough: {
      overview:
        'React still documents class-based error boundaries; function equivalents are experimental or library-based.',
      snippets: [
        {
          fileLabel: 'Boundary.tsx',
          language: 'tsx',
          code: `import { Component, type ErrorInfo, type ReactNode } from 'react';

export class Boundary extends Component<
  { children: ReactNode },
  { err: Error | null }
> {
  state = { err: null };

  static getDerivedStateFromError(err: Error) {
    return { err };
  }

  componentDidCatch(err: Error, info: ErrorInfo) {
    console.error(err, info);
  }

  render() {
    if (this.state.err) {
      return <p>Something broke in this section.</p>;
    }
    return this.props.children;
  }
}`,
          explanation:
        '`getDerivedStateFromError` updates state for the next render. Log in `componentDidCatch` for reporting services.',
        },
      ],
    },
  },
  routing: {
    slug: 'query-params-filter',
    title: 'Query Params Filter',
    tagline: 'Sync a list filter with `?q=` in the URL using React Router.',
    level: 'Intermediate',
    duration: '75 min',
    summary:
      'Reading and writing search params makes shareable filtered views.',
    brief:
      'Prefer `useSearchParams` (v6.4+) or your router’s equivalent.',
    setup: ['Router with a list page.'],
    requirements: [
      'Typing updates the URL without full page reload.',
      'Reload preserves filter.',
    ],
    learnings: ['Dynamic Routes', 'React Router: Routes, Navigate, useParams', 'Nested Routes'],
    recommendedAfterTopics: ['React Router: Routes, Navigate, useParams'],
    deliverables: ['Synced filter', 'Short note on replacing vs merge'],
    visualReferences: [{ ...PX, title: 'URL state' }],
    codeWalkthrough: {
      overview:
        'Search params are ideal for non-hierarchical UI state like filters and tabs.',
      snippets: [
        {
          fileLabel: 'Filter.tsx',
          language: 'tsx',
          code: `import { useSearchParams } from 'react-router-dom';

export function Filter() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';

  return (
    <input
      value={q}
      onChange={(e) => {
        const next = new URLSearchParams(params);
        next.set('q', e.target.value);
        setParams(next, { replace: true });
      }}
    />
  );
}`,
          explanation:
            '`replace: true` avoids polluting history on every keystroke—debouncing the update is another improvement.',
        },
      ],
    },
  },
  'api-handling': {
    slug: 'parallel-requests-merge',
    title: 'Parallel Requests Merge',
    tagline: 'Use `Promise.all` to load profile + settings together with one loading flag.',
    level: 'Intermediate',
    duration: '60 min',
    summary:
      'Avoid waterfall requests when endpoints are independent.',
    brief:
      'Handle partial failure: decide whether one failed request fails the whole page.',
    setup: ['Two mock fetch functions.'],
    requirements: [
      'Single loading state until both settle.',
      'If one fails, show which part failed.',
    ],
    learnings: ['Async JavaScript', 'API Integration', 'Handling States: Loading, Error'],
    recommendedAfterTopics: ['API Integration', 'Handling States: Loading, Error'],
    deliverables: ['Merged UI', 'Failure matrix note'],
    visualReferences: [{ ...PX, title: 'Concurrency' }],
    codeWalkthrough: {
      overview:
        '`Promise.all` rejects on first failure—`allSettled` if you need every result.',
      snippets: [
        {
          fileLabel: 'load.ts',
          language: 'typescript',
          code: `export async function loadDashboard() {
  const [userRes, prefsRes] = await Promise.all([
    fetch('/api/me'),
    fetch('/api/prefs'),
  ]);
  if (!userRes.ok) throw new Error('user');
  if (!prefsRes.ok) throw new Error('prefs');
  return {
    user: await userRes.json(),
    prefs: await prefsRes.json(),
  };
}`,
          explanation:
            'Both requests start immediately—faster than await sequentially. Customize error handling per endpoint as needed.',
        },
      ],
    },
  },
  authentication: {
    slug: 'logout-and-cache-clear',
    title: 'Logout & Client Cache',
    tagline: 'On logout, clear tokens and reset in-memory query caches (mock).',
    level: 'Intermediate',
    duration: '50 min',
    summary:
      'List every place client state might still hold PII after logout.',
    brief:
      'Pairs with Token Storage and Logout topics—think holistically.',
    setup: ['Extend mock auth from earlier projects.'],
    requirements: [
      'Remove tokens from storage.',
      'Clear a fake `user` React state or context.',
      'Document what you would do for React Query / SWR caches.',
    ],
    learnings: ['Logout', 'Token Storage', 'Security'],
    recommendedAfterTopics: ['Logout', 'Token Storage'],
    deliverables: ['Checklist of cleared stores'],
    visualReferences: [{ ...PX, title: 'Session end' }],
    codeWalkthrough: {
      overview:
        'Pseudo-code for invalidating cached queries on logout.',
      snippets: [
        {
          fileLabel: 'logout-notes.md',
          language: 'text',
          code: `- sessionStorage / localStorage keys removed
- in-memory user atom reset
- (if using TanStack Query) queryClient.clear() or removeQueries(['user'])`,
          explanation:
            'Stale cache after logout is a common bug—users see the previous account until refresh.',
        },
      ],
    },
  },
  'forms-validation': {
    slug: 'server-error-mapping',
    title: 'Server Error Mapping',
    tagline: 'Map API field errors onto RHF fields with `setError`.',
    level: 'Intermediate',
    duration: '75 min',
    summary:
      "Mock a 422 response `{ errors: { email: ['taken'] } }` and surface it under the email input.",
    brief:
      'Client validation is not enough—servers have the final say.',
    setup: ['React Hook Form project.'],
    requirements: [
      'Parse error payload deterministically.',
      'Show non-field errors in an alert region.',
    ],
    learnings: ['React Hook Form', 'Zod Validation', 'Error Messages'],
    recommendedAfterTopics: ['Error Messages', 'React Hook Form'],
    deliverables: ['422 handling demo'],
    visualReferences: [{ ...PX, title: 'Forms' }],
    codeWalkthrough: {
      overview:
        'After submit, if response is validation error, loop keys and call `setError`.',
      snippets: [
        {
          fileLabel: 'mapErrors.ts',
          language: 'typescript',
          code: `import type { UseFormSetError } from 'react-hook-form';

export function applyServerErrors(
  body: Record<string, string[] | undefined>,
  setError: UseFormSetError<any>,
) {
  for (const [field, messages] of Object.entries(body)) {
    if (!messages?.length) continue;
    setError(field as any, { type: 'server', message: messages[0] });
  }
}`,
          explanation:
            'Use a single message or join multiples. Keep `type` as `server` to distinguish from client Zod errors in UI.',
        },
      ],
    },
  },
  'ui-design': {
    slug: 'dark-mode-tokens',
    title: 'Dark Mode Tokens',
    tagline: 'Define CSS variables for surfaces and text, toggle with `data-theme`.',
    level: 'Beginner+',
    duration: '60 min',
    summary:
      'Swap palettes without duplicating every utility class.',
    brief:
      'Works with Tailwind via `@theme` or a `:root` / `[data-theme=dark]` layer.',
    setup: ['Tailwind v4 project.'],
    requirements: [
      'At least 3 semantic tokens: `--surface`, `--text`, `--accent`.',
      'Contrast check with DevTools or a contrast extension.',
    ],
    learnings: ['Tailwind CSS', 'Consistent UI', 'Reusable Components'],
    recommendedAfterTopics: ['Tailwind CSS', 'Consistent UI'],
    deliverables: ['Theme toggle + token sheet'],
    visualReferences: [{ ...PX, title: 'Theming' }],
    codeWalkthrough: {
      overview:
        'Classic CSS variables approach readable in any stack.',
      snippets: [
        {
          fileLabel: 'tokens.css',
          language: 'css',
          code: `:root {
  --surface: #fafaf9;
  --text: #1c1917;
}

[data-theme='dark'] {
  --surface: #1c1917;
  --text: #fafaf9;
}

body {
  background: var(--surface);
  color: var(--text);
}`,
          explanation:
            'Components consume semantic tokens; the theme attribute chooses the palette. Pair with `color-scheme` for native controls.',
        },
      ],
    },
  },
  'performance-optimization': {
    slug: 'web-vitals-thresholds',
    title: 'Web Vitals Thresholds',
    tagline: 'Record LCP / INP / CLS once in Lighthouse and interpret pass/warn/fail.',
    level: 'Beginner+',
    duration: '45 min',
    summary:
      'Run Lighthouse on a local page, screenshot metrics, and write what you would try first to improve the worst score.',
    brief:
      'Connects Lighthouse Basics to actionable next steps.',
    setup: ['Chrome Lighthouse panel.'],
    requirements: [
      'Capture before/after if you change one variable (e.g. image size).',
      'Explain INP vs FID in your own words.',
    ],
    learnings: ['Lighthouse Basics', 'React DevTools', 'Image Optimization'],
    recommendedAfterTopics: ['Lighthouse Basics', 'Bundle Size Optimization'],
    deliverables: ['Metrics screenshot', 'One improvement hypothesis'],
    visualReferences: [{ ...PX, title: 'Metrics' }],
    codeWalkthrough: {
      overview:
        'Threshold reference (approximate—check current Google guidance).',
      snippets: [
        {
          fileLabel: 'thresholds.md',
          language: 'text',
          code: `LCP: aim for good under ~2.5s on mid hardware
CLS: keep below ~0.1
INP: interactions should stay responsive (check latest docs for budgets)`,
          explanation:
            'Numbers evolve—treat docs as source of truth. The skill is reproducing measurements consistently.',
        },
      ],
    },
  },
}
