import type { PracticeProject } from '../practiceProject'

const PX = {
  image:
    'https://images.pexels.com/photos/14686141/pexels-photo-14686141.jpeg?cs=srgb&dl=pexels-luchik-14686141.jpg&fm=jpg',
  sourceLabel: 'Pexels' as const,
  sourceUrl: 'https://www.pexels.com/photo/laptop-in-cafe-14686141/',
}

export const reactIntermediateProjects: PracticeProject[] = [
  {
    slug: 'effect-mount-fetch',
    title: 'useEffect Mount Fetch',
    tagline: 'Fetch JSON on mount, track abort on unmount.',
    level: 'Beginner+',
    duration: '75 min',
    summary:
      'Load remote data when the component mounts; cancel in-flight fetch if the user navigates away.',
    brief:
      'Practice the dependency array, cleanup functions, and avoiding double-fetch pitfalls in Strict Mode mentally.',
    setup: ['React 18+ with Strict Mode enabled (Vite default).'],
    requirements: [
      'Show loading, error, and success UI.',
      'Use `AbortController` in cleanup.',
      'Do not fetch inside render—only inside `useEffect`.',
    ],
    learnings: ['Hooks: useEffect', 'State Management', 'Forms'],
    deliverables: ['Data card component', 'Notes on dependency array'],
    visualReferences: [{ ...PX, title: 'Effects' }],
    codeWalkthrough: {
      overview:
        'The effect runs after paint. Return a cleanup that aborts fetch to prevent setState on unmounted components.',
      snippets: [
        {
          fileLabel: 'UserCard.tsx',
          language: 'tsx',
          code: `import { useEffect, useState } from 'react';

type User = { name: string; email: string };

export function UserCard({ userId }: { userId: string }) {
  const [data, setData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setError(null);
    fetch(\`https://jsonplaceholder.typicode.com/users/\${userId}\`, {
      signal: ac.signal,
    })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then(setData)
      .catch((e) => {
        if (e.name === 'AbortError') return;
        setError('Failed to load');
      })
      .finally(() => setLoading(false));

    return () => ac.abort();
  }, [userId]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>{error}</p>;
  if (!data) return null;
  return (
    <article>
      <h2>{data.name}</h2>
      <p>{data.email}</p>
    </article>
  );
}`,
          explanation:
            '`userId` in the dependency array refetches when it changes. AbortController cancels the previous request. Ignore `AbortError` so you do not show a false error state.',
        },
      ],
    },
  },
  {
    slug: 'context-theme-toggle',
    title: 'Context Theme Toggle',
    tagline: 'Share theme state without prop drilling.',
    level: 'Intermediate',
    duration: '90 min',
    summary:
      'Implement `ThemeProvider` with `useContext` and a toggle in a nested toolbar component.',
    brief:
      'Keep context value stable or memoized if you pass callbacks + data together.',
    setup: ['React + TS.'],
    requirements: [
      'At least two nested levels between provider and consumer.',
      'Persist theme choice in `localStorage` (optional stretch).',
    ],
    learnings: ['useContext', 'useRef', 'State Management'],
    deliverables: ['Working dark/light toggle', 'Diagram of provider tree'],
    visualReferences: [{ ...PX, title: 'Context' }],
    codeWalkthrough: {
      overview:
        'Create context with a typed value `{ theme, setTheme }`. Provider sits near the app root.',
      snippets: [
        {
          fileLabel: 'theme.tsx',
          language: 'tsx',
          code: `import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

type Ctx = { theme: Theme; toggle: () => void };

const ThemeContext = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const value = useMemo(
    () => ({
      theme,
      toggle: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
    }),
    [theme],
  );
  return (
    <ThemeContext.Provider value={value}>
      <div data-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}`,
          explanation:
            '`useMemo` prevents consumers re-rendering when an unrelated parent re-renders—only when `theme` changes. Throwing if context is missing catches wiring mistakes early.',
        },
      ],
    },
  },
]

export const reactAdvancedProjects: PracticeProject[] = [
  {
    slug: 'memoized-stats-row',
    title: 'Memoized Stats Row',
    tagline: 'Use `useMemo` to cache an expensive derived statistic.',
    level: 'Intermediate',
    duration: '60 min',
    summary:
      'Given a large in-memory array, compute an aggregate (sum, max) and avoid recomputation unless inputs change.',
    brief:
      'Profile mentally: measure before optimizing. `useMemo` is for costly pure calculations.',
    setup: ['Generate fake data with `Array.from`.'],
    requirements: [
      'Show list length and computed stat.',
      'Add a button that changes an unrelated piece of state—stat should not recompute.',
    ],
    learnings: ['useMemo vs useCallback', 'Re-rendering Concept', 'Advanced Hooks'],
    deliverables: ['Component with memoized derive', 'When not to memoize (note)'],
    visualReferences: [{ ...PX, title: 'Performance' }],
    codeWalkthrough: {
      overview:
        '`useMemo(() => compute(items), [items])` caches until `items` reference changes. If you mutate arrays in place, memo will not help.',
      snippets: [
        {
          fileLabel: 'Stats.tsx',
          language: 'tsx',
          code: `import { useMemo, useState } from 'react';

export function Stats({ values }: { values: number[] }) {
  const [ticks, setTicks] = useState(0);

  const total = useMemo(() => {
    console.log('recompute total');
    return values.reduce((a, b) => a + b, 0);
  }, [values]);

  return (
    <div>
      <p>Total: {total}</p>
      <p>Unrelated ticks: {ticks}</p>
      <button type="button" onClick={() => setTicks((t) => t + 1)}>
        Tick
      </button>
    </div>
  );
}`,
          explanation:
            'Clicking Tick updates state but does not log “recompute total” because `values` is unchanged. Change the `values` prop from a parent to see the log again.',
        },
      ],
    },
  },
  {
    slug: 'lazy-chart-route',
    title: 'Lazy Chart Route',
    tagline: 'Code-split a heavy chart route with `React.lazy` + `Suspense`.',
    level: 'Intermediate',
    duration: '75 min',
    summary:
      'Create a `/stats` route that lazy-loads a fake heavy component with a fallback spinner.',
    brief:
      'Connect to your router’s lazy support; Vite handles dynamic import chunks.',
    setup: ['React Router app.'],
    requirements: [
      "Use `React.lazy(() => import('./HeavyChart'))`.",
      'Wrap route element in `<Suspense fallback=...>`.',
    ],
    learnings: ['Performance: Code Splitting', 'Advanced Hooks', 'Re-rendering Concept'],
    deliverables: ['Observable separate chunk in Network tab'],
    visualReferences: [{ ...PX, title: 'Split bundles' }],
    codeWalkthrough: {
      overview:
        'Dynamic `import()` returns a promise of the module; `lazy` converts it to a component. Suspense shows fallback until resolved.',
      snippets: [
        {
          fileLabel: 'routes.tsx',
          language: 'tsx',
          code: `import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const HeavyChart = lazy(() => import('./pages/HeavyChart'));

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/stats"
        element={
          <Suspense fallback={<p>Loading chart…</p>}>
            <HeavyChart />
          </Suspense>
        }
      />
    </Routes>
  );
}`,
          explanation:
            'Each `lazy` import typically becomes its own JS chunk. Prefetch on hover is a possible enhancement. Error boundaries pair well for failed loads.',
        },
      ],
    },
  },
]

export const routingProjects: PracticeProject[] = [
  {
    slug: 'nested-settings-layout',
    title: 'Nested Settings Layout',
    tagline: 'Parent layout route with outlet for profile, billing, security.',
    level: 'Beginner+',
    duration: '90 min',
    summary:
      'Build `/settings` with a sidebar and nested paths `/settings/profile`, etc., sharing one shell.',
    brief:
      'Use layout routes in React Router v6—`Outlet` renders child route elements.',
    setup: ['Router + a few placeholder pages.'],
    requirements: [
      'Active link styles via `NavLink`.',
      '404 under settings for unknown child paths (optional).',
    ],
    learnings: [
      'React Router: Routes, Navigate, useParams',
      'Nested Routes',
      'Dynamic Routes',
    ],
    deliverables: ['Nested navigation working', 'Sketch of route tree'],
    visualReferences: [{ ...PX, title: 'Navigation' }],
    codeWalkthrough: {
      overview:
        'Layout route element wraps children; child paths are relative when using nested route config.',
      snippets: [
        {
          fileLabel: 'router.tsx',
          language: 'tsx',
          code: `import { NavLink, Outlet, Route, Routes } from 'react-router-dom';

function SettingsLayout() {
  return (
    <div className="settings">
      <aside>
        <nav>
          <NavLink to="profile">Profile</NavLink>
          <NavLink to="billing">Billing</NavLink>
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export function SettingsRoutes() {
  return (
    <Routes>
      <Route path="settings" element={<SettingsLayout />}>
        <Route path="profile" element={<p>Profile</p>} />
        <Route path="billing" element={<p>Billing</p>} />
      </Route>
    </Routes>
  );
}`,
          explanation:
            'Relative child paths (`profile`) nest under `settings`. `NavLink` adds `aria-current` when active—style with `.active` or data attributes depending on RR version.',
        },
      ],
    },
  },
  {
    slug: 'param-user-profile',
    title: 'Dynamic User Profile Route',
    tagline: 'Read `:userId` from the URL and fetch user details.',
    level: 'Intermediate',
    duration: '75 min',
    summary:
      'Route `/users/:userId` loads data based on the param; invalid id shows a friendly not-found state.',
    brief:
      'Keep router params as strings; validate/parsing belongs in the component or loader.',
    setup: ['JSONPlaceholder or mock API.'],
    requirements: [
      'Use `useParams` + `useNavigate` for a “Back to list” action.',
      'Handle loading and 404 from API.',
    ],
    learnings: ['Dynamic Routes', 'React Router: Routes, Navigate, useParams', '404 Page Handling'],
    deliverables: ['Working dynamic route', '404 UX'],
    visualReferences: [{ ...PX, title: 'Params' }],
    codeWalkthrough: {
      overview:
        '`useParams()` returns strings. Convert numbers carefully (`Number.isFinite`).',
      snippets: [
        {
          fileLabel: 'UserPage.tsx',
          language: 'tsx',
          code: `import { useParams, Link } from 'react-router-dom';

export function UserPage() {
  const { userId } = useParams();

  if (!userId) {
    return <p>Missing user id.</p>;
  }

  return (
    <section>
      <Link to="/users">← Users</Link>
      <h1>User {userId}</h1>
      {/* fetch by userId */}
    </section>
  );
}`,
          explanation:
            'Optional: define a loader (RR data APIs) to fetch before render. Here the idea is simply: param drives the request key.',
        },
      ],
    },
  },
]

export const apiHandlingProjects: PracticeProject[] = [
  {
    slug: 'request-state-machine',
    title: 'Request State Machine',
    tagline: 'Model idle / loading / success / error explicitly.',
    level: 'Beginner+',
    duration: '75 min',
    summary:
      'Wrap fetch in a small hook or reducer so UI cannot show inconsistent states.',
    brief:
      'Explicit states beat boolean soup (`loading && !error && ...`).',
    setup: ['Any fetch API.'],
    requirements: [
      'Disable submit while loading.',
      'Retry button on error.',
    ],
    learnings: [
      'API Integration',
      'Handling States: Loading, Error',
      'API Status Handling',
    ],
    deliverables: ['Hook or reducer', 'UI for all states'],
    visualReferences: [{ ...PX, title: 'Resilience' }],
    codeWalkthrough: {
      overview:
        'A discriminated union in TypeScript models mutually exclusive states cleanly.',
      snippets: [
        {
          fileLabel: 'useJson.ts',
          language: 'typescript',
          code: `type State<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };

export function useJson<T>(url: string) {
  const [state, setState] = useState<State<T>>({ status: 'idle' });

  async function run() {
    setState({ status: 'loading' });
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error(String(r.status));
      const data = (await r.json()) as T;
      setState({ status: 'success', data });
    } catch (e) {
      setState({ status: 'error', message: 'Failed' });
    }
  }

  return { state, run };
}`,
          explanation:
            'Consumers switch on `state.status`—TypeScript narrows `data` only in `success`. This pattern scales to React Query later as inspiration.',
        },
      ],
    },
  },
  {
    slug: 'pagination-ui',
    title: 'Pagination UI',
    tagline: 'Page forward/back through a mock API with page state in URL or state.',
    level: 'Intermediate',
    duration: '90 min',
    summary:
      'Implement `?page=` query sync or internal state; debounce search if you add a filter.',
    brief:
      'Practice keeping the UI in sync with server totals and disabling next on last page.',
    setup: ['Use an API with `_page` and `_limit` query params (JSONPlaceholder style).'],
    requirements: [
      'Show current page and total pages if known.',
      'Debounce optional search input (~300ms).',
    ],
    learnings: ['Pagination', 'Debouncing', 'API Integration'],
    deliverables: ['Paginated list', 'Note on URL vs state tradeoffs'],
    visualReferences: [{ ...PX, title: 'Lists' }],
    codeWalkthrough: {
      overview:
        'Store `page` in React state; `useEffect` refetches when page changes. Debouncing search avoids spamming the API.',
      snippets: [
        {
          fileLabel: 'debounce.ts',
          language: 'typescript',
          code: `import { useEffect, useState } from 'react';

export function useDebouncedValue<T>(value: T, ms: number) {
  const [d, setD] = useState(value);
  useEffect(() => {
    const id = window.setTimeout(() => setD(value), ms);
    return () => window.clearTimeout(id);
  }, [value, ms]);
  return d;
}`,
          explanation:
            'Cleanup clears the timer so fast typers only trigger the last scheduled update. Pair with `useEffect` on the debounced search term to fetch.',
        },
      ],
    },
  },
]
