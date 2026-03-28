export type Topic = {
  label: string
  done: boolean
}

export type Module = {
  id: string
  slug: string
  title: string
  subtitle: string
  summary: string
  topics: Topic[]
}

export const modules: Module[] = [
  {
    id: '01',
    slug: 'html',
    title: 'HTML',
    subtitle: 'Markup, semantics, and document structure',
    summary:
      'Build a strong foundation in structure, semantics, forms, and the small details that make pages usable, searchable, and maintainable.',
    topics: [
      { label: 'Basic Structure', done: true },
      { label: 'Text & Formatting Tags', done: true },
      { label: 'Links & Navigation', done: true },
      { label: 'Images & Media', done: true },
      { label: 'Lists', done: true },
      { label: 'Tables', done: true },
      { label: 'Forms', done: true },
      { label: 'Semantic HTML', done: true },
      { label: 'Attributes', done: true },
      { label: 'Accessibility Basics', done: true },
      { label: 'Meta Tags & SEO Basics', done: true },
      { label: 'Inline vs Block Elements', done: true },
      { label: 'Relative vs Absolute Paths', done: false },
      { label: 'Form Attributes in Depth', done: false },
      { label: 'Favicon and App Icons', done: false },
    ],
  },
  {
    id: '02',
    slug: 'css',
    title: 'CSS',
    subtitle: 'Styling, layout systems, and responsive design',
    summary:
      'Move from basic styling into layout systems, responsiveness, and modern UI techniques that make interfaces feel deliberate and polished.',
    topics: [
      { label: 'CSS Basics', done: true },
      { label: 'Box Model', done: true },
      { label: 'Flexbox', done: false },
      { label: 'Grid', done: false },
      { label: 'Position', done: false },
      { label: 'Responsive Design', done: false },
      { label: 'Advanced CSS: Transition, Transform, Animation', done: false },
      { label: 'Modern CSS: Tailwind, shadcn/ui', done: false },
      { label: 'Display Types', done: true },
      { label: 'Overflow', done: true },
      { label: 'Object Fit', done: true },
      { label: 'Pseudo Classes', done: true },
      { label: 'Pseudo Elements', done: true },
    ],
  },
  {
    id: '03',
    slug: 'javascript',
    title: 'JavaScript',
    subtitle: 'Language fundamentals and advanced runtime concepts',
    summary:
      'Strengthen both the practical language skills and the runtime model behind how JavaScript actually executes in the browser.',
    topics: [
      { label: 'Basics: Variables, Data Types, Operators', done: true },
      { label: 'Control Flow', done: true },
      { label: 'Functions', done: true },
      { label: 'Arrays & Objects', done: true },
      { label: 'DOM Manipulation', done: true },
      { label: 'Async JavaScript', done: true },
      { label: 'Advanced Concepts: this, Closures, Hoisting', done: true },
      { label: 'Execution Context', done: false },
      { label: 'Call Stack', done: true },
      { label: 'Event Loop', done: true },
      { label: 'setTimeout / setInterval', done: true },
      { label: 'JSON', done: true },
      { label: 'Error Handling', done: true },
      { label: 'Performance Concepts', done: false },
      { label: 'Memory & Copy', done: false },
      { label: 'Important Comparisons', done: true },
    ],
  },
  {
    id: '04',
    slug: 'browser-web-concepts',
    title: 'Browser & Web Concepts',
    subtitle: 'How the browser and the web actually work',
    summary:
      'Understand the platform below your code, from networking and storage to rendering and the security model of the web.',
    topics: [
      { label: 'Core Concepts', done: true },
      { label: 'Networking', done: true },
      { label: 'Storage', done: true },
      { label: 'Security', done: false },
      { label: 'Cookies vs LocalStorage vs SessionStorage', done: true },
      { label: 'HTTP vs HTTPS', done: true },
      { label: 'Browser Rendering Pipeline', done: true },
    ],
  },
  {
    id: '05',
    slug: 'tools-workflow',
    title: 'Tools & Workflow',
    subtitle: 'Daily developer tooling and project workflow',
    summary:
      'Cover the developer habits and tooling that make projects manageable, debuggable, and production-ready.',
    topics: [
      { label: 'Development Tools', done: true },
      { label: 'Package Managers', done: true },
      { label: 'Build Tools', done: true },
      { label: 'Version Control', done: true },
      { label: 'Environment Variables', done: true },
    ],
  },
  {
    id: '06',
    slug: 'react-core',
    title: 'React Core',
    subtitle: 'Component thinking and state-driven rendering',
    summary:
      'Master the essential React mental model: components, props, state, and predictable UI updates.',
    topics: [
      { label: 'Basics: JSX, Components, Props, State', done: true },
      { label: 'Rendering: Conditional Rendering, Lists & Keys', done: true },
      { label: 'Events: Forms, onClick, onChange', done: true },
    ],
  },
  {
    id: '07',
    slug: 'react-intermediate',
    title: 'React Intermediate',
    subtitle: 'Common hooks and everyday app patterns',
    summary:
      'Level up from the basics into the patterns used in real React apps every day, especially forms, context, and effects.',
    topics: [
      { label: 'Hooks: useEffect', done: true },
      { label: 'State Management', done: true },
      { label: 'Forms', done: true },
      { label: 'useRef', done: true },
      { label: 'useContext', done: true },
    ],
  },
  {
    id: '08',
    slug: 'react-advanced',
    title: 'React Advanced',
    subtitle: 'Optimization, architecture, and deeper React behavior',
    summary:
      'Explore how React behaves under the hood and how to design larger apps with stronger performance and architecture decisions.',
    topics: [
      { label: 'Advanced Hooks', done: true },
      { label: 'Global State: Redux', done: true },
      { label: 'useMemo vs useCallback', done: false },
      { label: 'React Strict Mode', done: true },
      { label: 'Re-rendering Concept', done: true },
      { label: 'Key Prop Importance', done: true },
      { label: 'Performance: Code Splitting', done: true },
      { label: 'Error Handling', done: true },
    ],
  },
  {
    id: '09',
    slug: 'routing',
    title: 'Routing',
    subtitle: 'Client-side navigation and route architecture',
    summary:
      'Learn how to structure navigation, guard access, and handle dynamic paths in single-page applications.',
    topics: [
      { label: 'React Router: Routes, Navigate, useParams', done: true },
      { label: 'Protected Routes', done: false },
      { label: 'Nested Routes', done: true },
      { label: 'Dynamic Routes', done: true },
      { label: '404 Page Handling', done: false },
    ],
  },
  {
    id: '10',
    slug: 'api-handling',
    title: 'API Handling',
    subtitle: 'Fetching, mutation, and resilient request flows',
    summary:
      'Practice request handling patterns that keep the UI clear and stable when data loading gets more complex.',
    topics: [
      { label: 'API Integration', done: true },
      { label: 'Handling States: Loading, Error', done: true },
      { label: 'Headers: Bearer Token', done: true },
      { label: 'Pagination', done: true },
      { label: 'Debouncing', done: true },
      { label: 'Retry Logic', done: false },
      { label: 'API Status Handling', done: true },
    ],
  },
  {
    id: '11',
    slug: 'authentication',
    title: 'Authentication',
    subtitle: 'Auth flows, protection, and session handling',
    summary:
      'This module brings together login flows, protected UX, token management, and the safety basics needed in real apps.',
    topics: [
      { label: 'Login / Register', done: false },
      { label: 'Token Storage', done: false },
      { label: 'Security', done: false },
      { label: 'Protected Routes', done: false },
      { label: 'Logout', done: false },
      { label: 'Token Expiry Handling', done: false },
      { label: 'Refresh Token Basics', done: false },
      { label: 'Role-based Access', done: false },
    ],
  },
  {
    id: '12',
    slug: 'forms-validation',
    title: 'Forms & Validation',
    subtitle: 'Reliable form UX and validation patterns',
    summary:
      'Focus on building forms that feel trustworthy, responsive, and easy to complete, with validation that helps instead of frustrates.',
    topics: [
      { label: 'Controlled vs Uncontrolled', done: true },
      { label: 'React Hook Form', done: true },
      { label: 'Zod Validation', done: true },
      { label: 'Error Messages', done: true },
      { label: 'Disabled Button', done: true },
      { label: 'Loading State', done: true },
      { label: 'Real-time Validation', done: true },
      { label: 'Field-level Validation', done: true },
      { label: 'Password Strength Check', done: true },
    ],
  },
  {
    id: '13',
    slug: 'ui-design',
    title: 'UI & Design',
    subtitle: 'Reusable interfaces and product polish',
    summary:
      'Sharpen the visual layer by combining reusable components, consistent styling systems, and strong UI states across devices.',
    topics: [
      { label: 'Tailwind CSS', done: true },
      { label: 'Component Libraries: shadcn/ui', done: true },
      { label: 'Reusable Components', done: true },
      { label: 'Consistent UI', done: true },
      { label: 'Responsive Layouts', done: false },
      { label: 'Loading UI', done: true },
      { label: 'Empty State UI', done: true },
      { label: 'Error State UI', done: true },
    ],
  },
  {
    id: '14',
    slug: 'performance-optimization',
    title: 'Performance Optimization',
    subtitle: 'Keeping apps lean, responsive, and scalable',
    summary:
      'Finish the roadmap by learning how to keep modern apps fast, efficient, and measurable as they grow.',
    topics: [
      { label: 'Lazy Loading', done: false },
      { label: 'Memoization', done: false },
      { label: 'Avoid Unnecessary Re-renders', done: false },
      { label: 'Image Optimization', done: false },
      { label: 'React DevTools', done: true },
      { label: 'Lighthouse Basics', done: false },
      { label: 'Bundle Size Optimization', done: false },
    ],
  },
]

export function getModuleBySlug(slug: string) {
  return modules.find((module) => module.slug === slug)
}
