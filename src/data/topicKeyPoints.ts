/**
 * One-line “at a glance” items per roadmap topic. Keys must match `modules.ts` labels.
 */
export type TopicKeyPoint = {
  name: string
  description: string
}

const TOPIC_KEY_POINTS: Record<string, Record<string, TopicKeyPoint[]>> = {
  html: {
    'Basic Structure': [
      { name: '<!DOCTYPE html>', description: 'Declares an HTML5 document.' },
      { name: '<html>', description: 'Root element; `lang` helps accessibility and SEO.' },
      { name: '<head>', description: 'Metadata, title, links to CSS, not visible body content.' },
      { name: '<body>', description: 'All visible page content.' },
      { name: '<title>', description: 'Shown in the tab; used in bookmarks and search results.' },
      { name: 'charset meta', description: 'Sets text encoding so characters render correctly.' },
    ],
    'Text & Formatting Tags': [
      { name: '<p>', description: 'Paragraph block for body text.' },
      { name: '<br>', description: 'Forced line break; avoid for layout—use CSS.' },
      { name: '<strong>', description: 'Strong importance (semantic emphasis, often bold).' },
      { name: '<em>', description: 'Emphasis (semantic, often italic).' },
      { name: '<h1>–<h6>', description: 'Headings; order implies document outline.' },
      { name: '<span>', description: 'Generic inline container for styling or scripts.' },
      { name: '<pre> / <code>', description: 'Preserves whitespace or marks code fragments.' },
    ],
    'Links & Navigation': [
      { name: '<a href>', description: 'Hyperlink to another URL, hash, or path.' },
      { name: 'target', description: 'Where to open the link (e.g. `_blank` for new tab).' },
      { name: 'rel', description: 'Relationship hint; `noopener noreferrer` with `target=_blank`.' },
      { name: '<nav>', description: 'Landmark for major navigation blocks.' },
    ],
    'Images & Media': [
      { name: '<img src alt>', description: 'Embeds an image; `alt` describes non-decorative images.' },
      { name: 'width / height', description: 'Reserved space to reduce layout shift (CLS).' },
      { name: '<picture> / <source>', description: 'Responsive images and format/art-direction choices.' },
      { name: '<video> / <audio>', description: 'Embeds media with playback controls and sources.' },
    ],
    Lists: [
      { name: '<ul>', description: 'Unordered list.' },
      { name: '<ol>', description: 'Ordered list with numbering.' },
      { name: '<li>', description: 'Single item inside a list.' },
      { name: '<dl> / <dt> / <dd>', description: 'Description list: term and definition pairs.' },
    ],
    Tables: [
      { name: '<table>', description: 'Container for tabular data.' },
      { name: '<thead>', description: 'Header section of rows (often column titles).' },
      { name: '<tbody>', description: 'Main data rows of the table.' },
      { name: '<tr>', description: 'One horizontal row.' },
      { name: '<th>', description: 'Header cell, typically scoped to row or column.' },
      { name: '<td>', description: 'Standard data cell.' },
      { name: 'colspan / rowspan', description: 'Merge cells across columns or rows.' },
      { name: '<caption>', description: 'Visible table title for context and accessibility.' },
    ],
    Forms: [
      { name: '<form>', description: 'Groups controls; `action` and `method` define submission.' },
      { name: '<input>', description: 'Single-line fields, checkboxes, radios, files, etc.' },
      { name: '<label>', description: 'Clickable caption; use `for` matching input `id`.' },
      { name: '<textarea>', description: 'Multi-line text input.' },
      { name: '<select> / <option>', description: 'Dropdown or list box choices.' },
      { name: '<button>', description: 'Submit or custom actions; `type` avoids accidental submit.' },
    ],
    'Semantic HTML': [
      { name: '<header> / <footer>', description: 'Introductory or closing content for page or section.' },
      { name: '<main>', description: 'Primary page content (one per document).' },
      { name: '<article>', description: 'Self-contained piece (post, card, comment).' },
      { name: '<section>', description: 'Thematic grouping, usually with a heading.' },
      { name: '<aside>', description: 'Tangential content (sidebars, related links).' },
    ],
    Attributes: [
      { name: 'id', description: 'Unique identifier for linking, scripting, or labels.' },
      { name: 'class', description: 'Space-separated tokens for CSS and JS hooks.' },
      { name: 'data-*', description: 'Custom attributes for scripts without invalid names.' },
      { name: 'style', description: 'Inline CSS; prefer stylesheets for maintainability.' },
      { name: 'hidden', description: 'Hides element from display and accessibility tree.' },
    ],
    'Accessibility Basics': [
      { name: 'Semantic elements', description: 'Prefer native roles (button, nav) over generic divs.' },
      { name: 'Keyboard focus', description: 'Interactive controls must be focusable and visible.' },
      { name: 'ARIA', description: 'Augments semantics when HTML alone is insufficient.' },
      { name: 'Alt text', description: 'Describes images; empty alt for decorative images.' },
    ],
    'Meta Tags & SEO Basics': [
      { name: '<title>', description: 'Primary signal for tab title and search snippets.' },
      { name: 'meta description', description: 'Suggested snippet text in search results.' },
      { name: 'Open Graph / Twitter cards', description: 'Control previews when links are shared.' },
      { name: 'viewport meta', description: 'Mobile scaling and initial viewport width.' },
      { name: 'robots meta', description: 'Hints for crawling and indexing behavior.' },
    ],
    'Inline vs Block Elements': [
      { name: 'Block', description: 'Breaks to new line; accepts width/height and vertical margin.' },
      { name: 'Inline', description: 'Flows in a line; limited box model styling.' },
      { name: 'inline-block', description: 'Inline outer, block inner—common for pills and icons.' },
    ],
    'Relative vs Absolute Paths': [
      { name: 'Relative (`./`, `../`)', description: 'Resolved from the current document URL path.' },
      { name: 'Root-relative (`/…`)', description: 'From the site origin path root.' },
      { name: 'Absolute URL', description: 'Full scheme + host + path; required for external assets.' },
    ],
    'Form Attributes in Depth': [
      { name: 'autocomplete', description: 'Hints browsers for secure, correct autofill.' },
      { name: 'pattern', description: 'Regex checked on submit for text inputs.' },
      { name: 'inputmode', description: 'Suggests mobile keyboard layout.' },
      { name: 'required', description: 'Blocks submit until the field is non-empty.' },
      { name: 'min / max / step', description: 'Constraints for numbers and date-like inputs.' },
    ],
    'Favicon and App Icons': [
      { name: 'link rel="icon"', description: 'Default favicon shown in browser chrome.' },
      { name: 'apple-touch-icon', description: 'Icon when saving to iOS home screen.' },
      { name: 'Web app manifest', description: 'PWA name, icons, theme color, display mode.' },
    ],
  },
  css: {
    'CSS Basics': [
      { name: 'Selectors', description: 'Target elements by type, class, id, attribute, or context.' },
      { name: 'Cascade', description: 'Combines origin, importance, specificity, and order.' },
      { name: 'Specificity', description: 'Which rule wins when selectors overlap.' },
      { name: 'Inheritance', description: 'Some properties flow to descendants; others do not.' },
      { name: 'Units', description: 'px, rem, em, %, vw/vh—each scales differently.' },
    ],
    'Box Model': [
      { name: 'content', description: 'Inner area holding text or replaced content.' },
      { name: 'padding', description: 'Space inside the border around content.' },
      { name: 'border', description: 'Visible edge around padding.' },
      { name: 'margin', description: 'Space outside the border separating siblings.' },
      { name: 'box-sizing', description: '`border-box` includes padding/border in width/height.' },
    ],
    Flexbox: [
      { name: 'display: flex', description: 'Turns a container into a flex formatting context.' },
      { name: 'flex-direction', description: 'Main axis: row or column (and reverse variants).' },
      { name: 'justify-content', description: 'Aligns items along the main axis.' },
      { name: 'align-items', description: 'Aligns items along the cross axis.' },
      { name: 'flex-wrap', description: 'Whether items wrap to new lines.' },
      { name: 'gap', description: 'Consistent spacing between flex items.' },
    ],
    Grid: [
      { name: 'display: grid', description: 'Two-dimensional layout for rows and columns.' },
      { name: 'grid-template-columns / rows', description: 'Defines track sizes (fr, minmax, repeat).' },
      { name: 'gap', description: 'Gutters between grid cells.' },
      { name: 'grid-area / template-areas', description: 'Name regions for readable layouts.' },
    ],
    Position: [
      { name: 'static', description: 'Normal document flow (default).' },
      { name: 'relative', description: 'Offsets from normal position without removing from flow.' },
      { name: 'absolute', description: 'Positioned against a positioned ancestor.' },
      { name: 'fixed', description: 'Positioned relative to the viewport.' },
      { name: 'sticky', description: 'Hybrid: in flow until a threshold, then fixed-like.' },
      { name: 'z-index', description: 'Stacking order among positioned/special elements.' },
    ],
    'Responsive Design': [
      { name: '@media', description: 'Apply rules at breakpoints (width, height, features).' },
      { name: 'Fluid layouts', description: 'Percent, fr, and max-width instead of fixed px.' },
      { name: 'Relative typography', description: 'rem/clamp for readable scaling across devices.' },
      { name: 'Mobile-first', description: 'Base styles for small screens, enhance upward.' },
    ],
    'Advanced CSS: Transition, Transform, Animation': [
      { name: 'transition', description: 'Animates property changes over time.' },
      { name: 'transform', description: 'Translate, scale, rotate without reflowing siblings.' },
      { name: '@keyframes', description: 'Named multi-step animation sequences.' },
      { name: 'animation', description: 'Applies keyframes with duration, easing, iteration.' },
    ],
    'Modern CSS: Tailwind, shadcn/ui': [
      { name: 'Utility classes', description: 'Small single-purpose classes composed in markup.' },
      { name: 'Design tokens', description: 'Centralized colors, spacing, and radii in config.' },
      { name: 'shadcn/ui', description: 'Copy-paste components built on Radix + Tailwind.' },
    ],
    'Display Types': [
      { name: 'block / inline / inline-block', description: 'How element participates in flow.' },
      { name: 'flex / grid', description: 'Layout modes for 1D or 2D alignment.' },
      { name: 'none', description: 'Removes box from layout and accessibility (use carefully).' },
    ],
    Overflow: [
      { name: 'visible / hidden', description: 'Show overflow or clip it.' },
      { name: 'scroll / auto', description: 'Always or only-when-needed scrollbars.' },
      { name: 'text-overflow: ellipsis', description: 'Truncates single-line overflow with …' },
    ],
    'Object Fit': [
      { name: 'fill', description: 'Stretches to box, may distort aspect ratio.' },
      { name: 'contain', description: 'Fits entire media inside the box with letterboxing.' },
      { name: 'cover', description: 'Fills box while cropping excess.' },
    ],
    'Pseudo Classes': [
      { name: ':hover / :focus', description: 'Styles for pointer hover and keyboard focus.' },
      { name: ':focus-visible', description: 'Focus ring only for keyboard-style focus.' },
      { name: ':nth-child()', description: 'Selects by index pattern in a parent.' },
      { name: ':disabled', description: 'Targets non-interactive form controls.' },
    ],
    'Pseudo Elements': [
      { name: '::before / ::after', description: 'Generated content boxes on the element.' },
      { name: '::placeholder', description: 'Styles empty input hint text.' },
    ],
  },
  javascript: {
    'Basics: Variables, Data Types, Operators': [
      { name: 'let / const', description: 'Block-scoped bindings; prefer const by default.' },
      { name: 'Primitives', description: 'string, number, boolean, null, undefined, bigint, symbol.' },
      { name: 'typeof', description: 'Rough type inspection (with quirks for null/array).' },
      { name: 'Operators', description: 'Arithmetic, comparison, logical, and assignment.' },
    ],
    'Control Flow': [
      { name: 'if / else', description: 'Conditional branching.' },
      { name: 'switch', description: 'Multi-way branch on one value.' },
      { name: 'for / while', description: 'Loops with break and continue.' },
    ],
    Functions: [
      { name: 'Function declaration', description: 'Hoisted name in scope.' },
      { name: 'Arrow functions', description: 'Concise syntax; lexical `this` binding.' },
      { name: 'Parameters / arguments', description: 'Inputs; default params and rest `...args`.' },
      { name: 'Return', description: 'Sends a value back to the caller.' },
    ],
    'Arrays & Objects': [
      { name: 'Array methods', description: 'map, filter, reduce, find, slice, splice, etc.' },
      { name: 'Object literals', description: 'Key-value records; shorthand property syntax.' },
      { name: 'Spread / destructuring', description: 'Copy or pick fields immutably.' },
    ],
    'DOM Manipulation': [
      { name: 'querySelector / querySelectorAll', description: 'Find elements with CSS selectors.' },
      { name: 'textContent / innerHTML', description: 'Plain text vs parsed HTML (XSS risk).' },
      { name: 'classList', description: 'Add, remove, toggle classes safely.' },
      { name: 'addEventListener', description: 'Attach handlers to user or custom events.' },
    ],
    'Async JavaScript': [
      { name: 'Promise', description: 'Represents a future value or failure.' },
      { name: 'async / await', description: 'Linear syntax over promise chains.' },
      { name: 'fetch', description: 'Browser API for HTTP requests returning promises.' },
    ],
    'Advanced Concepts: this, Closures, Hoisting': [
      { name: 'this', description: 'Dynamic binding: depends on call site or class.' },
      { name: 'Closures', description: 'Inner functions retain outer lexical variables.' },
      { name: 'Hoisting', description: 'var and function declarations initialized early in scope.' },
    ],
    'Execution Context': [
      { name: 'Global vs function context', description: 'Variable environment per running function.' },
      { name: 'Lexical environment', description: 'Links to outer scopes for name resolution.' },
    ],
    'Call Stack': [
      { name: 'Stack frames', description: 'Each function call pushes a frame; return pops it.' },
      { name: 'Stack traces', description: 'Error output listing nested call sites.' },
    ],
    'Event Loop': [
      { name: 'Macrotasks', description: 'Tasks like timers and I/O callbacks.' },
      { name: 'Microtasks', description: 'Promise callbacks run before next render.' },
      { name: 'Rendering', description: 'Browser may paint between task turns.' },
    ],
    'setTimeout / setInterval': [
      { name: 'setTimeout', description: 'Runs callback after delay (once).' },
      { name: 'setInterval', description: 'Repeats callback on an interval (watch drift).' },
      { name: 'clearTimeout / clearInterval', description: 'Cancel scheduled callbacks.' },
    ],
    JSON: [
      { name: 'JSON.parse', description: 'String → JavaScript value (throws on invalid).' },
      { name: 'JSON.stringify', description: 'Value → string; handles objects and arrays.' },
    ],
    'Error Handling': [
      { name: 'try / catch / finally', description: 'Catch synchronous throwables.' },
      { name: 'throw', description: 'Signals an error or custom failure.' },
      { name: '.catch on promises', description: 'Handles async rejections.' },
    ],
    'Performance Concepts': [
      { name: 'Reflow / repaint', description: 'Layout and paint work after DOM/style changes.' },
      { name: 'Batch reads/writes', description: 'Avoid interleaving layout reads with writes.' },
      { name: 'requestAnimationFrame', description: 'Sync visual updates with the display refresh.' },
    ],
    'Memory & Copy': [
      { name: 'Reference types', description: 'Objects/arrays share identity when assigned.' },
      { name: 'Shallow vs deep copy', description: 'Nested objects need explicit cloning.' },
    ],
    'Important Comparisons': [
      { name: '=== / !==', description: 'Strict equality without coercion.' },
      { name: '==', description: 'Equality with type coercion (often surprising).' },
      { name: '??', description: 'Nullish coalescing for null/undefined only.' },
    ],
  },
  'browser-web-concepts': {
    'Core Concepts': [
      { name: 'URL', description: 'Scheme, host, path, query, fragment locate a resource.' },
      { name: 'Origin', description: 'Scheme + host + port; basis for same-origin policy.' },
      { name: 'Same-origin policy', description: 'Restricts cross-origin reads of responses.' },
    ],
    Networking: [
      { name: 'DNS', description: 'Resolves hostnames to IP addresses.' },
      { name: 'HTTP request/response', description: 'Method, headers, body, status code.' },
      { name: 'TLS (HTTPS)', description: 'Encrypts transport and authenticates server.' },
    ],
    Storage: [
      { name: 'Memory (heap)', description: 'JavaScript objects; cleared when tab closes.' },
      { name: 'Cookies', description: 'Small key-value strings sent with HTTP requests.' },
      { name: 'Web Storage', description: 'localStorage and sessionStorage in the browser.' },
    ],
    Security: [
      { name: 'XSS', description: 'Injected scripts run in your origin’s context.' },
      { name: 'CSRF', description: 'Forges authenticated requests from another site.' },
      { name: 'CSP', description: 'Content-Security-Policy restricts script and resource loads.' },
    ],
    'Cookies vs LocalStorage vs SessionStorage': [
      { name: 'Cookies', description: 'Server-readable; size limits; SameSite controls CSRF.' },
      { name: 'localStorage', description: 'Persists until cleared; not sent automatically.' },
      { name: 'sessionStorage', description: 'Per-tab session lifetime.' },
    ],
    'HTTP vs HTTPS': [
      { name: 'HTTPS', description: 'TLS wraps HTTP; required for secure cookies and many APIs.' },
      { name: 'Mixed content', description: 'Insecure subresources blocked on HTTPS pages.' },
    ],
    'Browser Rendering Pipeline': [
      { name: 'Parse HTML → DOM', description: 'Builds the document tree.' },
      { name: 'CSS → CSSOM', description: 'Computed style information per node.' },
      { name: 'Layout', description: 'Calculates positions and sizes (reflow).' },
      { name: 'Paint / composite', description: 'Draws pixels and layers for the GPU.' },
    ],
  },
  'tools-workflow': {
    'Development Tools': [
      { name: 'Elements', description: 'Inspect and edit DOM/CSS live.' },
      { name: 'Console', description: 'Logs, errors, and quick JavaScript evaluation.' },
      { name: 'Network', description: 'See requests, timing, headers, and payloads.' },
      { name: 'Debugger / Sources', description: 'Breakpoints and step-through debugging.' },
    ],
    'Package Managers': [
      { name: 'npm / pnpm / yarn', description: 'Install and lock dependency versions.' },
      { name: 'package.json', description: 'Declares dependencies, scripts, and metadata.' },
      { name: 'lockfile', description: 'Pins transitive versions for reproducible installs.' },
    ],
    'Build Tools': [
      { name: 'Bundler (e.g. Vite, webpack)', description: 'Combines modules for the browser.' },
      { name: 'Transpiler (e.g. Babel, TS)', description: 'Downlevels syntax for target environments.' },
      { name: 'Dev server', description: 'Fast reload and HMR during development.' },
    ],
    'Version Control': [
      { name: 'Git commit', description: 'Snapshot of staged changes with a message.' },
      { name: 'Branch', description: 'Parallel line of development; merge or rebase to integrate.' },
      { name: 'Remote', description: 'Push/pull to share history (e.g. GitHub).' },
    ],
    'Environment Variables': [
      { name: '.env files', description: 'Local overrides not committed to the repo.' },
      { name: 'import.meta.env / process.env', description: 'Runtime access in bundled apps.' },
      { name: 'Secrets', description: 'Never expose private keys in client-side bundles.' },
    ],
  },
  'react-core': {
    'Basics: JSX, Components, Props, State': [
      { name: 'JSX', description: 'Syntax sugar for React.createElement trees.' },
      { name: 'Function components', description: 'Pure functions returning UI from props/state.' },
      { name: 'Props', description: 'Read-only inputs from parent to child.' },
      { name: 'useState', description: 'Hook for local component state and re-renders.' },
    ],
    'Rendering: Conditional Rendering, Lists & Keys': [
      { name: '&& / ternary', description: 'Show or hide subtrees based on conditions.' },
      { name: '.map()', description: 'Render lists from array data.' },
      { name: 'key prop', description: 'Stable identity for list items across updates.' },
    ],
    'Events: Forms, onClick, onChange': [
      { name: 'SyntheticEvent', description: 'React’s wrapped DOM events with pooling quirks gone in 17+.' },
      { name: 'onChange', description: 'Fires on controlled input updates.' },
      { name: 'Controlled inputs', description: 'Value driven by React state for single source of truth.' },
    ],
  },
  'react-intermediate': {
    'Hooks: useEffect': [
      { name: 'useEffect(fn)', description: 'Runs after paint; place side effects here.' },
      { name: 'Dependency array', description: 'Controls when the effect re-runs.' },
      { name: 'Cleanup function', description: 'Return unsubscribes or aborts on unmount/re-run.' },
    ],
    'State Management': [
      { name: 'Lifting state up', description: 'Shared state lives in closest common ancestor.' },
      { name: 'Colocation', description: 'Keep state as low as possible to limit re-renders.' },
      { name: 'Global store', description: 'Context, Zustand, Redux for cross-tree data.' },
    ],
    Forms: [
      { name: 'Controlled fields', description: 'state + onChange for each input.' },
      { name: 'Form submit handler', description: 'preventDefault; validate then POST.' },
      { name: 'Libraries (RHF)', description: 'Less boilerplate and better performance at scale.' },
    ],
    useRef: [
      { name: 'useRef(initial)', description: 'Mutable box whose changes don’t re-render.' },
      { name: 'DOM ref', description: 'Attach to elements for focus or measurements.' },
    ],
    useContext: [
      { name: 'createContext', description: 'Defines a typed slot for tree-wide values.' },
      { name: 'Provider', description: 'Supplies value to descendants.' },
      { name: 'useContext', description: 'Reads nearest provider value; re-renders on change.' },
    ],
  },
  'react-advanced': {
    'Advanced Hooks': [
      { name: 'useReducer', description: 'State transitions via actions—good for complex local state.' },
      { name: 'useLayoutEffect', description: 'Fires synchronously after DOM mutations before paint.' },
      { name: 'Custom hooks', description: 'Reuse stateful logic across components.' },
    ],
    'Global State: Redux': [
      { name: 'Store', description: 'Single immutable state tree.' },
      { name: 'Actions', description: 'Plain objects describing what happened.' },
      { name: 'Reducers', description: 'Pure functions (state, action) → new state.' },
    ],
    'useMemo vs useCallback': [
      { name: 'useMemo', description: 'Caches a computed value across renders.' },
      { name: 'useCallback', description: 'Caches a function identity for stable child props.' },
    ],
    'React Strict Mode': [
      { name: 'Double render (dev)', description: 'Surfaces impure render side effects.' },
      { name: 'Deprecated API warnings', description: 'Flags unsafe legacy patterns early.' },
    ],
    'Re-rendering Concept': [
      { name: 'setState / dispatch', description: 'Schedules a re-render for that component subtree.' },
      { name: 'Memo', description: 'Skips render when props are shallow-equal (when used correctly).' },
    ],
    'Key Prop Importance': [
      { name: 'Sibling identity', description: 'React matches old vs new nodes by key.' },
      { name: 'Anti-pattern: array index as key', description: 'Breaks when list order or length changes.' },
    ],
    'Performance: Code Splitting': [
      { name: 'React.lazy', description: 'Defers loading a component module.' },
      { name: 'Suspense', description: 'Fallback UI while lazy chunks load.' },
    ],
    'Error Handling': [
      { name: 'Error boundary', description: 'Class component or library catching child render errors.' },
      { name: 'fallback UI', description: 'Replace failed subtree with recovery message.' },
    ],
  },
  routing: {
    'React Router: Routes, Navigate, useParams': [
      { name: '<Routes> / <Route>', description: 'Declarative path-to-element mapping.' },
      { name: '<Navigate>', description: 'Redirect programmatically or declaratively.' },
      { name: 'useParams', description: 'Reads dynamic URL segments like :id.' },
    ],
    'Protected Routes': [
      { name: 'Wrapper route', description: 'Checks auth; renders children or redirect.' },
      { name: 'Outlet', description: 'Renders nested route content inside a layout.' },
    ],
    'Nested Routes': [
      { name: 'Parent layout', description: 'Shared chrome with child paths under it.' },
      { name: 'Relative paths', description: 'Child routes append to parent path segments.' },
    ],
    'Dynamic Routes': [
      { name: ':param', description: 'Captures URL segment into route params.' },
      { name: 'useNavigate', description: 'Imperative navigation after actions.' },
    ],
    '404 Page Handling': [
      { name: 'Catch-all route', description: '`*` or pathless route for unknown URLs.' },
      { name: 'status awareness', description: 'SSR may set HTTP 404 for SEO.' },
    ],
  },
  'api-handling': {
    'API Integration': [
      { name: 'fetch / client', description: 'HTTP layer separate from UI components.' },
      { name: 'Base URL + paths', description: 'Centralize environment-specific endpoints.' },
    ],
    'Handling States: Loading, Error': [
      { name: 'loading flag', description: 'Show spinners or skeletons during requests.' },
      { name: 'error object', description: 'Surface user-friendly messages from failures.' },
    ],
    'Headers: Bearer Token': [
      { name: 'Authorization header', description: '`Bearer <token>` for many REST APIs.' },
      { name: 'CORS', description: 'Browser enforces cross-origin rules on responses.' },
    ],
    Pagination: [
      { name: 'offset / limit', description: 'Classic page slices; simple but can drift if data shifts.' },
      { name: 'cursor', description: 'Stable paging token for live-changing feeds.' },
    ],
    Debouncing: [
      { name: 'Debounce', description: 'Waits for pause before firing (search inputs).' },
      { name: 'Throttle', description: 'Limits max rate of calls (scroll handlers).' },
    ],
    'Retry Logic': [
      { name: 'Exponential backoff', description: 'Increases delay between retries.' },
      { name: 'Idempotency', description: 'Safe retries for GET; careful for POST.' },
    ],
    'API Status Handling': [
      { name: '401', description: 'Unauthorized—often refresh token or re-login.' },
      { name: '403', description: 'Forbidden—authenticated but not allowed.' },
      { name: '429', description: 'Rate limited—back off and inform user.' },
    ],
  },
  authentication: {
    'Login / Register': [
      { name: 'Credential submission', description: 'POST to auth endpoint; validate client-side lightly.' },
      { name: 'Session vs token', description: 'Cookie session or JWT/access token patterns.' },
    ],
    'Token Storage': [
      { name: 'memory', description: 'Cleared on refresh; lowest XSS persistence.' },
      { name: 'httpOnly cookie', description: 'Not readable by JS; mitigates some XSS token theft.' },
      { name: 'localStorage', description: 'Convenient but fully exposed to XSS on the origin.' },
    ],
    Security: [
      { name: 'HTTPS only', description: 'Prevents credential and token sniffing.' },
      { name: 'CSRF tokens', description: 'For cookie-based sessions on mutating requests.' },
    ],
    'Protected Routes': [
      { name: 'Client guard', description: 'Hide UI and redirect unauthenticated users.' },
      { name: 'Server authorization', description: 'API must verify every protected action.' },
    ],
    Logout: [
      { name: 'Clear tokens', description: 'Remove from storage and in-memory auth state.' },
      { name: 'Invalidate server session', description: 'Optional server-side revoke.' },
    ],
    'Token Expiry Handling': [
      { name: 'Short-lived access', description: 'Limits window if token leaks.' },
      { name: 'Silent refresh UX', description: 'Refresh or prompt before hard logout.' },
    ],
    'Refresh Token Basics': [
      { name: 'Refresh token', description: 'Obtains new access token without re-password.' },
      { name: 'Rotation', description: 'Issue new refresh on use to detect replay.' },
    ],
    'Role-based Access': [
      { name: 'roles / claims', description: 'Encode permissions in token or user profile.' },
      { name: 'UI gating', description: 'Hide actions user cannot perform (UX only).' },
    ],
  },
  'forms-validation': {
    'Controlled vs Uncontrolled': [
      { name: 'Controlled', description: 'React owns value via state—easy validation and transforms.' },
      { name: 'Uncontrolled', description: 'DOM holds value; ref to read on submit.' },
    ],
    'React Hook Form': [
      { name: 'register()', description: 'Binds inputs with minimal re-renders.' },
      { name: 'handleSubmit', description: 'Validates then runs your onValid callback.' },
    ],
    'Zod Validation': [
      { name: 'schema.parse', description: 'Throws or returns typed data.' },
      { name: 'safeParse', description: 'Returns success flag instead of throw.' },
    ],
    'Error Messages': [
      { name: 'field-level errors', description: 'Map schema paths to inline helper text.' },
      { name: 'aria-invalid / describedby', description: 'Screen reader linkage for errors.' },
    ],
    'Disabled Button': [
      { name: 'isSubmitting', description: 'Disable while async submit in flight.' },
      { name: 'isValid', description: 'Optional gate until schema passes.' },
    ],
    'Loading State': [
      { name: 'Pending UI', description: 'Spinner or text on the submit control.' },
    ],
    'Real-time Validation': [
      { name: 'onBlur / onChange', description: 'Validate as user moves or types.' },
      { name: 'Debounce', description: 'Reduce validation churn on fast typing.' },
    ],
    'Field-level Validation': [
      { name: 'Per-field schema', description: 'Compose object from smaller zods.' },
      { name: 'setError', description: 'Manual server errors mapped to fields.' },
    ],
    'Password Strength Check': [
      { name: 'Entropy rules', description: 'Length and character-class requirements.' },
      { name: 'Feedback meter', description: 'Visual hint without blocking weak passwords prematurely.' },
    ],
  },
  'ui-design': {
    'Tailwind CSS': [
      { name: 'Utilities', description: 'Atomic classes for rapid layout and spacing.' },
      { name: '@apply', description: 'Extract repeated utility bundles (use sparingly).' },
    ],
    'Component Libraries: shadcn/ui': [
      { name: 'Radix primitives', description: 'Accessible unstyled behavior layers.' },
      { name: 'Copy source', description: 'You own and theme the component code.' },
    ],
    'Reusable Components': [
      { name: 'API design', description: 'Clear props for variants and composition slots.' },
      { name: 'Single responsibility', description: 'Split large UI into testable pieces.' },
    ],
    'Consistent UI': [
      { name: 'Spacing scale', description: 'Repeat rhythm (4/8px systems).' },
      { name: 'Typography scale', description: 'Limited font sizes and weights.' },
    ],
    'Responsive Layouts': [
      { name: 'Breakpoints', description: 'Adjust grid/flex at key widths.' },
      { name: 'Touch targets', description: 'Minimum hit area for mobile taps.' },
    ],
    'Loading UI': [
      { name: 'Skeleton', description: 'Placeholder shape matching final content.' },
      { name: 'Spinner', description: 'Indeterminate wait for short operations.' },
    ],
    'Empty State UI': [
      { name: 'Illustration + CTA', description: 'Explain why empty and next step.' },
    ],
    'Error State UI': [
      { name: 'Retry action', description: 'Let users recover without full reload.' },
      { name: 'Human copy', description: 'Avoid raw error codes in user-facing text.' },
    ],
  },
  'performance-optimization': {
    'Lazy Loading': [
      { name: 'Route-based split', description: 'Load page code on navigation.' },
      { name: 'Below-fold media', description: 'loading="lazy" for images iframes.' },
    ],
    Memoization: [
      { name: 'useMemo / useCallback', description: 'Stabilize values passed to optimized children.' },
      { name: 'React.memo', description: 'Skips re-render if props shallow-equal.' },
    ],
    'Avoid Unnecessary Re-renders': [
      { name: 'State colocation', description: 'State near leaves reduces subtree updates.' },
      { name: 'Stable callbacks', description: 'Avoid inline functions in hot list items when costly.' },
    ],
    'Image Optimization': [
      { name: 'srcset / sizes', description: 'Serve appropriate resolution per viewport.' },
      { name: 'Modern formats', description: 'WebP/AVIF with fallbacks.' },
    ],
    'React DevTools': [
      { name: 'Profiler', description: 'Record commit times and component render cost.' },
      { name: 'Component tree', description: 'Inspect props and state at runtime.' },
    ],
    'Lighthouse Basics': [
      { name: 'Performance score', description: 'Lab metrics approximating UX.' },
      { name: 'Opportunities', description: 'Actionable audits (unused JS, LCP).' },
    ],
    'Bundle Size Optimization': [
      { name: 'Analyze bundle', description: 'Find heavy dependencies with visualizer tools.' },
      { name: 'Tree-shaking', description: 'ESM + sideEffects false drops dead code.' },
    ],
  },
}

export function getTopicKeyPoints(
  moduleSlug: string,
  topicLabel: string,
): TopicKeyPoint[] | undefined {
  const items = TOPIC_KEY_POINTS[moduleSlug]?.[topicLabel]
  return items && items.length > 0 ? items : undefined
}
