import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import type { Module } from '../data/modules'
import { MetricCard } from '../components/MetricCard'
import { ModuleCard } from '../components/ModuleCard'
import { Shell } from '../layout/Shell'
import { normalizeSearchQuery, textMatchesQuery } from '../lib/searchNormalize'

export function DashboardPage({
  modules,
  searchQuery,
  onSearch,
}: {
  modules: Module[]
  searchQuery: string
  onSearch: (query: string) => void
}) {
  const filteredModules = useMemo(() => {
    const q = normalizeSearchQuery(searchQuery)
    if (!q) return modules
    return modules.filter((mod) => {
      if (
        textMatchesQuery(mod.title, q) ||
        textMatchesQuery(mod.subtitle, q) ||
        textMatchesQuery(mod.summary, q) ||
        textMatchesQuery(mod.slug, q)
      ) {
        return true
      }
      return mod.topics.some((topic) => textMatchesQuery(topic.label, q))
    })
  }, [modules, searchQuery])

  const totalTopics = modules.reduce((sum, module) => sum + module.topics.length, 0)
  const completedTopics = modules.reduce(
    (sum, module) => sum + module.topics.filter((topic) => topic.done).length,
    0,
  )
  const overallProgress = Math.round((completedTopics / totalTopics) * 100)
  const strongestModules = modules.filter((module) =>
    module.topics.every((topic) => topic.done),
  )
  const focusModules = modules
    .map((module) => ({
      ...module,
      remaining: module.topics.filter((topic) => !topic.done).length,
    }))
    .filter((module) => module.remaining > 0)
    .sort((a, b) => a.remaining - b.remaining)
    .slice(0, 4)

  return (
    <Shell
      searchQuery={searchQuery}
      onSearch={onSearch}
      modules={modules}
    >
      <section className="overflow-hidden rounded-[2rem] border border-stone-200/70 bg-white/75 shadow-[0_20px_80px_rgba(87,57,24,0.10)] backdrop-blur">
        <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.3fr_0.7fr] lg:px-10 lg:py-10">
          <div className="space-y-5">
            <div className="inline-flex items-center rounded-full border border-amber-300/70 bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-amber-900">
              Frontend Journey Dashboard
            </div>
            <div className="space-y-3">
              <h1 className="max-w-3xl text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">
                Explore the roadmap one module at a time.
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
                Each module now opens into its own details page, so you can move
                from a big-picture roadmap into focused study without losing
                momentum.
              </p>
              <p className="pt-1">
                <Link
                  to="/projects"
                  className="inline-flex items-center rounded-full border border-amber-400/80 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-950 transition hover:bg-amber-100"
                >
                  Browse all practice projects — search by module, level, duration
                </Link>
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <MetricCard label="Completion" value={`${overallProgress}%`} dark />
              <MetricCard label="Topics Done" value={`${completedTopics}`} />
              <MetricCard
                label="Topics Left"
                value={`${totalTopics - completedTopics}`}
              />
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
                  style={{ width: `${overallProgress}%` }}
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
                {strongestModules.length} modules fully completed
              </h2>
              <p className="mt-3 text-sm leading-7 text-stone-300">
                The next wins are clear. Tap into module details to see every
                completed topic, every pending topic, and a focused next step.
              </p>
            </div>

            <div className="grid gap-2">
              {focusModules.map((module) => (
                <Link
                  key={module.id}
                  to={`/modules/${module.slug}`}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
                >
                  <div>
                    <p className="text-sm font-semibold">{module.title}</p>
                    <p className="text-xs text-stone-400">{module.subtitle}</p>
                  </div>
                  <div className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-stone-950">
                    {module.remaining} left
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        {normalizeSearchQuery(searchQuery) ? (
          <p className="text-sm font-medium text-stone-600">
            {filteredModules.length} of {modules.length} modules
          </p>
        ) : null}
        {filteredModules.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-4 py-8 text-center text-sm text-stone-600">
            No modules match “{searchQuery.trim()}”. Try a shorter or different keyword.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredModules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        )}
      </section>
    </Shell>
  )
}
