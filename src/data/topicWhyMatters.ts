/**
 * Short “why this matters” copy per roadmap topic, keyed by module slug and topic label.
 * Labels must match `modules.ts` exactly. Extend this file as you add or rename topics.
 */
const TOPIC_WHY: Record<string, Record<string, string>> = {
  html: {
    'Basic Structure':
      'Every page you build rests on a clear document skeleton. Getting html, head, and body right prevents mysterious bugs later and is the first step toward valid, predictable markup.',
    'Text & Formatting Tags':
      'Most of what users read is text. Choosing emphasis, paragraphs, and inline tags deliberately keeps content meaningful for both browsers and assistive technologies.',
    'Links & Navigation':
      'Links are how the web connects. Solid href usage, accessible link text, and sensible navigation patterns are non-negotiable for usable multi-page experiences.',
    'Images & Media':
      'Media carries information, not just decoration. Alt text, formats, and performance-aware embedding affect accessibility, SEO, and load time.',
    Lists:
      'Lists communicate grouping and order. They are the right tool for menus, steps, and related items—and they are parsed consistently by screen readers.',
    Tables:
      'Tables are for tabular data, not layout. Understanding rows, headers, and captions helps people and tools interpret dense information correctly.',
    Forms:
      'Forms are the main way users send data to servers. Structure, labels, and input types directly affect conversion, validation, and accessibility.',
    'Semantic HTML':
      'Semantic elements describe intent (article, nav, aside). They improve SEO, sharing, and assistive navigation far more than anonymous div soup.',
    Attributes:
      'Attributes configure elements—ids, classes, data-*, ARIA. Knowing when and why to use them keeps markup expressive without breaking standards.',
    'Accessibility Basics':
      'Accessible HTML reaches more users and is often legally expected. Keyboard use, focus, and semantics are easier to bake in early than to retrofit.',
    'Meta Tags & SEO Basics':
      'Meta information shapes how pages appear in search and social previews. It is a small effort with outsized impact on discoverability.',
    'Inline vs Block Elements':
      'Flow and layout start with display behavior. Knowing inline vs block explains spacing quirks and helps you reach for the right layout tools in CSS later.',
    'Relative vs Absolute Paths':
      'Broken assets and routes usually come from path mistakes. Mastering relative URLs, roots, and public paths saves hours when deploying or refactoring.',
    'Form Attributes in Depth':
      'Attributes like autocomplete, pattern, and inputmode refine UX and validation. They reduce server round-trips and help users complete forms faster.',
    'Favicon and App Icons':
      'Icons show up in tabs, home screens, and OS UI. Declaring them correctly makes your site feel finished and trustworthy.',
  },
  css: {
    'CSS Basics':
      'Selectors, the cascade, and inheritance explain why styles apply—or do not. This mental model is the foundation for every layout decision you make.',
    'Box Model':
      'Every element occupies space as content, padding, border, and margin. Misunderstanding the box model is the root cause of most “mystery” layout gaps.',
    Flexbox:
      'Flexbox solves one-dimensional alignment and distribution. It is the default tool for nav bars, toolbars, and most component internals.',
    Grid:
      'CSS Grid handles two-dimensional layouts. For dashboards and complex pages, it often replaces brittle float or flex hacks.',
    Position:
      'Positioning overlays, sticky headers, and modals. Without it, you cannot build layered UI that still scrolls sensibly.',
    'Responsive Design':
      'Users arrive on every screen size. Fluid layouts, media queries, and relative units keep interfaces usable without separate “mobile sites”.',
    'Advanced CSS: Transition, Transform, Animation':
      'Motion and depth communicate state. Used sparingly, transitions and transforms make UIs feel responsive without hurting performance.',
    'Modern CSS: Tailwind, shadcn/ui':
      'Utility-first and component libraries trade repetition for speed and consistency. Knowing the underlying CSS keeps you from fighting the framework.',
    'Display Types':
      'block, inline, flex, grid, and none define how elements participate in layout. Picking the right display is the first fix for many bugs.',
    Overflow:
      'Scroll regions, clipped content, and ellipsis all depend on overflow. It is essential for tables, cards, and any constrained height.',
    'Object Fit':
      'Images and video rarely match their containers. object-fit preserves aspect ratio without awkward stretching in responsive layouts.',
    'Pseudo Classes':
      'States like :hover, :focus-visible, and :disabled are how CSS reacts to interaction. They are central to accessible, polished components.',
    'Pseudo Elements':
      '::before and ::after power icons, decorations, and custom controls without extra DOM nodes—when used with care for accessibility.',
  },
  javascript: {
    'Basics: Variables, Data Types, Operators':
      'You cannot reason about behavior without knowing how values are stored and compared. This is the vocabulary for every script you write.',
    'Control Flow':
      'Branching and loops turn data into decisions. Clear control flow keeps logic readable and testable as features grow.',
    Functions:
      'Functions bundle behavior, scope, and reuse. They are the primary unit of organization from utilities to event handlers.',
    'Arrays & Objects':
      'Real data is structured. Arrays and objects are how you model lists, maps, and API payloads in JavaScript.',
    'DOM Manipulation':
      'The DOM is the live bridge between HTML and scripts. Safe querying and updates are how you build interactive pages without frameworks.',
    'Async JavaScript':
      'Networks and timers are asynchronous. Promises and async/await keep asynchronous code understandable and avoid callback spaghetti.',
    'Advanced Concepts: this, Closures, Hoisting':
      'These behaviors trip up every developer once. Understanding them prevents subtle bugs in callbacks, modules, and class methods.',
    'Execution Context':
      'The engine’s notion of “where code runs” explains variable visibility and the call stack. It is the basis for debugging “why is this undefined?”.',
    'Call Stack':
      'Synchronous errors and infinite recursion show up in the stack. Reading stacks is a core debugging skill.',
    'Event Loop':
      'JavaScript is single-threaded yet feels concurrent. The event loop explains timers, rendering, and why long tasks freeze the UI.',
    'setTimeout / setInterval':
      'Delayed and repeated work powers loaders, debouncing, and animations. Misuse causes memory leaks and race conditions.',
    JSON:
      'JSON is the lingua franca of APIs. Parsing and stringify safely is how frontends talk to backends.',
    'Error Handling':
      'User-facing resilience starts with catching failures, surfacing messages, and logging for diagnosis.',
    'Performance Concepts':
      'Perceived speed matters as much as raw benchmarks. Knowing reflow, batching DOM work, and when to defer keeps apps smooth.',
    'Memory & Copy':
      'References vs copies cause silent mutation bugs. Understanding them is critical when passing props or caching data.',
    'Important Comparisons':
      '== vs ===, truthiness, and nullish coalescing decide branching. Getting comparisons right avoids entire classes of logic errors.',
  },
  'browser-web-concepts': {
    'Core Concepts':
      'URLs, origins, and the same-origin policy shape every security and caching decision in the browser.',
    Networking:
      'Requests, DNS, TLS, and HTTP verbs explain what happens before your JavaScript runs—and why failures look the way they do.',
    Storage:
      'Where data lives (memory, disk, cookies) affects persistence, quota, and privacy. Picking the right store avoids data loss and leaks.',
    Security:
      'XSS, CSRF, and mixed content are not academic—they are checklist items for any app that handles user input or auth.',
    'Cookies vs LocalStorage vs SessionStorage':
      'Each mechanism has different lifetime, scope, and transport rules. Confusing them breaks login flows and compliance expectations.',
    'HTTP vs HTTPS':
      'Encryption is baseline for credentials and modern APIs. HTTPS also unlocks browser features that refuse insecure contexts.',
    'Browser Rendering Pipeline':
      'Parse, style, layout, paint, and composite explain performance bottlenecks and why some CSS is expensive.',
  },
  'tools-workflow': {
    'Development Tools':
      'The inspector, network tab, and debugger turn guesswork into evidence. They are how professional developers ship fixes quickly.',
    'Package Managers':
      'Dependencies are how you share and lock versions. npm/pnpm/yarn workflows keep teams and CI reproducible.',
    'Build Tools':
      'Bundlers and transpilers bridge modern syntax with browser support. Knowing what they do helps when builds fail.',
    'Version Control':
      'Git is how history, collaboration, and rollbacks work. Small commits and clear messages pay off during incidents.',
    'Environment Variables':
      'Secrets and config belong outside source code. Env vars are how you deploy the same build to staging and production safely.',
  },
  'react-core': {
    'Basics: JSX, Components, Props, State':
      'React’s model is UI as a function of data. Components, props, and state are the minimum vocabulary for every feature you will build.',
    'Rendering: Conditional Rendering, Lists & Keys':
      'Conditional UI and stable keys keep trees efficient and predictable. Keys are not optional sugar—they prevent subtle state bugs.',
    'Events: Forms, onClick, onChange':
      'React wraps the DOM event system. Patterns here underpin controlled inputs, accessibility, and form libraries.',
  },
  'react-intermediate': {
    'Hooks: useEffect':
      'Effects synchronize React with the outside world—network, subscriptions, timers. Misused effects cause stale data and memory leaks.',
    'State Management':
      'Lifting state, colocation, and when to introduce global stores decide how hard your app is to change later.',
    Forms:
      'Real apps validate, submit, and recover from errors. Hooking forms to state cleanly avoids unmaintainable giant components.',
    useRef:
      'Refs hold mutable values and DOM nodes without re-rendering. They are essential for focus management and integrating non-React code.',
    useContext:
      'Context avoids prop drilling for cross-cutting data. Overusing it obscures data flow—balance is key.',
  },
  'react-advanced': {
    'Advanced Hooks':
      'useReducer, custom hooks, and composition patterns help you scale logic without god components.',
    'Global State: Redux':
      'Predictable global state shines in large apps with many writers. Understanding actions and reducers clarifies any similar library.',
    'useMemo vs useCallback':
      'Memoization trades memory for fewer recalculations. It is a performance tool, not a default—measure before sprinkling it everywhere.',
    'React Strict Mode':
      'Strict mode surfaces unsafe lifecycles and double-invokes in dev to mimic resilient production behavior.',
    'Re-rendering Concept':
      'Knowing what triggers renders helps you optimize intentionally instead of randomly wrapping things in memo.',
    'Key Prop Importance':
      'Keys identify siblings. Wrong keys destroy internal state and cause janky list updates.',
    'Performance: Code Splitting':
      'Lazy routes and dynamic imports keep initial bundles small so users reach interactive UI faster.',
    'Error Handling':
      'Error boundaries and fallbacks keep failures localized so one widget does not white-screen the app.',
  },
  routing: {
    'React Router: Routes, Navigate, useParams':
      'Declarative routing maps URLs to UI. Params and navigation hooks are how SPAs stay shareable and bookmarkable.',
    'Protected Routes':
      'Auth-gated routes keep private screens off limits without duplicating checks in every component.',
    'Nested Routes':
      'Layouts and child routes mirror UI hierarchy and reduce prop drilling for outlet content.',
    'Dynamic Routes':
      'Segments like :id connect URLs to data fetching and deep links for detail pages.',
    '404 Page Handling':
      'Unknown URLs should degrade gracefully. A dedicated not-found route improves UX and analytics.',
  },
  'api-handling': {
    'API Integration':
      'Fetching is half the job; shaping data for UI is the other. Clean integration layers isolate components from endpoint churn.',
    'Handling States: Loading, Error':
      'Users need feedback for in-flight and failed requests. Explicit states prevent infinite spinners and silent failures.',
    'Headers: Bearer Token':
      'Authorization headers are how authenticated APIs know who is calling. Getting them right is security-critical.',
    Pagination:
      'Large lists cannot load at once. Pagination patterns affect UX, caching, and server load.',
    Debouncing:
      'Search and typeahead flood servers without debouncing. It is a small pattern with large backend impact.',
    'Retry Logic':
      'Transient failures are normal on mobile networks. Retries with backoff improve perceived reliability.',
    'API Status Handling':
      '401, 403, and 429 mean different things to users. Mapping status codes to actions avoids wrong logout or error messages.',
  },
  authentication: {
    'Login / Register':
      'These flows are many users’ first impression. Clear validation and error copy reduce abandonment.',
    'Token Storage':
      'Where tokens live affects XSS risk and session persistence. It is a security tradeoff, not a style choice.',
    Security:
      'Auth touches passwords, sessions, and CSRF defenses. Weak patterns become breaches.',
    'Protected Routes':
      'Client-side guards improve UX; server-side checks enforce security. You need both mental models.',
    Logout:
      'Sessions must end cleanly—clear tokens, caches, and sensitive client state.',
    'Token Expiry Handling':
      'Silent refresh or re-login paths keep users working without surprise lockouts.',
    'Refresh Token Basics':
      'Short-lived access tokens plus refresh tokens balance security and convenience.',
    'Role-based Access':
      'Hiding UI is not enough; APIs must enforce roles. Frontend checks are hints, not guarantees.',
  },
  'forms-validation': {
    'Controlled vs Uncontrolled':
      'Choosing who owns input state—React or the DOM—affects validation timing and library compatibility.',
    'React Hook Form':
      'RHF minimizes re-renders for large forms. It is a practical default in modern React codebases.',
    'Zod Validation':
      'Schema validation shares rules between client and server, reducing mismatch bugs.',
    'Error Messages':
      'Good errors tell users how to fix input. They are product copy, not afterthoughts.',
    'Disabled Button':
      'Disabling submit during async work prevents double submissions—a common source of duplicate records.',
    'Loading State':
      'Submitting forms should show progress so users do not hammer the button.',
    'Real-time Validation':
      'Inline feedback speeds correction but can feel noisy if overused.',
    'Field-level Validation':
      'Per-field rules map well to accessible error regions and screen reader announcements.',
    'Password Strength Check':
      'Guidance, not just rules, helps users pick memorable strong passwords.',
  },
  'ui-design': {
    'Tailwind CSS':
      'Utility classes speed iteration; design tokens and components bring consistency at scale.',
    'Component Libraries: shadcn/ui':
      'Copy-in components give ownership and theming control versus opaque black-box widgets.',
    'Reusable Components':
      'Shared primitives reduce drift and make redesigns cheaper.',
    'Consistent UI':
      'Spacing, type scale, and color systems make apps feel intentional instead of accidental.',
    'Responsive Layouts':
      'Designing for breakpoints and touch targets keeps products usable on phones and desktops.',
    'Loading UI':
      'Skeletons and spinners set expectations during waits; missing them feels broken.',
    'Empty State UI':
      'Empty views teach next steps and drive activation instead of looking like errors.',
    'Error State UI':
      'Recoverable errors need actions—retry, contact support—not dead ends.',
  },
  'performance-optimization': {
    'Lazy Loading':
      'Deferring routes and heavy components improves time-to-interactive, especially on slow networks.',
    Memoization:
      'Caching expensive work avoids wasted CPU—but measure first to avoid complexity tax.',
    'Avoid Unnecessary Re-renders':
      'Stable props and sensible state colocation often beat premature optimization.',
    'Image Optimization':
      'Right sizing, modern formats, and lazy loading dominate LCP improvements.',
    'React DevTools':
      'Profiler and component tree inspection turn performance work from guesswork into data.',
    'Lighthouse Basics':
      'Lighthouse summarizes accessibility, performance, and SEO—useful for baselines and regressions.',
    'Bundle Size Optimization':
      'Smaller JS loads faster; tree-shaking and analyzing bundles find dead weight.',
  },
}

export function getTopicWhyMatters(
  moduleSlug: string,
  topicLabel: string,
): string | undefined {
  return TOPIC_WHY[moduleSlug]?.[topicLabel]
}
