import { Link, useParams } from 'react-router-dom'
import { InfoListCard } from '../../components/InfoListCard'
import { MetricCard } from '../../components/MetricCard'
import { NotFoundPage } from '../../components/NotFoundPage'
import { ProjectCodeWalkthroughPanel } from '../../components/ProjectCodeWalkthroughPanel'
import { ProjectRequirementsChecklist } from '../../components/ProjectRequirementsChecklist'
import { ProjectSubmissionForm } from '../../components/ProjectSubmissionForm'
import { getModuleBySlug } from '../../data/modules'
import {
  getPracticeProjectForModule,
  getPracticeProjectsForModule,
} from '../../data/practiceProjectLookup'
import { CHROME_BADGE_SM, CHROME_LINK_PILL } from '../../lib/chromeClasses'
import { topicRowId } from '../../lib/topicRowId'
import { Shell } from '../../layout/Shell'
import { getModulePracticeUi } from './modulePracticeUi'

/** Route: `/modules/:moduleSlug/projects/:projectSlug` */
export function PracticeProjectDetailsPage() {
  const { moduleSlug = '', projectSlug = '' } = useParams()
  const moduleMeta = getModuleBySlug(moduleSlug)
  const project = getPracticeProjectForModule(moduleSlug, projectSlug)
  const ui = getModulePracticeUi(moduleSlug)
  const moduleProjects = getPracticeProjectsForModule(moduleSlug)
  const projectIndex = moduleProjects.findIndex((p) => p.slug === projectSlug)

  if (!moduleMeta || !project) {
    return <NotFoundPage />
  }

  const modulePath = `/modules/${moduleSlug}`
  const projectPosition =
    projectIndex >= 0 ? projectIndex + 1 : null
  const projectTotal = moduleProjects.length
  const prevProject =
    projectIndex > 0 ? moduleProjects[projectIndex - 1] : undefined
  const nextProject =
    projectIndex >= 0 && projectIndex < moduleProjects.length - 1
      ? moduleProjects[projectIndex + 1]
      : undefined
  const topicsBlurb = `These ${moduleMeta.title} topics become much easier once you use them in context.`

  return (
    <Shell>
      <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Link to={modulePath} className={CHROME_LINK_PILL}>
            Back to {moduleMeta.title} module
          </Link>
          <div
            className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] ${ui.badgeClass}`}
          >
            {moduleMeta.title} practice project
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ProjectCodeWalkthroughPanel project={project} />
          {projectPosition != null ? (
            <div className={CHROME_BADGE_SM}>
              Project {projectPosition} of {projectTotal}
            </div>
          ) : null}
          <div className="rounded-full border border-stone-300 bg-white/70 px-4 py-2 text-sm font-medium text-stone-600 dark:border-stone-600 dark:bg-stone-900/70 dark:text-stone-300">
            {project.level} • {project.duration}
          </div>
        </div>
      </div>

      <nav
        className="flex flex-wrap items-stretch justify-between gap-3 rounded-2xl border border-stone-200/90 bg-white/75 p-4 shadow-[0_8px_30px_rgba(87,57,24,0.06)] transition-colors duration-300 dark:border-stone-600/90 dark:bg-stone-900/75 dark:shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
        aria-label="Projects in this module"
      >
        <div className="min-w-40 max-w-md flex-1">
          {prevProject ? (
            <Link
              to={`/modules/${moduleSlug}/projects/${prevProject.slug}`}
              className="block rounded-xl p-2 transition hover:bg-stone-100/80 dark:hover:bg-stone-800/80"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                ← Previous in module
              </span>
              <span className="mt-1 block text-sm font-semibold text-stone-900 dark:text-stone-100">
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <span className="block p-2 text-sm text-stone-400 dark:text-stone-500">
              First project in this module
            </span>
          )}
        </div>
        <div className="min-w-40 max-w-md flex-1 text-right">
          {nextProject ? (
            <Link
              to={`/modules/${moduleSlug}/projects/${nextProject.slug}`}
              className="block rounded-xl p-2 transition hover:bg-stone-100/80 dark:hover:bg-stone-800/80"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                Next in module →
              </span>
              <span className="mt-1 block text-sm font-semibold text-stone-900 dark:text-stone-100">
                {nextProject.title}
              </span>
            </Link>
          ) : (
            <span className="block p-2 text-sm text-stone-400 dark:text-stone-500">
              Last project in this module
            </span>
          )}
        </div>
      </nav>

      <section className="overflow-hidden rounded-4xl border border-stone-200/80 bg-white/85 shadow-[0_20px_80px_rgba(87,57,24,0.10)] transition-colors duration-300 dark:border-stone-700/80 dark:bg-stone-900/85 dark:shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
        <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-10">
          <div>
            <p className={`text-xs font-bold uppercase tracking-[0.24em] ${ui.taglineClass}`}>
              {project.tagline}
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-stone-950 sm:text-5xl dark:text-stone-50">
              {project.title}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600 sm:text-base dark:text-stone-400">
              {project.brief}
            </p>

            {project.whyMatters ? (
              <div className="mt-5 rounded-2xl border border-amber-200/70 bg-amber-50/60 px-4 py-3 dark:border-amber-900/50 dark:bg-amber-950/30">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-900 dark:text-amber-200">
                  Why this project matters
                </p>
                <p className="mt-2 text-sm leading-6 text-stone-800 dark:text-stone-300">
                  {project.whyMatters}
                </p>
              </div>
            ) : null}

            {project.recommendedAfterTopics &&
            project.recommendedAfterTopics.length > 0 ? (
              <div className="mt-5 rounded-2xl border border-stone-200 bg-stone-50/80 px-4 py-3 text-sm text-stone-700 dark:border-stone-600 dark:bg-stone-800/50 dark:text-stone-300">
                <p className="font-semibold text-stone-800 dark:text-stone-200">
                  Comfortable after these module topics
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {project.recommendedAfterTopics.map((topic) => (
                    <li key={topic}>
                      <Link
                        to={`${modulePath}#${topicRowId(topic)}`}
                        className="inline-flex rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-amber-900 transition hover:border-amber-400 dark:border-stone-600 dark:bg-stone-900 dark:text-amber-300 dark:hover:border-amber-500"
                      >
                        {topic}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

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

      <section
        className={`rounded-[1.75rem] border bg-white/80 p-6 shadow-[0_16px_40px_rgba(87,57,24,0.08)] transition-colors duration-300 dark:bg-stone-900/80 dark:shadow-[0_16px_40px_rgba(0,0,0,0.35)] ${ui.sectionBorderClass}`}
      >
        <h2 className="text-xl font-bold text-stone-950 sm:text-2xl dark:text-stone-50">
          About this project
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600 sm:text-base dark:text-stone-400">
          {project.summary}
        </p>
        <p className="mt-4 text-sm text-stone-500 dark:text-stone-400">
          Use the{' '}
          <strong className="text-stone-700 dark:text-stone-300">View code</strong> button at the top
          for annotated
          snippets (HTML, CSS, JavaScript, TypeScript, and more) and explanations.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <InfoListCard
          title="Project Setup"
          subtitle="How to start the practice project on your own machine."
          items={project.setup}
          icon="grid"
        />
        <ProjectRequirementsChecklist
          key={`${moduleSlug}-${projectSlug}-${project.requirements.length}`}
          moduleSlug={moduleSlug}
          projectSlug={projectSlug}
          requirements={project.requirements}
        />
      </section>

      <ProjectSubmissionForm
        moduleSlug={moduleSlug}
        projectSlug={projectSlug}
        requirements={project.requirements}
      />

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <InfoListCard
          title="Topics You Will Practice"
          subtitle={topicsBlurb}
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

      <section className="rounded-[1.75rem] border border-stone-200/80 bg-white/80 p-6 shadow-[0_16px_40px_rgba(87,57,24,0.08)] transition-colors duration-300 dark:border-stone-700/80 dark:bg-stone-900/80 dark:shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-stone-950 dark:text-stone-50">
              Visual References
            </h2>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-400">
              Use these as mood references only. Build your own version instead
              of copying the exact look.
            </p>
          </div>
          <div className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-medium text-stone-600 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-300">
            Internet-picked inspiration
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {project.visualReferences.map((reference) => (
            <article
              key={reference.sourceUrl}
              className="overflow-hidden rounded-3xl border border-stone-200 bg-stone-50 dark:border-stone-600 dark:bg-stone-800/50"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-stone-200 dark:bg-stone-800">
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
                <h3 className="text-lg font-bold text-stone-950 dark:text-stone-50">
                  {reference.title}
                </h3>
                <a
                  href={reference.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-amber-400 hover:text-amber-700 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-amber-500 dark:hover:text-amber-300"
                >
                  View source on {reference.sourceLabel}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      </div>
    </Shell>
  )
}
