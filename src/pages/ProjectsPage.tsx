import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { PracticeProject } from '../data/practiceProject'
import {
  getAllListedPracticeProjects,
  projectMatchesDurationBucket,
  type DurationBucketId,
} from '../lib/allPracticeProjects'
import { Shell } from '../layout/Shell'
import { ModulePracticeProjectCard } from '../features/practice-projects/ModulePracticeProjectCard'
import { getModulePracticeUi } from '../features/practice-projects/modulePracticeUi'
import { getPracticeProjectsForModule } from '../data/practiceProjectLookup'

const LEVELS: Array<PracticeProject['level'] | 'any'> = [
  'any',
  'Beginner',
  'Beginner+',
  'Intermediate',
]

const DURATION_OPTIONS: { id: DurationBucketId; label: string }[] = [
  { id: 'any', label: 'Any duration' },
  { id: 'short', label: 'Shorter (~under 55 min)' },
  { id: 'medium', label: 'Medium (~55–85 min)' },
  { id: 'long', label: 'Longer (~85+ min)' },
]

export function ProjectsPage() {
  const allListed = useMemo(() => getAllListedPracticeProjects(), [])
  const moduleOptions = useMemo(() => {
    const slugs = [...new Set(allListed.map((x) => x.moduleSlug))]
    return slugs.map((slug) => {
      const row = allListed.find((x) => x.moduleSlug === slug)
      return { slug, title: row?.moduleTitle ?? slug }
    })
  }, [allListed])

  const [query, setQuery] = useState('')
  const [moduleSlug, setModuleSlug] = useState<string>('any')
  const [level, setLevel] = useState<(typeof LEVELS)[number]>('any')
  const [durationBucket, setDurationBucket] = useState<DurationBucketId>('any')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allListed.filter((row) => {
      if (moduleSlug !== 'any' && row.moduleSlug !== moduleSlug) return false
      if (level !== 'any' && row.project.level !== level) return false
      if (!projectMatchesDurationBucket(row.project.duration, durationBucket))
        return false
      if (!q) return true
      const hay = [
        row.project.title,
        row.project.tagline,
        row.project.summary,
        row.moduleTitle,
        ...row.project.learnings,
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [allListed, query, moduleSlug, level, durationBucket])

  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-800">
              Practice catalog
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-stone-950 sm:text-4xl">
              All practice projects
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">
              Search and filter by module, level, or estimated duration. Each card
              opens the full brief on its project page.
            </p>
          </div>
          <div className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-semibold text-stone-700">
            {filtered.length} / {allListed.length} shown
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-stone-200/80 bg-white/80 p-5 shadow-[0_16px_40px_rgba(87,57,24,0.08)]">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <label className="flex flex-col gap-1 text-sm font-medium text-stone-700">
              Search
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Title, topic, module…"
                className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-stone-900 outline-none ring-amber-500/30 focus:ring-2"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium text-stone-700">
              Module
              <select
                value={moduleSlug}
                onChange={(e) => setModuleSlug(e.target.value)}
                className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-stone-900 outline-none ring-amber-500/30 focus:ring-2"
              >
                <option value="any">All modules</option>
                {moduleOptions.map((m) => (
                  <option key={m.slug} value={m.slug}>
                    {m.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium text-stone-700">
              Level
              <select
                value={level}
                onChange={(e) =>
                  setLevel(e.target.value as (typeof LEVELS)[number])
                }
                className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-stone-900 outline-none ring-amber-500/30 focus:ring-2"
              >
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l === 'any' ? 'Any level' : l}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium text-stone-700">
              Duration
              <select
                value={durationBucket}
                onChange={(e) =>
                  setDurationBucket(e.target.value as DurationBucketId)
                }
                className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-stone-900 outline-none ring-amber-500/30 focus:ring-2"
              >
                {DURATION_OPTIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="rounded-2xl border border-stone-200 bg-stone-50 px-6 py-8 text-center text-sm text-stone-600">
            No projects match these filters.{' '}
            <button
              type="button"
              className="font-semibold text-amber-800 underline decoration-amber-400/60 hover:decoration-amber-600"
              onClick={() => {
                setQuery('')
                setModuleSlug('any')
                setLevel('any')
                setDurationBucket('any')
              }}
            >
              Reset filters
            </button>
          </p>
        ) : (
          <div className="grid gap-4 xl:grid-cols-3">
            {filtered.map((row) => {
              const moduleProjects = getPracticeProjectsForModule(row.moduleSlug)
              const idx = moduleProjects.findIndex(
                (p) => p.slug === row.project.slug,
              )
              const projectIndex = idx >= 0 ? idx + 1 : 1
              const projectTotal = moduleProjects.length
              const ui = getModulePracticeUi(row.moduleSlug)
              return (
                <ModulePracticeProjectCard
                  key={`${row.moduleSlug}-${row.project.slug}`}
                  moduleSlug={row.moduleSlug}
                  project={row.project}
                  projectIndex={projectIndex}
                  projectTotal={projectTotal}
                  ui={ui}
                  moduleLabel={row.moduleTitle}
                />
              )
            })}
          </div>
        )}

        <p className="text-center text-sm text-stone-500">
          Prefer the roadmap?{' '}
          <Link
            to="/"
            className="font-semibold text-amber-800 underline decoration-amber-400/60 hover:decoration-amber-600"
          >
            Back to dashboard
          </Link>
        </p>
      </div>
    </Shell>
  )
}
