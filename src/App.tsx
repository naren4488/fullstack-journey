import { useEffect, useState, type ReactNode } from 'react'
import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { modules as initialModules, type Module } from './data/modules'
import {
  getHtmlProjectBySlug,
  htmlProjects,
  type PracticeProject,
} from './data/htmlProjects'

const STORAGE_KEY = 'journey-modules-progress'

function getModuleBySlugFromList(modules: Module[], slug: string) {
  return modules.find((module) => module.slug === slug)
}

function getModuleProgress(module: Module) {
  const completed = module.topics.filter((topic) => topic.done).length
  const total = module.topics.length

  return {
    completed,
    total,
    remaining: total - completed,
    percent: Math.round((completed / total) * 100),
  }
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff8ed_0%,_#f6efe5_36%,_#efe7dc_100%)] text-stone-900">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {children}
      </div>
    </main>
  )
}

function DashboardPage({ modules }: { modules: Module[] }) {
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
    <Shell>
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

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </section>
    </Shell>
  )
}

function MetricCard({
  label,
  value,
  dark = false,
}: {
  label: string
  value: string
  dark?: boolean
}) {
  return (
    <div
      className={[
        'rounded-2xl px-4 py-4',
        dark
          ? 'bg-stone-950 text-white'
          : 'border border-stone-200 bg-stone-50 text-stone-950',
      ].join(' ')}
    >
      <p
        className={[
          'text-xs uppercase tracking-[0.2em]',
          dark ? 'text-stone-400' : 'text-stone-500',
        ].join(' ')}
      >
        {label}
      </p>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  )
}

function ModuleCard({ module }: { module: Module }) {
  const stats = getModuleProgress(module)

  return (
    <Link
      to={`/modules/${module.slug}`}
      className="group rounded-[1.75rem] border border-stone-200/80 bg-white/80 p-5 shadow-[0_16px_40px_rgba(87,57,24,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(87,57,24,0.12)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-700">
            Module {module.id}
          </p>
          <h3 className="mt-2 text-xl font-bold text-stone-950">
            {module.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            {module.subtitle}
          </p>
        </div>
        <div className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-sm font-semibold text-stone-700">
          {stats.percent}%
        </div>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-stone-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-600"
          style={{ width: `${stats.percent}%` }}
        />
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-stone-500">
        <span>
          {stats.completed} of {stats.total} topics done
        </span>
        <span className="font-semibold text-stone-900 group-hover:text-amber-700">
          Open details
        </span>
      </div>
    </Link>
  )
}

function ModuleDetailsPage({
  modules,
  onToggleTopic,
}: {
  modules: Module[]
  onToggleTopic: (slug: string, topicLabel: string) => void
}) {
  const { slug = '' } = useParams()
  const module = getModuleBySlugFromList(modules, slug)

  if (!module) {
    return <NotFoundPage />
  }

  const stats = getModuleProgress(module)
  const pending = module.topics.filter((topic) => !topic.done)

  return (
    <Shell>
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
        onToggleTopic={onToggleTopic}
      />

      {module.slug === 'html' ? <HtmlPracticeProjects /> : null}
    </Shell>
  )
}

function HtmlPracticeProjects() {
  return (
    <section className="rounded-[1.75rem] border border-stone-200/80 bg-white/80 p-6 shadow-[0_16px_40px_rgba(87,57,24,0.08)]">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-700">
            Practice Projects
          </p>
          <h2 className="mt-2 text-2xl font-bold text-stone-950">
            Try HTML in a real mini project
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600">
            These are guided practice ideas, not built inside this website.
            Each card gives you a quick brief, and the full project page opens
            with setup steps, requirements, learning goals, and visual
            references.
          </p>
        </div>
        <div className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-medium text-stone-600">
          {htmlProjects.length} HTML projects
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        {htmlProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: PracticeProject }) {
  return (
    <Link
      to={`/modules/html/projects/${project.slug}`}
      className="group overflow-hidden rounded-[1.5rem] border border-stone-200 bg-stone-950 text-white transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(87,57,24,0.18)]"
    >
      <div className="relative px-5 py-5">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(245,158,11,0.18),transparent_45%,rgba(255,255,255,0.04))]" />
        <div className="relative">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
              {project.level}
            </span>
            <span className="text-xs font-medium text-stone-400">
              {project.duration}
            </span>
          </div>
          <h3 className="mt-4 text-xl font-bold">{project.title}</h3>
          <p className="mt-2 text-sm leading-6 text-stone-300">
            {project.tagline}
          </p>
          <p className="mt-4 text-sm leading-6 text-stone-400">
            {project.summary}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.learnings.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-stone-200"
              >
                {topic}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between text-sm">
            <span className="text-stone-400">
              {project.requirements.length} requirements
            </span>
            <span className="font-semibold text-amber-300 group-hover:text-amber-200">
              Open project
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function TopicsTable({
  module,
  onToggleTopic,
}: {
  module: Module
  onToggleTopic: (slug: string, topicLabel: string) => void
}) {
  return (
    <section className="rounded-[1.75rem] border border-stone-200/80 bg-white/80 p-6 shadow-[0_16px_40px_rgba(87,57,24,0.08)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-stone-950">Topic Tracker</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Review every topic in a structured list and toggle completion as you
            make progress.
          </p>
        </div>
        <div className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-medium text-stone-600">
          {module.topics.length} total topics
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-stone-200">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-stone-100/90 text-left">
              <tr className="text-xs uppercase tracking-[0.18em] text-stone-500">
                <th className="px-4 py-4 font-semibold">#</th>
                <th className="px-4 py-4 font-semibold">Topic</th>
                <th className="px-4 py-4 font-semibold">Status</th>
                <th className="px-4 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {module.topics.map((topic, index) => (
                <tr
                  key={topic.label}
                  className="border-t border-stone-200 text-sm text-stone-700"
                >
                  <td className="px-4 py-4 align-middle font-semibold text-stone-400">
                    {String(index + 1).padStart(2, '0')}
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <div className="font-semibold text-stone-950">
                      {topic.label}
                    </div>
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <span
                      className={[
                        'inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em]',
                        topic.done
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800',
                      ].join(' ')}
                    >
                      {topic.done ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-4 py-4 align-middle text-right">
                    <button
                      type="button"
                      onClick={() => onToggleTopic(module.slug, topic.label)}
                      className={[
                        'inline-flex min-w-36 items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition',
                        topic.done
                          ? 'bg-stone-950 text-white hover:bg-stone-800'
                          : 'bg-amber-500 text-stone-950 hover:bg-amber-400',
                      ].join(' ')}
                    >
                      {topic.done ? 'Mark Incomplete' : 'Mark Complete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function NotFoundPage() {
  return (
    <Shell>
      <section className="rounded-[2rem] border border-stone-200/80 bg-white/80 p-10 text-center shadow-[0_16px_40px_rgba(87,57,24,0.08)]">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-stone-500">
          404
        </p>
        <h1 className="mt-3 text-4xl font-black text-stone-950">
          Module not found
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-600">
          The module you tried to open does not exist. Head back to the roadmap
          and pick one of the available modules.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
        >
          Go to roadmap
        </Link>
      </section>
    </Shell>
  )
}

function HtmlProjectDetailsPage() {
  const { projectSlug = '' } = useParams()
  const project = getHtmlProjectBySlug(projectSlug)

  if (!project) {
    return <NotFoundPage />
  }

  return (
    <Shell>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/modules/html"
            className="inline-flex items-center rounded-full border border-stone-300 bg-white/80 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-amber-400 hover:text-amber-700"
          >
            Back to HTML module
          </Link>
          <div className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-800">
            HTML practice project
          </div>
        </div>
        <div className="rounded-full border border-stone-300 bg-white/70 px-4 py-2 text-sm font-medium text-stone-600">
          {project.level} • {project.duration}
        </div>
      </div>

      <section className="overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white/85 shadow-[0_20px_80px_rgba(87,57,24,0.10)]">
        <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-700">
              {project.tagline}
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600 sm:text-base">
              {project.brief}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <MetricCard label="Level" value={project.level} dark />
              <MetricCard label="Duration" value={project.duration} />
              <MetricCard
                label="Topics covered"
                value={`${project.learnings.length}`}
              />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.75rem] bg-stone-950 p-6 text-white">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(245,158,11,0.18),transparent_38%,rgba(255,255,255,0.05))]" />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-stone-400">
                Quick success checklist
              </p>
              <div className="mt-4 space-y-3">
                {project.deliverables.map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-400 font-bold text-stone-950">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-6 text-stone-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <InfoListCard
          title="Project Setup"
          subtitle="How to start the practice project on your own machine."
          items={project.setup}
          icon="grid"
        />
        <InfoListCard
          title="Project Requirements"
          subtitle="Treat these like the acceptance criteria for your build."
          items={project.requirements}
          icon="check"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <InfoListCard
          title="Topics You Will Practice"
          subtitle="These HTML topics become much easier once you use them in context."
          items={project.learnings}
          icon="spark"
        />
        <InfoListCard
          title="Expected Deliverables"
          subtitle="Aim to finish with these concrete outputs."
          items={project.deliverables}
          icon="flag"
        />
      </section>

      <section className="rounded-[1.75rem] border border-stone-200/80 bg-white/80 p-6 shadow-[0_16px_40px_rgba(87,57,24,0.08)]">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-stone-950">
              Visual References
            </h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Use these as mood references only. Build your own version instead
              of copying the exact look.
            </p>
          </div>
          <div className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-medium text-stone-600">
            Internet-picked inspiration
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {project.visualReferences.map((reference) => (
            <article
              key={reference.sourceUrl}
              className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-stone-50"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-200">
                <img
                  src={reference.image}
                  alt={reference.title}
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute left-4 top-4 flex gap-1">
                  <span className="h-3 w-3 bg-amber-400" />
                  <span className="h-3 w-3 bg-stone-950" />
                  <span className="h-3 w-3 bg-white/80" />
                </div>
              </div>
              <div className="space-y-3 p-4">
                <h3 className="text-lg font-bold text-stone-950">
                  {reference.title}
                </h3>
                <a
                  href={reference.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-amber-400 hover:text-amber-700"
                >
                  View source on {reference.sourceLabel}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Shell>
  )
}

function InfoListCard({
  title,
  subtitle,
  items,
  icon,
}: {
  title: string
  subtitle: string
  items: string[]
  icon: 'grid' | 'check' | 'spark' | 'flag'
}) {
  return (
    <section className="rounded-[1.75rem] border border-stone-200/80 bg-white/80 p-6 shadow-[0_16px_40px_rgba(87,57,24,0.08)]">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-900">
          <FeatureIcon type={icon} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-stone-950">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">{subtitle}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item, index) => (
          <div
            key={item}
            className="flex gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-4"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-950 text-xs font-bold text-white">
              {index + 1}
            </div>
            <p className="text-sm leading-6 text-stone-700">{item}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function FeatureIcon({ type }: { type: 'grid' | 'check' | 'spark' | 'flag' }) {
  if (type === 'check') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
        <path d="m5 13 4 4L19 7" />
      </svg>
    )
  }

  if (type === 'spark') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
        <path d="M12 3v5M12 16v5M4.9 4.9l3.5 3.5M15.6 15.6l3.5 3.5M3 12h5M16 12h5M4.9 19.1l3.5-3.5M15.6 8.4l3.5-3.5" />
      </svg>
    )
  }

  if (type === 'flag') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
        <path d="M6 21V5m0 0h10l-2 3 2 3H6" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
      <path d="M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 0h7v7h-7z" />
    </svg>
  )
}

function App() {
  const [modules, setModules] = useState<Module[]>(() => {
    if (typeof window === 'undefined') {
      return initialModules
    }

    const stored = window.localStorage.getItem(STORAGE_KEY)

    if (!stored) {
      return initialModules
    }

    try {
      const parsed = JSON.parse(stored) as Module[]
      return parsed
    } catch {
      return initialModules
    }
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(modules))
  }, [modules])

  function handleToggleTopic(slug: string, topicLabel: string) {
    setModules((currentModules) =>
      currentModules.map((module) =>
        module.slug === slug
          ? {
              ...module,
              topics: module.topics.map((topic) =>
                topic.label === topicLabel
                  ? { ...topic, done: !topic.done }
                  : topic,
              ),
            }
          : module,
      ),
    )
  }

  return (
    <Routes>
      <Route path="/" element={<DashboardPage modules={modules} />} />
      <Route
        path="/modules/:slug"
        element={
          <ModuleDetailsPage
            modules={modules}
            onToggleTopic={handleToggleTopic}
          />
        }
      />
      <Route
        path="/modules/html/projects/:projectSlug"
        element={<HtmlProjectDetailsPage />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
