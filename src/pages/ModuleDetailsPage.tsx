import { Link, useParams } from 'react-router-dom'
import type { Module } from '../data/modules'
import { MetricCard } from '../components/MetricCard'
import { NotFoundPage } from '../components/NotFoundPage'
import { TopicsTable } from '../components/TopicsTable'
import { getModuleQuiz } from '../data/moduleQuizzes'
import { ModulePracticeProjectsSection } from '../features/practice-projects/ModulePracticeProjectsSection'
import { Shell } from '../layout/Shell'
import { getPracticeProjectsForModule } from '../data/practiceProjectLookup'
import { getModuleBySlugFromList, getModuleProgress } from '../lib/moduleUtils'

function ModuleDetailsMainContent({
  module,
  onToggleTopic,
  searchQuery,
}: {
  module: Module
  onToggleTopic: (slug: string, topicLabel: string) => void
  searchQuery: string
}) {
  const stats = getModuleProgress(module)
  const pending = module.topics.filter((topic) => !topic.done)
  const practiceProjects = getPracticeProjectsForModule(module.slug)
  const moduleQuiz = getModuleQuiz(module.slug)
  const quizAvailable =
    moduleQuiz != null && moduleQuiz.questions.length > 0
  const quizCount = moduleQuiz?.questions.length ?? 0

  return (
    <>
      <section className="overflow-hidden rounded-[2rem] border border-stone-200/70 bg-white/80 shadow-[0_20px_80px_rgba(87,57,24,0.10)] backdrop-blur">
        <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-10">
          <div className="space-y-5">
            <div className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-amber-900">
              {module.title}
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">
                {module.subtitle}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
                {module.summary}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <MetricCard label="Progress" value={`${stats.percent}%`} dark />
              <MetricCard label="Completed" value={`${stats.completed}`} />
              <MetricCard label="Pending" value={`${stats.remaining}`} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm font-medium text-stone-600">
                <span>Module coverage</span>
                <span>
                  {stats.completed} / {stats.total}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-stone-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-stone-900"
                  style={{ width: `${stats.percent}%` }}
                />
              </div>
            </div>
          </div>

          <aside className="rounded-[1.75rem] bg-stone-950 p-6 text-white">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-400">
              Suggested next focus
            </p>
            {pending.length > 0 ? (
              <div className="mt-4 space-y-3">
                {pending.slice(0, 3).map((topic, index) => (
                  <div
                    key={topic.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400">
                      Step {index + 1}
                    </p>
                    <p className="mt-2 text-sm font-semibold">{topic.label}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-7 text-emerald-100">
                This module is fully completed. Great work. You can now revise
                it with practical mini-projects or move to a weaker module.
              </div>
            )}
          </aside>
        </div>
      </section>

      <TopicsTable
        module={module}
        practiceProjects={practiceProjects}
        onToggleTopic={onToggleTopic}
        filterQuery={searchQuery}
      />

      <section className="rounded-[1.75rem] border border-stone-200/80 bg-white/80 p-6 shadow-[0_16px_40px_rgba(87,57,24,0.08)]">
        <h2 className="text-lg font-bold text-stone-950">Practice questions</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
          Optional self-check: multiple choice, not graded. Reveal answers to compare with your
          understanding.
        </p>
        {quizAvailable ? (
          <div className="mt-5">
            <Link
              to={`/modules/${module.slug}/quiz`}
              className="inline-flex items-center justify-center rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
            >
              Open practice questions ({quizCount} questions)
            </Link>
          </div>
        ) : (
          <p className="mt-5 rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-600">
            Practice questions coming soon for this module.
          </p>
        )}
      </section>

      <ModulePracticeProjectsSection
        moduleSlug={module.slug}
        moduleTitle={module.title}
        filterQuery={searchQuery}
      />
    </>
  )
}

export function ModuleDetailsPage({
  modules,
  onToggleTopic,
  searchQuery,
  onSearch,
}: {
  modules: Module[]
  onToggleTopic: (slug: string, topicLabel: string) => void
  searchQuery: string
  onSearch: (query: string) => void
}) {
  const { slug = '' } = useParams()
  const module = getModuleBySlugFromList(modules, slug)

  if (!module) {
    return <NotFoundPage />
  }

  return (
    <Shell searchQuery={searchQuery} onSearch={onSearch} modules={modules}>
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex items-center rounded-full border border-stone-300 bg-white/80 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-amber-400 hover:text-amber-700"
        >
          Back to roadmap
        </Link>
        <div className="rounded-full border border-stone-300 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-stone-500">
          Module {module.id}
        </div>
      </div>

      <ModuleDetailsMainContent
        key={module.slug}
        module={module}
        onToggleTopic={onToggleTopic}
        searchQuery={searchQuery}
      />
    </Shell>
  )
}
