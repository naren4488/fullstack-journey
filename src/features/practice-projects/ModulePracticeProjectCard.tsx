import { Link } from 'react-router-dom'
import type { PracticeProject } from '../../data/practiceProject'
import type { ModulePracticeUi } from './modulePracticeUi'

export function ModulePracticeProjectCard({
  moduleSlug,
  project,
  projectIndex,
  projectTotal,
  ui,
  moduleLabel,
}: {
  moduleSlug: string
  project: PracticeProject
  projectIndex: number
  projectTotal: number
  ui: ModulePracticeUi
  /** When set (e.g. on the all-projects page), shows which roadmap module this belongs to. */
  moduleLabel?: string
}) {
  return (
    <Link
      to={`/modules/${moduleSlug}/projects/${project.slug}`}
      className={`group overflow-hidden rounded-3xl border-2 bg-stone-950 text-white transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(87,57,24,0.18)] ${ui.cardRingClass}`}
    >
      <div className="relative px-5 py-5">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(245,158,11,0.12),transparent_45%,rgba(255,255,255,0.04))]" />
        <div className="relative">
          <div className="flex items-center justify-between gap-3">
            <span
              className={`rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${ui.chipClass}`}
            >
              {project.level}
            </span>
            <div className="flex flex-col items-end gap-1 text-right">
              <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-stone-300">
                {projectIndex} / {projectTotal}
              </span>
              <span className="text-xs font-medium text-stone-400">
                {project.duration}
              </span>
            </div>
          </div>
          {moduleLabel ? (
            <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">
              {moduleLabel}
            </p>
          ) : null}
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
            <span className={`font-semibold text-amber-300 ${ui.ctaHoverClass}`}>
              Open project
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
