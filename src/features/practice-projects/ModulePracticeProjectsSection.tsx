import { useMemo } from 'react'
import { getPracticeProjectsForModule } from '../../data/practiceProjectLookup'
import { normalizeSearchQuery, textMatchesQuery } from '../../lib/searchNormalize'
import { getModulePracticeUi } from './modulePracticeUi'
import { ModulePracticeProjectCard } from './ModulePracticeProjectCard'

export function ModulePracticeProjectsSection({
  moduleSlug,
  moduleTitle,
  filterQuery = '',
}: {
  moduleSlug: string
  moduleTitle: string
  filterQuery?: string
}) {
  const allProjects = getPracticeProjectsForModule(moduleSlug)
  const q = normalizeSearchQuery(filterQuery)
  const projects = useMemo(() => {
    if (!q) return allProjects
    return allProjects.filter((p) => {
      const hay = [p.title, p.tagline, p.summary, p.slug, ...p.learnings].join(
        ' ',
      )
      return textMatchesQuery(hay, q)
    })
  }, [allProjects, q])

  if (allProjects.length === 0) return null

  const ui = getModulePracticeUi(moduleSlug)

  return (
    <section
      className={`rounded-[1.75rem] border bg-white/80 p-6 shadow-[0_16px_40px_rgba(87,57,24,0.08)] ${ui.sectionBorderClass}`}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className={`text-xs font-bold uppercase tracking-[0.24em] ${ui.sectionHeadingClass}`}>
            Practice Projects
          </p>
          <h2 className="mt-2 text-2xl font-bold text-stone-950">
            Apply {moduleTitle} in guided mini projects
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600">
            Each card opens a full brief. On the project page, use{' '}
            <strong>View code</strong> for sample snippets and explanations—then build your own version
            locally.
          </p>
        </div>
        <div
          className={`rounded-full border px-4 py-2 text-sm font-medium ${ui.badgeClass}`}
        >
          {q
            ? `${projects.length} of ${allProjects.length} projects`
            : `${allProjects.length} ${moduleTitle} projects`}
        </div>
      </div>

      {projects.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-4 py-6 text-center text-sm text-stone-600">
          No practice projects match your search. Clear the filter to see all projects.
        </p>
      ) : (
        <div className="mt-6 grid gap-4 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ModulePracticeProjectCard
              key={project.slug}
              moduleSlug={moduleSlug}
              project={project}
              projectIndex={index + 1}
              projectTotal={projects.length}
              ui={ui}
            />
          ))}
        </div>
      )}
    </section>
  )
}
