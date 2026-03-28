type Topic = {
  label: string
  done: boolean
}

type Section = {
  id: string
  title: string
  subtitle: string
  topics: Topic[]
}

const sections: Section[] = [
  {
    id: '01',
    title: 'HTML',
    subtitle: 'Markup, semantics, and document structure',
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
    ],
  },
  {
    id: '02',
    title: 'CSS',
    subtitle: 'Styling, layout systems, and responsive design',
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
    title: 'JavaScript',
    subtitle: 'Language fundamentals and advanced runtime concepts',
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
    title: 'Browser & Web Concepts',
    subtitle: 'How the browser and the web actually work',
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
    title: 'Tools & Workflow',
    subtitle: 'Daily developer tooling and project workflow',
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
    title: 'React Core',
    subtitle: 'Component thinking and state-driven rendering',
    topics: [
      { label: 'Basics: JSX, Components, Props, State', done: true },
      { label: 'Rendering: Conditional Rendering, Lists & Keys', done: true },
      { label: 'Events: Forms, onClick, onChange', done: true },
    ],
  },
  {
    id: '07',
    title: 'React Intermediate',
    subtitle: 'Common hooks and everyday app patterns',
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
    title: 'React Advanced',
    subtitle: 'Optimization, architecture, and deeper React behavior',
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
    title: 'Routing',
    subtitle: 'Client-side navigation and route architecture',
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
    title: 'API Handling',
    subtitle: 'Fetching, mutation, and resilient request flows',
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
    title: 'Authentication',
    subtitle: 'Auth flows, protection, and session handling',
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
    title: 'Forms & Validation',
    subtitle: 'Reliable form UX and validation patterns',
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
    title: 'UI & Design',
    subtitle: 'Reusable interfaces and product polish',
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
    title: 'Performance Optimization',
    subtitle: 'Keeping apps lean, responsive, and scalable',
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

const totalTopics = sections.reduce((sum, section) => sum + section.topics.length, 0)
const completedTopics = sections.reduce(
  (sum, section) => sum + section.topics.filter((topic) => topic.done).length,
  0,
)
const progress = Math.round((completedTopics / totalTopics) * 100)
const remainingTopics = totalTopics - completedTopics
const strongestSections = sections.filter((section) =>
  section.topics.every((topic) => topic.done),
)
const focusSections = sections
  .map((section) => ({
    ...section,
    remaining: section.topics.filter((topic) => !topic.done).length,
  }))
  .filter((section) => section.remaining > 0)
  .sort((a, b) => a.remaining - b.remaining)
  .slice(0, 4)

function App() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff8ed_0%,_#f6efe5_36%,_#efe7dc_100%)] text-stone-900">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="overflow-hidden rounded-[2rem] border border-stone-200/70 bg-white/75 shadow-[0_20px_80px_rgba(87,57,24,0.10)] backdrop-blur">
          <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.3fr_0.7fr] lg:px-10 lg:py-10">
            <div className="space-y-5">
              <div className="inline-flex items-center rounded-full border border-amber-300/70 bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-amber-900">
                Frontend Journey Dashboard
              </div>
              <div className="space-y-3">
                <h1 className="max-w-3xl text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">
                  Your roadmap is already strong. Now it feels usable.
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
                  This view turns your raw checklist into a progress-focused
                  learning board so you can instantly see what is finished,
                  what is missing, and where to focus next.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-stone-950 px-4 py-4 text-white">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                    Completion
                  </p>
                  <p className="mt-2 text-3xl font-black">{progress}%</p>
                </div>
                <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                    Topics Done
                  </p>
                  <p className="mt-2 text-3xl font-black text-stone-950">
                    {completedTopics}
                  </p>
                </div>
                <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                    Topics Left
                  </p>
                  <p className="mt-2 text-3xl font-black text-stone-950">
                    {remainingTopics}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm font-medium text-stone-600">
                  <span>Overall progress</span>
                  <span>
                    {completedTopics} / {totalTopics}
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-stone-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-stone-900"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-5 rounded-[1.75rem] bg-stone-950 p-6 text-white">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-400">
                  Momentum
                </p>
                <h2 className="mt-3 text-2xl font-bold">
                  {strongestSections.length} sections fully completed
                </h2>
                <p className="mt-3 text-sm leading-7 text-stone-300">
                  You already have a solid base in HTML, React fundamentals,
                  forms, and workflow. The next jump comes from finishing
                  layout, authentication, and performance-heavy topics.
                </p>
              </div>

              <div className="grid gap-2">
                {focusSections.map((section) => (
                  <div
                    key={section.id}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold">{section.title}</p>
                      <p className="text-xs text-stone-400">
                        {section.subtitle}
                      </p>
                    </div>
                    <div className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-stone-950">
                      {section.remaining} left
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sections.map((section) => {
            const doneCount = section.topics.filter((topic) => topic.done).length
            const sectionProgress = Math.round(
              (doneCount / section.topics.length) * 100,
            )

            return (
              <article
                key={section.id}
                className="group rounded-[1.75rem] border border-stone-200/80 bg-white/80 p-5 shadow-[0_16px_40px_rgba(87,57,24,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(87,57,24,0.12)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-700">
                      Module {section.id}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-stone-950">
                      {section.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {section.subtitle}
                    </p>
                  </div>
                  <div className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-sm font-semibold text-stone-700">
                    {sectionProgress}%
                  </div>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-stone-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-600"
                    style={{ width: `${sectionProgress}%` }}
                  />
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {section.topics.map((topic) => (
                    <div
                      key={topic.label}
                      className={[
                        'rounded-full border px-3 py-2 text-xs font-medium transition',
                        topic.done
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                          : 'border-stone-200 bg-stone-50 text-stone-500',
                      ].join(' ')}
                    >
                      <span className="mr-2 inline-block h-2 w-2 rounded-full bg-current align-middle opacity-70" />
                      {topic.label}
                    </div>
                  ))}
                </div>
              </article>
            )
          })}
        </section>
      </div>
    </main>
  )
}

export default App
