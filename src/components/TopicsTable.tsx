import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import type { Module } from '../data/modules'
import type { PracticeProject } from '../data/practiceProject'
import { getTopicKeyPoints } from '../data/topicKeyPoints'
import { getTopicWhyMatters } from '../data/topicWhyMatters'
import { practiceProjectsForTopicLabel } from '../lib/practiceProjectsForTopic'
import { normalizeSearchQuery, textMatchesQuery } from '../lib/searchNormalize'
import { topicRowId } from '../lib/topicRowId'
import toast from 'react-hot-toast'

export function TopicsTable({
  module,
  practiceProjects = [],
  onToggleTopic,
  filterQuery = '',
}: {
  module: Module
  practiceProjects?: PracticeProject[]
  onToggleTopic: (slug: string, topicLabel: string) => void
  /** Client-side filter on each keystroke (topic label, why text, linked project titles). */
  filterQuery?: string
}) {
  const q = normalizeSearchQuery(filterQuery)
  const visibleTopics = useMemo(() => {
    if (!q) return module.topics
    return module.topics.filter((topic) => {
      if (textMatchesQuery(topic.label, q)) return true
      const why = getTopicWhyMatters(module.slug, topic.label)
      if (why && textMatchesQuery(why, q)) return true
      const keyPoints = getTopicKeyPoints(module.slug, topic.label)
      if (
        keyPoints?.some(
          (kp) =>
            textMatchesQuery(kp.name, q) || textMatchesQuery(kp.description, q),
        )
      )
        return true
      const topicProjects = practiceProjectsForTopicLabel(
        practiceProjects,
        topic.label,
      )
      return topicProjects.some(
        (p) =>
          textMatchesQuery(p.title, q) ||
          textMatchesQuery(p.tagline, q) ||
          textMatchesQuery(p.summary, q),
      )
    })
  }, [module.slug, module.topics, practiceProjects, q])

  const totalTopics = module.topics.length
  const shownCount = visibleTopics.length

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
          {q
            ? `${shownCount} of ${totalTopics} topics`
            : `${totalTopics} total topics`}
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-stone-200">
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
              {visibleTopics.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-10 text-center text-sm text-stone-600"
                  >
                    No topics match your search. Clear the filter to see all topics.
                  </td>
                </tr>
              ) : null}
              {visibleTopics.map((topic, index) => {
                const topicProjects = practiceProjectsForTopicLabel(
                  practiceProjects,
                  topic.label,
                )
                const topicWhy = getTopicWhyMatters(module.slug, topic.label)
                const topicKeyPoints = getTopicKeyPoints(
                  module.slug,
                  topic.label,
                )
                return (
                <tr
                  key={topic.label}
                  id={topicRowId(topic.label)}
                  className="scroll-mt-24 border-t border-stone-200 text-sm text-stone-700"
                >
                  <td className="px-4 py-4 align-middle font-semibold text-stone-400">
                    {String(index + 1).padStart(2, '0')}
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <div className="topic-detail-title">{topic.label}</div>
                    {topicWhy ? (
                      <details className="topic-detail-section">
                        <summary className="topic-heading topic-heading-why">
                          Why this matters
                        </summary>
                        <p className="mt-2 text-xs leading-5 text-stone-600">
                          {topicWhy}
                        </p>
                      </details>
                    ) : null}
                    {topicKeyPoints && topicKeyPoints.length > 0 ? (
                      <details className="topic-detail-section">
                        <summary className="topic-heading topic-heading-key">
                          Key ideas
                        </summary>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-xs leading-5 text-stone-600">
                          {topicKeyPoints.map((kp) => (
                            <li key={kp.name}>
                              <span className="font-medium text-stone-800">
                                {kp.name}
                              </span>
                              {': '}
                              {kp.description}
                            </li>
                          ))}
                        </ul>
                      </details>
                    ) : null}
                    {topicProjects.length > 0 ? (
                      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-600">
                        <span className="font-semibold text-stone-500">Try:</span>
                        {topicProjects.map((p) => (
                          <Link
                            key={p.slug}
                            to={`/modules/${module.slug}/projects/${p.slug}`}
                            className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-0.5 font-medium text-amber-800 transition hover:border-amber-400 hover:bg-amber-50"
                          >
                            {p.title}
                          </Link>
                        ))}
                      </div>
                    ) : null}
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
                      onClick={() => {
                        onToggleTopic(module.slug, topic.label)
                        toast.success(`Topic "${topic.label}" ${topic.done ? 'marked incomplete' : 'marked complete'}`, { position: 'top-right', duration: 1500 })
                      }}
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
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
