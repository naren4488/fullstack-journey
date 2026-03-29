import type { PracticeProject } from '../practiceProject'

const PX = {
  image:
    'https://images.pexels.com/photos/17564426/pexels-photo-17564426.jpeg?cs=srgb&dl=pexels-mutecevvil-17564426.jpg&fm=jpg',
  sourceLabel: 'Pexels' as const,
  sourceUrl: 'https://www.pexels.com/photo/man-using-laptop-at-cafe-17564426/',
}

export const authenticationProjects: PracticeProject[] = [
  {
    slug: 'mock-login-flow',
    title: 'Mock Login Flow',
    tagline: 'Shape a login form and client-side session object without a real backend.',
    level: 'Beginner+',
    duration: '90 min',
    summary:
      'On submit, validate fields, set a fake `user` object in memory, and clear it on logout. Optionally stash a token string in `sessionStorage` and read it on load.',
    brief:
      'Focus on UX: loading button, error alert, and never logging tokens to console in real apps.',
    setup: ['React SPA.'],
    requirements: [
      'Fake `login()` that resolves after timeout with random success/fail.',
      'Logout clears storage and state.',
      'Document where you would put httpOnly cookies in production.',
    ],
    learnings: ['Login / Register', 'Token Storage', 'Security', 'Logout'],
    deliverables: ['Flow demo', 'Threat note (XSS vs storage)'],
    visualReferences: [{ ...PX, title: 'Auth UX' }],
    codeWalkthrough: {
      overview:
        'This is intentionally frontend-only. Real auth uses HTTPS, secure cookies, CSRF protection, and server-issued tokens.',
      snippets: [
        {
          fileLabel: 'auth.ts',
          language: 'typescript',
          code: `export type Session = { token: string; email: string };

const KEY = 'demo-session';

export function readSession(): Session | null {
  const raw = sessionStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function writeSession(s: Session) {
  sessionStorage.setItem(KEY, JSON.stringify(s));
}

export function clearSession() {
  sessionStorage.removeItem(KEY);
}`,
          explanation:
            '`sessionStorage` clears when the tab closes—slightly safer for naive demos than `localStorage`, but still vulnerable to XSS. Production SPAs often prefer httpOnly cookies for refresh tokens.',
        },
      ],
    },
  },
  {
    slug: 'role-guard-sketch',
    title: 'Role Guard Sketch',
    tagline: 'Conditionally render an admin panel based on a role string.',
    level: 'Intermediate',
    duration: '60 min',
    summary:
      'Store `role: user | admin` in fake session; hide routes or sections for non-admins. Pair with a warning: never trust roles on the client alone.',
    brief:
      'Client checks are UX; server authorization is security.',
    setup: ['Extend mock session type.'],
    requirements: [
      'Show “Access denied” for `/admin` when role is user.',
      'Centralize `canAccess(role, path)` helper.',
    ],
    learnings: ['Role-based Access', 'Protected Routes', 'Security'],
    deliverables: ['Guarded route', 'Paragraph on server-side checks'],
    visualReferences: [{ ...PX, title: 'Access control' }],
    codeWalkthrough: {
      overview:
        'React Router v6: wrap an element with a component that reads session and navigates or renders `<Navigate />`.',
      snippets: [
        {
          fileLabel: 'RequireAdmin.tsx',
          language: 'tsx',
          code: `import { Navigate } from 'react-router-dom';

export function RequireAdmin({
  role,
  children,
}: {
  role: string | undefined;
  children: JSX.Element;
}) {
  if (role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
}`,
          explanation:
        'This is a UX gate. Anyone can bypass it via devtools—real enforcement belongs on the API with JWT claims or session roles verified server-side.',
        },
      ],
    },
  },
]

export const formsValidationProjects: PracticeProject[] = [
  {
    slug: 'rhf-zod-signup',
    title: 'RHF + Zod Signup',
    tagline: 'One form with schema validation and field errors.',
    level: 'Beginner+',
    duration: '90 min',
    summary:
      'Use `react-hook-form` with a Zod schema resolver for email/password/confirm.',
    brief:
      'Surface errors next to fields and disable submit until the form is valid (optional).',
    setup: ['Install `react-hook-form`, `@hookform/resolvers`, `zod`.'],
    requirements: [
      'Zod: email format, min password length, passwords match refines.',
      'Show `formState` loading on async submit.',
    ],
    learnings: [
      'React Hook Form',
      'Zod Validation',
      'Error Messages',
      'Controlled vs Uncontrolled',
    ],
    deliverables: ['Validated form', 'Schema file separate from UI'],
    visualReferences: [{ ...PX, title: 'Forms' }],
    codeWalkthrough: {
      overview:
        '`zodResolver` connects Zod errors to RHF field state automatically.',
      snippets: [
        {
          fileLabel: 'schema.ts',
          language: 'typescript',
          code: `import { z } from 'zod';

export const signupSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, 'At least 8 characters'),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    path: ['confirm'],
    message: 'Passwords must match',
  });

export type Signup = z.infer<typeof signupSchema>;`,
          explanation:
            '`refine` handles cross-field rules. `path` targets which field shows the error. `z.infer` keeps TS types aligned with runtime validation.',
        },
      ],
    },
  },
  {
    slug: 'async-username-check',
    title: 'Async Username Check',
    tagline: 'Validate uniqueness with debounced API mock.',
    level: 'Intermediate',
    duration: '90 min',
    summary:
      'While the user types a username, debounce requests to a fake endpoint and show availability.',
    brief:
      'Coordinate RHF `setError` / `clearErrors` with async validation.',
    setup: ['Build on previous RHF project.'],
    requirements: [
      'Debounce input (~400ms).',
      'Show inline “checking…” and result states.',
    ],
    learnings: [
      'Real-time Validation',
      'Field-level Validation',
      'Loading State',
      'Debouncing',
    ],
    deliverables: ['Async field validation UX'],
    visualReferences: [{ ...PX, title: 'Async validation' }],
    codeWalkthrough: {
      overview:
        'Use `watch` on the field or `Controller` to trigger side effects; debounce inside `useEffect`.',
      snippets: [
        {
          fileLabel: 'pattern note',
          language: 'text',
          code: `1. watch('username')
2. debounce value
3. if empty -> clear errors
4. fetch /mock/username-available?name=
5. setError('username', { message: 'Taken' }) or clearErrors('username')`,
          explanation:
            'Avoid validating on every keystroke without debounce—you will DDOS your own API. Reset state when the component unmounts to cancel in-flight checks.',
        },
      ],
    },
  },
]

export const uiDesignProjects: PracticeProject[] = [
  {
    slug: 'tailwind-card-system',
    title: 'Tailwind Card System',
    tagline: 'Compose three card variants from shared utility patterns.',
    level: 'Beginner+',
    duration: '75 min',
    summary:
      'Build default, bordered, and elevated cards using Tailwind; extract repeated classes to `@apply` in CSS layer or small wrapper components.',
    brief:
      'Balance DRY with readability—sometimes duplication is clearer than magic abstractions.',
    setup: ['Tailwind-enabled Vite React app.'],
    requirements: [
      'Responsive padding and type scale.',
      'Focus-visible rings on interactive cards.',
    ],
    learnings: [
      'Tailwind CSS',
      'Reusable Components',
      'Consistent UI',
      'Responsive Layouts',
    ],
    deliverables: ['Story-like page showing variants'],
    visualReferences: [{ ...PX, title: 'UI polish' }],
    codeWalkthrough: {
      overview:
        'Use `rounded-2xl`, `shadow-*`, and `ring` utilities. Prefer `outline-none` only when replacing with visible `ring`.',
      snippets: [
        {
          fileLabel: 'Card.tsx',
          language: 'tsx',
          code: `type Variant = 'default' | 'bordered' | 'elevated';

const styles: Record<Variant, string> = {
  default: 'bg-white text-stone-900',
  bordered: 'bg-white ring-1 ring-stone-200 text-stone-900',
  elevated: 'bg-white shadow-lg shadow-stone-900/10 text-stone-900',
};

export function Card({
  variant = 'default',
  children,
}: {
  variant?: Variant;
  children: React.ReactNode;
}) {
  return (
    <div
      className={\`rounded-2xl p-6 \${styles[variant]} focus-within:ring-2 focus-within:ring-amber-400\`}
    >
      {children}
    </div>
  );
}`,
          explanation:
        'Central map keeps variants consistent. `focus-within` helps when the card wraps inputs or links.',
        },
      ],
    },
  },
  {
    slug: 'state-driven-placeholders',
    title: 'State-Driven Empty & Error UI',
    tagline: 'Design distinct components for loading, empty, and error in a list page.',
    level: 'Intermediate',
    duration: '75 min',
    summary:
      'Fetch a list; render skeleton or spinner, friendly empty copy, and retryable error panel.',
    brief:
      'Good product design is explicit state handling—not just the happy path.',
    setup: ['Reuse fetch patterns from API module.'],
    requirements: [
      'Three separate small components or clearly separated JSX blocks.',
      'Accessible announcements for errors (`role="alert"`).',
    ],
    learnings: ['Loading UI', 'Empty State UI', 'Error State UI', 'Consistent UI'],
    deliverables: ['List screen with all states demo-able'],
    visualReferences: [{ ...PX, title: 'States' }],
    codeWalkthrough: {
      overview:
        'Switch on the same state machine idea as API module: each visual is mutually exclusive.',
      snippets: [
        {
          fileLabel: 'ListStates.tsx',
          language: 'tsx',
          code: `export function ListStates({
  status,
  onRetry,
}: {
  status: 'loading' | 'empty' | 'error' | 'ready';
  onRetry: () => void;
}) {
  if (status === 'loading') return <p aria-live="polite">Loading…</p>;
  if (status === 'error')
    return (
      <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4">
        <p>Could not load items.</p>
        <button type="button" onClick={onRetry}>
          Retry
        </button>
      </div>
    );
  if (status === 'empty')
    return <p>No items yet. Create one to get started.</p>;
  return null;
}`,
          explanation:
        '`role="alert"` interrupts screen readers for errors. `aria-live="polite"` is enough for loading transitions.',
        },
      ],
    },
  },
]

export const performanceOptimizationProjects: PracticeProject[] = [
  {
    slug: 'lazy-image-component',
    title: 'Lazy Image Component',
    tagline: 'Use native `loading="lazy"` and aspect ratio to reduce CLS.',
    level: 'Beginner+',
    duration: '60 min',
    summary:
      'Build `<LazyImage />` with fixed aspect box, skeleton background, and `onLoad` fade-in.',
    brief:
      'Connect to Lighthouse “CLS” and “Defer offscreen images” guidance.',
    setup: ['Several tall images in `/public`.'],
    requirements: [
      'Reserve space with `aspect-*` or explicit height.',
      'Blur-up optional (CSS only is fine).',
    ],
    learnings: ['Image Optimization', 'Lazy Loading', 'Lighthouse Basics'],
    deliverables: ['Reusable image component'],
    visualReferences: [{ ...PX, title: 'Media perf' }],
    codeWalkthrough: {
      overview:
        'Native lazy loading is good for below-the-fold content; hero images should load eagerly.',
      snippets: [
        {
          fileLabel: 'LazyImage.tsx',
          language: 'tsx',
          code: `import { useState } from 'react';

export function LazyImage({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={\`relative overflow-hidden bg-stone-200 \${className}\`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={\`h-full w-full object-cover transition-opacity duration-300 \${
          loaded ? 'opacity-100' : 'opacity-0'
        }\`}
      />
    </div>
  );
}`,
          explanation:
        '`decoding="async"` hints the browser not to block the main thread. Opacity transition masks progressive decode. Pair with width/height attributes when dimensions are known.',
        },
      ],
    },
  },
  {
    slug: 'devtools-rerender-audit',
    title: 'DevTools Re-render Audit',
    tagline: 'Use React DevTools “Highlight updates” to find noisy parents.',
    level: 'Intermediate',
    duration: '60 min',
    summary:
      'Instrument a small app with unnecessary parent state and fix with lifting state down or memoization.',
    brief:
      'Measure before memoizing—`React.memo` everywhere is not free.',
    setup: ['React DevTools extension.'],
    requirements: [
      'Document one unnecessary re-render you found.',
      'Apply one fix (`memo`, `useCallback`, or state split).',
    ],
    learnings: [
      'React DevTools',
      'Avoid Unnecessary Re-renders',
      'Memoization',
      'Bundle Size Optimization',
    ],
    deliverables: ['Before/after notes', 'Optional flamegraph screenshot'],
    visualReferences: [{ ...PX, title: 'Profiling' }],
    codeWalkthrough: {
      overview:
        'React 18 Strict Mode double-invokes render in dev—learn what is normal noise vs real issues.',
      snippets: [
        {
          fileLabel: 'checklist.md',
          language: 'text',
          code: `## Re-render audit
- [ ] Toggle "Highlight updates when components render"
- [ ] Type in an input — which ancestors flashed?
- [ ] Is state stored too high intentionally?
- [ ] Can children be pure with React.memo?
- [ ] Are callbacks stable where passed to memo children?`,
          explanation:
        'Use this checklist during code review. Combine with the Profiler tab for commit duration, not just flash count.',
        },
      ],
    },
  },
]
